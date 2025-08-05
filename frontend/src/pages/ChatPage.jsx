import React from 'react';
import { useParams } from 'react-router-dom';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';
import OnlineUsersList from '../components/OnlineUsersList';
import TypingIndicator from '../components/TypingIndicator';

// This component assumes socket logic is handled in App.js
// and passed down or through context.
function ChatPage({ user, messages, onlineUsers, typingNotification, onSendMessage, onTyping }) {
    const { roomName } = useParams(); // Get room name from URL, e.g., /chat/General

    return (
        <div className="chat-container">
            <OnlineUsersList users={onlineUsers} room={roomName} />
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