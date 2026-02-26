import './ProblemList.css';
import {useForm} from "@mantine/form";
import {Button, Group, NumberInput, Select, TextInput} from "@mantine/core";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function AddUpdateProblemForm({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      number: 1,
      name: '',
      difficulty: 'easy',
      url: '',
    },
    validate: {
      name: (value) => value.trim().length === 0 ? 'Name is required' : null,
      difficulty: (value) => !value ? ' Difficulty is required' : null,
    },
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(values: typeof form.values) {
    setLoading(true);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/problems/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    setLoading(false);

    if (!response.ok) {
      console.error('Error adding problem:', response.status);
      alert('Failed to create problem. Please try again');
      return;
    }

    form.reset();
    onClose();
    router.refresh();
    alert(`Problem ${values.number}. ${values.name} has been added successfully.`);
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <NumberInput
        label="Number"
        required
        {...form.getInputProps('number')}
      />

      <TextInput
        label="Name"
        placeholder="Two Sum"
        required
        {...form.getInputProps('name')}
      />

      <Select
        label="Difficulty"
        required
        data={[
          { value: 'easy', label: 'Easy' },
          { value: 'medium', label: 'Medium' },
          { value: 'hard', label: 'Hard' },
        ]}
        {...form.getInputProps('difficulty')}
      />

      <TextInput
        label="Link"
        placeholder="https://www.leetcode.com"
        {...form.getInputProps('url')}
      />

      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={() => onClose()}>Cancel</Button>
        <Button type="submit" loading={loading}>Add</Button>
      </Group>
    </form>
  )
}