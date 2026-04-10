"use client";

export const RightSidebar = () => {
  const sections = [
    "Basic Info",
    "Pricing",
    "Details",
    "Features",
    "Requirements",
    "Media",
    "Meta",
  ];

  return (
    <div className="sticky top-24 space-y-3">
      <div className="rounded-2xl border p-4 shadow-sm">
        <h3 className="text-sm font-semibold mb-3">Setup Progress</h3>

        <div className="space-y-2">
          {sections.map((item) => (
            <div
              key={item}
              className="text-sm text-muted-foreground hover:text-black cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
