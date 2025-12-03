import z from 'zod'
const TaskSchema = z.object({
    completed: z.number(),
    total: z.number()
})
export const CreateProjectSchema = z.object({
    name: z.string().min(2, { message: "Name must be atleast 2" }),
    description: z.string().min(10, { message: "description must be atleast 10" }),
    status: z.string(),
    priority: z.string(),
    deadline: z.string(),
    team: z.string(),
    tasks: z.array(TaskSchema).optional()
})

export const UpdateProjectSchema = z.object({
    name: z.string().min(2, { message: "Name must be atleast 2" }).optional(),
    description: z.string().min(10, { message: "description must be atleast 10" }).optional(),
    status: z.string().optional(),
    priority: z.string().optional(),
    deadline: z.string().optional(),
    team: z.string().optional(),
    tasks: z.array(TaskSchema).optional()
})
