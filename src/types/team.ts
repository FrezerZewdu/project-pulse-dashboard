export interface Team {
    id: number;
    name: string;
    role: string;
    email: string;
    initials: string;
    projects: number;
    status: "Active" | "Inactive";
    avatar: string;
}