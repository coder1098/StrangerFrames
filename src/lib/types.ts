export interface Problem {
    question_id: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
    examples: {
        input: string;
        output: string;
        explanation?: string;
    }[];
    constraints: string[];
    hints: string[];
}

export interface SubmissionResult {
    status: 'success' | 'error';
    runtime?: string;
    memory?: string;
    testCases?: string;
    message?: string;
    details?: string;
}

export interface User {
    id: string;
    email: string;
    username: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface SignupData {
    username: string;
    email: string;
    password: string;
}