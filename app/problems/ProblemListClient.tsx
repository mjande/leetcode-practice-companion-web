'use client';

import {Problem} from "@/app/types/problem";
import {useState} from "react";
import {Button, Modal} from "@mantine/core";
import ProblemTable from "@/app/problems/ProblemTable";
import AddUpdateProblemForm from "@/app/problems/AddUpdateProblemForm";
import SolveProblemForm from "@/app/problems/SolveProblemForm";

export default function ProblemListClient({ problems }: { problems: Problem[] }) {
  const [addUpdateProblemFormOpened, setAddUpdateProblemFormOpened] = useState(false);
  const [solveProblemFormOpened, setSolveProblemFormOpened] = useState(false);
  const [problem, setProblem] = useState<Problem | null>(null);

  function solveProblem(problem: Problem) {
    setSolveProblemFormOpened(true);
    setProblem(problem);
  }

  return (
    <>
      <div className="actions-container">
        <Button variant="filled" onClick={() => setAddUpdateProblemFormOpened(true)}>Add Problem</Button>
      </div>

      <ProblemTable problems={problems} solveProblem={solveProblem} />

      <Modal
        opened={addUpdateProblemFormOpened}
        onClose={() => setAddUpdateProblemFormOpened(false)}
        title="Add Problem"
        centered
      >
        <AddUpdateProblemForm onClose={() => setAddUpdateProblemFormOpened(false)} />
      </Modal>

      <Modal
        opened={solveProblemFormOpened}
        onClose={() => setSolveProblemFormOpened(false)}
        title="Solve Problem"
        centered
      >{problem &&
        <SolveProblemForm problem={problem} onClose={() => setSolveProblemFormOpened(false)} />
      }
      </Modal>
    </>
  )
}