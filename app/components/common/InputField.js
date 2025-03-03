"use client";

export default function InputField({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  type = "text" 
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        ✅ {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
        placeholder={placeholder}
      />
    </div>
  );
} 