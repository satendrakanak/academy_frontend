import { redirect } from "next/navigation";

const AdminSettingsPage = () => {
  redirect("/admin/settings/access-control");
};

export default AdminSettingsPage;
