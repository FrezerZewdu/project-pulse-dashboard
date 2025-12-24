/**
 * Part 3: Dependency Graph & Critical Path Method
 * 
 * TODO: Implement dependency management and CPM algorithm
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle } from "lucide-react";

interface Project {
  id: number;
  name: string;
  dependencies: number[]; // Array of project IDs this depends on
  estimatedDays: number;
}

/**
 * Detect if adding a dependency would create a cycle
 * 
 * @param projects - All projects with dependencies
 * @param fromId - Project that would depend on another
 * @param toId - Project that would be depended on
 * @returns True if this would create a cycle
 * 
 * TODO: Implement cycle detection using DFS
 * Algorithm:
 * 1. Temporarily add the edge from -> to
 * 2. Perform DFS from 'to'
 * 3. If we can reach 'from', there's a cycle
 */
export function detectCycle(
  projects: Project[],
  fromId: number,
  toId: number
): boolean {
  // TODO: Implement
  return false;
}

/**
 * Perform topological sort on projects
 * 
 * @param projects - All projects
 * @returns Sorted array of project IDs (or null if cycle detected)
 * 
 * TODO: Implement topological sort using Kahn's algorithm or DFS
 * 
 * Kahn's Algorithm:
 * 1. Find all nodes with no incoming edges
 * 2. Remove a node with no incoming edges
 * 3. Remove all edges from this node
 * 4. Repeat until all nodes processed
 * 5. If can't process all nodes, there's a cycle
 */
export function topologicalSort(projects: Project[]): number[] | null {
  // TODO: Implement
  return [];
}

/**
 * Calculate earliest start/finish times for each project
 * 
 * @param projects - All projects in dependency order
 * @returns Map of project ID to times
 * 
 * TODO: Implement forward pass of CPM
 * Algorithm:
 * 1. Process projects in topological order
 * 2. ES(start node) = 0
 * 3. ES(node) = max(EF of all predecessors)
 * 4. EF(node) = ES(node) + duration
 */
interface ProjectTimes {
  es: number; // Earliest Start
  ef: number; // Earliest Finish
  ls: number; // Latest Start
  lf: number; // Latest Finish
  slack: number; // Slack time (ls - es)
}

export function calculateEarliestTimes(
  projects: Project[]
): Map<number, ProjectTimes> {
  // TODO: Implement
  return new Map();
}

/**
 * Calculate latest start/finish times for each project
 * 
 * @param projects - All projects
 * @param earliestTimes - Previously calculated earliest times
 * @returns Updated map with latest times
 * 
 * TODO: Implement backward pass of CPM
 * Algorithm:
 * 1. Process projects in reverse topological order
 * 2. LF(end node) = EF(end node)
 * 3. LF(node) = min(LS of all successors)
 * 4. LS(node) = LF(node) - duration
 * 5. Slack = LS - ES
 */
export function calculateLatestTimes(
  projects: Project[],
  earliestTimes: Map<number, ProjectTimes>
): Map<number, ProjectTimes> {
  // TODO: Implement
  return new Map();
}

/**
 * Find the critical path (projects with zero slack)
 * 
 * @param times - Calculated project times
 * @returns Array of project IDs on critical path
 * 
 * TODO: Implement
 * Critical path = all projects where slack = 0
 */
export function findCriticalPath(
  times: Map<number, ProjectTimes>
): number[] {
  // TODO: Implement
  return [];
}

interface DependencyGraphProps {
  projects: Project[];
  onDependencyAdd?: (fromId: number, toId: number) => void;
}

export default function DependencyGraph({ projects, onDependencyAdd }: DependencyGraphProps) {
  const [selectedFrom, setSelectedFrom] = useState<number | null>(null);
  const [selectedTo, setSelectedTo] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddDependency = () => {
    if (!selectedFrom || !selectedTo) return;

    // Check for circular dependency
    if (detectCycle(projects, selectedFrom, selectedTo)) {
      setError("Cannot add dependency: would create a circular dependency!");
      return;
    }

    setError(null);
    onDependencyAdd?.(selectedFrom, selectedTo);
    setSelectedFrom(null);
    setSelectedTo(null);
  };

  // TODO: Calculate CPM
  const sortedProjects = topologicalSort(projects);
  const times = sortedProjects ? calculateEarliestTimes(projects) : null;
  const criticalPath = times ? findCriticalPath(times) : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Dependencies & Critical Path</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Dependency UI */}
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="text-sm font-medium mb-1.5 block">
              Project depends on...
            </label>
            <Select
              value={selectedFrom?.toString()}
              onValueChange={(v) => setSelectedFrom(parseInt(v))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map(p => (
                  <SelectItem key={p.id} value={p.id.toString()}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium mb-1.5 block">
              Blocked by...
            </label>
            <Select
              value={selectedTo?.toString()}
              onValueChange={(v) => setSelectedTo(parseInt(v))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select dependency" />
              </SelectTrigger>
              <SelectContent>
                {projects.map(p => (
                  <SelectItem key={p.id} value={p.id.toString()}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleAddDependency}>Add Dependency</Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Dependency Visualization */}
        <div className="border rounded-lg p-4 min-h-[300px]">
          <h3 className="font-semibold mb-4">Dependency Graph</h3>
          {/* TODO: Visualize dependencies */}
          {/* Simple approach: List projects with their dependencies */}
          <div className="space-y-3">
            {projects.map(project => (
              <div
                key={project.id}
                className={`p-3 rounded border-2 ${
                  criticalPath.includes(project.id)
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200"
                }`}
              >
                <div className="font-medium">{project.name}</div>
                {project.dependencies.length > 0 && (
                  <div className="text-sm text-muted-foreground mt-1">
                    Depends on:{" "}
                    {project.dependencies
                      .map(depId => projects.find(p => p.id === depId)?.name)
                      .join(", ")}
                  </div>
                )}
                {times && times.has(project.id) && (
                  <div className="text-xs text-muted-foreground mt-2">
                    ES: {times.get(project.id)?.es} | 
                    EF: {times.get(project.id)?.ef} | 
                    Slack: {times.get(project.id)?.slack}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Critical Path Display */}
        {criticalPath.length > 0 && (
          <Alert>
            <AlertDescription>
              <strong>Critical Path:</strong>{" "}
              {criticalPath
                .map(id => projects.find(p => p.id === id)?.name)
                .join(" → ")}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

