import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertCircle, Loader } from 'lucide-react';
import { analyzeDietLog } from '../../utils/dietChatbot';
import { DayLog } from '../../types/meal';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  error?: boolean;
  isStreaming?: boolean;
}

export default function DietChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLog, setSelectedLog] = useState<DayLog | null>(null);
  const [logs, setLogs] = useState<DayLog[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadLogs();
    addWelcomeMessage();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadLogs = () => {
    const savedLogs = localStorage.getItem('dietLogs');
    if (savedLogs) {
      try {
        const parsedLogs = JSON.parse(savedLogs);
        if (Array.isArray(parsedLogs) && parsedLogs.length > 0) {
          setLogs(parsedLogs);
        } else {
          addSystemMessage('No logs found. Please add some food logs first.');
        }
      } catch (error) {
        console.error('Error loading logs:', error);
        addSystemMessage('Error loading logs. Please try refreshing.');
      }
    } else {
      addSystemMessage('No logs found. Please add some food logs first.');
    }
  };

  const addWelcomeMessage = () => {
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: 'Hi! Select a day and ask me anything about your nutrition. For example:\n\n1. How balanced was my diet?\n2. Did I meet my protein goals?\n3. What could I improve?\n4. How were my macronutrient ratios?'
    }]);
  };

  const addSystemMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: `system-${Date.now()}`,
      role: 'system',
      content
    }]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    setMessages(prev => [...prev, {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userMessage
    }]);

    try {
      const response = await analyzeDietLog(userMessage, selectedLog);
      
      setMessages(prev => [...prev, {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: error instanceof Error ? error.message : 'An error occurred analyzing your question',
        error: true
      }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="p-4 border-b border-gray-800">
        <select
          value={selectedLog?.id || ''}
          onChange={(e) => {
            const log = logs.find(l => l.id === e.target.value);
            setSelectedLog(log || null);
          }}
          className="w-full rounded-lg border-gray-600 bg-gray-800 text-white focus:border-orange-500 focus:ring-orange-500"
        >
          <option value="">Select a day to analyze</option>
          {logs.map((log) => (
            <option key={log.id} value={log.id}>
              {new Date(log.date).toLocaleDateString()} - {log.totalCalories} kcal
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 whitespace-pre-wrap ${
                message.role === 'user'
                  ? 'bg-orange-600 text-white'
                  : message.error
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-700 text-white'
              }`}
            >
              {message.error && <AlertCircle className="w-4 h-4 mr-2 inline-block" />}
              {message.content}
              {message.isStreaming && (
                <span className="inline-block w-2 h-4 ml-1 bg-white animate-pulse" />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your nutrition..."
            className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            disabled={!selectedLog || isLoading}
          />
          <button
            type="submit"
            disabled={!selectedLog || !input.trim() || isLoading}
            className="bg-orange-600 text-white p-2 rounded-lg disabled:opacity-50 hover:bg-orange-700 transition-colors"
          >
            {isLoading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}