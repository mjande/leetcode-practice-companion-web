'use client';

import './ProblemList.css';
import { Problem } from "@/app/types/problem";
import {MdLink} from "react-icons/md";
import SolveProblemButton from "@/app/problems/solve-problem/SolveProblemButton";
import {pluralize} from "@/lib/utils/string";

type Props = {
  problems: Problem[],
}

export default function ProblemTable({ problems }: Props) {
  function displayInterval(problem: Problem) {
    if (problem.intervalDays === 0 && problem.intervalMonths === 0) {
      return 'Done!'
    }

    if (problem.intervalMonths === 0)
      return pluralize(problem.intervalDays, 'day');

    return pluralize(problem.intervalMonths, 'month');
  }

  return (
      <>
        <div className="problems-table">
          <table className="problems-table">
            <thead>
              <tr>
                <th></th>
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
                      <div className="actions-cell">
                        <a href={problem.url} target="_blank" rel="noopener noreferrer"><MdLink /></a>
                        <SolveProblemButton problem={problem} />
                      </div>
                    </td>
                    <td>
                      <div className="name-cell">
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
                    <td>{displayInterval(problem)}</td>
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
