
type InputProps = {
    label: string,
    type: string,
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ label, type, placeholder, value, onChange }: InputProps) {
    return (
        <div className="space-y-3">
            <label className="block text-md" htmlFor={label}>{label}</label>
            <input className="w-full border p-2 rounded-md" type={type} name={label} id={label} placeholder={placeholder} value={value} onChange={onChange} />
        </div>
    )
}

export default Input;