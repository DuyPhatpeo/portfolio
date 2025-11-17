import React from "react";

interface ContactCardProps {
  icon: React.FC<any>;
  label: string;
  value: string;
  href: string;
  color: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
  icon: Icon,
  label,
  value,
  href,
  color,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group p-6 rounded-2xl border border-gray-200/20 dark:border-white/10 bg-white/40 dark:bg-gray-800/40 shadow-lg backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="flex flex-col items-center text-center gap-3">
        <div
          className={`p-4 rounded-full bg-white dark:bg-gray-900 shadow-md ${color}`}
        >
          <Icon className="w-6 h-6" />
        </div>

        <p className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400">
          {label}
        </p>

        <p className="font-bold text-gray-800 dark:text-gray-100 text-lg">
          {value}
        </p>
      </div>
    </a>
  );
};

export default ContactCard;
