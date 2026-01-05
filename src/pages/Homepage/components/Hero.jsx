import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import RumahIbuImage from '../../../assets/rumah_penghulu.png';
import { useNavigate } from 'react-router-dom';

const Hero = ({ scrollProgress }) => {
    const navigate = useNavigate();
    const heroRef = useRef(null);
    const imageRef = useRef(null);
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

        if (heroRef.current) {
            observer.observe(heroRef.current);
        }

        return () => {
            if (heroRef.current) {
                observer.unobserve(heroRef.current);
            }
        };
    }, []);

    // Magnetic button effect
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

            if (distance < 60) {
                const x = (e.clientX - centerX) * 0.4;
                const y = (e.clientY - centerY) * 0.4;
                setButtonTransform({ 
                    x: Math.max(-20, Math.min(20, x)), 
                    y: Math.max(-20, Math.min(20, y)) 
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

    const handleExploreDirectory = () => {
        navigate('/category');
    };

    return (
        <section 
            ref={heroRef}
            className="relative flex items-center justify-center overflow-hidden"
            style={{ 
                width: '100vw',
                minHeight: '100vh',
                margin: 0,
                padding: 0,
            }}
        >
            {/* Full-Bleed Background Image - Fixed to Viewport */}
            <div 
                className="fixed inset-0 z-0"
                style={{
                    width: '100vw',
                    height: '100vh',
                    margin: 0,
                    padding: 0,
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <img
                    ref={imageRef}
                    src={RumahIbuImage}
                    alt="Rumah Penghulu Abu Seman"
                    className="w-full h-full"
                    style={{
                        width: '100vw',
                        height: '100vh',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        margin: 0,
                        padding: 0,
                        display: 'block',
                    }}
                />
                {/* Atmospheric darkening overlay - 50% opacity for cinematic mood */}
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Centered Content Container - Title, Subtitle, and Button Stacked Vertically */}
            <div 
                className="relative z-30 flex flex-col items-center justify-center text-center max-w-5xl px-4 sm:px-6 py-12 sm:py-20"
                style={{
                    zIndex: 30,
                    minHeight: '100vh',
                }}
            >
                {/* Centered Page Title - Slightly Smaller */}
                <h1 
                    className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-[0.95] text-white drop-shadow-lg mb-4 sm:mb-6 transition-opacity duration-800 ${
                        isVisible 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-[30px]'
                    }`}
                    style={{ 
                        fontFamily: 'Playfair Display, Cormorant Garamond, serif',
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                        textShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                        transition: 'opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    }}
                >
                    Discover the<br />
                    <span className="font-normal">Heritage of</span><br />
                    <span className="font-medium">Rumah Penghulu</span><br />
                    <span className="font-light opacity-90">Abu Seman</span>
                </h1>

                {/* Architectural Description - Centered Below Title */}
                <p 
                    className={`text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 transition-opacity duration-800 ${
                        isVisible 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-[30px]'
                    }`}
                    style={{
                        fontFamily: 'Inter, sans-serif',
                        lineHeight: '1.6',
                        transition: 'opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s',
                    }}
                >
                    One of the oldest surviving traditional Malay houses, originally from <span className="font-medium">Kedah</span>. Originally built in Kedah and later restored in Kuala Lumpur, it stands as an important example of Malaysia's cultural heritage.
                </p>

                {/* Central Action Button - Below Description */}
                <button
                    ref={buttonRef}
                    onClick={handleExploreDirectory}
                    className={`relative px-6 sm:px-12 md:px-16 lg:px-20 py-4 sm:py-5 md:py-6 rounded-full cursor-pointer overflow-hidden group transition-all duration-300 ${
                        isHovered ? 'scale-105' : 'scale-100'
                    }`}
                    style={{
                        transform: `translate(${buttonTransform.x}px, ${buttonTransform.y}px) scale(${isHovered ? 1.05 : 1})`,
                        transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        willChange: 'transform',
                        background: '#F9F7F2', // Radiant Cream
                        boxShadow: isHovered 
                            ? '0 0 40px rgba(249, 247, 242, 0.9), 0 0 80px rgba(249, 247, 242, 0.6)' 
                            : '0 0 30px rgba(249, 247, 242, 0.7)',
                        zIndex: 100,
                    }}
                >
                    <div className="flex items-center justify-center gap-2 sm:gap-3 relative z-10">
                        <span className="font-sans font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl uppercase tracking-[0.1em] text-[#2D2926]" style={{fontFamily: 'Inter, sans-serif'}}>
                            EXPLORE EXHIBIT DIRECTORY
                        </span>
                        <ArrowRight size={18} className="text-[#2D2926] sm:w-5 sm:h-5 md:w-6 md:h-6" />
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

export default Hero;
