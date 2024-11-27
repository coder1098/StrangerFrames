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
                <span 
                    className={`px-3 py-1 text-sm rounded-full ${
                    problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                    }`}
                >
                    {problem.difficulty}
                </span>
                </div>
                <div className="prose max-w-none">
                <div 
                    className="mb-6"
                    dangerouslySetInnerHTML={{ __html: problem.description }}
                />
                </div>
            </CardContent>
        </Card>
    );
}