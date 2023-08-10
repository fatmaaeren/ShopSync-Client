import React, { useEffect } from 'react'
import { openModal } from '../features/modalSlice'
import { setCategories } from '../features/categorySlice'
import { useDispatch, useSelector } from 'react-redux'
import instance from '../api/axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CategoryItem from '../components/CategoryItem'

function MenuPage() {

    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.categories);

    const createNewCategory = () => {
        dispatch(openModal({
            name: 'createNewCategory',
        }))
    }

    useEffect(() => {
        const getResults = async () => {
            const response = await instance.get('/GetAllCategories');
            dispatch(setCategories((response.data)));
        };
        getResults()
    }, []);


    return (
        <div className=' mt-10'>

            <button onClick={createNewCategory} className='flex justify-center items-center text-center p-4 bg-sky-500 text-white h-full drop-shadow-xl hover:bg-rose-500 transition-all ease-in-out rounded-lg w-full mb-4'>
                Create New Category
            </button>

            <div className='grid gap-4 grid-cols-1'>
                {categories.length > 0 && categories.map((category, index) => (
                    <CategoryItem key={index} category={category} />
                ))}

            </div>
            <ToastContainer autoClose={1000} />
        </div>
    )
}

export default MenuPage