import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, ChevronDown } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  roundId?: string;
}

interface Round {
  id: string;
  date: string;
  course: string;
  score: number;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedRound, setSelectedRound] = useState<string>('');
  const [rounds, setRounds] = useState<Round[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedRounds = localStorage.getItem('rounds');
    if (savedRounds) {
      setRounds(JSON.parse(savedRounds));
    }
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: '1',
          type: 'bot',
          text: 'Hi! I can help you analyze your golf rounds. Please select a round to discuss.'
        }
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input,
      roundId: selectedRound
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const round = rounds.find(r => r.id === selectedRound);
      let response = '';

      if (input.toLowerCase().includes('score')) {
        response = `For the round at ${round?.course}, you scored ${round?.score}.`;
      } else if (input.toLowerCase().includes('course')) {
        response = `This round was played at ${round?.course}.`;
      } else if (input.toLowerCase().includes('date')) {
        response = `This round was played on ${new Date(round?.date || '').toLocaleDateString()}.`;
      } else {
        response = "I understand you're asking about your round. Could you be more specific about what you'd like to know?";
      }

      const botResponse: Message = {
        id: Date.now().toString(),
        type: 'bot',
        text: response
      };

      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-orange-600 text-white p-3 rounded-full shadow-lg hover:bg-orange-700 transition-colors"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-lg shadow-xl flex flex-col">
          <div className="p-4 border-b flex justify-between items-center bg-orange-600 text-white rounded-t-lg">
            <h3 className="font-semibold">Golf Round Analysis</h3>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 border-b bg-gray-50">
            <select
              value={selectedRound}
              onChange={(e) => setSelectedRound(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            >
              <option value="">Select a round to discuss</option>
              {rounds.map(round => (
                <option key={round.id} value={round.id}>
                  {new Date(round.date).toLocaleDateString()} - {round.course}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                disabled={!selectedRound}
              />
              <button
                onClick={handleSend}
                disabled={!selectedRound || !input.trim()}
                className="p-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}