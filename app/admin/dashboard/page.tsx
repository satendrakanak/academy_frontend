import data from "@/data/data.json";
import { columns } from "@/components/admin/data-table/columns";
import { DataTable } from "@/components/admin/data-table/data-table";
export default function Page() {
  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
