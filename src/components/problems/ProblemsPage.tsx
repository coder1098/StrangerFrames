"use client";

import { useEffect, useState } from "react";
import { Problem } from "@/lib/types";
import { fetchProblem, submitSolution } from "@/lib/api";
import { ProblemDescription } from "./ProblemDescription";
import { CodeEditor } from "./CodeEditor";

export default function ProblemsPage() {
const [problem, setProblem] = useState<Problem | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const loadProblem = async () => {
        try {
            const data = await fetchProblem(1);
            setProblem(data);
        } catch (error) {
            console.error('Error loading problem:', error);
        } finally {
            setLoading(false);
        }
    };
    loadProblem();
}, []);

const handleSubmit = async (code: string, language: string) => {
    if (!problem) return;
        await submitSolution(problem.id, code, language);
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (!problem) {
        return <div className="flex items-center justify-center h-screen">Problem not found</div>;
    }

    return (
        <div className="flex h-screen bg-gray-50 text-black">
            <div className="w-2/5 p-4 overflow-y-auto border-r">
                <ProblemDescription problem={problem} />
            </div>
            <div className="flex-1 p-4">
                <CodeEditor onSubmit={handleSubmit} />
            </div>
        </div>
    );
}