import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import ChatboxItem from "./ChatboxItem.jsx";
import axios from "axios";
import { nanoid } from 'nanoid';
import shrink from '../assets/shrink_arrow.png'
const sessionId = nanoid();

const ChatBox = ({chatOnClickHandler}) => {
    const BASE_URL = "https://tcs-560362072194.europe-west1.run.app/"
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messageHistory, setMessageHistory] = useState([{sender: 'bot', text:
            'Hi! How can I assist you today?'}]);
    const [isDisable, setIsDisable] = useState(false);

    sessionStorage.setItem("username", sessionId)
    
    // Draggable state
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const chatboxRef = useRef(null);
    
    // Initialize position on mount (bottom-right corner)
    useEffect(() => {
        if (chatboxRef.current) {
            const rect = chatboxRef.current.getBoundingClientRect();
            setPosition({
                x: window.innerWidth - rect.width - 16,
                y: window.innerHeight - rect.height - 16
            });
        }
    }, []);
    
    // Handle drag start
    const handleMouseDown = (e) => {
        if (e.target.closest('input, button, img[alt="Close chat"]')) {
            return; // Don't drag if clicking on interactive elements
        }
        setIsDragging(true);
        if (chatboxRef.current) {
            const rect = chatboxRef.current.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };
    
    // Handle drag
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging) return;
            
            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;
            
            // Constrain to viewport
            const maxX = window.innerWidth - (chatboxRef.current?.offsetWidth || 380);
            const maxY = window.innerHeight - (chatboxRef.current?.offsetHeight || 600);
            
            setPosition({
                x: Math.max(0, Math.min(newX, maxX)),
                y: Math.max(0, Math.min(newY, maxY))
            });
        };
        
        const handleMouseUp = () => {
            setIsDragging(false);
        };
        
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset]);
    const fetchChatResponse = async(message) => {
        setIsLoading(true)
        const userId = sessionStorage.getItem('username')
        console.log(`userId: ${userId}`);
        const response = await axios(
            `${BASE_URL}user/chat?message=${message}`,
            {
                method: 'GET',
                headers: {
                    'username': userId
                }
            },
        )
        setIsLoading(false)
        return response.data
    }

    const sendOnClickHandler = async (e) => {
        e.preventDefault();
        // Add user message
        setMessageHistory(prev => [...prev, { sender: 'user', text: inputValue }]);
        setIsDisable(true)
        // Fetch bot response
        try {
            const response = await fetchChatResponse(inputValue);
            // Add bot message (assume response.message is the text)
            setMessageHistory(prev => [...prev, { sender: 'bot', text: response.message }]);
        } catch {
            setMessageHistory(prev => [...prev, { sender: 'bot', text: 'Error fetching response.' }]);
        }
        setInputValue("");
        setIsDisable(false)
    }
    return (
        <div 
            ref={chatboxRef}
            className="z-50 bg-white rounded-2xl shadow-2xl
            w-[380px] h-[600px] max-h-[80vh] flex flex-col backdrop-blur-xl border border-gray-200 fixed"
            style={{
                scrollbarWidth: 'none',
                left: `${position.x}px`,
                top: `${position.y}px`,
                userSelect: 'none'
            }}
        >
            {/* Draggable Header Area */}
            <div 
                className="flex justify-end mb-4 p-6 pb-4 cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
                <div className='w-6 cursor-pointer hover:opacity-70 transition-opacity' style={{ cursor: 'pointer' }}>
                    <img src={shrink} onClick={chatOnClickHandler} alt="Close chat"/>
                </div>
            </div>
            
            {/* Chat Content */}
            <div className="flex-1 px-6 pb-6 overflow-scroll" style={{scrollbarWidth: 'none'}}>
                {/* Chat Messages Area - Slim Vertical */}
                <div className="flex-1 mb-6 flex flex-col text-gray-300 italic"
                style={{scrollbarWidth:'none'}}>
                    {/* Placeholder for actual chat bubbles */}
                    <ChatboxItem messages={messageHistory}/> {/* Pass array of objects */}
                    {isLoading && (
                        <div className="text-sm text-gray-500 italic mb-2">
                            Bot is typing...
                        </div>
                    )}
                </div>
            </div>
            {/* Input Section - Compact */}
            <div className="flex items-center gap-2 m-8">
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask Questions.."
                        className="w-full bg-gray-100 border-none rounded-full py-2.5 px-4 text-sm text-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                    />
                </div>
                <button
                    className="p-2.5 bg-white shadow-md rounded-full text-gray-500 hover:text-orange-500 hover:scale-105 active:scale-95 transition-all"
                    aria-label="Send message"
                    onClick={sendOnClickHandler}
                    disabled={isDisable}
                >
                    <Send size={20} className="transform rotate-[-10deg]" />
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
