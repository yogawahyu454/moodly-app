<?php

namespace App\Http\Controllers;

use App\Models\ChatRoom;
use App\Models\ChatMessage;
use App\Models\User; // Import User
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException; // Untuk error
// TODO: Import Notifikasi jika sudah dibuat
// use App\Notifications\NewChatMessageNotification;

class ChatController extends Controller
{
    /**
     * Mengambil daftar chat rooms untuk user yang login.
     * GET /api/chat/rooms
     */
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // Ambil rooms berdasarkan role
        if ($user->role === 'customer') {
            $rooms = $user->chatRoomsAsCustomer()
                ->with(['admin:id,name,avatar', 'latestMessage']) // Eager load admin info & pesan terakhir
                ->orderBy('last_message_at', 'desc') // Urutkan berdasarkan pesan terakhir
                ->get();
        } elseif ($user->role === 'admin' || $user->role === 'super-admin') {
            $rooms = $user->chatRoomsAsAdmin()
                ->with(['customer:id,name,avatar', 'latestMessage']) // Eager load customer info & pesan terakhir
                ->orderBy('last_message_at', 'desc')
                ->get();
        } else {
            $rooms = collect(); // Role lain (konselor) tidak punya chat dengan admin
        }


        return response()->json($rooms);
    }

    /**
     * Mengambil pesan dalam chat room tertentu.
     * GET /api/chat/rooms/{chatRoom}
     */
    public function show(ChatRoom $chatRoom)
    {
        // Pastikan user yang login boleh mengakses room ini
        $this->authorizeAccess($chatRoom);

        // Ambil pesan, urutkan dari yang terlama ke terbaru untuk tampilan chat
        // Eager load sender agar tidak N+1 query
        $messages = $chatRoom->messages()
            ->with('sender:id,name,avatar') // Hanya ambil data sender yang perlu
            ->oldest() // Urutan chat standar (lama ke baru)
            ->get();

        // TODO: Tandai pesan yang belum dibaca sebagai sudah dibaca
        // $chatRoom->messages()->where('receiver_id', Auth::id())->where('is_read', false)->update(['is_read' => true]);

        return response()->json($messages);
    }

    /**
     * Menyimpan pesan baru ke dalam chat room.
     * POST /api/chat/rooms/{chatRoom}/messages
     */
    public function storeMessage(Request $request, ChatRoom $chatRoom)
    {
        // Pastikan user yang login boleh mengirim pesan di room ini
        $this->authorizeAccess($chatRoom);

        $validated = $request->validate([
            'message' => 'required|string|max:1000', // Batasi panjang pesan
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();

        // Tentukan penerima
        $receiverId = ($user->role === 'customer') ? $chatRoom->admin_id : $chatRoom->customer_id;

        // Jika admin belum ada di room, cari admin pertama yang available (logika sederhana)
        if (!$receiverId && $user->role === 'customer') {
            $admin = User::whereIn('role', ['admin', 'super-admin'])->where('status', 'Active')->first(); // Cari admin aktif pertama
            if ($admin) {
                $receiverId = $admin->id;
                $chatRoom->admin_id = $admin->id; // Assign admin ke room
            } else {
                return response()->json(['message' => 'Saat ini tidak ada admin yang tersedia.'], 400);
            }
        } elseif (!$receiverId) {
            // Admin mengirim pesan tapi customer ID tidak ada (tidak mungkin terjadi jika relasi benar)
            return response()->json(['message' => 'Penerima tidak ditemukan.'], 400);
        }

        $message = $chatRoom->messages()->create([
            'sender_id' => $user->id,
            'receiver_id' => $receiverId,
            'message' => $validated['message'],
            'is_read' => false, // Default belum dibaca
        ]);

        // Update last_message_at di chat_room
        $chatRoom->update(['last_message_at' => now()]);


        // Eager load sender untuk response
        $message->load('sender:id,name,avatar');

        // TODO: Kirim Notifikasi ke $receiver
        // $receiver = User::find($receiverId);
        // if ($receiver) {
        //     $receiver->notify(new NewChatMessageNotification($message));
        // }

        return response()->json($message, 201); // 201 = Created
    }

    /**
     * Membuat chat room baru (jika customer memulai dari halaman bantuan).
     * POST /api/chat/rooms
     */
    public function storeRoom(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // Hanya customer yang boleh membuat room baru dari sini
        if ($user->role !== 'customer') {
            return response()->json(['message' => 'Hanya customer yang dapat memulai percakapan baru.'], 403);
        }

        // Cek apakah customer sudah punya room (asumsi 1 customer 1 room dengan admin)
        $existingRoom = $user->chatRoomsAsCustomer()->first();
        if ($existingRoom) {
            // Jika sudah ada, kembalikan room yang ada
            $existingRoom->load(['admin:id,name,avatar', 'latestMessage']); // Load relasi yg perlu
            return response()->json($existingRoom);
        }


        // Cari admin pertama yang available (logika sederhana)
        $admin = User::whereIn('role', ['admin', 'super-admin'])->where('status', 'Active')->first();
        $adminId = $admin ? $admin->id : null; // Bisa null jika tidak ada admin

        // Buat room baru
        $chatRoom = ChatRoom::create([
            'customer_id' => $user->id,
            'admin_id' => $adminId,
            'last_message_at' => now(), // Set waktu saat dibuat
        ]);

        // Kirim pesan sambutan otomatis dari admin (jika ada admin)
        if ($admin) {
            $chatRoom->messages()->create([
                'sender_id' => $admin->id,
                'receiver_id' => $user->id,
                'message' => 'Halo! Ada yang bisa saya bantu?',
                'is_read' => false,
            ]);
        }


        $chatRoom->load(['admin:id,name,avatar', 'latestMessage']); // Load relasi

        return response()->json($chatRoom, 201);
    }

    /**
     * Helper untuk memastikan user punya akses ke chat room.
     */
    protected function authorizeAccess(ChatRoom $chatRoom)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if ($user->role === 'customer' && $chatRoom->customer_id !== $user->id) {
            abort(403, 'Akses ditolak.');
        } elseif (($user->role === 'admin' || $user->role === 'super-admin') && $chatRoom->admin_id !== $user->id) {
            // Jika admin belum di-assign, assign saat admin membuka chat
            if (is_null($chatRoom->admin_id)) {
                $chatRoom->update(['admin_id' => $user->id]);
            } else {
                abort(403, 'Akses ditolak.'); // Admin lain tidak boleh akses
            }
        } elseif (!in_array($user->role, ['customer', 'admin', 'super-admin'])) {
            abort(403, 'Akses ditolak.'); // Role lain tidak boleh akses
        }
    }
}
