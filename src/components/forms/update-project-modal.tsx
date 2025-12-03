"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UpdateProjectSchema } from "@/schemas/project-schema"


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { apiClient } from "@/lib/api"
import { queryClient } from "@/providers/query-provider"
import { QUERY_KEYS } from "@/query-qeys"
import { Project } from "@/types/project"
import { Team } from "@/types/team"
import { useState } from "react"
import { Dialog, DialogContent } from "../ui/dialog"
interface UpdateProjectModalProps {
    teams: Team[]
    exstingProject: Project,
    openEditModal: boolean
}
export function UpdateProjectModal({ teams, exstingProject, openEditModal }: UpdateProjectModalProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(openEditModal)
    const form = useForm<z.infer<typeof UpdateProjectSchema>>({
        resolver: zodResolver(UpdateProjectSchema),
        defaultValues: {
            name: exstingProject.name,
            deadline: exstingProject.deadline,
            description: exstingProject.description,
            priority: exstingProject.priority,
            status: exstingProject.status,
            team: exstingProject.team.toString(),
        },
    })

    async function onSubmit(values: z.infer<typeof UpdateProjectSchema>) {
        try {
            const response = await apiClient.put(`/projects/${exstingProject.id}`, values)
            if (response.status === 200) {
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.ALL_PROJECTS]
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Dialog open={isEditModalOpen} onOpenChange={(state) => setIsEditModalOpen(state)}>
            <DialogContent>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="new Project" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="new Project" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Select  {...field}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Status</SelectLabel>
                                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                                    <SelectItem value="planning">Planning</SelectItem>

                                                    <SelectItem value="Review">Review</SelectItem>

                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Priority</FormLabel>
                                    <FormControl>
                                        <Select  {...field}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a prority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Priority</SelectLabel>
                                                    <SelectItem value="High">High</SelectItem>
                                                    <SelectItem value="Meduim">Meduim</SelectItem>

                                                    <SelectItem value="Low">Low</SelectItem>

                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="team"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team</FormLabel>
                                    <FormControl>
                                        <Select  {...field}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a team" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Priority</SelectLabel>
                                                    {teams.map(team => (
                                                        <SelectItem value={team.id.toString()}>{team.name}</SelectItem>

                                                    ))}

                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="deadline"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deadline</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Create</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}