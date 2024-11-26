"use client";

import { useState } from "react";
import dynamic from 'next/dynamic';
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Alert, AlertDescription } from "../ui/alert";
import { Play, RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import type { SubmissionResult } from "@/lib/types";
import type { OnChange, OnMount } from "@monaco-editor/react";

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { 
    ssr: false 
});

interface CodeEditorProps {
    onSubmit: (code: string, language: string) => Promise<void>;
}

const languages = [
    { value: 'javascript', label: 'JavaScript', template: 'function twoSum(nums, target) {\n    // Write your code here\n}' },
    { value: 'python', label: 'Python', template: 'def twoSum(nums, target):\n    # Write your code here\n    pass' },
    { value: 'java', label: 'Java', template: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n    }\n}' },
];

export function CodeEditor({ onSubmit }: CodeEditorProps) {
    const [code, setCode] = useState(languages[0].template);
    const [language, setLanguage] = useState(languages[0].value);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<SubmissionResult | null>(null);
    
    const handleEditorChange: OnChange = (value) => {
        setCode(value || '');
    };

    const handleEditorMount: OnMount = (editor, monaco) => {
        // Optional: Additional configuration on editor mount
        editor.focus();
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await onSubmit(code, language);
            // Mock result - replace with actual submission response
            setResult({
                status: 'success',
                runtime: '76 ms',
                memory: '42.1 MB',
                testCases: '68/68 passed'
            });
        } catch (error) {
            setResult({
                status: 'error',
                message: 'Compilation Error',
                details: error instanceof Error ? error.message : 'Unknown error occurred'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        const template = languages.find(l => l.value === language)?.template ?? '';
        setCode(template);
    };

    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage);
        const template = languages.find(l => l.value === newLanguage)?.template ?? '';
        setCode(template);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <Select 
                    value={language} 
                    onValueChange={handleLanguageChange}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-black">
                        {languages.map(lang => (
                            <SelectItem key={lang.value} value={lang.value}>
                                {lang.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={handleReset}
                        className="flex items-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                    >
                        <Play className="w-4 h-4" />
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </div>
            </div>

            <div className="flex-1 relative border rounded-md overflow-hidden">
                <MonacoEditor
                    height="500px"
                    language={language}
                    theme="vs-dark"
                    value={code}
                    onChange={handleEditorChange}
                    onMount={handleEditorMount}
                    options={{
                        minimap: { enabled: true },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                        lineNumbers: 'on',
                        roundedSelection: true,
                        tabSize: 2,
                        padding: {
                            top: 10,
                            bottom: 10,
                        },
                        scrollbar: {
                            useShadows: false,
                            verticalScrollbarSize: 10,
                            horizontalScrollbarSize: 10,
                        },
                    }}
                />
            </div>

            {result && (
                <div className="mt-4">
                    {result.status === 'success' ? (
                        <Alert className="bg-green-50 border-green-200">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <AlertDescription className="flex items-center gap-4">
                                <span className="font-medium text-green-600">Accepted</span>
                                <span>Runtime: {result.runtime}</span>
                                <span>Memory: {result.memory}</span>
                                <span>{result.testCases}</span>
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <Alert className="bg-red-50 border-red-200">
                            <XCircle className="w-4 h-4 text-red-600" />
                            <AlertDescription className="text-red-600">
                                {result.message}: {result.details}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            )}
        </div>
    );
}