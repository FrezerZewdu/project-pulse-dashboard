import { CreateProjectModal } from "@/components/forms/create-project-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiClient } from "@/lib/api";
import { Project } from "@/types/project";
import { Team } from "@/types/team";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Calendar, MoreVertical, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { queryClient } from "@/providers/query-provider";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/query-qeys";
import { UpdateProjectModal } from "@/components/forms/update-project-modal";
import { FilterProjectDropdown } from "@/components/shared/filter-project";
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

export default function Projects() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editableProject, setEditableProject] = useState<Project | null>(null)
  const [filters, setFilters] = useState({ priority: 'Medium', status: 'Active' });

  const { data: projects, isLoading: loadingProject, error: loadingProjectError } = useQuery<Project[]>({
    queryKey: ['PROJECTS'],
    queryFn: async () => {
      const reposnse = await apiClient.get('/projects')
      return reposnse.data
    }
  })

  const { data: teams = [], isLoading: laodingTeam, error: teamError } = useQuery<Team[]>({
    queryKey: ['TEAMS'],
    queryFn: async () => {
      const reposnse = await apiClient.get('/team')
      return reposnse.data
    }
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

  if (loadingProject) return <p>Loading Project</p>
  if (loadingProjectError) return <p>error with loading projetc {loadingProjectError.message} </p>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-2">
            Manage and track all your team projects
          </p>
        </div>
        <FilterProjectDropdown />
        <CreateProjectModal teams={teams} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="shadow-sm hover:shadow-md transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <Link to={`/projects/${project.id}`} >
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuItem
                      onClick={() => {
                        setEditableProject(project)
                        setIsEditModalOpen(true)

                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => deleteProjectMutation.mutate(project.id.toString())}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {project.description}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={statusColors[project.status as keyof typeof statusColors]}>
                  {project.status}
                </Badge>
                <Badge variant="outline" className={priorityColors[project.priority as keyof typeof priorityColors]}>
                  {project.priority}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">
                    {project.tasks.completed}/{project.tasks.total}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{
                      width: `${(project.tasks.completed / project.tasks.total) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{project.deadline}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{project.team}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {editableProject &&
        <UpdateProjectModal
          exstingProject={editableProject}
          openEditModal={isEditModalOpen}
          teams={teams}
        />}
    </div>
  );
}
