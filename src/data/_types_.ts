type Login = {
    login: string;
    password: string;
}

type Registration = {
    username: string;
    email: string;
    male: boolean;
    password: string;
    locality: number;
}

type Country = {
    id: number;
    name: string;
}

type Subtasks = {
    total: number;
    completed: number;
}

type Goal = {
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

type User = {
    username: string;
    name: string;
    surname: string;
    male: boolean;
    email: string;
    country: number;
    avatar: string;
}

export type {Login, Registration, Goal, User, Subtasks, Country}