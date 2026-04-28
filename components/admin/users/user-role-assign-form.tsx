"use client";

import { useEffect, useState } from "react";
import { userClientService } from "@/services/users/user.client";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { Role, User } from "@/types/user";
import { getErrorMessage } from "@/lib/error-handler";
import { Button } from "@/components/ui/button";
import { ConfirmUpdateDialog } from "@/components/modals/confirm-update-dialog";
import { useRouter } from "next/navigation";

interface UserRoleAssignFormProps {
  user: User;
}

export function UserRoleAssignForm({ user }: UserRoleAssignFormProps) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const response = await userClientService.getAllRoles();
        setRoles(response.data as Role[]);
        const existing = user.roles?.map((r) => r.id) || [];
        setSelected(existing);
      } catch (error: unknown) {
        toast.error(getErrorMessage(error));
      }
    };

    loadRoles();
  }, [user]);

  const studentRole = roles.find((r) => r.name === "student");

  const toggleRole = (roleId: number) => {
    if (roleId === studentRole?.id) return;
    setSelected((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId],
    );
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      await userClientService.update(user.id, {
        roleIds: selected,
      });

      router.refresh();
      toast.success("Roles updated successfully");
      setConfirmOpen(false);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="rounded-xl border bg-white">
        {/* Header */}
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h3 className="text-sm font-semibold">User Roles</h3>

          <Button
            size="sm"
            onClick={() => setConfirmOpen(true)}
            disabled={loading}
          >
            Update
          </Button>
        </div>

        <div className="p-4 space-y-4">
          {/* Selected Roles Preview */}
          <div className="flex flex-wrap gap-2">
            {roles
              .filter((r) => selected.includes(r.id))
              .map((r) => (
                <span
                  key={r.id}
                  className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md"
                >
                  {r.name.toUpperCase()}
                </span>
              ))}
          </div>

          {/* Roles List */}
          <div className="max-h-52 overflow-y-auto space-y-2">
            {roles.map((role) => {
              const isChecked = selected.includes(role.id);

              return (
                <label
                  key={role.id}
                  className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition border
                    ${
                      isChecked
                        ? "bg-primary/10 border-primary/30"
                        : "border-transparent hover:bg-gray-50"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={role.id === studentRole?.id}
                      onChange={() => toggleRole(role.id)}
                      className="h-4 w-4 accent-primary cursor-pointer"
                    />
                    <span className="text-sm font-medium flex items-center gap-1">
                      {role.name.toUpperCase()}
                      {role.id === studentRole?.id && (
                        <span className="text-xs text-muted-foreground">
                          (Required)
                        </span>
                      )}
                    </span>
                  </div>

                  {isChecked && <Check size={16} className="text-primary" />}
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* 🔥 CONFIRM DIALOG */}
      <ConfirmUpdateDialog
        deleteText="user roles"
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleSave}
        loading={loading}
      />
    </>
  );
}
