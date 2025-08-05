import React from 'react';
import { useParams } from 'react-router-dom';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';
import OnlineUsersList from '../components/OnlineUsersList';
import TypingIndicator from '../components/TypingIndicator';
import ChatHeader from '../components/ChatHeader'

function ChatPage({ user, messages, onlineUsers, typingNotification, onSendMessage, onTyping }) {
    const { roomName } = useParams(); 
    return (
        <div className="chat-container">
            <ChatHeader/>
            <div className="chat-main">
                <ChatWindow messages={messages} username={user.username} />
                <div className="chat-footer">
                    <MessageInput onSendMessage={onSendMessage} onTyping={onTyping} />
                    <TypingIndicator notification={typingNotification} />
                </div>
            </div>
        </div>
    );
}

export default ChatPage;