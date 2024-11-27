import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { Problem } from "@/lib/types";

interface AIHintsProps {
    problem: Problem;
}

export function AIHints({ problem }: AIHintsProps) {
    const [hints, setHints] = useState<string[]>([]);
    const [hintLevel, setHintLevel] = useState(0);

    const generateHints = () => {
        const problemHints = [
            "Start by understanding the problem's core requirement.",
            "Break down the problem into smaller steps.",
            "Consider the input constraints.",
            "Think about edge cases.",
            "Consider time and space complexity.",
            "Sketch out a potential algorithm approach.",
            "Consider common algorithmic patterns that might help.",
        ];

        const solveHints = problem.hints || [];

        const allHints = [
            ...problemHints,
            ...solveHints
        ];

        const newHints = allHints.slice(0, hintLevel + 1);
        setHints(newHints);
        setHintLevel(prev => Math.min(prev + 1, allHints.length - 1));
    };

    const resetHints = () => {
        setHints([]);
        setHintLevel(0);
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                    AI Problem-Solving Hints
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex gap-2 mb-4">
                        <Button 
                            onClick={generateHints} 
                            disabled={hintLevel >= 6}
                            variant="secondary"
                        >
                            Get Next Hint
                        </Button>
                        <Button 
                            onClick={resetHints} 
                            variant="outline"
                        >
                            Reset Hints
                        </Button>
                    </div>
                    
                    {hints.length > 0 ? (
                        <div className="space-y-2">
                            {hints.map((hint, index) => (
                                <div 
                                    key={index} 
                                    className="p-3 bg-purple-50 rounded-md border border-purple-100"
                                >
                                    {hint}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">
                            Click "Get Next Hint" to receive problem-solving guidance.
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}