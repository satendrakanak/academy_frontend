"use client";
import { Button } from "@/components/ui/button";

export default function ActionForm() {
  return (
    <div className="rounded-2xl border p-4 shadow-sm space-y-3">
      <h3 className="text-sm font-semibold">Publish</h3>

      <select className="w-full border rounded-md h-9 px-2 text-sm">
        <option>Draft</option>
        <option>Published</option>
      </select>

      <Button className="w-full">Save</Button>
    </div>
  );
}
