import {Problem} from "@/app/types/problem";
import ProblemTable from "./ProblemTable";
import AddProblemButton from "@/app/problems/add-problem/AddProblemButton";

async function getProblems(): Promise<Problem[]> {
    const res = await fetch('http://localhost:5173/api/problems');

    if (!res.ok) {
        console.error('Failed to get problems:', res.status);
        return [];
    }

    return res.json();
}

export default async function ProblemListPage() {
    const problems = await getProblems();

    return (
        <div className="problem-list-container">
            <header className="header">
                <div className="header-content">
                    <h1>LeetCodePracticeCompanion</h1>
                    <p>Track your progress and master coding problems</p>
                </div>
            </header>

            <div className="main-content">
                <div className="actions-container">
                    <AddProblemButton />
                </div>

                <ProblemTable problems={problems} />
            </div>
        </div>
    )
}

