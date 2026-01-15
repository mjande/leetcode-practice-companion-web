'use client';

import {useState} from "react";
import './ProblemList.css';

const sampleProblems = [
  { id: "1", number: "1", name: "Two Sum", difficulty: "Easy", currentInterval: 1, lastSolveDate: new Date(), dueDate: new Date(), source: 'NeetCode', url: 'www.leetcode.com', isDone: false },
  { id: "2", number: "2", name: "Three Sum", difficulty: "Medium", currentInterval: 1, lastSolveDate: new Date(), dueDate: new Date(), source: 'NeetCode', url: 'www.leetcode.com', isDone: false },
]


export default function ProblemList() { 
  const [problems] = useState(sampleProblems);
  
  return (
      <div className="problem-list-container">
        <header className="header">
          <div className="header-content">
            <h1>LeetCodePracticeCompanion</h1>
            <p>Track your progress and master coding problems</p>
          </div>
        </header>
        
        <div className="main-content">
          <div className="problems-table">
            <table className="problems-table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Problem</th>
                  <th>Difficulty</th>
                  <th>Due Date</th>
                  <th>Current Interval</th>
                  <th>Last Solve Date</th>
                  <th>Source</th>
                  <th>Url</th>
                </tr>
              </thead>
              <tbody>
                {problems.map(problem => (
                    <tr key={problem.id} className="problem-row"> 
                      <td>
                        {problem.isDone ? (
                            <svg className="check-icon" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <div className="unchecked-circle"></div>
                        )}
                      </td>
                      <td>
                        <div className="name-cell">
                          <span className="problem-id">#{problem.id}. </span>
                          <span className="problem-name">{problem.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>
                          {problem.difficulty}
                        </span>
                      </td>
                      <td>{problem.dueDate.toDateString()}</td>
                      <td>{problem.currentInterval}</td>
                      <td>{problem.lastSolveDate.toDateString()}</td>
                      <td>{problem.source}</td>
                      <td>{problem.url}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>

          {problems.length === 0 && (
              <div className="no-results">
                No problems found.
              </div>
          )}
        </div>
      </div>
  )
}
