export interface Problem {
    id: number;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
    examples: {
        input: string;
        output: string;
        explanation?: string;
    }[];
    constraints: string[];
}

export interface SubmissionResult {
    status: 'success' | 'error';
    runtime?: string;
    memory?: string;
    testCases?: string;
    message?: string;
    details?: string;
}