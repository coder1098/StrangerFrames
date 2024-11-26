import { Problem } from "@/lib/types";
import { Card, CardContent } from "../ui/card";

interface ProblemDescriptionProps {
    problem: Problem;
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
    return (
        <Card>
            <CardContent className="p-6 text-black">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold">{problem.title}</h1>
                    <span className={`px-3 py-1 text-sm rounded-full ${problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                            problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                        }`}>
                        {problem.difficulty}
                    </span>
                </div>

                <div className="prose max-w-none">
                    <div className="mb-6 whitespace-pre-wrap">{problem.description}</div>

                    <h3 className="text-lg font-semibold mb-2">Examples:</h3>
                    {problem.examples.map((example, index) => (
                        <div key={index} className="mb-4 p-3 bg-gray-50 rounded">
                            <div><strong>Input:</strong> {example.input}</div>
                            <div><strong>Output:</strong> {example.output}</div>
                            {example.explanation && (
                                <div><strong>Explanation:</strong> {example.explanation}</div>
                            )}
                        </div>
                    ))}

                    <h3 className="text-lg font-semibold mb-2">Constraints:</h3>
                    <ul className="list-disc pl-6">
                        {problem.constraints.map((constraint, index) => (
                            <li key={index}>{constraint}</li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}