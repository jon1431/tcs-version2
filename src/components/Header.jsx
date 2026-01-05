import React from 'react';
import { Link } from 'react-router-dom';
import BWM_Logo from "../assets/rumah_penghulu_ic.png"

const Header = ({ isTransparent = false }) => {
    return (
        <header 
            className={`flex justify-between items-center py-8 px-6 w-full ${isTransparent ? 'bg-transparent' : ''}`}
            style={isTransparent ? { background: 'transparent' } : {}}
        >
            <div className="flex items-center gap-3">
                <Link 
                    to="/" 
                    className={`flex items-center justify-center cursor-pointer rounded-full transition-all ${
                        isTransparent ? 'bg-zinc-900/40 hover:bg-zinc-900/50 px-4 py-2' : 'p-2'
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
                        className='h-12 w-auto'
                    />
                </Link>
            </div>

            <nav className="flex gap-6">
                <a 
                    href="#" 
                    className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                        isTransparent 
                            ? 'text-white/90 hover:text-white' 
                            : 'text-gray-800 hover:text-black opacity-[0.59]'
                    }`}
                >
                    About
                </a>
                <a 
                    href="#" 
                    className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                        isTransparent 
                            ? 'text-white/90 hover:text-white' 
                            : 'text-gray-800 hover:text-black opacity-[0.59]'
                    }`}
                >
                    Contact
                </a>
            </nav>
        </header>
    );
};

export default Header;
