import './ProblemList.css';
import {useForm} from "@mantine/form";
import {Button, Group, NumberInput, Select, TextInput} from "@mantine/core";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Problem} from "@/app/types/problem";
import {displayInterval, intervalMappings, parseInterval} from "@/lib/utils/interval";
import {DateInput} from "@mantine/dates";

type AddUpdateProblemFormProps = {
  mode: 'add' | 'update';
  problem?: Problem;
  onClose: () => void;
}

export default function AddUpdateProblemForm({ mode, problem, onClose }: AddUpdateProblemFormProps) {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      number: problem?.number ?? 1,
      name: problem?.name ?? '',
      difficulty: problem?.difficulty ?? 'easy',
      url: problem?.url ?? '',
      interval: problem?.intervalDays || problem?.intervalMonths ? displayInterval(problem) : '',
      lastSolveDate: problem?.lastSolveDate,
      dueDate: problem?.dueDate,
    },
    validate: {
      name: (value) => value.trim().length === 0 ? 'Name is required' : null,
      difficulty: (value) => !value ? ' Difficulty is required' : null,
      url: (value) => value.trim().length === 0 ? 'Url is required' : null,
    },
  });

  const [loading, setLoading] = useState(false);


  async function handleSubmit(values: typeof form.values) {
    if (mode === 'add') await handleAdd(values);
    if (mode === 'update') await handleUpdate(values);
  }

  async function handleAdd(values: typeof form.values) {
    setLoading(true);

    const newProblem = {
      number: values.number,
      name: values.name,
      difficulty: values.difficulty,
      url: values.url,
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/problems/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProblem),
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

  async function handleUpdate(values: typeof form.values) {
    setLoading(true);

    const interval = parseInterval(values.interval);

    const updatedProblem = {
      id: problem?.id,
      number: problem?.number ?? 0,
      name: values.name,
      difficulty: values.difficulty,
      url: values.url,
      intervalDays: interval.intervalDays,
      intervalMonths: interval.intervalMonths,
      lastSolveDate: values.lastSolveDate,
      dueDate: values.dueDate,
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/problems/${problem?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProblem),
    });

    setLoading(false);

    if (!response.ok) {
      console.error('Error updating problem:', response.status);
      alert('Failed to update problem. Please try again');
      return;
    }

    form.reset();
    onClose();
    router.refresh();
    alert(`Problem ${values.number}. ${values.name} has been updated successfully.`);
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
          { value: 'Easy', label: 'Easy' },
          { value: 'Medium', label: 'Medium' },
          { value: 'Hard', label: 'Hard' },
        ]}
        {...form.getInputProps('difficulty')}
      />

      <TextInput
        label="Link"
        placeholder="https://www.leetcode.com"
        required
        {...form.getInputProps('url')}
      />

      {mode === 'update' && <>
        <Select
          label="Interval"
          required
          data={Object.keys(intervalMappings)}
          {...form.getInputProps('interval')}
        />

        <DateInput
          label="Last Solve Date"
          valueFormat="YYYY-MM-DD"
          clearable
          {...form.getInputProps('lastSolveDate')}
        />

        <DateInput
          label="Due Date"
          valueFormat="YYYY-MM-DD"
          clearable
          {...form.getInputProps('dueDate')}
        />
      </>
      }

      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={() => onClose()}>Cancel</Button>
        <Button type="submit" loading={loading}>{mode === "add" ? "Add" : "Update"}</Button>
      </Group>
    </form>
  )
}