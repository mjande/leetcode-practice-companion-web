import {Problem} from "@/app/types/problem";
import ProblemListClient from "@/app/problems/ProblemListClient";
import {Metadata} from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'LeetCode Practice Companion',
  icons: ['./brand-leetcode.svg'],
}

async function getProblems(): Promise<Problem[]> {
  const res = await fetch(`${process.env.API_URL}/problems`);

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
        <ProblemListClient problems={problems} />
      </div>
    </div>
  )
}

