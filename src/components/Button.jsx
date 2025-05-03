export default function Button({ children, onClick, className = '', color = 'bg-green-600', size = 'md', ...props }) {
    const sizeClasses = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    return (
        <button
            onClick={onClick}
            className={`${color} text-white rounded-xl font-medium hover:brightness-110 transition ${sizeClasses[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
