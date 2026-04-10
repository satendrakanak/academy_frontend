import { DataTable } from "@/components/admin/data-table/data-table";
import data from "@/data/data.json";
import { columns } from "@/components/admin/data-table/columns";
const CoursesPage = async () => {
  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default CoursesPage;
