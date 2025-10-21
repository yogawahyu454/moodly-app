import React, { useState } from 'react';

// Komponen MobileLayout sekarang didefinisikan di file yang sama
const MobileLayout = ({ children }) => {
  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white flex flex-col border-x">
        {children}
      </div>
    </div>
  );
}

// Ikon panah kembali (ChevronLeft) dalam format SVG
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

// Ikon Bintang dalam format SVG
const StarIcon = ({ filled }) => (
    <svg
        className={`w-8 h-8 transition-colors duration-200 ${filled ? 'text-[#FFC700]' : 'text-gray-300'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.95-.69l1.519-4.674z"
        />
    </svg>
);


export default function RatingPage() {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleRatingChange = (newRating) => {
        if (submitted) return;
        setRating(newRating);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0 || !review) {
            console.log("Harap berikan rating dan ulasan.");
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
        }, 1000);
    };

    return (
        <MobileLayout>
            <div className="w-full bg-[#00B2FF] flex flex-col flex-1">
                {/* Header */}
                <header className="pt-12 pb-8 px-4 flex items-center justify-between relative z-10">
                    <button className="text-white p-2">
                        <ChevronLeftIcon />
                    </button>
                    <h1 className="text-white text-xl font-bold">Beri Penilaian</h1>
                    <div className="w-10"></div>
                </header>

                {/* Konten Utama dengan sudut atas melengkung */}
                <main className="flex-grow pt-8 p-6 bg-white rounded-t-[2.5rem] flex flex-col items-center">
                    {/* Foto profil sekarang berada di dalam area putih */}
                    <img
                        src="images/jenaya.jpg"
                        alt="Foto Profil Psikolog Intan Maharani"
                        className="w-24 h-24 rounded-full object-cover shadow-md"
                    />
                    
                    <h2 className="text-xl font-bold text-gray-800 text-center mt-4">Intan Maharani, M.Psi., Psikolog</h2>
                    <p className="text-gray-500 text-sm mt-1">Spesialisasi: Kesehatan mental</p>

                    <div className="flex justify-center my-6 space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} onClick={() => handleRatingChange(star)} disabled={submitted}>
                                <StarIcon filled={star <= rating} />
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center mt-2">
                        <div className={`w-full p-4 border-2 border-[#00B2FF] rounded-[1.75rem] h-36 flex items-start ${submitted ? 'bg-blue-50' : 'bg-white'}`}>
                            {submitted ? (
                                <p className="text-gray-700 text-sm leading-relaxed">{review}</p>
                            ) : (
                                <textarea
                                    className="w-full h-full bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none resize-none"
                                    placeholder="Bagikan ulasanmu disini...."
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                />
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || submitted}
                            className="mt-10 w-48 py-3 bg-[#00B2FF] text-white font-bold text-lg rounded-full shadow-[0_10px_20px_-5px_rgba(0,178,255,0.5)] hover:bg-[#009ee6] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Mengirim...' : 'Kirim'}
                        </button>
                    </form>
                </main>
            </div>
        </MobileLayout>
    );
}

