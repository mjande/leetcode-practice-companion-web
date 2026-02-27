'use client';

import {Problem} from "@/app/types/problem";
import {useState} from "react";
import {Button, Modal} from "@mantine/core";
import ProblemTable from "@/app/problems/ProblemTable";
import AddUpdateProblemForm from "@/app/problems/AddUpdateProblemForm";
import SolveProblemForm from "@/app/problems/SolveProblemForm";

export default function ProblemListClient({ problems }: { problems: Problem[] }) {
  const [addProblemFormOpened, setAddProblemFormOpened] = useState(false);
  const [updateProblemFormOpened, setUpdateProblemFormOpened] = useState(false);
  const [solveProblemFormOpened, setSolveProblemFormOpened] = useState(false);
  const [problem, setProblem] = useState<Problem | null>(null);

  console.log(problems);

  function solveProblem(problem: Problem) {
    setSolveProblemFormOpened(true);
    setProblem(problem);
  }

  function updateProblem(problem: Problem) {
    setUpdateProblemFormOpened(true);
    setProblem(problem);
  }

  return (
    <>
      <div className="actions-container">
        <Button variant="filled" onClick={() => setAddProblemFormOpened(true)}>Add Problem</Button>
      </div>

      <ProblemTable problems={problems} solveProblem={solveProblem} updateProblem={updateProblem} />

      <Modal
        opened={addProblemFormOpened}
        onClose={() => setAddProblemFormOpened(false)}
        title="Add Problem"
        centered
      >
        <AddUpdateProblemForm mode="add" onClose={() => setAddProblemFormOpened(false)} />
      </Modal>

      <Modal
        opened={updateProblemFormOpened}
        onClose={() => setUpdateProblemFormOpened(false)}
        title="Update Problem"
        centered
      >{problem &&
        <AddUpdateProblemForm mode="update" problem={problem} onClose={() => setUpdateProblemFormOpened(false)} />
      }
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