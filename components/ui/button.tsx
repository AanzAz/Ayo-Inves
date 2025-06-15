export const Button = ({ children, onClick, className }: any) => <button onClick={onClick} className={`p-2 bg-blue-600 text-white rounded ${className}`}>{children}</button>;
