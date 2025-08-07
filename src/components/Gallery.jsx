'use client';

import { useEffect, useRef, useState } from 'react';
import './Gallery.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const allImages = [
    "https://cdna.artstation.com/p/assets/images/images/047/002/152/large/ridley-dominguez-edit-self.jpg?1646511232",
    "https://cdna.artstation.com/p/assets/images/images/047/002/522/large/ridley-dominguez-22ed7227-4c7c-45c8-ba03-e437f1d803e6.jpg?1646512026",
    "https://cdna.artstation.com/p/assets/images/images/047/002/670/large/ridley-dominguez-1cd6dbe8-302a-4ad3-b62c-cf3ade13144a.jpg?1646512439",
    "https://cdna.artstation.com/p/assets/images/images/068/144/758/large/ridley-dominguez-ballx.jpg?1697087543",
    "https://cdnb.artstation.com/p/assets/images/images/068/144/767/large/ridley-dominguez-dimensional.jpg?1697087608",
    "https://cdna.artstation.com/p/assets/images/images/068/144/732/large/ridley-dominguez-alien-wolf.jpg?1697087372",
    "https://cdna.artstation.com/p/assets/images/images/070/595/418/large/ridley-dominguez-howellcard-fix.jpg?1702939887",
    "https://cdna.artstation.com/p/assets/images/images/070/595/722/large/ridley-dominguez-imcopavcomm2.jpg?1702940853",
    "https://cdna.artstation.com/p/assets/images/images/029/268/988/large/ridley-dominguez-lol.jpg?1597005001",
    "https://cdnb.artstation.com/p/assets/images/images/049/748/369/large/ridley-dominguez-seacliffassets-1.jpg?1653239609",
    "https://cdna.artstation.com/p/assets/images/images/014/033/780/large/ridley-dominguez-r4.jpg?1542163244",
    "https://cdna.artstation.com/p/assets/images/images/031/679/628/large/ridley-dominguez-wolf-murder.jpg?1604310027",
    "https://cdna.artstation.com/p/assets/images/images/014/033/798/large/ridley-dominguez-r3.jpg?1542163350",
    "https://cdna.artstation.com/p/assets/images/images/070/596/130/large/ridley-dominguez-belfastpridecover.jpg?1702942066",
    "https://cdnb.artstation.com/p/assets/images/images/040/481/937/large/ridley-dominguez-takemebck.jpg?1628991854",
    "https://cdnb.artstation.com/p/assets/images/images/047/002/253/large/ridley-dominguez-cardv2.jpg?1646511466",

];

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [visibleCount, setVisibleCount] = useState(8);
    const sentinelRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisibleCount((prev) => Math.min(prev + 4, allImages.length));
                }
            },
            {
                threshold: 1.0,
            }
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => {
            if (sentinelRef.current) observer.unobserve(sentinelRef.current);
        };
    }, []);

    return (
        <section className="gallery-section">
            <div className="gallery-wrapper" style={{ width: 'min(90vw, 1200px)', margin: '0 auto' }}>
                <div className="gallery-grid">
                    {allImages.slice(0, visibleCount).map((src, index) => (
                        <div
                            className={`gallery-item item-${(index % 9) + 1}`}
                            key={index}
                            style={{ backgroundImage: `url(${src})` }}
                            onClick={() => setSelectedImage(src)}
                        >
                            <img src={src} alt={`Gallery ${index}`} loading="lazy" style={{ display: 'none' }} />
                        </div>
                    ))}
                </div>

                <div ref={sentinelRef} style={{ height: '1px' }}></div>

                {selectedImage && (
                    <div className="popup-preview">
                        <div className="popup-image-wrapper no-border">
                            <button
                                className="close-btn"
                                onClick={() => setSelectedImage(null)}
                                aria-label="Close preview"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            </button>
                            <img
                                src={selectedImage}
                                alt="Preview"
                                className="preview-image"
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Gallery;