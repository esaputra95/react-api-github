import { FC } from 'react';
import { BsFillArrowDownCircleFill, BsStarFill, BsFillArrowUpCircleFill } from "react-icons/bs";
import { UserInterface } from '../interface';
import Skeleton from './skeleton';

type openRepoProps = {
    index: number;
    user: string
}

interface ListProps {
    data: UserInterface;
    index: number;
    onOpenRepositories: ({index, user}:openRepoProps)=> Promise<void>
}

const ListComponent: FC<ListProps>  = ({data, index, onOpenRepositories}) => (
    <>
        <span onClick={()=>onOpenRepositories({index:index, user:data.login})} className='w-full bg-gray-200 flex justify-between h-12 items-center px-4 mb-2 rounded-md hover:cursor-pointer'>
            <label className='font-semibold'>{data.login}</label>
            {
                data.status?<BsFillArrowUpCircleFill className='text-gray-800 hover:cursor-pointer' />: <BsFillArrowDownCircleFill className='text-gray-800 hover:cursor-pointer' />
            }
            
        </span>
        <div className='pl-4'>
            {
                data.loading_repossitori ? <Skeleton count={2} /> : null
            }
        </div>
        {
            data.status && data.repossitori ? data.repossitori.map((value)=>(
                <div className='w-full flex justify-between rounded-md pl-4'>
                    <div className='w-full bg-gray-300 mb-2 flex justify-between rounded-md'>
                        <div className='flex flex-col py-1 px-4 w-10/12 '>
                            <label className='font-semibold'>{value.name}</label>
                            <label>{value.description}</label>
                        </div>
                        <div className='w-2/12 flex justify-end px-4 py-1 '>
                            <div className='flex h-8 items-center'>
                                <label className='font-semibold mr-1'>{value.stargazers_count}</label>
                                <BsStarFill />
                            </div>
                        </div>
                    </div>
                </div>
            )):null
        }
        
    </>
);

export default ListComponent;