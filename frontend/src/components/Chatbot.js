import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader, Bot, User } from 'lucide-react';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m your TalentIQ Career Assistant. I can help you with career guidance, skill development, resume tips, and more. How can I assist you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history: newMessages.slice(-10) // Send last 10 messages for context
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to get response');
      }

      const data = await res.json();
      
      // Add assistant response
      setMessages([...newMessages, { role: 'assistant', content: data.response }]);
    } catch (err) {
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all hover:scale-110 z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                <Bot className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold">Career Assistant</h3>
                <p className="text-xs opacity-90">Powered by AI</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' ? 'bg-indigo-600 ml-2' : 'bg-gray-300 mr-2'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-gray-700" />
                    )}
                  </div>
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center bg-white px-4 py-3 rounded-2xl border border-gray-200">
                  <Loader className="w-4 h-4 animate-spin text-indigo-600 mr-2" />
                  <span className="text-sm text-gray-600">Thinking...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about careers..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              AI-powered career guidance by TalentIQ
            </p>
          </div>
        </div>
      )}
    </>
  );
}
