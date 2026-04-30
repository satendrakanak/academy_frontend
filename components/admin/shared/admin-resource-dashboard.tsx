"use client";

import { ReactNode, useMemo, useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Download, Search, Trash2, type LucideIcon } from "lucide-react";
import * as XLSX from "xlsx";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableContent } from "@/components/admin/data-table/data-table-content";
import { DataTablePagination } from "@/components/admin/data-table/data-table-pagination";

type StatItem = {
  label: string;
  value: string | number;
  icon: LucideIcon;
};

export function exportRowsToWorkbook<TData>(
  rows: TData[],
  fileName: string,
  mapRow: (row: TData) => Record<string, unknown>,
) {
  const worksheet = XLSX.utils.json_to_sheet(rows.map(mapRow));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Export");
  XLSX.writeFile(workbook, fileName);
}

export function AdminResourceDashboard<TData extends { id: number | string }>({
  eyebrow,
  title,
  description,
  data,
  columns,
  stats,
  searchPlaceholder,
  searchFields,
  getRowId,
  actions,
  selectedActions,
  exportFileName,
  mapExportRow,
  emptyTitle = "No records found",
  emptyDescription = "Data will appear here once it is available.",
}: {
  eyebrow: string;
  title: string;
  description: string;
  data: TData[];
  columns: ColumnDef<TData>[];
  stats: StatItem[];
  searchPlaceholder: string;
  searchFields: Array<(row: TData) => string | number | null | undefined>;
  getRowId?: (row: TData) => string;
  actions?: ReactNode;
  selectedActions?: (selectedRows: TData[]) => ReactNode;
  exportFileName: string;
  mapExportRow: (row: TData) => Record<string, unknown>;
  emptyTitle?: string;
  emptyDescription?: string;
}) {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return data;

    return data.filter((row) =>
      searchFields.some((getValue) =>
        String(getValue(row) ?? "")
          .toLowerCase()
          .includes(needle),
      ),
    );
  }, [data, search, searchFields]);

  // TanStack Table exposes stateful helpers; keeping it local avoids stale references.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: filteredData,
    columns,
    getRowId: getRowId ?? ((row) => String(row.id)),
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-[var(--brand-100)] bg-[linear-gradient(135deg,#ffffff_0%,#f8fbff_55%,#eef4ff_100%)] p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex rounded-full border border-[var(--brand-200)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-700)]">
              {eyebrow}
            </span>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
                {title}
              </h1>
              <p className="mt-2 text-sm text-slate-600">{description}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="rounded-2xl"
              onClick={() =>
                exportRowsToWorkbook(filteredData, exportFileName, mapExportRow)
              }
              disabled={!filteredData.length}
            >
              <Download className="size-4" />
              Export
            </Button>
            {actions}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/80 bg-white px-5 py-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <stat.icon className="size-5 text-[var(--brand-600)]" />
              </div>
              <p className="mt-3 text-3xl font-semibold text-slate-950">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-3.5 size-4 text-slate-400" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={searchPlaceholder}
              className="h-11 rounded-2xl pl-9"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              className="rounded-2xl"
              disabled={!selectedRows.length}
              onClick={() =>
                exportRowsToWorkbook(
                  selectedRows,
                  `selected-${exportFileName}`,
                  mapExportRow,
                )
              }
            >
              <Download className="size-4" />
              Export Selected
            </Button>
            {selectedActions?.(selectedRows)}
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-[24px] border border-slate-100">
          {filteredData.length ? (
            <>
              <DataTableContent
                table={table}
                data={filteredData}
                getRowId={(row) => row.id}
              />
              <div className="border-t border-slate-100 py-4">
                <DataTablePagination table={table} />
              </div>
            </>
          ) : (
            <div className="px-6 py-16 text-center">
              <p className="text-base font-semibold text-slate-950">{emptyTitle}</p>
              <p className="mt-1 text-sm text-slate-500">{emptyDescription}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export function DeleteSelectedButton({
  disabled,
  onClick,
  label = "Delete Selected",
}: {
  disabled: boolean;
  onClick: () => void;
  label?: string;
}) {
  return (
    <Button
      variant="outline"
      className="rounded-2xl"
      disabled={disabled}
      onClick={onClick}
    >
      <Trash2 className="size-4" />
      {label}
    </Button>
  );
}
