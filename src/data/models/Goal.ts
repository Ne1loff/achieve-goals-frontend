class Goal {
    id: number = 0;
    title: string = '';
    description?: string = '';
    isDone: boolean = false;
    gid?: number = null;
    subtasks: Subtasks = null;
    priority: 1 | 2 | 3 | 4 = 4;
    createdAt: Date = null;
    updatedAt: Date = null;
    deadline: Date = null;
}

class Subtasks {
    total: number;
    completed: number;
}

export default Goal;