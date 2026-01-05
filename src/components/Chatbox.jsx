import React, { useState } from 'react';
import { Send } from 'lucide-react';
import ChatboxItem from "./ChatboxItem.jsx";
import axios from "axios";
import { nanoid } from 'nanoid';
import shrink from '../assets/shrink_arrow.png'
const sessionId = nanoid();

const ChatBox = ({chatOnClickHandler}) => {
    const BASE_URL = "https://tcs-560362072194.europe-west1.run.app/"
    const [inputValue, setInputValue] = useState('');
    const [messageHistory, setMessageHistory] = useState([{sender: 'bot', text:
            'Hi! How can I assist you today?'}]);
    sessionStorage.setItem("username", sessionId)
    const fetchChatResponse = async(message) => {
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
        return response.data
    }

    const sendOnClickHandler = async (e) => {
        e.preventDefault();
        // Add user message
        setMessageHistory(prev => [...prev, { sender: 'user', text: inputValue }]);
        // Fetch bot response
        try {
            const response = await fetchChatResponse(inputValue);
            // Add bot message (assume response.message is the text)
            setMessageHistory(prev => [...prev, { sender: 'bot', text: response.message }]);
        } catch {
            setMessageHistory(prev => [...prev, { sender: 'bot', text: 'Error fetching response.' }]);
        }
        setInputValue("");
    }
    return (
        <div className="z-50 bg-white rounded-2xl shadow-2xl p-6
        w-[380px] h-[600px] max-h-[80vh] flex flex-col backdrop-blur-xl border border-gray-200" style={{scrollbarWidth:'none'}}>
            <div className='flex justify-end mb-4'>
                <div className='w-6 cursor-pointer hover:opacity-70 transition-opacity'>
                    <img src={shrink} onClick={chatOnClickHandler} alt="Close chat"/>
                </div>
            </div>
            {/* Chat Messages Area - Slim Vertical */}
            <div className="flex-1 mb-6 flex flex-col text-gray-300 italic overflow-y-auto"
            style={{scrollbarWidth:'none'}}>
                {/* Placeholder for actual chat bubbles */}
                <ChatboxItem messages={messageHistory}/> {/* Pass array of objects */}
            </div>

            {/* Input Section - Compact */}
            <div className="flex items-center gap-2">
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
                >
                    <Send size={20} className="transform rotate-[-10deg]" />
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
