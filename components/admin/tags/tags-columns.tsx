"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IconDotsVertical } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tag } from "@/types/tag";

export const getTagsColumns = (
  onEdit: (tag: Tag) => void,
  onDelete: (tag: Tag) => void,
): ColumnDef<Tag>[] => [
  {
    accessorKey: "name",
    header: "Tag",
    cell: ({ row }) => {
      const tag = row.original;

      return (
        <div
          onClick={() => onEdit(tag)}
          className="flex items-center gap-3 cursor-pointer"
        >
          <span className="font-medium">{tag.name}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString("en-GB"),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const tag = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <IconDotsVertical />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onEdit(tag)}
              className="cursor-pointer"
            >
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              variant="destructive"
              onClick={() => onDelete(tag)}
              className="cursor-pointer"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
