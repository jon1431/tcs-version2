import React, {useState, useEffect, useRef} from 'react';
import { Building2, Key, ArrowRight } from 'lucide-react';
import SectionHeader from './components/SectionHeader';
import ChatboxButton from "../../components/ChatboxButton.jsx";
import Background from '../../assets/rumah_ibu_background.png'
import ChatBox from "../../components/Chatbox.jsx";
import Header from "../../components/Header.jsx";
import { useNavigate } from 'react-router-dom';
import HumilityImg from './assets/threshold_of_humility.png'
import CivicSpace from './assets/multi_functional_civic_space.png'

const BalaiPage = () => {
    const navigate = useNavigate();
    const [isChatClose, setIsChatClose] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [buttonTransform, setButtonTransform] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const buttonRef = useRef(null);
    const heroImageRef = useRef(null);

    // Scroll-triggered background transition
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(scrollTop / (documentHeight * 0.5), 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
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

    // Interpolate background color from Light Stone to Deep Matte Black
    const getBackgroundStyle = () => {
        if (scrollProgress === 0) {
            return {
                backgroundColor: '#E8E8E8', // Light Stone
                backgroundAttachment: 'fixed',
            };
        }
        
        const r1 = 232; // #E8E8E8 (Light Stone)
        const g1 = 232;
        const b1 = 232;
        
        const r2 = 18; // #121212 (Deep Matte Black)
        const g2 = 18;
        const b2 = 18;
        
        const r = Math.round(r1 + (r2 - r1) * scrollProgress);
        const g = Math.round(g1 + (g2 - g1) * scrollProgress);
        const b = Math.round(b1 + (b2 - b1) * scrollProgress);
        
        return {
            backgroundColor: `rgb(${r}, ${g}, ${b})`,
            backgroundAttachment: 'fixed',
        };
    };

    // Dynamic text color based on scroll
    const getTextColor = () => {
        if (scrollProgress < 0.3) {
            return 'text-gray-900';
        }
        return 'text-white';
    };

    const chatButtonClickHandler = (e) => {
        e.preventDefault()
        setIsChatClose(!isChatClose);
    }

    const handleExploreDirectory = () => {
        navigate('/category');
    };

    return (
        <div 
            className="min-h-screen flex flex-col relative transition-colors duration-300 w-full"
            style={getBackgroundStyle()}
        >
            {/* Film Grain Overlay - Very Subtle */}
            <div 
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    opacity: 0.02,
                    mixBlendMode: 'overlay',
                }}
            />

            {/* Hero Section - Cinematic Full-Bleed Centered Hero */}
            <section 
                className="relative flex items-center justify-center overflow-hidden"
                style={{ 
                    width: '100vw',
                    height: '100vh',
                    margin: 0,
                    padding: 0,
                }}
            >
                {/* Full-Bleed Background Image - Edge to Edge */}
                <div 
                    className="absolute inset-0 z-0"
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
                        ref={heroImageRef}
                        src={Background}
                        alt="Balai Background"
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

                {/* Transparent Header/Navbar - Absolute at Top */}
                <div className="absolute top-0 left-0 right-0 z-50" style={{ width: '100vw' }}>
                    <Header isTransparent={true} />
                </div>

                {/* Centered Page Title - Perfect Horizontal and Vertical Center */}
                <div 
                    className="relative z-30 text-center max-w-5xl px-4 sm:px-6"
                    style={{
                        zIndex: 30,
                    }}
                >
                    <h1 
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold leading-[0.95] text-white drop-shadow-lg"
                        style={{ 
                            fontFamily: 'Playfair Display, Cormorant Garamond, serif',
                            fontWeight: 700,
                            letterSpacing: '0.02em',
                            textShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        Balai
                    </h1>
                </div>

                {/* Organized Floating Info Box - Bottom-Right Corner */}
                <div 
                    className="absolute z-30 max-w-xs sm:max-w-sm md:max-w-md hidden sm:block"
                    style={{
                        bottom: '10%',
                        right: '5%',
                        zIndex: 30,
                    }}
                >
                    <div 
                        className="rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-md border"
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            borderWidth: '1px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                        }}
                    >
                        <p className="text-sm sm:text-base leading-relaxed text-white/90" style={{fontFamily: 'Inter, sans-serif'}}>
                            The Balai is the most public face of the complex. It projects outward, inviting the community while maintaining a boundary.
                        </p>
                    </div>
                </div>

                {/* Central Action Anchor - Bottom-Center (Vertical Symmetry with Title) */}
                <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 left-1/2 transform -translate-x-1/2 z-30 w-full px-4 sm:px-0">
                    <button
                        ref={buttonRef}
                        onClick={handleExploreDirectory}
                        className={`relative w-full sm:w-auto px-6 sm:px-12 md:px-16 lg:px-20 py-4 sm:py-5 md:py-6 rounded-full cursor-pointer overflow-hidden group transition-all duration-300 ${
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

            {/* Content Container - Max Width 1200px */}
            <div className="w-full max-w-[1200px] mx-auto flex-1 flex flex-col relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 pt-8 sm:pt-12 md:pt-16">
                <main className="w-full flex-1 relative">
                    {/* Architectural Profile Section - gap-16 spacing */}
                    <header className="mb-8 sm:mb-12 md:mb-16 w-full">
                        <SectionHeader icon={<Building2 size={24} />} title="Architectural Profile" textColor={getTextColor()} />

                        <div className="relative pl-4 sm:pl-6 mt-6 sm:mt-8 border-l-2 border-orange-300/50 max-w-4xl">
                            <p className={`text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed italic ${getTextColor()}`} style={{fontFamily: 'Playfair Display, Cormorant Garamond, serif'}}>
                                " The Balai is the most public face of the complex. It projects outward, inviting the community while maintaining a boundary. "
                            </p>
                        </div>
                    </header>

                    {/* Key Structural Elements - 2-Column Grid with Museum Frames */}
                    <SectionHeader icon={<Key size={24} />} title="Key Structural Elements" textColor={getTextColor()} />
                    <section className="mt-8 sm:mt-12 md:mt-16 mb-8 sm:mb-12 md:mb-16 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
                            {/* The Threshold of Humility - Left Column */}
                            <div className="flex flex-col">
                                {/* Museum Frame - Light Gray/Charcoal Border */}
                                <div 
                                    className="bg-white border-2 border-gray-300 rounded-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 shadow-lg"
                                    style={{
                                        padding: '16px',
                                    }}
                                >
                                    <div className="relative overflow-hidden rounded-sm mx-auto" style={{ maxWidth: '500px' }}>
                                        <img 
                                            src={HumilityImg} 
                                            className='w-full h-auto object-cover' 
                                            alt="The Threshold of Humility"
                                            style={{
                                                display: 'block',
                                                maxWidth: '500px',
                                            }}
                                        />
                                    </div>
                                </div>
                                
                                {/* Integrated Caption Below Image */}
                                <div>
                                    <h3 className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-3 ${getTextColor()}`} style={{fontFamily: 'Inter, sans-serif', fontWeight: 600}}>
                                        The Threshold of Humility
                                    </h3>
                                    <p className={`text-sm sm:text-base leading-relaxed ${getTextColor()}`} style={{fontFamily: 'Inter, sans-serif'}}>
                                        The low archway forces visitors into a humble posture by making them bow to enter, establishing respect for authority.
                                    </p>
                                </div>
                            </div>

                            {/* Multi-Functional Civic Space - Right Column */}
                            <div className="flex flex-col">
                                {/* Museum Frame - Light Gray/Charcoal Border */}
                                <div 
                                    className="bg-white border-2 border-gray-300 rounded-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 shadow-lg"
                                    style={{
                                        padding: '16px',
                                    }}
                                >
                                    <div className="relative overflow-hidden rounded-sm mx-auto" style={{ maxWidth: '500px' }}>
                                        <img 
                                            src={CivicSpace} 
                                            className='w-full h-auto object-cover' 
                                            alt="Multi-Functional Civic Space"
                                            style={{
                                                display: 'block',
                                                maxWidth: '500px',
                                            }}
                                        />
                                    </div>
                                </div>
                                
                                {/* Integrated Caption Below Image */}
                                <div>
                                    <h3 className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-3 ${getTextColor()}`} style={{fontFamily: 'Inter, sans-serif', fontWeight: 600}}>
                                        Multi-Functional Civic Space
                                    </h3>
                                    <p className={`text-sm sm:text-base leading-relaxed ${getTextColor()}`} style={{fontFamily: 'Inter, sans-serif'}}>
                                        The design of the open, airy building facilitated transparent village governance and comfortable gatherings.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            {/* Floating Chatbox - Bottom Right */}
            <section className='fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50'>
                <div onClick={chatButtonClickHandler}>
                    {isChatClose && <ChatboxButton />}
                </div>
                {!isChatClose && (
                    <ChatBox chatOnClickHandler={chatButtonClickHandler}/>
                )}
            </section>
        </div>
    );
};

export default BalaiPage;
