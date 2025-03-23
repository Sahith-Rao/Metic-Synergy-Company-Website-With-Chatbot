import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import apiService from '../services/apiService';

// Define the visible message interface (for UI)
interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

// Define the API message interface (for Groq API)
interface ApiMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Define the user data interface for storing information gathered about the user
interface UserData {
  businessNiche?: string;
  businessGoals?: string;
  websiteUrl?: string;
  socialLinks?: string[];
  marketingBudget?: number;
}

// Define the context state interface
interface ChatBotContextState {
  isOpen: boolean;
  messages: ChatMessage[];
  userData: UserData;
  isTyping: boolean;
  chatStep: 'greeting' | 'analyzing' | 'suggestion' | 'budget' | 'lead';
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  sendMessage: (text: string) => void;
  updateUserData: (data: Partial<UserData>) => void;
  resetChat: () => void;
  setChatStep: (step: 'greeting' | 'analyzing' | 'suggestion' | 'budget' | 'lead') => void;
}

// Create the context with default values
export const ChatBotContext = createContext<ChatBotContextState>({
  isOpen: false,
  messages: [],
  userData: {},
  isTyping: false,
  chatStep: 'greeting',
  openChat: () => {},
  closeChat: () => {},
  toggleChat: () => {},
  sendMessage: () => {},
  updateUserData: () => {},
  resetChat: () => {},
  setChatStep: () => {},
});

// Create a provider component
export const ChatBotProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [apiMessages, setApiMessages] = useState<ApiMessage[]>([]);
  const [userData, setUserData] = useState<UserData>({});
  const [isTyping, setIsTyping] = useState(false);
  const [chatStep, setChatStep] = useState<'greeting' | 'analyzing' | 'suggestion' | 'budget' | 'lead'>('greeting');
  
  // Initialize API messages with system prompt when component mounts
  useEffect(() => {
    setApiMessages([
      {
        role: 'system',
        content: apiService.getMetaGrowSystemPrompt()
      }
    ]);
  }, []);

  // Function to open the chat
  const openChat = () => {
    setIsOpen(true);
    // If no messages, send initial welcome
    if (messages.length === 0) {
      sendInitialWelcome();
    }
  };

  // Function to close the chat
  const closeChat = () => setIsOpen(false);

  // Function to toggle the chat
  const toggleChat = () => {
    if (!isOpen && messages.length === 0) {
      setIsOpen(true);
      sendInitialWelcome();
    } else {
      setIsOpen(!isOpen);
    }
  };
  
  // Send initial welcome message
  const sendInitialWelcome = async () => {
    setIsTyping(true);
    
    try {
      // Add a welcome message to API conversation
      const welcomePrompt: ApiMessage = {
        role: 'user',
        content: 'Hello'
      };
      
      // Update API messages
      const updatedApiMessages = [...apiMessages, welcomePrompt];
      setApiMessages(updatedApiMessages);
      
      // Get response from Groq
      const response = await apiService.getChatResponse(updatedApiMessages);
      
      // Add bot response to messages
      const botMessage: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        sender: 'bot',
        text: response,
        timestamp: new Date(),
      };
      
      // Update messages
      setMessages([botMessage]);
      
      // Add assistant response to API messages
      setApiMessages([...updatedApiMessages, {
        role: 'assistant',
        content: response
      }]);
      
    } catch (error) {
      console.error('Error sending initial welcome:', error);
      
      // Fallback welcome message
      const fallbackMessage: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        sender: 'bot',
        text: "Hey there! I'm MetaGrow AI, your mini marketing consultant. How can I help grow your business today?",
        timestamp: new Date(),
      };
      
      setMessages([fallbackMessage]);
    }
    
    setIsTyping(false);
  };

  // Function to send a message
  const sendMessage = async (text: string) => {
    // Create a user message for UI
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      sender: 'user',
      text,
      timestamp: new Date(),
    };

    // Add the message to the visible chat
    setMessages((prev) => [...prev, userMessage]);
    
    // Create a user message for API
    const apiUserMessage: ApiMessage = {
      role: 'user',
      content: text
    };
    
    // Update API messages
    const updatedApiMessages = [...apiMessages, apiUserMessage];
    setApiMessages(updatedApiMessages);

    // Set typing indicator
    setIsTyping(true);

    // Analyze the message to extract user data
    analyzeMessage(text);

    try {
      // Get response from Groq
      const response = await apiService.getChatResponse(updatedApiMessages);
      
      // Add bot response to messages
      const botMessage: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        sender: 'bot',
        text: response,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      
      // Add assistant response to API messages
      setApiMessages([...updatedApiMessages, {
        role: 'assistant',
        content: response
      }]);
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback message
      const fallbackMessage: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        sender: 'bot',
        text: "I'm having trouble connecting right now. Please try again in a moment!",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, fallbackMessage]);
    }
    
    setIsTyping(false);
    
    // Update chat step based on message content (in case LLM doesn't explicitly manage it)
    updateChatStepFromContent(text);
  };

  // Helper function to update chat step based on message content
  const updateChatStepFromContent = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Check if we're in a specific step already
    if (chatStep === 'greeting') {
      // If they mentioned their business, move to analyzing
      if (userData.businessNiche || userData.websiteUrl || 
          (userData.socialLinks && userData.socialLinks.length > 0)) {
        setChatStep('analyzing');
      }
    } 
    else if (chatStep === 'analyzing' && 
        (lowerText.includes('content') || lowerText.includes('ideas') || lowerText.includes('suggestion'))) {
      setChatStep('suggestion');
    }
    else if (chatStep === 'suggestion' && 
        (lowerText.includes('budget') || lowerText.includes('cost') || lowerText.includes('spend'))) {
      setChatStep('budget');
    }
    else if (chatStep === 'budget' && 
        (lowerText.includes('consult') || lowerText.includes('book') || lowerText.includes('appointment'))) {
      setChatStep('lead');
    }
  };

  // Function to analyze user messages and extract data (still useful for app state management)
  const analyzeMessage = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Detect business niche
    const niches = ['fitness', 'health', 'tech', 'food', 'fashion', 'beauty', 'education', 'finance'];
    niches.forEach(niche => {
      if (lowerText.includes(niche)) {
        updateUserData({ businessNiche: niche });
      }
    });

    // Detect URLs
    const urlMatch = text.match(/https?:\/\/[^\s]+/g);
    if (urlMatch) {
      // Determine if it's a social media link
      if (urlMatch[0].includes('instagram') || urlMatch[0].includes('facebook') || urlMatch[0].includes('youtube')) {
        updateUserData({ socialLinks: [...(userData.socialLinks || []), urlMatch[0]] });
      } else {
        updateUserData({ websiteUrl: urlMatch[0] });
      }
    }

    // Detect budget mentions
    const budgetMatch = text.match(/(\d+)(?:\s*k|\s*thousand|\s*lakhs?|\s*rupees?|\s*₹)/i);
    if (budgetMatch) {
      const budget = parseInt(budgetMatch[1], 10);
      updateUserData({ marketingBudget: budget });
      setChatStep('budget');
    }
  };


  // Function to update user data
  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  // Function to reset the chat
  const resetChat = () => {
    setMessages([]);
    // Keep the system prompt but remove conversation history
    setApiMessages([{
      role: 'system',
      content: apiService.getMetaGrowSystemPrompt()
    }]);
    setUserData({});
    setChatStep('greeting');
  };

  return (
    <ChatBotContext.Provider
      value={{
        isOpen,
        messages,
        userData,
        isTyping,
        chatStep,
        openChat,
        closeChat,
        toggleChat,
        sendMessage,
        updateUserData,
        resetChat,
        setChatStep,
      }}
    >
      {children}
    </ChatBotContext.Provider>
  );
};

// Create a custom hook to use the ChatBotContext
export const useChatBot = () => useContext(ChatBotContext);