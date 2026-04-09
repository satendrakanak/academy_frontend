import { DataTable } from "@/components/admin/data-table/data-table";
import data from "@/data/data.json";
import { columns } from "@/components/admin/data-table/columns";
import { getSession } from "@/lib/auth";
const CoursesPage = async () => {
  const user = await getSession();

  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default CoursesPage;
