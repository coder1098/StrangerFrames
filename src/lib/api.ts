import { Problem } from './types';

export const fetchProblem = async (id: number): Promise<Problem> => {
  // In production, this would be an actual API call
    const response = await fetch(`http://localhost:3001/problem/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch problem');
    }
    return response.json();
};

export const submitSolution = async (problemId: number, code: string, language: string) => {
  // In production, this would be an actual API call
    const response = await fetch('/api/submit', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ problemId, code, language }),
    });
    if (!response.ok) {
        throw new Error('Failed to submit solution');
    }
    return response.json();
};