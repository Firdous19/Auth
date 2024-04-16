type ButtonProps = {
    children: React.ReactNode,
    buttonDisabled: boolean,
    type: "submit" | "reset" | "button"
}


export default function Button({ children, buttonDisabled, type }: ButtonProps) {
    return <button className={`bg-blue-600 py-2 px-4 rounded-md text-white border-2 border-blue-600 hover:bg-transparent hover:text-blue-600 transition-all duration-300 ease-in-out cursor-pointer`} disabled={buttonDisabled} type={type}>{children}</button>
}