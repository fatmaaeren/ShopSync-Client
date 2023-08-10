import React from 'react'
import { openModal } from '../features/modalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useFormik } from 'formik'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../api/axios';

function ShoppingListItem({ aproduct }) {


    const productId = aproduct.productId;
    const [product, setProduct] = useState([]);
    const { isGoShopping } = useSelector(state => state.shopping);
    const [isBuyed, setIsBuyed] = useState(false);

    useEffect(() => {
        const getResults = async () => {
            if (productId !== null) {
                const response = await instance.get(`/GetProductById?id=${productId}`);
                setProduct(response.data)
            }

        };
        getResults()
    }, []);

    const dispatch = useDispatch();

    const editProductExplain = () => {
        dispatch(openModal({
            name: 'editProductDescription',
            data: {
                description: aproduct.description,
                userId: aproduct.userId,
                shoppingListId: aproduct.shoppingListId,
                productId: aproduct.productId,
                productName: product.name,
                image: product.image,
                category: product.category.name,
            }
        }))
    }

    const deleteProduct = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    const response = instance.delete(`/ShoppingListProductDelete?id=${aproduct.id}`);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                    toast.success(response.data);
                }
                catch (err) {
                    console.log(err)
                }
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    const { isSubmitting, handleSubmit } = useFormik({
        initialValues: {
            shoppingListId: aproduct.shoppingListId,
            productId: aproduct.productId,
            userId: aproduct.userId,

        },
        onSubmit: async (values) => {

            const formData = {
                shoppingListId: values.shoppingListId,
                productId: values.productId,
                userId: values.userId,
            };
            try {
                const response = await instance.post('/BoughtShoppingProduct', formData);
                toast.success(response.data)
                setIsBuyed(true);

            } catch (error) {
                toast.error(error)
            }
        }
    })


    return (
        <div className='bg-white px-4 py-2 rounded-2xl flex justify-between mb-4 drop-shadow-xl'>


            <div className='flex'>
                <div className='overflow-hidden rounded-md me-6'>
                    <img className='w-16 h-16 object-cover' src={product.image} />
                </div>
                <div>
                    <div className='text-slate-600 font-medium text-sm'>
                        {product.name}
                    </div>
                    <div className='text-slate-400 font-medium text-xs'>
                        {aproduct.description}
                    </div>
                </div>

            </div>

            {!isGoShopping ? (
                <div className='flex items-center'>
                    <button
                        onClick={editProductExplain}
                        className='text-slate-400 p-2 me-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3z"></path></svg>
                    </button>
                    <button
                        onClick={deleteProduct}
                        className=' text-slate-400 p-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m15.5 15.5l-10-10zm0-10l-10 10"></path></svg>
                    </button>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className='flex items-center'>
                    <button
                        disabled={isSubmitting}
                        type='submit'
                        className={`me-2 border border-transparent text-white py-2 px-4 rounded-lg text-xs  transition-all ease-in-out ${isBuyed ? "bg-slate-400 text-white" : "bg-rose-500 hover:text-rose-500 hover:border-rose-500  hover:bg-transparent"}`} >
                        {isBuyed ? "Buyed" : "Buy"}
                    </button>
                </form>
            )

            }

        </div>
    )
}

export default ShoppingListItem