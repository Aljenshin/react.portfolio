import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useMessages } from '../../contexts/MessageContext';
import { Card, SectionTitle, StatsCard } from '../../components/SharedComponents';
import { Conversation, Message } from '../../types';

const Dashboard: React.FC = () => {
  const { admin, logout } = useAuth();
  const { conversations, messages, markAsRead, getConversationMessages } = useMessages();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [replyText, setReplyText] = useState('');

  const unreadCount = messages.filter(msg => !msg.isRead).length;
  const activeConversations = conversations.filter(conv => conv.isActive).length;

  const handleReply = (conversationId: string) => {
    if (!replyText.trim()) return;
    
    // In a real app, this would send the reply via API
    console.log('Sending reply:', replyText, 'to conversation:', conversationId);
    
    // For demo purposes, we'll just clear the reply text
    setReplyText('');
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white admin-chat-container">
      {/* Header */}
      <div className="bg-slate-800 border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-slate-400 hover:text-white transition-colors duration-300"
            >
              ← Back to Portfolio
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-slate-400">Welcome back, {admin?.username}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Sidebar - Conversations List */}
        <div className="w-1/3 bg-slate-800 border-r border-white/10 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Conversations</h2>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-700 p-3 rounded-lg">
                <div className="text-2xl font-bold text-brand-400">{activeConversations}</div>
                <div className="text-sm text-slate-400">Active</div>
              </div>
              <div className="bg-slate-700 p-3 rounded-lg">
                <div className="text-2xl font-bold text-red-400">{unreadCount}</div>
                <div className="text-sm text-slate-400">Unread</div>
              </div>
            </div>

            {/* Conversations */}
            <div className="space-y-2">
              {conversations.map((conversation) => {
                const lastMessage = conversation.messages[conversation.messages.length - 1];
                const unreadMessages = conversation.messages.filter(msg => !msg.isRead).length;
                
                return (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 hover:bg-slate-700 ${
                      selectedConversation?.id === conversation.id ? 'bg-slate-700 border border-brand-500' : 'bg-slate-600/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate">{conversation.visitorName}</h3>
                        <p className="text-sm text-slate-400 truncate">{conversation.subject}</p>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 break-words">
                          {lastMessage?.message}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xs text-slate-400">
                          {lastMessage ? formatTime(lastMessage.timestamp) : ''}
                        </div>
                        {unreadMessages > 0 && (
                          <div className="mt-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            {unreadMessages}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content - Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="bg-slate-800 border-b border-white/10 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{selectedConversation.visitorName}</h2>
                    <p className="text-slate-400">{selectedConversation.visitorEmail}</p>
                    <p className="text-sm text-slate-500">{selectedConversation.subject}</p>
                  </div>
                  <div className="text-sm text-slate-400">
                    {selectedConversation.messages.length} messages
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {getConversationMessages(selectedConversation.id).map((message) => {
                  const isFromAdmin = message.visitorName === 'Admin';
                  
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isFromAdmin ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-3 rounded-lg chat-message ${
                          isFromAdmin
                            ? 'bg-brand-500 text-white'
                            : 'bg-slate-700 text-white'
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.message}</p>
                        <p className="text-xs opacity-70 mt-2 text-right">
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reply Input */}
              <div className="bg-slate-800 border-t border-white/10 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      rows={3}
                      className="w-full px-4 py-3 bg-slate-700 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none break-words"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleReply(selectedConversation.id);
                        }
                      }}
                    />
                    <p className="text-xs text-slate-400 mt-1">
                      Press Enter to send, Shift+Enter for new line
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleReply(selectedConversation.id)}
                      disabled={!replyText.trim()}
                      className="px-6 py-3 bg-brand-500 hover:bg-brand-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-300 whitespace-nowrap"
                    >
                      Send
                    </button>
                    <button
                      onClick={() => setReplyText('')}
                      className="px-4 py-3 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors duration-300"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <h2 className="text-2xl font-semibold mb-2">Select a Conversation</h2>
                <p className="text-slate-400">Choose a conversation from the sidebar to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
