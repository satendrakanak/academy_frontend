"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { compactNumberFormatter } from "@/components/admin/dashboard/dashboard-utils";
import { Permission, Role } from "@/types/user";
import { getPermissionGroups, isSystemRole } from "@/lib/access-control";
import { KeyRound, ShieldCheck, ShieldEllipsis, Users } from "lucide-react";

const statCardConfig = [
  {
    key: "roles",
    title: "Total Roles",
    icon: ShieldCheck,
    tone: "from-[var(--brand-500)]/16 via-[var(--brand-100)] to-white",
  },
  {
    key: "customRoles",
    title: "Custom Roles",
    icon: ShieldEllipsis,
    tone: "from-emerald-500/16 via-emerald-50 to-white",
  },
  {
    key: "permissions",
    title: "Permissions",
    icon: KeyRound,
    tone: "from-sky-500/16 via-sky-50 to-white",
  },
  {
    key: "assignments",
    title: "Role Assignments",
    icon: Users,
    tone: "from-violet-500/16 via-violet-50 to-white",
  },
] as const;

export function AccessControlOverview({
  roles,
  permissions,
}: {
  roles: Role[];
  permissions: Permission[];
}) {
  const permissionGroups = getPermissionGroups(permissions);
  const totalAssignments = roles.reduce(
    (sum, role) => sum + (role.permissions?.length ?? 0),
    0,
  );

  const statValues = {
    roles: compactNumberFormatter.format(roles.length),
    customRoles: compactNumberFormatter.format(
      roles.filter((role) => !isSystemRole(role.name)).length,
    ),
    permissions: compactNumberFormatter.format(permissions.length),
    assignments: compactNumberFormatter.format(totalAssignments),
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCardConfig.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.key}
              className={`border border-[var(--brand-100)] bg-gradient-to-br ${card.tone} shadow-[0_20px_60px_-42px_rgba(15,23,42,0.35)]`}
            >
              <CardHeader className="pb-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">{card.title}</p>
                    <CardTitle className="mt-2 text-3xl font-semibold text-slate-950">
                      {statValues[card.key]}
                    </CardTitle>
                  </div>
                  <div className="rounded-2xl bg-white/80 p-3 text-[var(--brand-700)] shadow-sm">
                    <Icon className="size-5" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-3">
                <p className="text-sm text-slate-500">
                  {card.key === "roles" && "Keep your admin hierarchy structured."}
                  {card.key === "customRoles" &&
                    "Separate academy operations from system defaults."}
                  {card.key === "permissions" &&
                    "Granular actions for every admin module."}
                  {card.key === "assignments" &&
                    "Total permissions attached across all roles."}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="border border-[var(--brand-100)] bg-white shadow-[0_20px_60px_-42px_rgba(15,23,42,0.35)]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-950">
              Permission Modules
            </CardTitle>
            <p className="text-sm text-slate-500">
              See how your access rules are distributed across the platform.
            </p>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {permissionGroups.map((group) => (
              <div
                key={group.module}
                className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">
                    {group.module
                      .split("_")
                      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                      .join(" ")}
                  </p>
                  <Badge variant="outline">{group.permissions.length}</Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.permissions.slice(0, 4).map((permission) => (
                    <span
                      key={permission.id}
                      className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200"
                    >
                      {permission.name}
                    </span>
                  ))}
                  {group.permissions.length > 4 && (
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
                      +{group.permissions.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-[var(--brand-100)] bg-white shadow-[0_20px_60px_-42px_rgba(15,23,42,0.35)]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-950">
              Protected Roles
            </CardTitle>
            <p className="text-sm text-slate-500">
              These baseline roles stay locked to protect the academy setup.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {roles
              .filter((role) => isSystemRole(role.name))
              .map((role) => (
                <div
                  key={role.id}
                  className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {role.permissions?.length ?? 0} permissions assigned
                      </p>
                    </div>
                    <Badge className="border-[var(--brand-200)] bg-[var(--brand-50)] text-[var(--brand-700)]">
                      System
                    </Badge>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
