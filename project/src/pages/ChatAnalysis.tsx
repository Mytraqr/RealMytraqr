import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertCircle, Loader } from 'lucide-react';
import { analyzeChatMessage } from '../utils/openai';
import { Round } from '../types/round';
import { calculateHoleScore } from '../utils/stats';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  error?: boolean;
  isStreaming?: boolean;
}

export default function ChatAnalysis() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRound, setSelectedRound] = useState<Round | null>(null);
  const [rounds, setRounds] = useState<Round[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadRounds();
    addWelcomeMessage();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadRounds = () => {
    const savedRounds = localStorage.getItem('rounds');
    if (savedRounds) {
      try {
        const parsedRounds = JSON.parse(savedRounds);
        if (Array.isArray(parsedRounds) && parsedRounds.length > 0) {
          setRounds(parsedRounds);
        } else {
          addSystemMessage('No rounds found. Please add some rounds first.');
        }
      } catch (error) {
        console.error('Error loading rounds:', error);
        addSystemMessage('Error loading rounds. Please try refreshing.');
      }
    } else {
      addSystemMessage('No rounds found. Please add some rounds first.');
    }
  };

  const addWelcomeMessage = () => {
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: 'Hi! Select a round and ask me anything about it. For example:\n\n1. What was my total score?\n2. How many fairways did I hit?\n3. What was my putting average?\n4. How many greens did I hit in regulation?'
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
      const response = await analyzeChatMessage(userMessage, selectedRound);
      
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

  const handleRoundSelect = (roundId: string) => {
    const round = rounds.find(r => r.id === roundId);
    setSelectedRound(round || null);
    
    if (round) {
      const totalScore = round.holes.reduce((sum, hole) => sum + calculateHoleScore(hole), 0);
      const totalPar = round.holes.reduce((sum, hole) => sum + hole.par, 0);
      addSystemMessage(`Selected round at ${round.course} on ${new Date(round.date).toLocaleDateString()}.\nTotal Score: ${totalScore} (${totalScore - totalPar > 0 ? '+' : ''}${totalScore - totalPar})`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="p-4 border-b border-gray-800">
        <select
          value={selectedRound?.id || ''}
          onChange={(e) => handleRoundSelect(e.target.value)}
          className="w-full rounded-lg border-gray-600 bg-gray-800 text-white focus:border-orange-500 focus:ring-orange-500"
        >
          <option value="">Select a round to analyze</option>
          {rounds.map((round) => (
            <option key={round.id} value={round.id}>
              {new Date(round.date).toLocaleDateString()} - {round.course}
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
            placeholder="Ask about your round..."
            className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            disabled={!selectedRound || isLoading}
          />
          <button
            type="submit"
            disabled={!selectedRound || !input.trim() || isLoading}
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