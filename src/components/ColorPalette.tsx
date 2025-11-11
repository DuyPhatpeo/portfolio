import React from "react";

const COLORS = [
  {
    name: "Primary",
    items: [
      { label: "primary", class: "bg-primary", light: false },
      { label: "primary-deep", class: "bg-primary-deep", light: false },
      { label: "primary-mild", class: "bg-primary-mild", light: true },
      { label: "primary-subtle", class: "bg-primary-subtle", light: true },
    ],
  },
  {
    name: "Secondary",
    items: [
      { label: "secondary", class: "bg-secondary", light: false },
      { label: "secondary-deep", class: "bg-secondary-deep", light: false },
      { label: "secondary-mild", class: "bg-secondary-mild", light: true },
      { label: "secondary-subtle", class: "bg-secondary-subtle", light: true },
    ],
  },
  {
    name: "Success",
    items: [
      { label: "success", class: "bg-success", light: false },
      { label: "success-subtle", class: "bg-success-subtle", light: true },
    ],
  },
  {
    name: "Error",
    items: [
      { label: "error", class: "bg-error", light: false },
      { label: "error-subtle", class: "bg-error-subtle", light: true },
    ],
  },
  {
    name: "Info",
    items: [
      { label: "info", class: "bg-info", light: false },
      { label: "info-subtle", class: "bg-info-subtle", light: true },
    ],
  },
  {
    name: "Warning",
    items: [
      { label: "warning", class: "bg-warning", light: false },
      { label: "warning-subtle", class: "bg-warning-subtle", light: true },
    ],
  },
  {
    name: "Neutral",
    items: [{ label: "neutral", class: "bg-neutral", light: true }],
  },
];

const ColorPalette: React.FC = () => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-7xl">
      {COLORS.map((group) => (
        <div
          key={group.name}
          className="rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden bg-white/40 dark:bg-white/5 backdrop-blur-md"
        >
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 font-semibold text-lg">
            {group.name}
          </div>

          <div>
            {group.items.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between px-4 py-3 border-b last:border-none border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-700 ${item.class}`}
                  ></div>
                  <span className="font-mono text-sm">{item.label}</span>
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded font-medium ${
                    item.light
                      ? "text-gray-800 bg-gray-100 dark:bg-gray-800 dark:text-gray-100"
                      : "text-white shadow-sm"
                  } ${item.class}`}
                >
                  var(--{item.label})
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorPalette;
