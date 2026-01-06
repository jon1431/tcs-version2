import React from 'react';
import { Link } from 'react-router-dom';
import BWM_Logo from "../assets/rumah_penghulu_ic.png"

const Header = ({ isTransparent = false }) => {
    return (
        <header 
            className={`flex justify-between items-center py-4 sm:py-6 md:py-8 px-4 sm:px-6 w-full ${isTransparent ? 'bg-transparent' : ''}`}
            style={isTransparent ? { background: 'transparent' } : {}}
        >
            <div className="flex items-center gap-2 sm:gap-3">
                <Link 
                    to="/" 
                    className={`flex items-center justify-center cursor-pointer rounded-full transition-all ${
                        isTransparent ? 'bg-zinc-900/40 hover:bg-zinc-900/50 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2' : 'p-1 sm:p-1.5 md:p-2'
                    }`}
                    style={isTransparent ? {
                        background: 'rgba(24, 24, 27, 0.4)', // bg-zinc-900/40
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                    } : {}}
                >
                    <img 
                        src={BWM_Logo} 
                        alt="Badan Warisan Negara Logo" 
                        className='h-8 sm:h-10 md:h-12 w-auto'
                    />
                </Link>
            </div>

            <nav className="flex gap-3 sm:gap-4 md:gap-6">
                <a 
                    href="https://badanwarisanmalaysia.org/about-us-2/our-work/"
                    className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-colors ${
                        isTransparent 
                            ? 'text-white/90' 
                            : 'text-gray-800 opacity-[0.59]'
                    } hover:text-blue-400`}
                >
                    About
                </a>
                <a 
                    href="https://badanwarisanmalaysia.org/contact-us-2/"
                    className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-colors ${
                        isTransparent 
                            ? 'text-white/90' 
                            : 'text-gray-800 opacity-[0.59]'
                    } hover:text-blue-400`}
                >
                    Contact
                </a>
            </nav>
        </header>
    );
};

export default Header;
