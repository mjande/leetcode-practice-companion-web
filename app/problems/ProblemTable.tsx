import './ProblemList.css';
import {Problem} from "@/app/types/problem";
import {pluralize} from "@/lib/utils/string";
import {ActionIcon, ActionIconGroup, Badge, Center, Table, Text} from "@mantine/core";
import {IconLink, IconSquareRoundedCheck} from "@tabler/icons-react";

type Props = {
  problems: Problem[],
  solveProblem: (problem: Problem) => void,
}

export default function ProblemTable({problems, solveProblem}: Props) {
  function displayInterval(problem: Problem) {
    if (problem.intervalDays === 0 && problem.intervalMonths === 0) return 'Done!'
    if (problem.intervalMonths === 0) return pluralize(problem.intervalDays, 'day');
    return pluralize(problem.intervalMonths, 'month');
  }

  if (problems.length === 0) {
    return (
      <Center mt="xl">
        <Text>No problems found.</Text>
      </Center>
    )
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
            </ActionIconGroup>
          </Table.Td>
          <Table.Td>
            <Text span fw={700}>#{problem.id}.{" "}</Text>
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
          <Table.Td>{problem.dueDate}</Table.Td>
          <Table.Td>{displayInterval(problem)}</Table.Td>
          <Table.Td>{problem.lastSolveDate}</Table.Td>
        </Table.Tr>
      ))}
      </Table.Tbody>
    </Table>
  )
}
