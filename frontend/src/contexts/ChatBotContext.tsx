import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { askRag } from '../services/ragApi';

// Define the visible message interface (for UI)
interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

// Define the API message interface (legacy kept minimal)
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
  name?: string;
  email?: string;
  phone?: string;
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
  needsContact?: boolean;
  submitContact?: (info: { name: string; email: string; phone?: string }) => Promise<void>;
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
export const ChatBotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userData, setUserData] = useState<UserData>({});
  const [isTyping, setIsTyping] = useState(false);
  const [chatStep, setChatStep] = useState<'greeting' | 'analyzing' | 'suggestion' | 'budget' | 'lead'>('greeting');
  const [needsContact, setNeedsContact] = useState(false);
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);

  // Function to open the chat
  const openChat = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      const welcome: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        sender: 'bot',
        text: "Hey there! I'm MetaGrow AI. Ask me anything about our services—keep it short and I’ll be concise.",
        timestamp: new Date(),
      };
      setMessages([welcome]);
    }
  };

  // Function to close the chat
  const closeChat = () => setIsOpen(false);

  // Function to toggle the chat
  const toggleChat = () => {
    if (!isOpen && messages.length === 0) {
      setIsOpen(true);
      const welcome: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        sender: 'bot',
        text: "Hey there! I'm MetaGrow AI. Ask me anything about our services—keep it short and I’ll be concise.",
        timestamp: new Date(),
      };
      setMessages([welcome]);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const isSupportIntent = (text: string) => {
    const lower = text.toLowerCase();
    return (
      lower.includes('pricing') ||
      lower.includes('quote') ||
      lower.includes('custom') ||
      lower.includes('talk to') ||
      lower.includes('contact support') ||
      lower.includes('reach out')
    );
  };

  const isUnknownAnswer = (answer: string) => /i don't have|not in my context|not in the context|don't know/i.test(answer);

  const parseContact = (text: string): { name?: string; email?: string; phone?: string } => {
    const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    const phoneMatch = text.match(/\+?\d[\d\s\-()]{6,}/);
    const email = emailMatch?.[0];
    const phone = phoneMatch?.[0]?.trim();
    let name = text;
    if (email) name = name.replace(email, '');
    if (phone) name = name.replace(phone, '');
    name = name.replace(/[,;:-]+/g, ' ').replace(/\s+/g, ' ').trim();
    if (name && name.length < 2) name = undefined;
    return { name, email, phone };
  };

  const sendMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      sender: 'user',
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // If awaiting contact details, parse and submit instead of querying RAG
    if (needsContact) {
      const { name, email, phone } = parseContact(text);
      if (!email || !name) {
        const askAgain: ChatMessage = {
          id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          sender: 'bot',
          text: !email ? 'Please include your email address.' : 'Please include your name.',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, askAgain]);
        return;
      }
      setIsTyping(true);
      try {
        await askRag(pendingQuery || 'User requested support', { ...userData, name, email, phone }, [...messages, userMessage]);
        const confirm: ChatMessage = {
          id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          sender: 'bot',
          text: 'Thanks! Our team will reach out shortly.',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, confirm]);
        setNeedsContact(false);
        setPendingQuery(null);
        updateUserData({ name, email, phone });
      } catch (e) {
        const errMsg: ChatMessage = {
          id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          sender: 'bot',
          text: 'Sorry—could not send your details right now. Please try again in a minute.',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setIsTyping(false);
      }
      return;
    }

    setIsTyping(true);
    analyzeMessage(text);

    try {
      const rag = await askRag(text, userData, [...messages, userMessage]);
      const botMessage: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        sender: 'bot',
        text: rag.answer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);

      if (isUnknownAnswer(rag.answer) || isSupportIntent(text)) {
        setPendingQuery(text);
        setNeedsContact(true);
        const askContact: ChatMessage = {
          id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          sender: 'bot',
          text: 'I can connect you with our team. Please reply with your name, email, and phone (optional).',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, askContact]);
      }
    } catch (error) {
      const fail: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        sender: 'bot',
        text: "I'm at capacity right now. Please try again in a minute or share your contact details and I’ll alert our team.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fail]);
    }

    setIsTyping(false);
    updateChatStepFromContent(text);
  };

  // Submit contact info to backend to trigger email
  const submitContact = async (info: { name: string; email: string; phone?: string }) => {
    if (!pendingQuery) return;
    setIsTyping(true);
    try {
      await askRag(pendingQuery, { ...userData, ...info }, messages);
      const confirm: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        sender: 'bot',
        text: "Thanks! Our team will reach out shortly.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, confirm]);
      setNeedsContact(false);
      setPendingQuery(null);
      updateUserData(info);
    } catch (e) {
      const errMsg: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        sender: 'bot',
        text: 'Sorry—could not send your details right now. Please try again in a minute.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const updateChatStepFromContent = (text: string) => {
    const lowerText = text.toLowerCase();
    if (chatStep === 'greeting') {
      if (userData.businessNiche || userData.websiteUrl || (userData.socialLinks && userData.socialLinks.length > 0)) {
        setChatStep('analyzing');
      }
    } else if (chatStep === 'analyzing' && (lowerText.includes('content') || lowerText.includes('ideas') || lowerText.includes('suggestion'))) {
      setChatStep('suggestion');
    } else if (chatStep === 'suggestion' && (lowerText.includes('budget') || lowerText.includes('cost') || lowerText.includes('spend'))) {
      setChatStep('budget');
    } else if (chatStep === 'budget' && (lowerText.includes('consult') || lowerText.includes('book') || lowerText.includes('appointment'))) {
      setChatStep('lead');
    }
  };

  const analyzeMessage = (text: string) => {
    const lowerText = text.toLowerCase();
    const niches = ['fitness', 'health', 'tech', 'food', 'fashion', 'beauty', 'education', 'finance'];
    niches.forEach(niche => {
      if (lowerText.includes(niche)) {
        updateUserData({ businessNiche: niche });
      }
    });

    const urlMatch = text.match(/https?:\/\/[^\s]+/g);
    if (urlMatch) {
      if (urlMatch[0].includes('instagram') || urlMatch[0].includes('facebook') || urlMatch[0].includes('youtube')) {
        updateUserData({ socialLinks: [...(userData.socialLinks || []), urlMatch[0]] });
      } else {
        updateUserData({ websiteUrl: urlMatch[0] });
      }
    }

    const budgetMatch = text.match(/(\d+)(?:\s*k|\s*thousand|\s*lakhs?|\s*rupees?|\s*₹)/i);
    if (budgetMatch) {
      const budget = parseInt(budgetMatch[1], 10);
      updateUserData({ marketingBudget: budget });
      setChatStep('budget');
    }
  };

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  const resetChat = () => {
    setMessages([]);
    setUserData({});
    setNeedsContact(false);
    setPendingQuery(null);
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
        needsContact,
        submitContact,
      }}
    >
      {children}
    </ChatBotContext.Provider>
  );
};

export const useChatBot = () => useContext(ChatBotContext);