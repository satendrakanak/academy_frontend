export const MediaForm = () => {
  return (
    <div className="rounded-2xl border p-6 shadow-sm space-y-4">
      <h3 className="font-semibold text-lg">Media</h3>

      <input type="file" />

      <button>Upload</button>
    </div>
  );
};
