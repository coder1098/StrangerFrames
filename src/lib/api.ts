import { LoginData, SignupData, AuthResponse, Problem } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

export async function login(credentials: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
    }

    return response.json();
}

export async function signup(userData: SignupData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
    }

    return response.json();
}

export async function logout(): Promise<void> {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Logout failed');
    }

    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

export const fetchProblem = async (id: string): Promise<Problem> => {
    const response = await fetch(`https://pending-meals-wool-deputy.trycloudflare.com/api/fetch_question/${id}/`);
    if (!response.ok) {
        throw new Error('Failed to fetch problem');
    }
    return response.json();
};

export const submitSolution = async (problemId: string, code: string, language: string) => {
    console.log(problemId, code)
    const response = await fetch('https://pending-meals-wool-deputy.trycloudflare.com/api/submissions/submit/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "username": "example_user", "question": problemId, "code": code, "language": language, "status": "success", "attempts": 0}),
    });
    if (!response.ok) {
        throw new Error('Failed to submit solution');
    }
    return response.json();
};