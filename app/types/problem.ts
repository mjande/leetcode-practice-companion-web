export type Problem = {
    id: number;
    number: number;
    name: string;
    difficulty: string;
    intervalDays: number;
    intervalMonths: number;
    lastSolveDate: string;
    dueDate: string;
    url: string;
    isDone: boolean;
};
