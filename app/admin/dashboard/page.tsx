import data from "@/data/data.json";
import { columns } from "@/components/admin/data-table/columns";
import { DataTable } from "@/components/admin/data-table/data-table";
import { VerifiedToast } from "@/components/admin/verified-toast";
export default function DashboardPage() {
  return (
    <div>
      <DataTable data={data} columns={columns} />
      <VerifiedToast />
    </div>
  );
}
