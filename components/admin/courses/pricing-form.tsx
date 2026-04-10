export const PricingForm = () => {
  return (
    <div className="rounded-2xl border p-6 shadow-sm space-y-4">
      <h3 className="font-semibold text-lg">Pricing</h3>

      <input className="input" placeholder="Price INR" />
      <input className="input" placeholder="Price USD" />

      <button className="btn">Save</button>
    </div>
  );
};
