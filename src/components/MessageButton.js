import React, { useState } from 'react';
import './MessageButton.css';

const MessageButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="message-button-container">
      <button className="message-button" onClick={togglePopup}>
        Message
      </button>
      {isOpen && (
        <div className="message-popup">
          <textarea placeholder="Type your message..." />
          <button className="send-button">Send</button>
        </div>
      )}
    </div>
  );
};

export default MessageButton;