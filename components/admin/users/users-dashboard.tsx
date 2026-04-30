"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, type ColumnDef } from "@tanstack/react-table";
import { Download, Trash2, Upload, UserPlus } from "lucide-react";
import { toast } from "sonner";

import { Paginated } from "@/types/api";
import { Role, User, UsersQueryParams } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userClientService } from "@/services/users/user.client";
import { getErrorMessage } from "@/lib/error-handler";
import { getUserColumns } from "./user-columns";
import { DataTableContent } from "../data-table/data-table-content";
import { UsersPagination } from "./users-pagination";
import { ConfirmDeleteDialog } from "@/components/modals/confirm-dialog";
import { CreateUserForm } from "./create-user-form";
import { BulkUsersImportDialog } from "./bulk-users-import-dialog";
import { exportUsersToWorkbook } from "./users-utils";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

function buildParams(current: URLSearchParams, next: UsersQueryParams) {
  const params = new URLSearchParams(current.toString());

  if (next.page !== undefined) {
    if (next.page) {
      params.set("page", String(next.page));
    } else {
      params.delete("page");
    }
  }
  if (next.limit !== undefined) {
    if (next.limit) {
      params.set("limit", String(next.limit));
    } else {
      params.delete("limit");
    }
  }
  if (next.search !== undefined) {
    if (next.search) {
      params.set("search", next.search);
    } else {
      params.delete("search");
    }
  }
  if (next.roleId !== undefined) {
    if (next.roleId) {
      params.set("roleId", String(next.roleId));
    } else {
      params.delete("roleId");
    }
  }
  if (next.includeDeleted !== undefined) {
    if (next.includeDeleted) {
      params.set("includeDeleted", "true");
    } else {
      params.delete("includeDeleted");
    }
  }

  return params.toString();
}

async function fetchAllUsersForExport(filters: UsersQueryParams) {
  const firstPage = await userClientService.list({
    ...filters,
    page: 1,
    limit: 100,
  });

  let users = [...firstPage.data.data];
  const totalPages = firstPage.data.meta.totalPages;

  for (let page = 2; page <= totalPages; page += 1) {
    const response = await userClientService.list({
      ...filters,
      page,
      limit: 100,
    });
    users = [...users, ...response.data.data];
  }

  return users;
}

export function UsersDashboard({
  paginatedUsers,
  roles,
  filters,
}: {
  paginatedUsers: Paginated<User>;
  roles: Role[];
  filters: UsersQueryParams;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(filters.search ?? "");
  const [deleteItem, setDeleteItem] = useState<User | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  const columns = useMemo<ColumnDef<User>[]>(
    () => getUserColumns((user) => {
      setDeleteItem(user);
      setDeleteOpen(true);
    }),
    [],
  );

  const table = useReactTable({
    data: paginatedUsers.data,
    columns,
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    manualPagination: true,
    pageCount: paginatedUsers.meta.totalPages,
    state: {
      pagination: {
        pageIndex: paginatedUsers.meta.currentPage - 1,
        pageSize: paginatedUsers.meta.itemsPerPage,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const selectedUsers = table.getSelectedRowModel().rows.map((row) => row.original);

  const pushParams = (next: UsersQueryParams) => {
    const query = buildParams(searchParams, next);
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const handleDelete = async () => {
    if (!deleteItem) return;

    try {
      setIsDeleting(true);
      await userClientService.delete(deleteItem.id);
      toast.success("User deleted");
      setDeleteOpen(false);
      router.refresh();
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedUsers.length) return;

    try {
      setIsDeleting(true);
      await userClientService.deleteBulk(selectedUsers.map((user) => user.id));
      toast.success(`${selectedUsers.length} users deleted`);
      setBulkDeleteOpen(false);
      router.refresh();
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExportCurrent = () => {
    exportUsersToWorkbook(paginatedUsers.data, "users-current-page.xlsx");
  };

  const handleExportSelected = () => {
    if (!selectedUsers.length) {
      toast.error("Select at least one user to export");
      return;
    }

    exportUsersToWorkbook(selectedUsers, "users-selected.xlsx");
  };

  const handleExportAll = async () => {
    try {
      setIsExporting(true);
      const users = await fetchAllUsersForExport(filters);
      exportUsersToWorkbook(users, "users-all.xlsx");
      toast.success(`${users.length} users exported`);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[30px] border border-[var(--brand-100)] bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.16),transparent_32%),linear-gradient(135deg,#ffffff_0%,#f8fbff_48%,#eef4ff_100%)] p-6 shadow-[0_28px_70px_-42px_rgba(15,23,42,0.4)] md:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex rounded-full border border-[var(--brand-200)] bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brand-700)]">
              User Management
            </span>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                Complete learner and admin control
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
                Search, filter, import, export, and manage user profiles from one polished dashboard.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Total Users
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-950">
                {paginatedUsers.meta.totalItems}
              </p>
            </div>
            <div className="rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Current Page
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-950">
                {paginatedUsers.meta.currentPage}
              </p>
            </div>
            <div className="rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Per Page
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-950">
                {paginatedUsers.meta.itemsPerPage}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-[var(--brand-100)] bg-white p-4 shadow-[0_18px_50px_-36px_rgba(15,23,42,0.28)] md:p-5">
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 xl:flex-row xl:items-center xl:justify-between">
          <form
            className="flex flex-1 flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              pushParams({ page: 1, search: searchValue });
            }}
          >
            <Input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search by name, email, username, or phone"
              className="h-11 flex-1 rounded-2xl"
            />
            <Select
              value={filters.roleId ? String(filters.roleId) : "all"}
              onValueChange={(value) =>
                pushParams({
                  page: 1,
                  roleId: value === "all" ? undefined : Number(value),
                })
              }
            >
              <SelectTrigger className="h-11 w-full rounded-2xl sm:w-56">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All roles</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={String(role.id)}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" className="h-11 rounded-2xl px-5">
              Apply Filters
            </Button>
          </form>

          <div className="flex flex-wrap items-center gap-2">
            {selectedUsers.length > 0 && (
              <Button
                variant="destructive"
                onClick={() => setBulkDeleteOpen(true)}
                className="rounded-2xl"
              >
                <Trash2 className="size-4" />
                Delete Selected ({selectedUsers.length})
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-2xl"
                  disabled={isExporting}
                >
                  <Download className="size-4" />
                  {isExporting ? "Exporting..." : "Export"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>User Export</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleExportCurrent}>
                  Current page
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportSelected}>
                  Selected rows
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportAll}>
                  All matching users
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              onClick={() => setIsImportOpen(true)}
              className="rounded-2xl"
            >
              <Upload className="size-4" />
              Import Users
            </Button>

            <Button onClick={() => setIsCreateOpen(true)} className="rounded-2xl">
              <UserPlus className="size-4" />
              Add User
            </Button>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-[24px] border border-slate-100">
          <DataTableContent
            table={table}
            data={paginatedUsers.data}
            getRowId={(row) => row.id}
          />
          <UsersPagination paginatedUsers={paginatedUsers} />
        </div>
      </section>

      <Drawer
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        direction="right"
      >
        <DrawerContent className="w-full border-l border-[var(--brand-100)] bg-white sm:max-w-[620px]">
          <DrawerHeader className="border-b border-slate-100 px-6 py-5 text-left">
            <DrawerTitle className="text-2xl font-semibold text-slate-950">
              Create user
            </DrawerTitle>
            <DrawerDescription className="text-sm text-slate-500">
              Add a new user with a simplified setup. Username and password will be generated automatically.
            </DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="h-[calc(100vh-92px)]">
            <div className="px-6 py-5">
              <CreateUserForm
                onSuccess={() => {
                  setIsCreateOpen(false);
                  router.refresh();
                }}
              />
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>

      <BulkUsersImportDialog
        open={isImportOpen}
        onOpenChange={setIsImportOpen}
        onImported={() => router.refresh()}
      />

      <ConfirmDeleteDialog
        deleteText="user"
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        loading={isDeleting}
      />

      <ConfirmDeleteDialog
        deleteText="selected users"
        open={bulkDeleteOpen}
        onClose={() => setBulkDeleteOpen(false)}
        onConfirm={handleBulkDelete}
        loading={isDeleting}
      />
    </div>
  );
}
