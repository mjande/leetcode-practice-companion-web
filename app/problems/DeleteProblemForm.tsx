import {Problem} from "@/app/types/problem";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Button, Group, Text} from '@mantine/core';
import {notifications} from "@mantine/notifications";
import {IconCheck, IconX} from "@tabler/icons-react";

type DeleteProblemFormProps = {
  problem: Problem,
  onClose: () => void,
}

export default function DeleteProblemForm({ problem, onClose }: DeleteProblemFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/problems/${problem.id}`, {
      method: "DELETE",
    });

    setLoading(false);

    if (!response.ok) {
      console.error('Error deleting problem:', response.status);
      notifications.show({
        message: 'Failed to delete problem. Please try again.',
        icon: <IconX />,
        color: 'red',
        autoClose: false,
      })
      return;
    }

    onClose();
    router.refresh();
    notifications.show({
      message: `${problem.number}. ${problem.name} has been deleted.`,
      icon: <IconCheck />,
      color: 'green',
    })
  }

  return (
    <>
      <Text>Are you sure you want to delete problem {problem.number}. {problem.name}?</Text>

      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={() => onClose()}>Cancel</Button>
        <Button loading={loading} onClick={handleDelete}>Delete</Button>
      </Group>
    </>
  )
}