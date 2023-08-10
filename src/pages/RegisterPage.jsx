import { useFormik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterPage() {

    const navigate = useNavigate();

    const registerSchema = yup.object().shape({
        name: yup.string().required(),
        surname: yup.string().required(),
        email: yup.string().email("Please enter a valid email!").required(),
        password: yup.
            string()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'Password must contain at least 8 character and one uppercase one lowercase one number and one special character')
            .required(),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords must match")
            .required(),
    })


    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: "",
            surname: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: registerSchema,
        onSubmit: async (values) => {

            const data = {
                name: values.name,
                surname: values.surname,
                email: values.email,
                password: values.password,
            };
            try {
                const response = await axios.post('https://localhost:7199/api/ShopSync/Register', data);
                toast.success(response.data)
                if (response.data !== 'Bu mail adresi daha önce kullanılmış') {
                    setTimeout(() => {
                        navigate('/login');
                    }, 2500);
                }


            } catch (error) {
                toast.error(error)
            }
        }
    })

    return (

        <div className='h-screen flex justify-center flex-col items-center gap-20'>
            <ToastContainer autoClose={2000} />
            <div className='text-sky-500 font-extrabold text-6xl' to={'/'}>
                <div className='flex gap-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2s-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2s2-.9 2-2s-.9-2-2-2zm2-2c0-.55-.45-1-1-1H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.24-6.14a.998.998 0 0 0-.4-1.34a.996.996 0 0 0-1.36.41L15.55 11H8.53L4.54 2.57a.993.993 0 0 0-.9-.57H2c-.55 0-1 .45-1 1s.45 1 1 1h1l3.6 7.59l-1.35 2.44C4.52 15.37 5.48 17 7 17h11c.55 0 1-.45 1-1zM11.29 2.71a.996.996 0 0 1 1.41 0l2.59 2.59c.39.39.39 1.02 0 1.41L12.7 9.3a.996.996 0 1 1-1.41-1.41l.88-.89H9c-.55 0-1-.45-1-1s.45-1 1-1h3.17l-.88-.88a.996.996 0 0 1 0-1.41z"></path></svg>
                    ShopSync
                </div>
            </div>

            <div className='w-full flex justify-center items-center '>
                <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                    <div className='bg-white py-6 px-4 sm:px-10 rounded-lg' >
                        <div className='w-full text-center text-sky-500 text-2xl font-bold mb-10'>
                            Sing Up
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className='mb-0 space-y-6 w-full'
                        >
                            <input
                                autoComplete='off'
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type='text'
                                name='name'
                                placeholder='Name'
                                className='outline-none mb-2 w-full'
                            />
                            {errors.name && touched.name && <span className="text-xs text-rose-500 ">{errors.name}</span>}
                            <input
                                autoComplete='off'
                                value={values.surname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type='text'
                                name='surname'
                                placeholder='Surname'
                                className='outline-none mb-2 w-full'
                            />
                            {errors.surname && touched.surname && <span className="text-xs text-rose-500">{errors.surname}</span>}
                            <input
                                autoComplete='off'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type='email'
                                name='email'
                                placeholder='Email'
                                className='outline-none mb-2 w-full'
                            />
                            {errors.email && touched.email && <span className="text-xs text-rose-500">{errors.email}</span>}
                            <input
                                autoComplete='off'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type='password'
                                name='password'
                                placeholder='Password'
                                className='outline-none mb-2 w-full'
                            />
                            {errors.password && touched.password && <span className="text-xs text-rose-500">{errors.password}</span>}
                            <input
                                autoComplete='off'
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type='password'
                                name='confirmPassword'
                                placeholder='Password Confirm'
                                className='outline-none mb-2 w-full'
                            />
                            {errors.confirmPassword && touched.confirmPassword && <span className="text-xs text-rose-500">{errors.confirmPassword}</span>}

                            <button
                                type='submit'
                                disabled={isSubmitting}
                                className='bg-sky-500 text-white py-2 px-4 rounded-lg w-full'
                            >Submit
                            </button>

                        </form>

                        <div className='text-slate-500 text-sm text-center my-4'>
                            Already have an account? <Link className='text-rose-500 underline' to={"/login"}>Sign In</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage