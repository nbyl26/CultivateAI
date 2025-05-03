export default function Input({ value, onChange, placeholder, className, type = "text", ...props }) {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`border border-green-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition-all ${className}`}
            {...props}
        />
    );
}
