import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, MoreVertical, Search } from "lucide-react";
import { teamApi, type TeamFilters } from "@/lib/api";

export default function Team() {
  const [filters, setFilters] = useState<TeamFilters>({});

  const { data: teamMembers, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['team', filters],
    queryFn: () => teamApi.getAll(filters),
  });

  const updateFilter = (key: keyof TeamFilters, value: string | undefined) => {
    setFilters(prev => ({ ...prev, [key]: value || undefined }));
  };

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
        <h1 className="text-3xl font-bold text-foreground">Team</h1>
        <Alert variant="destructive">
          <AlertDescription>
            {error instanceof Error ? error.message : 'Failed to load team members'}
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
          <h1 className="text-3xl font-bold text-foreground">Team</h1>
          <p className="text-muted-foreground mt-2">
            {teamMembers?.length || 0} members in your team
          </p>
        </div>
        <Button className="gap-2">
          <Mail className="h-4 w-4" />
          Invite Member
        </Button>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search team members..."
            value={filters.search || ''}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Team Grid */}
      {teamMembers && teamMembers.length === 0 ? (
        <Alert>
          <AlertDescription>
            No team members found. {filters.search && 'Try adjusting your search.'}
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers?.map((member) => (
            <Card key={member.id} className="shadow-sm hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <Avatar className={`h-14 w-14 ${member.avatar}`}>
                    <AvatarFallback className="text-white text-lg font-semibold">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{member.email}</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Projects: </span>
                      <span className="font-semibold text-foreground">
                        {member.projects}
                      </span>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                      {member.status}
                    </Badge>
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
