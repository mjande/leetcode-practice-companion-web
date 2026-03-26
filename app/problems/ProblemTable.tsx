import './ProblemList.css';
import {Problem} from "@/app/types/problem";
import {ActionIcon, ActionIconGroup, Badge, Center, Table, Text} from "@mantine/core";
import {IconEdit, IconLink, IconSquareRoundedCheck, IconTrash} from "@tabler/icons-react";
import {displayInterval} from "@/lib/utils/interval";

type Props = {
  problems: Problem[],
  solveProblem: (problem: Problem) => void,
  updateProblem: (problem: Problem) => void,
  deleteProblem: (problem: Problem) => void,
}

export default function ProblemTable({problems, solveProblem, updateProblem, deleteProblem}: Props) {
  if (problems.length === 0) {
    return (
      <Center mt="xl">
        <Text>No problems found.</Text>
      </Center>
    )
  }

  function calculateDueDate(problem: Problem): string {
    const dueDate = new Date(problem.lastSolveDate);
    dueDate.setMonth(dueDate.getMonth() + problem.intervalMonths);
    dueDate.setDate(dueDate.getDate() + problem.intervalDays);

    const yyyy = dueDate.getFullYear();
    const mm = String(dueDate.getMonth() + 1).padStart(2, "0");
    const dd = String(dueDate.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  }

  return (
    <Table highlightOnHover striped verticalSpacing="sm">
      <Table.Thead>
      <Table.Tr>
        <Table.Th></Table.Th>
        <Table.Th>Problem</Table.Th>
        <Table.Th>Difficulty</Table.Th>
        <Table.Th>Due Date</Table.Th>
        <Table.Th>Current Interval</Table.Th>
        <Table.Th>Last Solve Date</Table.Th>
      </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
      {problems.map(problem => (
        <Table.Tr key={problem.id}>
          <Table.Td>
            <ActionIconGroup>
              <ActionIcon
                component="a"
                href={problem.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="default"
              >
                <IconLink size={20}/>
              </ActionIcon>
              <ActionIcon variant="default">
                <IconSquareRoundedCheck size={20} onClick={() => solveProblem(problem)}/>
              </ActionIcon>
              <ActionIcon variant="default">
                <IconEdit size={20} onClick={() => updateProblem(problem)}/>
              </ActionIcon>
              <ActionIcon variant="default">
                <IconTrash size={20} onClick={() => deleteProblem(problem)}/>
              </ActionIcon>
            </ActionIconGroup>
          </Table.Td>
          <Table.Td>
            <Text span fw={700}>#{problem.number}.{" "}</Text>
            <Text span>{problem.name}</Text>
          </Table.Td>
          <Table.Td>
            <Badge
              color={
                problem.difficulty.toLowerCase() === "easy"
                  ? "green"
                  : problem.difficulty.toLowerCase() === "medium"
                    ? "yellow"
                    : "red"
              }
              variant="filled"
            >
              {problem.difficulty}
            </Badge>
          </Table.Td>
          <Table.Td>{calculateDueDate(problem)}</Table.Td>
          <Table.Td>{displayInterval(problem)}</Table.Td>
          <Table.Td>{problem.lastSolveDate}</Table.Td>
        </Table.Tr>
      ))}
      </Table.Tbody>
    </Table>
  )
}
