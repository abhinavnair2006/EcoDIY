import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import axios from 'axios';

function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm your EcoDIY AI Assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput('');
    setIsLoading(true);

    try {
      // Assuming backend runs on port 5000 in dev
      const response = await axios.post('http://localhost:5000/api/chat', { message: userMessage });
      setMessages(prev => [...prev, { text: response.data.reply, isBot: true }]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg = error.response?.data?.reply || "Sorry, I'm having trouble connecting right now.";
      setMessages(prev => [...prev, { text: errorMsg, isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-widget">
      {isOpen && (
        <div className="chat-window animate-slide-up">
          <div className="chat-header">
            <Bot size={24} />
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'white' }}>Eco Assistant</h3>
              <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Online</span>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="message bot">
                <span className="typing-indicator">...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="chat-input">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..." 
            />
            <button type="submit" disabled={isLoading}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {!isOpen && (
        <button className="chat-toggle animate-fade-in" onClick={() => setIsOpen(true)}>
          <MessageSquare size={28} />
        </button>
      )}
    </div>
  );
}

export default AIChat;
