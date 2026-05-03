export function SwitchRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked?: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-white/10 dark:bg-white/6">
      <div>
        <span className="text-sm font-medium text-slate-900 dark:text-white">{label}</span>
        {description ? (
          <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-300">
            {description}
          </p>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`mt-1 flex h-6 w-11 items-center rounded-full p-1 transition ${
          checked ? "bg-primary" : "bg-gray-300 dark:bg-white/20"
        }`}
      >
        <div
          className={`h-4 w-4 transform rounded-full bg-white shadow transition ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}
