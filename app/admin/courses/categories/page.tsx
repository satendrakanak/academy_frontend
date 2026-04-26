import { CreateCategoryForm } from "@/components/admin/categories/create-category-form";
import { CategoriesList } from "@/components/admin/categories/categories-list";
import { Category } from "@/types/category";
import { categoryServerService } from "@/services/categories/category.server";
import { Card, CardContent } from "@/components/ui/card";
import { getErrorMessage } from "@/lib/error-handler";
import { toast } from "sonner";
const CategoriesPage = async () => {
  let categories: Category[] = [];
  try {
    const response = await categoryServerService.getAll();
    categories = response.data.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    toast.error(message);
  }

  return (
    <div className="flex w-full items-center justify-between">
      <Card className="rounded-2xl w-full max-w-lg border bg-white shadow-sm">
        <CardContent className="p-6 space-y-6">
          <CreateCategoryForm />
        </CardContent>
      </Card>

      <CategoriesList categories={categories} />
    </div>
  );
};

export default CategoriesPage;
