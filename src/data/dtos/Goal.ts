class Goal {
    id: number;
    title: string;
    description?: string;
    isDone: boolean;
    gid?: number;
    subtasks: Subtasks;
    priority: 1 | 2 | 3 | 4;
    createdAt: Date;
    updatedAt: Date;
    deadline: Date;
}

class Subtasks {
    total: number;
    completed: number;
}

export default Goal;