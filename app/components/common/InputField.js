"use client";

export default function InputField({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  type = "text",
  disabled = false
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-black dark:text-white">
        ✅ {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg 
          ${disabled 
            ? "bg-gray-500 text-white cursor-not-allowed" 
            : "bg-transparent text-black dark:text-white focus:ring-2 focus:ring-black focus:border-transparent"
          } 
          placeholder-gray-400 dark:placeholder-gray-500`}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
} 