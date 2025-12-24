import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, MoreVertical, Calendar, Users, Search, X } from "lucide-react";
import { projectsApi, type ProjectFilters } from "@/lib/api";

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
  const [filters, setFilters] = useState<ProjectFilters>({});

  const { data: projects, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['projects', filters],
    queryFn: () => projectsApi.getAll(filters),
  });

  const updateFilter = (key: keyof ProjectFilters, value: string | undefined) => {
    setFilters(prev => ({ ...prev, [key]: value || undefined }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const hasActiveFilters = Object.values(filters).some(v => v);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Projects</h1>
        <Alert variant="destructive">
          <AlertDescription>
            {error instanceof Error ? error.message : 'Failed to load projects'}
          </AlertDescription>
        </Alert>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-2">
            Manage and track all your team projects
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium mb-1.5 block">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={filters.search || ''}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="w-[180px]">
          <label className="text-sm font-medium mb-1.5 block">Status</label>
          <Select value={filters.status || 'all'} onValueChange={(v) => updateFilter('status', v === 'all' ? undefined : v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Planning">Planning</SelectItem>
              <SelectItem value="Review">Review</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-[180px]">
          <label className="text-sm font-medium mb-1.5 block">Priority</label>
          <Select value={filters.priority || 'all'} onValueChange={(v) => updateFilter('priority', v === 'all' ? undefined : v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-[180px]">
          <label className="text-sm font-medium mb-1.5 block">Sort By</label>
          <Select value={filters.sortBy || 'none'} onValueChange={(v) => updateFilter('sortBy', v === 'none' ? undefined : v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="deadline">Deadline</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <Button variant="ghost" onClick={clearFilters} className="gap-2">
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Projects Grid */}
      {projects && projects.length === 0 ? (
        <Alert>
          <AlertDescription>
            No projects found. {hasActiveFilters && 'Try adjusting your filters.'}
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects?.map((project) => (
            <Card key={project.id} className="shadow-sm hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {project.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className={statusColors[project.status]}>
                    {project.status}
                  </Badge>
                  <Badge variant="outline" className={priorityColors[project.priority]}>
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
      )}
    </div>
  );
}
