import { Link } from "react-router-dom";

interface ButtonProps {
  label: string;
  to?: string | undefined;
  onClick?: VoidFunction;
}

export function Button({ label, to, ...props }: ButtonProps) {
  return (
    <Link
      to={to ?? "#"}
      className="flex justify-center items-center md:text-2xl rounded-4xl py-2 px-4 
      font-bold text-gray-200  bg-linear-to-r from-blue-500 to-blue-800 hover:scale-110 hover:opacity-90
      active:hover:scale-105 duration-300 shadow-2xl my-5"
      {...props}
    >
      {label}
    </Link>
  );
}
