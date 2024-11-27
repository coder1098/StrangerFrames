"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Problem } from "@/lib/types";
import { fetchProblem, submitSolution } from "@/lib/api";
import { ProblemDescription } from "./ProblemDescription";
import { CodeEditor } from "./CodeEditor";
import { AIHints } from "./AIHints";
import { TestCases } from "./TestCases";

export default function ProblemsPage() {
    const [problem, setProblem] = useState<Problem | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("compiler");

    useEffect(() => {
        const loadProblem = async () => {
            try {
                const data = await fetchProblem("700005");
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
        await submitSolution(problem.question_id, code, language);
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
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="compiler">Compiler</TabsTrigger>
                        <TabsTrigger value="ai">AI Hints</TabsTrigger>
                        <TabsTrigger value="testcases">Test Cases</TabsTrigger>
                    </TabsList>
                    <TabsContent value="compiler">
                        <CodeEditor onSubmit={handleSubmit} />
                    </TabsContent>
                    <TabsContent value="ai">
                        <AIHints problem={problem} />
                    </TabsContent>
                    <TabsContent value="testcases">
                        <TestCases problem={problem} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}