import { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '../features/productSlice';
import instance from '../api/axios';
import { useFormik } from 'formik';

function ProductList({ listId }) {


    const dispatch = useDispatch();
    const { products } = useSelector(state => state.product);
    const { categories } = useSelector(state => state.categories);
    const { isGoShopping } = useSelector(state => state.shopping);

    useEffect(() => {
        const getResults = async () => {
            const response = await instance.get("/GetAllProducts");
            dispatch(setProducts(response.data))
        };
        getResults()
    }, []);


    const [selectedValue, setSelectedValue] = useState('');

    const handleOptionChange = async (event) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);

        try {
            const response = await instance.get(`/GetAllProducts?CategoryId=${newValue}`);
            dispatch(setProducts(response.data))
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const { values, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({

        initialValues: {
            name: "",
        },
        onSubmit: async (values) => {
            try {
                const response = await instance.get(`/GetAllProducts?GeneralSearch=${values.name}&CategoryId=${selectedValue}`);
                dispatch(setProducts(response.data))

            } catch (error) {
                toast.error(error)
            }
        }
    })


    return (
        <div className='ms-6'>
            <div className='flex justify-between'>
                <div className='text-lg text-slate-200 mb-2'>Products</div>
            </div>

            <div className='border border-slate-300 mb-6' ></div>
            <div className='flex justify-between gap-3 mb-8'>
                <form
                    onSubmit={handleSubmit}
                    className='flex w-2/3 gap-3'>
                    <input
                        className='w-full p-2 rounded-lg outline-none text-sm text-slate-600'
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name='name'
                        type="text"
                        autoComplete="off"
                        placeholder='Search Product'
                    />
                    <button

                        type='submit'
                        disabled={isSubmitting || isGoShopping}
                        className='bg-gray-300 rounded-lg py-2 px-4'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="m29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9Z"></path></svg>
                    </button>
                </form>
                <div className='w-1/3'>
                    <select
                        onChange={handleOptionChange} value={selectedValue}
                        className='w-full bg-rose-500 border border-rose-500 text-white text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block p-2.5 outline-none' name="" id="">
                        <option className='py-4' value="0">All Categories</option>

                        {categories.length > 0 && !isGoShopping && categories.map((category, index) => (
                            <option key={index} value={category.id}>{category.name}</option>
                        ))}

                    </select>
                </div>
            </div>
            <div className='overflow-y-scroll h-[600px]'>
                {products.length > 0 ? products.map((product, index) => (
                    <ProductItem key={index} product={product} listId={listId}  />
                ))
                    : (
                        <div className='flex w-full h-full justify-center items-center text-slate-200 text-sm'>No Match</div>
                    )
                }
            </div>

        </div>
    )
}

export default ProductList