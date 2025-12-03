import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiClient } from "@/lib/api";
import { QUERY_KEYS } from "@/query-qeys";
import { Project } from "@/types/project";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Calendar, MoreVertical, Users } from "lucide-react";
import { useParams } from "react-router-dom";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { queryClient } from "@/providers/query-provider";
const statusColors = {
    "In Progress": "bg-primary/10 text-primary border-primary/20",
    "Planning": "bg-accent/10 text-accent border-accent/20",
    "Review": "bg-green-100 text-green-700 border-green-200",
};

const priorityColors = {
    "High": "bg-red-100 text-red-700 border-red-200",
    "Medium": "bg-yellow-100 text-yellow-700 border-yellow-200",
    "Low": "bg-gray-100 text-gray-700 border-gray-200",
};

export default function ProjectDetail() {
    const params = useParams();
    const { data: projectsDetail, isLoading: loadingProjectDetail, error: loadingProjectDetailError } = useQuery<Project>({
        queryKey: [QUERY_KEYS.ALL_PROJECTS],
        queryFn: async () => {
            const reposnse = await apiClient.get(`/projects/${params.id}`)
            return reposnse.data
        },
        enabled: !!params.id,

    })


    const deleteProjectMutation = useMutation({
        mutationFn: (id: string) => {
            try {

                const response = apiClient.delete(`/projects/${id}`,)
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.ALL_PROJECTS]
                })
                toast.error(" project deleted successfully")
                window.history.back()
                return response

            } catch (error) {
                toast.error("Unable to delete project")
            }
        },
    })

    if (loadingProjectDetail) return <p>Loading Project</p>
    if (loadingProjectDetailError) return <p>error with loading projetc {loadingProjectDetailError.message} </p>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Projects Detail </h1>

                </div>

            </div>

            <div className="grid">
                <Card key={projectsDetail.id} className="shadow-sm hover:shadow-md transition-all shadow-none border-none">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <CardTitle className="text-lg">{projectsDetail.name}</CardTitle>


                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="start">
                                    <DropdownMenuItem>
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => deleteProjectMutation.mutate(projectsDetail.id.toString())}
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                            {projectsDetail.description}
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className={statusColors[projectsDetail.status as keyof typeof statusColors]}>
                                {projectsDetail.status}
                            </Badge>
                            <Badge variant="outline" className={priorityColors[projectsDetail.priority as keyof typeof priorityColors]}>
                                {projectsDetail.priority}
                            </Badge>
                        </div>

                        {projectsDetail.tasks ? (<div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-medium text-foreground">
                                    {projectsDetail.tasks?.completed}/{projectsDetail.tasks.total}
                                </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                                <div
                                    className="bg-primary h-2 rounded-full transition-all"
                                    style={{
                                        width: `${(projectsDetail.tasks?.completed / projectsDetail.tasks.total) * 100}%`,
                                    }}
                                />
                            </div>
                        </div>)
                            : (
                                <div>This project have not. tasks</div>
                            )

                        }
                        <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>{projectsDetail.deadline}</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <Users className="h-4 w-4" />
                                <span>{projectsDetail.team}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
