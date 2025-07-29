'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const TributeSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.tribute-heading', {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            });

            gsap.from('.tribute-text', {
                opacity: 0,
                y: 30,
                duration: 1.2,
                delay: 0.3,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
            });

            gsap.from('.tribute-img', {
                opacity: 0,
                scale: 0.95,
                duration: 1,
                delay: 0.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative px-6 py-16 md:px-20 md:py-24 bg-white dark:bg-[#0b0b0b] text-center"
        >
            <h2 className="tribute-heading text-3xl md:text-5xl font-bold text-pink-600 dark:text-pink-400 mb-6">
                Happy Birthday!
            </h2>
            <p className="tribute-text max-w-xl mx-auto text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-10">
                Semoga harimu dipenuhi dengan cahaya, tawa, dan musik yang selalu kamu cintai.
                Website ini aku buat sebagai hadiah kecil dari penggemar yang menyayangimu.
                Terima kasih sudah menjadi inspirasi.
            </p>
            <img
                src="/assets/images/album.png"
                alt="Tribute"
                className="tribute-img mx-auto shadow-lg w-60 h-60 object-cover"
            />
        </section>
    );
};

export default TributeSection;
