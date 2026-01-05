import { useEffect, useRef, useState } from 'react';

const CategoryItem = ({image, title, qr, qrPoint, onClick, index, align = 'left'}) => {
    const cardRef = useRef(null);
    const imageRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [parallaxOffset, setParallaxOffset] = useState(0);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
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

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    // Parallax effect on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (!cardRef.current || !isVisible) return;
            
            const rect = cardRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const cardCenter = rect.top + rect.height / 2;
            const scrollProgress = (windowHeight / 2 - cardCenter) / windowHeight;
            
            setParallaxOffset(scrollProgress * 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isVisible]);

    // 3D Tilt effect on mouse move
    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const x = (e.clientX - centerX) / (rect.width / 2);
            const y = (e.clientY - centerY) / (rect.height / 2);
            
            setTilt({ x: y * 5, y: -x * 5 }); // Invert for natural feel
        };

        const handleMouseLeave = () => {
            setTilt({ x: 0, y: 0 });
            setIsHovered(false);
        };

        const handleMouseEnter = () => {
            setIsHovered(true);
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
        card.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
            card.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    const alignmentClass = align === 'left' ? 'mr-auto ml-0' : 'ml-auto mr-0';
    const maxWidth = align === 'left' ? 'max-w-[85%]' : 'max-w-[85%]';

    return (
        <div 
            ref={cardRef}
            onClick={onClick}
            className={`relative group w-full ${maxWidth} ${alignmentClass} h-64 md:h-80 lg:h-96 overflow-hidden rounded-[24px] shadow-2xl cursor-pointer transition-all duration-500 mb-16 ${
                isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-[30px]'
            }`}
            style={{
                transition: 'opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
                perspective: '1000px',
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
            }}
        >
            {/* Background Image with Parallax and Focus-Zoom */}
            <img 
                ref={imageRef}
                src={image} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700" 
                alt={title}
                style={{
                    transform: `translateY(${parallaxOffset}px) scale(${isHovered ? 1.1 : 1})`,
                    transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    willChange: 'transform',
                }}
            />
            
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>

            {/* Minimalist Numbering - Large Serif */}
            <div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
                style={{
                    fontFamily: 'Playfair Display, Cormorant Garamond, serif',
                }}
            >
                <span 
                    className="text-[180px] md:text-[240px] lg:text-[300px] font-light text-white opacity-[0.08]"
                    style={{
                        fontFamily: 'Playfair Display, Cormorant Garamond, serif',
                    }}
                >
                    {String(index).padStart(2, '0')}
                </span>
            </div>

            {/* Text Content - Main Content Area */}
            <div className={`relative h-full flex flex-col justify-center z-10 ${
                align === 'left' ? 'px-8 md:px-12' : 'px-8 md:px-12 items-end text-right'
            }`}>
                <h2 
                    className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight max-w-md" 
                    style={{ fontFamily: 'Playfair Display, Cormorant Garamond, serif' }}
                >
                    {title}
                </h2>
            </div>

            {/* Ultra-Slim Glassmorphic Footer - Single Line Minimalist Strip */}
            <div 
                className="absolute bottom-0 left-0 right-0 h-10 px-6 backdrop-blur-[20px] border-t border-white/10 z-20 rounded-b-[24px] flex items-center"
                style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px) saturate(150%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                }}
            >
                <div className={`flex items-center justify-between w-full ${align === 'right' ? 'flex-row-reverse' : ''}`}>
                    <span className="text-white/90 text-xs font-semibold tracking-[0.25em] uppercase leading-none" style={{fontFamily: 'Inter, sans-serif'}}>
                        {qrPoint}
                    </span>
                    <div className="p-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold min-w-[32px] h-6 flex items-center justify-center leading-none">
                        {qr}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryItem
