import { useState, ChangeEvent, FC, useEffect , KeyboardEvent} from 'react'
import 'react-toastify/dist/ReactToastify.css';
import InputComponent from './component/inputComponent'
import ButtonComponent from './component/buttonComponent'
import { fetchDataUser, fetchDataRepositori } from './hooks/useFetch'
import ListComponent from './component/listComponent'
import { UserInterface } from './interface'
import { ToastContainer, toast } from 'react-toastify'
import Skeleton from './component/skeleton'

interface fetchInterface {
    loading: boolean;
    data: UserInterface[];
}

type getDataType = string

type getRepoType = {
    index: number;
    user:string;
}

const App: FC = () => {
    const [dataUser, setDataUser] = useState<fetchInterface>({loading:false, data:[]})
    const [query, setQuery] = useState<string>('')
    const [onSearch, setOnnSearch] = useState<string>('')

    useEffect(()=> {
        getData(query)
    }, [])

    const getData = async (query: getDataType): Promise<void> => {
        setDataUser({...dataUser, loading:true})
        let data = []
        if(query) {
            const {data:dataResponse, error} = await fetchDataUser('search/users', {q: query});

            data=dataResponse
            if(error){
                toast.error(`${error.message}`, {
                    position: "top-center",
                    autoClose: 5000,
                });
            }
        }
        setDataUser({...dataUser, loading:false, data})
    }

    const handleOnChange = (event:ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
    }

    const handleSearch = () => {
        getData(query)
        setOnnSearch(query)
    }

    const handleOnEnter = (event:KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter"){
            getData(query)
            setOnnSearch(query)
        }
    }

    const onOpenRepositories = async (args:getRepoType) => {
        const {index, user} = args;
        const newDataUSer = [...dataUser.data];
        newDataUSer[index].loading_repossitori = true
        setDataUser({...dataUser, data: newDataUSer})
        if(newDataUSer[index].status){
            newDataUSer[index].status = false
        }else{
            if(!newDataUSer[index].repossitori) {
                const {error, data} = await fetchDataRepositori(`users/${user}/repos`);
                if(error){
                    toast.error(`${error.message}`, {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }
                newDataUSer[index].repossitori = data
            }
            newDataUSer[index].status = true
        }
        newDataUSer[index].loading_repossitori = false
        setDataUser({...dataUser, data: newDataUSer})
    }
    
    return(
        <div className='w-full flex justify-center bg-gray-300 min-h-screen'>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className='w-full mx-2 md:w-6/12 p-4 bg-white'>
                <div className='m-2'>
                    <InputComponent onKeyUp={handleOnEnter} onChange={handleOnChange} value={query} placeholder='Search user' />
                </div>
                <div className='m-2'>
                    <ButtonComponent handleOnClick={handleSearch} isFetching={dataUser.loading}>Search</ButtonComponent>
                </div>
                <div className='m-2'>
                    {
                        onSearch!==""?<label>Showing User for username "{onSearch}"</label>:null
                    }
                </div>
                {
                    dataUser.loading? 
                    <div className='m-2'>
                        <Skeleton count={5} />
                    </div>: null
                }
                <div className='m-2'>
                    {
                        !dataUser.loading?
                        dataUser && dataUser.data.length>0 ?dataUser.data.map((value:UserInterface, key:number)=>(
                            <div key={value.id}>
                                <ListComponent
                                    data={value}
                                    index={key}
                                    onOpenRepositories={onOpenRepositories}
                                />
                            </div>
                        )) : null : null
                    }
                </div>
            </div>
        </div>
    )
}

export default App
