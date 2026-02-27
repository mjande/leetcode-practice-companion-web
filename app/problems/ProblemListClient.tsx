'use client';

import {Problem} from "@/app/types/problem";
import {useState} from "react";
import {Button, Modal} from "@mantine/core";
import ProblemTable from "@/app/problems/ProblemTable";
import AddUpdateProblemForm from "@/app/problems/AddUpdateProblemForm";
import SolveProblemForm from "@/app/problems/SolveProblemForm";
import DeleteProblemForm from "@/app/problems/DeleteProblemForm";

type ModalState =
  { type: 'add', problem: null } |
  { type: 'solve', problem: Problem } |
  { type: 'update', problem: Problem } |
  { type: 'delete', problem: Problem } |
  null;

export default function ProblemListClient({ problems }: { problems: Problem[] }) {
  const [modalState, setModalState] = useState<ModalState>(null);

  function addProblem() {
    setModalState({ type: 'add', problem: null });
  }

  function solveProblem(problem: Problem) {
    setModalState({ type: 'solve', problem });
  }

  function updateProblem(problem: Problem) {
    setModalState({ type: 'update', problem });
  }

  function deleteProblem(problem: Problem) {
    setModalState({ type: 'delete', problem });
  }

  return (
    <>
      <div className="actions-container">
        <Button variant="filled" onClick={addProblem}>Add Problem</Button>
      </div>

      <ProblemTable problems={problems} solveProblem={solveProblem} updateProblem={updateProblem} deleteProblem={deleteProblem} />

      <Modal
        opened={modalState?.type === 'add'}
        onClose={() => setModalState(null)}
        title="Add Problem"
        centered
      >
        <AddUpdateProblemForm mode="add" onClose={() => setModalState(null)} />
      </Modal>

      <Modal
        opened={modalState?.type === 'solve'}
        onClose={() => setModalState(null)}
        title="Solve Problem"
        centered
      >{modalState?.problem &&
        <SolveProblemForm problem={modalState.problem} onClose={() => setModalState(null)} />
      }
      </Modal>

      <Modal
        opened={modalState?.type === 'update'}
        onClose={() => setModalState(null)}
        title="Update Problem"
        centered
      >{modalState?.problem &&
          <AddUpdateProblemForm mode="update" problem={modalState.problem} onClose={() => setModalState(null)} />
      }
      </Modal>

      <Modal
        opened={modalState?.type === 'delete'}
        onClose={() => setModalState(null)}
        title="Delete Problem"
        centered
      >
        {modalState?.problem &&
          <DeleteProblemForm problem={modalState.problem} onClose={() => setModalState(null)} />
        }
      </Modal>
    </>
  )
}