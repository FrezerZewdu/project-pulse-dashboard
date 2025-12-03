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
import { CreateProjectSchema } from "@/schemas/project-schema"


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { Dialog, DialogContent } from "../ui/dialog"
import { Team } from "@/types/team"
import { apiClient } from "@/lib/api"
import { queryClient } from "@/providers/query-provider"
import { QUERY_KEYS } from "@/query-qeys"
interface CreateProjectModalProps {
    teams: Team[]
}
export function CreateProjectModal({ teams }: CreateProjectModalProps) {

    const form = useForm<z.infer<typeof CreateProjectSchema>>({
        resolver: zodResolver(CreateProjectSchema),
    })

    async function onSubmit(values: z.infer<typeof CreateProjectSchema>) {
        try {
            const response = await apiClient.post('/projects', values)
            if (response.status === 201) {
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.ALL_PROJECTS]
                })
            }
        } catch (error) {
            console.error(error)
        }
    }
    console.log("form", form.formState.errors)
    return (
        <Dialog >
            <DialogTrigger>
                <Button>Create Project</Button>
            </DialogTrigger>
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