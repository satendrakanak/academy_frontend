export function SwitchRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked?: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700">{label}</span>

      <button
        onClick={() => onChange(!checked)}
        className={`w-10 h-5 flex items-center rounded-full cursor-pointer p-1 transition ${
          checked ? "bg-primary" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow transform cursor-pointer transition ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}
