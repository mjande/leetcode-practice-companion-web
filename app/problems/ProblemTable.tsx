'use client';

import './ProblemList.css';
import { Problem } from "@/app/types/problem";
import { MdLink } from "react-icons/md";

type Props = {
  problems: Problem[],
}

export default function ProblemTable({ problems }: Props) {
  return (
      <>
        <div className="problems-table">
          <table className="problems-table">
            <thead>
              <tr>
                <th>Problem</th>
                <th>Difficulty</th>
                <th>Due Date</th>
                <th>Current Interval</th>
                <th>Last Solve Date</th>
              </tr>
            </thead>
            <tbody>
              {problems.map(problem => (
                  <tr key={problem.id} className="problem-row">
                    <td>
                      <div className="name-cell">
                        <a href={problem.url} target="_blank" rel="noopener noreferrer"><MdLink /></a>
                        <div>
                          <span className="problem-id">#{problem.id}. </span>
                          <span className="problem-name">{problem.name}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td>{problem.dueDate}</td>
                    <td>{problem.isDone ? 'Done' : problem.currentInterval}</td>
                    <td>{problem.lastSolveDate}</td>
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
      </>
  )
}
