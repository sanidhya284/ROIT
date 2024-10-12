import React, { useEffect, useState, useRef } from 'react';
import  GlobalState  from '../context/GlobalState';
import { fetchMessagesData } from '../Services/blockchainService';

const Messages = () => {
  const { state } = React.useContext(GlobalState);
  const currentUser = state.user;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const fetchedMessages = await fetchMessagesData(currentUser.address);
      setMessages(fetchedMessages);
    };
    fetchMessages();
  }, [currentUser]);

  return (
    <div>
      <h2>Your Messages</h2>
      {messages.map((message, index) => (
        <div key={index}>
          <p>{message.sender}</p>
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Messages;