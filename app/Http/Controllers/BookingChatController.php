<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\ChatMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate; // <-- Import Gate

// TODO: Import Notifikasi jika sudah siap
// use App\Notifications\NewChatMessageNotification;

class BookingChatController extends Controller
{
    /**
     * Mengambil pesan chat untuk booking tertentu.
     * GET /api/booking/{booking}/chat/messages
     */
    public function index(Booking $booking)
    {
        // Otorisasi: Pastikan user yang login adalah customer atau konselor dari booking ini
        // Gunakan Gate/Policy untuk otorisasi yang lebih rapi
        Gate::authorize('viewChat', $booking);

        // Ambil pesan, urutkan dari yang terlama, sertakan data pengirim
        $messages = $booking->chatMessages()
            ->with('sender:id,name,avatar') // Hanya ambil kolom yg perlu dari sender
            ->orderBy('created_at', 'asc')
            ->get();

        // TODO: Tandai pesan sebagai sudah dibaca oleh user yang login (jika perlu)
        // Misal: $booking->chatMessages()->where('sender_id', '!=', Auth::id())->where('is_read', false)->update(['is_read' => true]);

        return response()->json($messages);
    }

    /**
     * Menyimpan pesan baru untuk booking tertentu.
     * POST /api/booking/{booking}/chat/messages
     */
    public function store(Request $request, Booking $booking)
    {
        // Otorisasi
        Gate::authorize('sendMessage', $booking);

        // Validasi
        $validated = $request->validate([
            'message' => 'required|string|max:1000', // Batasi panjang pesan
        ]);

        // Buat pesan baru
        $message = $booking->chatMessages()->create([
            'sender_id' => Auth::id(),
            'message' => $validated['message'],
            'is_read' => false, // Default belum dibaca
        ]);

        // Muat data pengirim untuk respon
        $message->load('sender:id,name,avatar');

        // TODO: Kirim notifikasi ke penerima
        $recipient = ($booking->customer_id === Auth::id()) ? $booking->konselor : $booking->customer;
        // if ($recipient) {
        //     $recipient->notify(new NewChatMessageNotification($message, $booking));
        // }

        return response()->json($message, 201); // 201 = Created
    }

    // Hapus helper function authorizeBookingAccess jika menggunakan Gate/Policy
    /*
    private function authorizeBookingAccess(Booking $booking)
    {
        $user = Auth::user();
        if ($booking->customer_id !== $user->id && $booking->konselor_id !== $user->id) {
            abort(403, 'Anda tidak memiliki akses ke percakapan ini.');
        }
        // ... (cek lainnya)
    }
    */
}
