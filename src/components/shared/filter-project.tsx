import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { useState } from "react";

const statuses = [
    { value: "open", label: "Open" },
    { value: "in_progress", label: "In Progress" },
    { value: "closed", label: "Closed" },
];

const priorities = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
];

export function FilterProjectDropdown() {
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [selectedPriority, setSelectedPriority] = useState<string | null>(null);

    const handleStatusSelect = (statusValue: string) => {
        setSelectedStatuses((prev) =>
            prev.includes(statusValue)
                ? prev.filter((s) => s !== statusValue)
                : [...prev, statusValue]
        );
    };

    const handlePrioritySelect = (priorityValue: string) => {
        setSelectedPriority(priorityValue);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Filter</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <h3 className="px-2 py-1.5 text-sm font-semibold">Priority</h3>
                    {priorities.map((priority) => (
                        <DropdownMenuItem
                            key={priority.value}
                            onSelect={() => handlePrioritySelect(priority.value)}
                            className={selectedPriority === priority.value ? "bg-accent" : ""}
                        >
                            {priority.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <h3 className="px-2 py-1.5 text-sm font-semibold">Status</h3>
                    <Command>
                        <CommandList>
                            <CommandGroup>
                                {statuses.map((status) => (
                                    <CommandItem
                                        key={status.value}
                                        onSelect={() => handleStatusSelect(status.value)}
                                        className={selectedStatuses.includes(status.value) ? "bg-accent" : ""}
                                    >
                                        {status.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}