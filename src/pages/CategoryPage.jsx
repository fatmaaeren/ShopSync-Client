import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, } from 'react-redux'
import CategoryProductItem from '../components/CategoryProductItem';
import instance from '../api/axios';
import * as yup from 'yup'
import { useFormik } from 'formik'
import { storage } from '../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Swal from 'sweetalert2';

function CategoryPage() {

    let navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState("");
    const [products, setProducts] = useState("");
    const { categories } = useSelector(state => state.categories);
    const data = categories.find(item => item.id == id);

    useEffect(() => {
        setName(data.name);
        const getProducts = async () => {
            const response = await instance.get(`/GetAllProducts?CategoryId=${id}`)
            setProducts(response.data);
        };
        getProducts()

    }, []);

    const [imageUpload, setImageUpload] = useState(null);
    const [url, setUrl] = useState("");

    const handleUpload = () => {

        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload)
            .then(() => {
                getDownloadURL(imageRef)
                    .then((url) => {
                        setUrl(url)
                        console.log(url);
                        toast.success("Image uploaded successfully");
                    })
                    .catch(error => {
                        console.log(error.message, "Error getting download URL");
                    });

            })
            .catch(error => {
                console.log(error.message);
            })

    };

    const schema = yup.object().shape({
        name: yup.string().required(),
        image: yup.string().required(),
    })

    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: "",
            categoryId: id,
            image: ""
        },
        validationSchema: schema,
        onSubmit: async (values) => {

            const data = {
                name: values.name,
                categoryId: values.categoryId,
                image: values.image
            };
            try {
                const response = await instance.post('/ProductAddOrUpdate', data);
                toast.success(response.data);

                if (response.data !== "Bu isimde zaten bir ürün var, ürün adını değiştirin.") {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                }


            } catch (error) {
                toast.error(error)
            }
        }
    })

    const handleDeleteCategory = () => {

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
                    const response = instance.delete(`/CategoryDelete?id=${id}`)
                    setTimeout(() => {
                        navigate("/menu");
                    }, 2000);
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

    return (
        <div className='mt-10'>
            <ToastContainer autoClose={1500} />

            <div className='grid gap-8 grid-cols-1 lg:grid-cols-2'>
                <div className='bg-slate-100 p-6 rounded-3xl'>
                    <div className='flex justify-between'>
                        <div>
                            <button
                                className='text-sky-500 text-xl mb-1 bg-transparent outline-none cursor-pointer'
                            >{name}
                            </button>
                        </div>
                        <div className=''>
                            <button onClick={handleDeleteCategory} className=' text-slate-400 px-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m15.5 15.5l-10-10zm0-10l-10 10"></path></svg>
                            </button>
                        </div>

                    </div>
                    <div className='mt-10 h-[550px] overflow-y-scroll mb-6 px-3'>
                        {products.length > 0 ? products.map((product, index) => (
                            <CategoryProductItem key={index} product={product} id={id} />
                        ))
                            :
                            <div className='flex justify-center items-center text-center text-sm text-slate-500 h-full'>There are no products in this category</div>
                        }
                    </div>

                </div>

                <div className='sm:w-full'>
                    <div className='bg-white p-10 rounded-3xl mb-8' >

                        <div className='mb-4 text-slate-500 font-bold'>Add a Product</div>
                        <hr />

                        <div className='flex my-6 w-full justify-between gap-8'>

                            <label
                                className="block">
                                <input type="file"
                                    onChange={e => setImageUpload(e.target.files[0])}
                                    className="block text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
                            </label>

                            <button onClick={handleUpload} className='bg-violet-700 text-violet-50 hover:text-violet-700  hover:bg-violet-50 text-sm py-2 px-4 rounded-lg block w-full'>Upload</button>
                        </div>
                        {url && (
                            <div className='flex gap-2 mb-5'>
                                <div className='text-sm text-slate-500 line-clamp-1 py-1'>{url}</div>
                                <CopyToClipboard text={url}>
                                    <button className='text-white bg-slate-400 rounded-lg py-1 px-2 text-sm hover:bg-sky-500'>Copy</button>
                                </CopyToClipboard>
                            </div>
                        )}

                        <hr />
                        <form
                            onSubmit={handleSubmit}
                            className='mb-0 space-y-6 w-full mt-4'
                        >
                            <input
                                autoComplete='off'
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name='name'
                                type='text'
                                placeholder='Product Name'
                                className='outline-none block w-full'
                            />
                            {errors.name && touched.name && <span className="text-xs text-rose-500 ">{errors.name}</span>}

                            <input

                                value={values.image}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name='image'
                                type='text'
                                placeholder='Img URL'
                                className='outline-none block w-full'
                            />
                            {errors.image && touched.image && <span className="text-xs text-rose-500 ">{errors.image}</span>}

                            <button
                                type='submit'
                                disabled={isSubmitting}
                                className='bg-sky-500 text-white py-2 px-4 rounded-lg w-full'
                            >Add Product

                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CategoryPage