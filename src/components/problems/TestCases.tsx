import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Play, Trash2, PlusCircle } from "lucide-react";
import { Problem } from "@/lib/types";

interface TestCasesProps {
    problem: Problem;
}

interface TestCase {
    id: number;
    input: string;
    expectedOutput: string;
}

export function TestCases({ problem }: TestCasesProps) {
    const [testCases, setTestCases] = useState<TestCase[]>([]);
    const [newInput, setNewInput] = useState("");
    const [newOutput, setNewOutput] = useState("");

    const addTestCase = () => {
        if (newInput && newOutput) {
            const newTestCase: TestCase = {
                id: Date.now(),
                input: newInput,
                expectedOutput: newOutput
            };
            setTestCases([...testCases, newTestCase]);
            setNewInput("");
            setNewOutput("");
        }
    };

    const removeTestCase = (id: number) => {
        setTestCases(testCases.filter(tc => tc.id !== id));
    };

    const runTestCases = () => {
        // Placeholder for actual test case execution logic
        console.log("Running test cases:", testCases);
        alert("Test cases will be run (implementation pending)");
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <PlusCircle className="w-6 h-6 text-blue-600" />
                    Custom Test Cases
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex gap-2">
                        <Input 
                            placeholder="Input" 
                            value={newInput}
                            onChange={(e) => setNewInput(e.target.value)}
                        />
                        <Input 
                            placeholder="Expected Output" 
                            value={newOutput}
                            onChange={(e) => setNewOutput(e.target.value)}
                        />
                        <Button 
                            onClick={addTestCase} 
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <PlusCircle className="w-4 h-4" /> Add
                        </Button>
                    </div>

                    {testCases.length > 0 && (
                        <div className="mt-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold">Test Cases</h3>
                                <Button 
                                    onClick={runTestCases} 
                                    variant="default"
                                    className="flex items-center gap-2"
                                >
                                    <Play className="w-4 h-4" /> Run All
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {testCases.map((tc) => (
                                    <div 
                                        key={tc.id} 
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                                    >
                                        <div className="flex-1">
                                            <div><strong>Input:</strong> {tc.input}</div>
                                            <div><strong>Expected Output:</strong> {tc.expectedOutput}</div>
                                        </div>
                                        <Button 
                                            onClick={() => removeTestCase(tc.id)} 
                                            variant="ghost" 
                                            size="sm"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}