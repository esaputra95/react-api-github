import { FC } from 'react'
interface SkeletonInterface {
    count?:number
}
const Skeleton: FC<SkeletonInterface> = ({count=1}) => {
    const component = []
    for (let index = 0; index < count; index++) {
        component.push(<SkeletonComponent key={index} />)
    }
    return<>{component}</>
}

const SkeletonComponent : FC = () => (
    <div className=" flex space-x-4 animate-pulse ">
        <div className="w-full bg-gray-200 flex justify-between h-12 items-center mb-2 rounded-md " />
    </div>
)

export default Skeleton