import Header from "../../components/Header.jsx";
import Hero from "./components/Hero.jsx";
import { useState, useEffect } from 'react';

const HomePage = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        // Set body and html background to Matte Black
        document.body.style.backgroundColor = '#121212';
        document.documentElement.style.backgroundColor = '#121212';
        
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            // Transition from Champagne to Deep Matte Black by 50% scroll
            const progress = Math.min(scrollTop / (documentHeight * 0.5), 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            // Reset body background on unmount
            document.body.style.backgroundColor = '';
            document.documentElement.style.backgroundColor = '';
        };
    }, []);

    // Interpolate background color from Champagne to Deep Matte Black
    const getBackgroundStyle = () => {
        if (scrollProgress === 0) {
            return {
                backgroundColor: '#E5D9C4', // Champagne
                backgroundAttachment: 'fixed',
            };
        }
        
        const r1 = 229; // #E5D9C4
        const g1 = 217;
        const b1 = 196;
        
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

    return (
        <div 
            className='min-h-screen flex flex-col relative transition-colors duration-300 w-full'
            style={{
                ...getBackgroundStyle(),
            }}
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

            <div className='w-full flex flex-col relative z-10 min-h-screen'>
                {/* Transparent Header/Navbar - Absolute at Top */}
                <div className="absolute top-0 left-0 right-0 z-50" style={{ width: '100vw' }}>
                    <Header isTransparent={true} />
                </div>
                
                <main className="flex-1 w-full">
                    <Hero scrollProgress={scrollProgress}/>
                </main>
            </div>
        </div>
    )
}

export default HomePage;
