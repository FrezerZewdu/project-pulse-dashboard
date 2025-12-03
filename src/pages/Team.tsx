import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, MoreVertical } from "lucide-react";
import { apiClient } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Team } from "@/types/team";


export default function TeamPage() {

  const { data: teamMembers = [], isLoading: laodingTeam, error: teamError } = useQuery<Team[]>({
    queryKey: ['TEAMS'],
    queryFn: async () => {
      const reposnse = await apiClient.get('/team')
      return reposnse.data
    }
  })
  if (laodingTeam) return <p>Loading Project</p>
  if (teamError) return <p>error with loading projetc {teamError.message} </p>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team</h1>
          <p className="text-muted-foreground mt-2">
            {teamMembers.length} members in your team
          </p>
        </div>
        <Button className="gap-2">
          <Mail className="h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
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
    </div>
  );
}
