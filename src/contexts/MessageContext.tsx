import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Message, Conversation, Reply } from '../types';

interface MessageContextType {
  conversations: Conversation[];
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp' | 'isRead'>) => void;
  addReply: (conversationId: string, message: string, isFromAdmin: boolean) => void;
  markAsRead: (messageId: string) => void;
  getConversationMessages: (conversationId: string) => Message[];
  loading: boolean;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

// Mock data - in a real app, this would come from a database
const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    visitorName: 'John Doe',
    visitorEmail: 'john@example.com',
    subject: 'Web Development Inquiry',
    messages: [
      {
        id: '1',
        visitorName: 'John Doe',
        visitorEmail: 'john@example.com',
        subject: 'Web Development Inquiry',
        message: 'Hi! I\'m interested in your web development services. Can you help me build a portfolio website?',
        timestamp: new Date('2024-01-15T10:30:00'),
        isRead: true,
        conversationId: '1'
      },
      {
        id: '2',
        visitorName: 'John Doe',
        visitorEmail: 'john@example.com',
        subject: 'Web Development Inquiry',
        message: 'I have a budget of around $2000 and need it done within 2 weeks.',
        timestamp: new Date('2024-01-15T10:35:00'),
        isRead: true,
        conversationId: '1'
      }
    ],
    lastMessageAt: new Date('2024-01-15T10:35:00'),
    isActive: true,
    createdAt: new Date('2024-01-15T10:30:00')
  },
  {
    id: '2',
    visitorName: 'Sarah Wilson',
    visitorEmail: 'sarah.wilson@company.com',
    subject: 'Laravel Project',
    messages: [
      {
        id: '3',
        visitorName: 'Sarah Wilson',
        visitorEmail: 'sarah.wilson@company.com',
        subject: 'Laravel Project',
        message: 'Hello! I saw your portfolio and I\'m impressed with your Laravel skills. We have a project that might interest you.',
        timestamp: new Date('2024-01-16T14:20:00'),
        isRead: false,
        conversationId: '2'
      }
    ],
    lastMessageAt: new Date('2024-01-16T14:20:00'),
    isActive: true,
    createdAt: new Date('2024-01-16T14:20:00')
  },
  {
    id: '3',
    visitorName: 'Mike Johnson',
    visitorEmail: 'mike.j@startup.io',
    subject: 'React Developer Needed',
    messages: [
      {
        id: '4',
        visitorName: 'Mike Johnson',
        visitorEmail: 'mike.j@startup.io',
        subject: 'React Developer Needed',
        message: 'Hi Aljen! We\'re a startup looking for a React developer. Are you available for freelance work?',
        timestamp: new Date('2024-01-17T09:15:00'),
        isRead: true,
        conversationId: '3'
      },
      {
        id: '5',
        visitorName: 'Mike Johnson',
        visitorEmail: 'mike.j@startup.io',
        subject: 'React Developer Needed',
        message: 'The project involves building a dashboard with real-time data visualization.',
        timestamp: new Date('2024-01-17T09:18:00'),
        isRead: true,
        conversationId: '3'
      }
    ],
    lastMessageAt: new Date('2024-01-17T09:18:00'),
    isActive: true,
    createdAt: new Date('2024-01-17T09:15:00')
  }
];

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load all messages from conversations
    const allMessages = conversations.flatMap(conv => conv.messages);
    setMessages(allMessages);
  }, [conversations]);

  const addMessage = (newMessage: Omit<Message, 'id' | 'timestamp' | 'isRead'>) => {
    const message: Message = {
      ...newMessage,
      id: Date.now().toString(),
      timestamp: new Date(),
      isRead: false
    };

    setMessages(prev => [...prev, message]);

    // Update or create conversation
    setConversations(prev => {
      const existingConv = prev.find(conv => conv.id === newMessage.conversationId);
      
      if (existingConv) {
        return prev.map(conv => 
          conv.id === newMessage.conversationId
            ? {
                ...conv,
                messages: [...conv.messages, message],
                lastMessageAt: message.timestamp,
                isActive: true
              }
            : conv
        );
      } else {
        // Create new conversation
        const newConversation: Conversation = {
          id: newMessage.conversationId,
          visitorName: newMessage.visitorName,
          visitorEmail: newMessage.visitorEmail,
          subject: newMessage.subject,
          messages: [message],
          lastMessageAt: message.timestamp,
          isActive: true,
          createdAt: message.timestamp
        };
        return [...prev, newConversation];
      }
    });
  };

  const addReply = (conversationId: string, messageText: string, isFromAdmin: boolean) => {
    const conversation = conversations.find(conv => conv.id === conversationId);
    if (!conversation) return;

    const reply: Message = {
      id: Date.now().toString(),
      visitorName: isFromAdmin ? 'Admin' : conversation.visitorName,
      visitorEmail: isFromAdmin ? undefined : conversation.visitorEmail,
      subject: conversation.subject,
      message: messageText,
      timestamp: new Date(),
      isRead: true,
      conversationId
    };

    setMessages(prev => [...prev, reply]);

    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: [...conv.messages, reply],
              lastMessageAt: reply.timestamp
            }
          : conv
      )
    );
  };

  const markAsRead = (messageId: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, isRead: true } : msg
      )
    );

    setConversations(prev =>
      prev.map(conv => ({
        ...conv,
        messages: conv.messages.map(msg =>
          msg.id === messageId ? { ...msg, isRead: true } : msg
        )
      }))
    );
  };

  const getConversationMessages = (conversationId: string): Message[] => {
    return messages.filter(msg => msg.conversationId === conversationId);
  };

  const value: MessageContextType = {
    conversations,
    messages,
    addMessage,
    addReply,
    markAsRead,
    getConversationMessages,
    loading
  };

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};
