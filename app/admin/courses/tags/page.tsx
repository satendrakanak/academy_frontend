import { Card, CardContent } from "@/components/ui/card";
import { tagServerService } from "@/services/tags/tag.server";
import { Tag } from "@/types/tag";
import { TagsList } from "@/components/admin/tags/tags-list";
import { CreateTagForm } from "@/components/admin/tags/create-tag-form";
const TagsPage = async () => {
  let tags: Tag[] = [];
  try {
    const response = await tagServerService.getAll();
    tags = Array.isArray(response.data) ? response.data : response.data.data;
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="flex w-full items-center justify-between">
      <Card className="rounded-2xl w-full max-w-lg border bg-white shadow-sm">
        <CardContent className="p-6 space-y-6">
          <CreateTagForm />
        </CardContent>
      </Card>

      <TagsList tags={tags} />
    </div>
  );
};

export default TagsPage;
