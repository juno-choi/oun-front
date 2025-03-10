"use client";

export default function RoutineSelect({
    label, 
    name, 
    value, 
    onChange, 
    options = [],
    placeholder = "선택해주세요",
    required = false,
    disabled = false
}) {
    return (
        <div className="space-y-2">
            <label htmlFor={name} className="block text-sm font-medium text-black dark:text-white">✅ {label}</label>
            <select 
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={`w-full px-4 py-2 border border-gray-500 rounded-lg 
                ${disabled 
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed" 
                    : "bg-white text-black dark:bg-gray-600 dark:text-white focus:ring-2 focus:ring-black focus:border-transparent"
                } 
                placeholder-gray-400 dark:placeholder-gray-500`}
                disabled={disabled}
            >
                <option value="" disabled={required}>{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>

    )
}
