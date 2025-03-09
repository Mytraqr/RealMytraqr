import { Round } from '../types/round';
import { calculateHoleScore } from './stats';

interface OpenAIError extends Error {
  status?: number;
  response?: Response;
}

const API_KEY = '';

export async function analyzeChatMessage(message: string, round: Round | null): Promise<string> {
  if (!message.trim()) {
    throw new Error("Please enter a question");
  }

  if (!round) {
    return 'Please select a round first to analyze.';
  }

  // Handle score-related questions directly without API call
  if (message.toLowerCase().includes('score')) {
    const totalScore = round.holes.reduce((sum, hole) => sum + calculateHoleScore(hole), 0);
    const totalPar = round.holes.reduce((sum, hole) => sum + hole.par, 0);
    
    return `Your total score for this round was ${totalScore} (${totalScore - totalPar > 0 ? '+' : ''}${totalScore - totalPar} to par).\n\nBreakdown by hole:\n\n${round.holes.map(hole => {
      const score = calculateHoleScore(hole);
      return `Hole ${hole.number} (Par ${hole.par}): ${score} ${score - hole.par > 0 ? `(+${score - hole.par})` : score - hole.par < 0 ? `(${score - hole.par})` : '(E)'}`;
    }).join('\n')}`;
  }

  const roundData = {
    date: new Date(round.date).toLocaleDateString(),
    course: round.course,
    holes: round.holes.map(hole => ({
      number: hole.number,
      par: hole.par,
      yardage: hole.yardage,
      shots: hole.shots.map(shot => ({
        type: shot.type,
        result: shot.result,
        distance: shot.distance,
        club: shot.club
      }))
    }))
  };

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a golf coach analyzing round data. Keep responses clear and concise, under 50 words. Focus on key statistics and actionable insights.'
          },
          {
            role: 'user',
            content: `Round data: ${JSON.stringify(roundData)}\n\nQuestion: ${message}`
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to get response from OpenAI");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    const err = error as OpenAIError;
    console.error('OpenAI API Error:', err);
    throw new Error(err.message || "Failed to analyze your question");
  }
}