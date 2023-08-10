import React, { useEffect, useState } from 'react'
import ProductList from '../components/ProductList'
import { useParams, useNavigate } from 'react-router-dom'
import ShoppigListItem from '../components/ShoppingListItem'
import instance from '../api/axios';
import { useSelector, useDispatch } from 'react-redux'
import { setTrue, setFalse } from '../features/goShoppingSlice'
import Swal from 'sweetalert2';
import { useFormik } from 'formik'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ListPage() {

    const { id } = useParams();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const { isGoShopping } = useSelector(state => state.shopping);

    const { shoppingLists } = useSelector(state => state.shoppingList);
    const data = shoppingLists.find(item => item.shoppingListId == id);
    const [name, setName] = useState("");

    const [products, setProducts] = useState("");


    useEffect(() => {
        setName(data.name);
        const getResults = async () => {
            const response = await instance.get(`/GetShoppingListById?shoppingListId=${id}`);
            setProducts(response.data)
        };
        getResults()

    }, []);

    const handleDelete = () => {
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
                    const response = instance.delete(`/ShoppingListDelete?shoppingListId=${id}`)
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
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


    const form1 = useFormik({
        initialValues: {
            userId: user.id,
            shoppingListId: data.shoppingListId
        },
        onSubmit: async (values) => {

            const formData = {
                userId: values.userId,
                shoppingListId: values.shoppingListId,
            };
            try {
                const response = await instance.post('/IGoShopping', formData);
                toast.success(response.data)
                dispatch(setTrue());


            } catch (error) {
                toast.error(error)
            }
        }
    })

    const form2 = useFormik({
        initialValues: {
            userId: user.id,
            shoppingListId: data.shoppingListId
        },
        onSubmit: async (values) => {

            const formData = {
                userId: values.userId,
                shoppingListId: values.shoppingListId,
            };
            try {
                const response = await instance.post('/ShoppingCompleted', formData);
                toast.success(response.data)
                dispatch(setFalse());
                setTimeout(() => {
                    window.location.reload();
                },1500)


            } catch (error) {
                toast.error(error)
            }
        }
    })

    return (
        <div className='grid gap-4 grid-cols-1 lg:grid-cols-2 mt-10'>
            <div className='bg-slate-100 p-6 rounded-3xl'>
                <div className='flex justify-between'>
                    <div>
                        <div className='text-sky-500 text-xl mb-1 bg-transparent outline-none'>{name}</div>
                    </div>
                    <div className=''>
                        <button
                            onClick={handleDelete}
                            className=' text-slate-400 px-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m15.5 15.5l-10-10zm0-10l-10 10"></path></svg>
                        </button>
                    </div>

                </div>
                <div className='mt-10 h-[550px] overflow-y-scroll mb-6 px-2.5'>
                    {products && products.length > 0 && products.filter(product => !product.isBought).map((product, index) => (
                        <ShoppigListItem key={index} aproduct={product} />
                    ))}
                </div>

                {!isGoShopping ? (
                    <form
                        onSubmit={form1.handleSubmit}
                        className='flex gap-2 justify-end text-sm'>
                        <button
                            disabled={form1.isSubmitting}
                            type='submit'
                            className='bg-sky-500 text-white  text-center py-2 w-1/4 rounded-lg '
                        >
                            Go Shopping</button>

                    </form>
                ) : (
                    <form
                        onSubmit={form2.handleSubmit}
                        className='flex gap-2 justify-end text-sm'>
                        <button
                            disabled={form2.isSubmitting}
                            type='submit'
                            className='bg-sky-500 text-white  text-center py-2 w-1/3 rounded-lg '
                        >
                            Complete Shopping</button>

                    </form>
                )}


            </div>
            <ProductList listId={id} />

            <ToastContainer autoClose={1500} />
        </div>
    )
}

export default ListPage