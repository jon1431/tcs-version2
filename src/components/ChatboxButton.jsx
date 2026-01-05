import ChatboxIcon from '../assets/chatbox-ic.png'

const ChatboxButton = () => {
    return (
        <div className="w-12 h-12 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
            <img src={ChatboxIcon} alt="Chat" className="w-full h-full object-contain"/>
        </div>
    )
}

export default ChatboxButton;