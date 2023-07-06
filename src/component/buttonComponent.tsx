import { FC, MouseEvent } from 'react';
import { BsSearch } from "react-icons/bs";

interface ButtonProps {
  children: string;
  isFetching: boolean;
  handleOnClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ButtonComponent: FC<ButtonProps> = ({ children, isFetching, handleOnClick }) => {
	return (
		<>
			<button className='bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded-md w-full flex justify-center items-center' onClick={handleOnClick}>
				{
					isFetching?'Loading':children
				}
			</button>
		</>
	);
};

export default ButtonComponent;