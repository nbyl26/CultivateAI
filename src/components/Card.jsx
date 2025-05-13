export default function Card({
    children,
    className = '',
    color = 'bg-white',
    shadow = 'shadow-md',
    borderRadius = 'rounded-xl',
    size = 'md',
    ...props
}) {
    const sizeClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    return (
        <div
            className={`${color} ${shadow} ${borderRadius} ${sizeClasses[size]} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
