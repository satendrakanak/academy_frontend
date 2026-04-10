export const FeaturesForm = () => {
  return (
    <div className="rounded-2xl border p-6 shadow-sm space-y-4">
      <h3 className="font-semibold text-lg">Features</h3>

      <label>
        <input type="checkbox" /> Certificate Available
      </label>

      <input placeholder="Exams" />
      <input placeholder="Study Material" />
      <input placeholder="Additional Book" />

      <button>Save</button>
    </div>
  );
};
