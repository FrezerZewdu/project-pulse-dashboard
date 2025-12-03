export interface Project {
    id: number;
    name: string;
    description: string;
    status: "In Progress" | "Planning" | "Review";
    priority: "High" | "Medium" | "Low";
    deadline: string;
    team: number;
    tasks: {
        completed: number;
        total: number;
    };
}