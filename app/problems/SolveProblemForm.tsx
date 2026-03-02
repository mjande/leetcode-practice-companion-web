import {useRouter} from "next/navigation";
import {useForm} from "@mantine/form";
import {useState} from "react";
import {Problem} from "@/app/types/problem";
import {Button, Checkbox, Group, Stack} from "@mantine/core";
import {notifications} from "@mantine/notifications";
import {IconCheck, IconX} from "@tabler/icons-react";

type SolveProblemFormProps = {
  problem: Problem,
  onClose: () => void,
}

export default function SolveProblemForm({ problem, onClose }: SolveProblemFormProps) {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      solvedWithoutHelp: false,
      solvedWithCorrectComplexity: false,
    },
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(values: typeof form.values) {
    setLoading(true);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/problems/${problem.id}/solve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    setLoading(false);

    if (!response.ok) {
      console.error('Error solving problem:', response.status);
      notifications.show({
        message: 'Failed to solve problem. Please try again.',
        icon: <IconX />,
        color: 'red',
        autoClose: false,
      })
      return;
    }

    form.reset();
    onClose();
    router.refresh();
    notifications.show({
      message: `${problem.number}. ${problem.name} has been solved successfully.`,
      icon: <IconCheck />,
      color: 'green',
    })
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Checkbox
          label="Solved without extra help?"
          key={form.key('solvedWithoutHelp')}
          {...form.getInputProps('solvedWithoutHelp', { type: 'checkbox' }) }
        ></Checkbox>

        <Checkbox
          label="Solved with correct complexity?"
          key={form.key('solvedWithCorrectComplexity')}
          {...form.getInputProps('solvedWithCorrectComplexity', { type: 'checkbox' }) }
        ></Checkbox>
      </Stack>

      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={() => onClose()}>Cancel</Button>
        <Button type="submit" loading={loading}>Solve</Button>
      </Group>
    </form>
  )
}