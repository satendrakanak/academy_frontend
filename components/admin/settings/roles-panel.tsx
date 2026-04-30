"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Edit3, ShieldPlus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfirmDeleteDialog } from "@/components/modals/confirm-dialog";
import { accessControlClientService } from "@/services/access-control/access-control.client";
import { getErrorMessage } from "@/lib/error-handler";
import { isSystemRole } from "@/lib/access-control";
import { Permission, Role } from "@/types/user";
import { RoleDialog } from "./role-dialog";
import { summarizeRoleModules } from "./access-control-utils";

export function RolesPanel({
  roles,
  permissions,
  onRolesChange,
}: {
  roles: Role[];
  permissions: Permission[];
  onRolesChange: (roles: Role[]) => void;
}) {
  const router = useRouter();
  const [editorOpen, setEditorOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<Role | null>(null);
  const [deleteRole, setDeleteRole] = useState<Role | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const sortedRoles = useMemo(
    () => [...roles].sort((a, b) => a.name.localeCompare(b.name)),
    [roles],
  );

  const handleSaved = (savedRole: Role, isEdit: boolean) => {
    if (isEdit) {
      onRolesChange(
        roles.map((role) => (role.id === savedRole.id ? savedRole : role)),
      );
      return;
    }

    onRolesChange([...roles, savedRole]);
  };

  const handleDelete = async () => {
    if (!deleteRole) {
      return;
    }

    try {
      setIsDeleting(true);
      await accessControlClientService.deleteRole(deleteRole.id);
      toast.success("Role deleted");
      onRolesChange(roles.filter((role) => role.id !== deleteRole.id));
      setDeleteRole(null);
      router.refresh();
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Card className="border border-[var(--brand-100)] bg-white shadow-[0_20px_60px_-42px_rgba(15,23,42,0.35)]">
        <CardHeader className="flex flex-col gap-4 border-b border-slate-100 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-slate-950">
              Role Management
            </CardTitle>
            <p className="mt-1 text-sm text-slate-500">
              Create clear admin roles and assign the exact permissions each one needs.
            </p>
          </div>
          <Button
            onClick={() => {
              setActiveRole(null);
              setEditorOpen(true);
            }}
          >
            <ShieldPlus className="size-4" />
            Add Role
          </Button>
        </CardHeader>

        <CardContent className="grid gap-4 pt-5 xl:grid-cols-2">
          {sortedRoles.map((role) => {
            const moduleSummary = summarizeRoleModules(role);

            return (
              <div
                key={role.id}
                className="rounded-[24px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] p-5 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.26)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-slate-950">
                        {role.name}
                      </h3>
                      {isSystemRole(role.name) && (
                        <Badge className="border-[var(--brand-200)] bg-[var(--brand-50)] text-[var(--brand-700)]">
                          System
                        </Badge>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      {(role.permissions?.length ?? 0)} permissions assigned
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setActiveRole(role);
                        setEditorOpen(true);
                      }}
                    >
                      <Edit3 className="size-3.5" />
                      Edit
                    </Button>
                    {!isSystemRole(role.name) && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeleteRole(role)}
                      >
                        <Trash2 className="size-3.5" />
                        Delete
                      </Button>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {moduleSummary.length > 0 ? (
                    moduleSummary.map((item) => (
                      <span
                        key={`${role.id}-${item.module}`}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                      >
                        {item.module} · {item.total}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-400">
                      No permissions assigned yet.
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <RoleDialog
        open={editorOpen}
        onOpenChange={setEditorOpen}
        role={activeRole}
        permissions={permissions}
        onSaved={handleSaved}
      />

      <ConfirmDeleteDialog
        deleteText="role"
        open={Boolean(deleteRole)}
        onClose={() => setDeleteRole(null)}
        onConfirm={handleDelete}
        loading={isDeleting}
      />
    </>
  );
}
