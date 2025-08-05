import React from 'react';

const TypingIndicator = ({ notification }) => {
  if (!notification) return null;
  return <div className="typing-indicator">{notification}</div>;
};

export default TypingIndicator;