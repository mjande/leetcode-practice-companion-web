'use client';

import {Problem} from "@/app/types/problem";
import {useState} from "react";
import {Button, Modal} from "@mantine/core";
import ProblemTable from "@/app/problems/ProblemTable";
import AddUpdateProblemForm from "@/app/problems/AddUpdateProblemForm";

export default function ProblemListClient({ problems }: { problems: Problem[] }) {
  const [addUpdateProblemFormOpened, setAddUpdateProblemFormOpened] = useState(false);

  return (
    <>
      <div className="actions-container">
        <Button variant="filled" onClick={() => setAddUpdateProblemFormOpened(true)}>Add Problem</Button>
      </div>

      <ProblemTable problems={problems} />

      <Modal
        opened={addUpdateProblemFormOpened}
        onClose={() => setAddUpdateProblemFormOpened(false)}
        title="Add Problem"
        centered
      >
        <AddUpdateProblemForm onSuccess={() => setAddUpdateProblemFormOpened(false)} />
      </Modal>
    </>
  )
}