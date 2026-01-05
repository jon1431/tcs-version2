import React, { useEffect, useRef, useState } from 'react';

const ArchitecturalLegacy = ({ onExplore, scrollProgress }) => {
    const sectionRef = useRef(null);
    const buttonRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [buttonTransform, setButtonTransform] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    // IntersectionObserver for scroll reveal
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Magnetic button effect with pulse glow
    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const handleMouseMove = (e) => {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
            );

            // Set CSS variables for radial fill effect
            const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
            const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
            button.style.setProperty('--mouse-x', `${xPercent}%`);
            button.style.setProperty('--mouse-y', `${yPercent}%`);

            if (distance < 80) {
                const x = (e.clientX - centerX) * 0.4;
                const y = (e.clientY - centerY) * 0.4;
                setButtonTransform({ 
                    x: Math.max(-25, Math.min(25, x)), 
                    y: Math.max(-25, Math.min(25, y)) 
                });
            }
        };

        const handleMouseLeave = () => {
            setButtonTransform({ x: 0, y: 0 });
            setIsHovered(false);
        };

        const handleMouseEnter = () => {
            setIsHovered(true);
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);
        button.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseleave', handleMouseLeave);
            button.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    return (
        <section 
            ref={sectionRef}
            className={`mt-12 space-y-12 w-full transition-opacity duration-800 ${
                isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-[30px]'
            }`}
            style={{
                transition: 'opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
        >
            <div className="flex flex-col items-start mx-auto w-[90%] max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-[21px] h-[21px] text-gray-700">
                        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <h2 className="font-sans font-semibold text-xs md:text-sm uppercase tracking-[0.25em] text-gray-600" style={{fontFamily: 'Inter, sans-serif'}}>
                        ARCHITECTURAL LEGACY
                    </h2>
                </div>

                <blockquote className="font-sans font-light text-base md:text-lg leading-relaxed italic text-gray-700" style={{fontFamily: 'Inter, sans-serif'}}>
                    &ldquo; Rumah Penghulu Abu Seman is a traditional Malay house that reflects early 20th-century Malay architecture and way of life. Originally built in Kedah and later restored in Kuala Lumpur, it stands as an important example of Malaysia&apos;s cultural heritage. Today, it serves as a place to learn about traditional design, craftsmanship, and values. &rdquo;
                </blockquote>
            </div>

            {/* Magnetic Explore Button - Warm Cream/Off-White with High Visibility */}
            <div className="flex justify-center">
                <button
                    ref={buttonRef}
                    onClick={onExplore}
                    className={`relative px-12 py-5 rounded-full cursor-pointer overflow-hidden group transition-all duration-300 ${
                        isHovered ? 'scale-105' : 'scale-100'
                    }`}
                    style={{
                        transform: `translate(${buttonTransform.x}px, ${buttonTransform.y}px) scale(${isHovered ? 1.05 : 1})`,
                        transition: 'transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        willChange: 'transform',
                        background: '#FDFCF0', // Warm Cream/Off-White
                        boxShadow: isHovered 
                            ? '0 0 40px rgba(253, 252, 240, 0.9), 0 0 80px rgba(253, 252, 240, 0.6)' 
                            : '0 0 30px rgba(253, 252, 240, 0.7)',
                    }}
                >
                    {/* Glow on cursor enter */}
                    <div 
                        className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
                            isHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{
                            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                        }}
                    />
                    
                    <div className="flex items-center justify-center gap-4 relative z-10">
                        <div className="w-6 h-6">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#2D2926]">
                                <path d="M3 3H9V9H3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M15 3H21V9H15V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M3 15H9V21H3V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M15 15H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M21 15V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M15 21V18H18V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className="font-sans font-bold text-base md:text-lg uppercase tracking-[0.1em] text-[#2D2926] transition-all duration-300 group-hover:tracking-[0.15em]" style={{fontFamily: 'Inter, sans-serif'}}>
                            EXPLORE EXHIBIT DIRECTORY
                        </span>
                    </div>
                    
                    {/* Radial fill on hover */}
                    <span 
                        className="absolute inset-0 rounded-full bg-[#2D2926] opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                        style={{
                            maskImage: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 70%)',
                            WebkitMaskImage: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 70%)',
                            maskSize: '200% 200%',
                            WebkitMaskSize: '200% 200%',
                        }}
                    />
                </button>
            </div>
        </section>
    );
};

export default ArchitecturalLegacy;
