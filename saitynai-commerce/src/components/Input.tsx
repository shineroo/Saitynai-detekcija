import { ChangeEvent, FC } from 'react'

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password'
  label: string
  value: string | number
  placeholder: string
  disabled?: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = ({
  type,
  label,
  value,
  placeholder,
  disabled,
  onChange,
}) => {
  return (
    <div className="input-wrapper">
      <input
        type={type}
        id={label}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  )
}

export default Input