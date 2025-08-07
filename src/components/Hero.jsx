import VinylPlayer from "./VinylPlayer";

const Hero = () => {
    return (
        <section className="min-h-screen bg-[#f6eee3] text-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-12 text-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
                Happy Birthday, Jesslyn
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 max-w-xl">
                Sebuah persembahan sederhana dalam bentuk visual & musik untuk hari spesialmu.
            </p>

            <VinylPlayer />

            <p className="mt-10 text-sm text-gray-500 animate-bounce">
                Scroll ke bawah untuk lanjut
            </p>
        </section>

    );
};

export default Hero;