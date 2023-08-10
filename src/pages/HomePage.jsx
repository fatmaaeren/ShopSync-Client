import { useEffect} from 'react'
import { openModal } from '../features/modalSlice'
import { useDispatch, useSelector } from 'react-redux'
import instance from '../api/axios';
import { setShoppingList } from '../features/shoppingListSlice'
import ShoppingListCover from '../components/ShoppingListCover'
import { ToastContainer } from 'react-toastify';

function HomePage() {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const { shoppingLists } = useSelector(state => state.shoppingList);

    const createNewList = () => {
        dispatch(openModal({
            name: 'createnewList',
            data: {
                userId: user.id,
            }
        }))
    };

    useEffect(() => {
        const getResults = async () => {
            const response = await instance.get(`/GetShoppingLists?userId=${user.id}`);
            dispatch(setShoppingList(response.data));
        };
        getResults()
    }, []);

    return (
        <div className='mt-10'>
            <ToastContainer autoClose={1000} />
            <button onClick={createNewList} className='flex justify-center items-center text-center p-4 bg-sky-500 text-white h-full drop-shadow-xl hover:bg-rose-500 transition-all ease-in-out rounded-lg w-full mb-4'>
                Create New List
            </button>

            <div className='grid gap-4'>
                {shoppingLists.length > 0 && shoppingLists.map((shoppingList, index) => (
                    <ShoppingListCover key={index} shoppingList={shoppingList} />
                ))}

            </div>
        </div>

    )
}

export default HomePage