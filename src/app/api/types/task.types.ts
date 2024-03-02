export type TaskStatus = 'todo' | 'started' | 'completed';

export interface TaskParams {
    id?: number;
    search?: string;
    status?: TaskStatus;
    sortBy?: 'title' | 'status' | 'createdAt' | 'updatedAt';
    orderBy?: 'asc' | 'desc';
};

export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'todo' | 'started' | 'completed';
    createdAt?: string;
    updatedAt?: string;
};