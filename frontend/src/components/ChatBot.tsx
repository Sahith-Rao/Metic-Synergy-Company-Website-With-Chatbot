import React, { useState, useRef, useEffect } from 'react';
import { useChatBot } from '../contexts/ChatBotContext';
import { X, Send, Bot, Sparkles, AlertCircle, Loader2 } from 'lucide-react';

const ChatBot: React.FC = () => {
  const {
    isOpen,
    messages,
    isTyping,
    sendMessage,
    toggleChat,
    closeChat,
    chatStep
  } = useChatBot();
  
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  
  
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      try {
        sendMessage(inputValue);
        setInputValue('');
        setError(null);
      } catch (err) {
        setError('Failed to send message. Please try again.');
        console.error('Error sending message:', err);
      }
    }
  };
  
  
  const renderMessageText = (text: string) => {
    return text.split('\n').map((paragraph, index) => (
      <p key={index} className={index > 0 ? 'mt-2' : ''}>{paragraph}</p>
    ));
  };

  
  const renderBookingButton = () => {
    if (chatStep === 'lead') {
      return (
        <a
          href="/initial-form"
          className="block w-full py-2 px-4 my-2 bg-blue-600 text-white font-medium rounded-lg text-center hover:bg-blue-700 transition-colors"
        >
          Book a Consultation
        </a>
      );
    }
    return null;
  };

  return (
    <>
      
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg z-50 transition-all duration-300 flex items-center justify-center"
          aria-label="Open chat"
        >
          <div className="flex items-center">
            <Bot className="w-6 h-6" />
            <span className="ml-2 font-medium">MetaGrow AI</span>
          </div>
        </button>
      )}

      
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] max-h-[80vh] bg-slate-900 border border-slate-700 rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden">
          
          <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center">
              <Bot className="text-blue-400 mr-2 w-5 h-5" />
              <h3 className="font-bold text-white">MetaGrow AI</h3>
            </div>
            <div className="flex items-center">
              <div className="flex items-center mr-2 bg-slate-700 rounded-full px-2 py-1 text-xs">
                <Sparkles className="text-yellow-400 w-3 h-3 mr-1" />
                <span className="text-slate-200">Powered by Groq</span>
              </div>
              <button
                onClick={closeChat}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          
          <div className="flex-1 overflow-y-auto p-4 bg-slate-900">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    {renderMessageText(message.text)}
                  </div>
                </div>
              ))}

              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] p-3 rounded-lg bg-slate-800 text-slate-200 flex items-center">
                    <Loader2 className="w-4 h-4 text-blue-400 mr-2 animate-spin" />
                    <span className="text-slate-400">Thinking...</span>
                  </div>
                </div>
              )}
              
              
              {error && (
                <div className="flex justify-center">
                  <div className="p-2 rounded-lg bg-red-900/30 text-red-200 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {error}
                  </div>
                </div>
              )}

              
              {renderBookingButton()}

              <div ref={messagesEndRef} />
            </div>
          </div>

          
          <form onSubmit={handleSubmit} className="p-3 bg-slate-800 border-t border-slate-700">
            <div className="flex items-center">
              <input
                type="text"
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-3 py-2 bg-slate-700 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!inputValue.trim()}
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;