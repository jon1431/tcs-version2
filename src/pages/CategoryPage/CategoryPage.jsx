import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import CategoryItem from "./components/CategoryItem.jsx";
import {data} from "./data/data.js";
import {useNavigate} from "react-router-dom";
import { ChevronLeft } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const CategoryPage = () => {
    const navigate = useNavigate()
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            // Transition from Champagne to Deep Matte Black by 50% scroll
            const progress = Math.min(scrollTop / (documentHeight * 0.5), 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Interpolate background color from Stone Grey to Ebony
    const getBackgroundStyle = () => {
        if (scrollProgress === 0) {
            return {
                backgroundColor: '#F2F2F2', // Stone grey
                backgroundAttachment: 'fixed',
            };
        }
        
        // Interpolate between Stone Grey (#F2F2F2) and Ebony (#111111)
        const r1 = 242; // #F2F2F2
        const g1 = 242;
        const b1 = 242;
        
        const r2 = 17; // #111111
        const g2 = 17;
        const b2 = 17;
        
        const r = Math.round(r1 + (r2 - r1) * scrollProgress);
        const g = Math.round(g1 + (g2 - g1) * scrollProgress);
        const b = Math.round(b1 + (b2 - b1) * scrollProgress);
        
        return {
            backgroundColor: `rgb(${r}, ${g}, ${b})`,
            backgroundAttachment: 'fixed',
        };
    };

    // Interpolate header text color from dark to white/gold
    const getHeaderTextColor = () => {
        if (scrollProgress < 0.3) {
            return { color: 'rgba(0, 0, 0, 0.78)' };
        }
        if (scrollProgress > 0.6) {
            return { color: '#D4AF37' }; // Gold color for dark background
        }
        // Smooth transition
        const opacity = 0.78 - (scrollProgress - 0.3) * 2.6;
        return { color: `rgba(0, 0, 0, ${Math.max(opacity, 0)})` };
    };

    const getButtonColor = () => {
        if (scrollProgress < 0.3) {
            return 'text-black';
        }
        return 'text-white';
    };

    // Magnetic button effect
    const backButtonRef = useRef(null);
    const [buttonTransform, setButtonTransform] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const button = backButtonRef.current;
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

            if (distance < 60) {
                const x = (e.clientX - centerX) * 0.35;
                const y = (e.clientY - centerY) * 0.35;
                setButtonTransform({ 
                    x: Math.max(-20, Math.min(20, x)), 
                    y: Math.max(-20, Math.min(20, y)) 
                });
            }
        };

        const handleMouseLeave = () => {
            setButtonTransform({ x: 0, y: 0 });
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div 
            className='min-h-screen flex flex-col relative transition-colors duration-300'
            style={getBackgroundStyle()}
        >
            {/* Film Grain Overlay */}
            <div 
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    opacity: 0.03,
                    mixBlendMode: 'overlay',
                }}
            />

            {/* Sticky Glassmorphic Header */}
            <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-md h-[95px] flex items-center px-6 md:px-8 relative w-full border-b border-white/20">
                <button 
                    ref={backButtonRef}
                    onClick={() => navigate('/')} 
                    className={`absolute left-6 md:left-8 top-[48px] px-6 py-2 rounded-full border border-current cursor-pointer z-10 overflow-hidden group ${getButtonColor()}`}
                    style={{
                        transform: `translate(${buttonTransform.x}px, ${buttonTransform.y}px)`,
                        transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                        background: 'transparent',
                    }}
                >
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                        Back
                    </span>
                    <span 
                        className="absolute inset-0 rounded-full bg-current opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            maskImage: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 70%)',
                            WebkitMaskImage: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 70%)',
                            maskSize: '200% 200%',
                            WebkitMaskSize: '200% 200%',
                        }}
                    />
                </button>
                <h1 
                    className="absolute left-1/2 top-[59px] transform -translate-x-1/2 text-lg md:text-xl font-medium tracking-[1.12px] uppercase transition-colors duration-300"
                    style={getHeaderTextColor()}
                >
                    EXHIBIT DIRECTORY
                </h1>
            </div>

            {/* Main Content Container */}
            <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 py-16 pb-24 relative z-10">
                <div className="flex flex-col gap-[64px]">
                    <CategoryItem 
                        index={1}
                        image={data['rumahIbu'].image} 
                        qr={data['rumahIbu'].qr} 
                        qrPoint={data['rumahIbu'].qrPoint} 
                        title={data['rumahIbu']['title']}
                        onClick={() => navigate('/rumah-ibu')}
                        align="left"
                    />
                    <CategoryItem 
                        index={2}
                        image={data['balai'].image} 
                        qr={data['balai'].qr} 
                        qrPoint={data['balai'].qrPoint} 
                        title={data['balai']['title']}
                        onClick={() => navigate('/balai')}
                        align="right"
                    />
                    <CategoryItem 
                        index={3}
                        image={data['selang'].image} 
                        qr={data['selang'].qr} 
                        qrPoint={data['selang'].qrPoint} 
                        title={data['selang']['title']}
                        onClick={() => navigate('/selang')}
                        align="left"
                    />
                    <CategoryItem 
                        index={4}
                        image={data['dapur'].image} 
                        qr={data['dapur'].qr} 
                        qrPoint={data['dapur'].qrPoint} 
                        title={data['dapur']['title']}
                        onClick={() => navigate('/dapur')}
                        align="right"
                    />
                    <CategoryItem 
                        index={5}
                        image={data['ikat'].image} 
                        qr={data['ikat'].qr} 
                        qrPoint={data['ikat'].qrPoint} 
                        title={data['ikat']['title']}
                        onClick={() => navigate('/ikat')}
                        align="left"
                    />
                    <CategoryItem 
                        index={6}
                        image={data['climate'].image} 
                        qr={data['climate'].qr} 
                        qrPoint={data['climate'].qrPoint} 
                        title={data['climate']['title']}
                        onClick={() => navigate('/climate')}
                        align="right"
                    />
                    <CategoryItem 
                        index={7}
                        image={data['ornament'].image} 
                        qr={data['ornament'].qr} 
                        qrPoint={data['ornament'].qrPoint} 
                        title={data['ornament']['title']}
                        onClick={() => navigate('/ornament')}
                        align="left"
                    />
                </div>
            </main>

            {/* Footer */}
            <Footer/>
        </div>
    )
}

export default CategoryPage