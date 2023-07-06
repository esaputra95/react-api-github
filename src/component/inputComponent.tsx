import { FC, InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>


const InputComponent: FC<InputProps> = (props) => {
  const { onChange, value, placeholder, ...rest } = props
  return (
    <>
      <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder={placeholder} type="text" value={value} onChange={onChange} {...rest} />
    </>
  );
};

export default InputComponent;