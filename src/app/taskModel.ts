export class Task {
    public id: number;
    public description: string;
    public priority: string;
    public status: string;
    public uniqueKey: string;
}

export class TaskDTO {
    name: Task[]
}
  