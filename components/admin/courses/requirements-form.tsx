export const RequirementsForm = () => {
  return (
    <div className="rounded-2xl border p-6 shadow-sm space-y-4">
      <h3 className="font-semibold text-lg">Requirements</h3>

      <textarea placeholder="Technology Requirements" />
      <textarea placeholder="Eligibility Requirements" />

      <button>Save</button>
    </div>
  );
};
