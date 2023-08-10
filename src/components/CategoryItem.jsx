import React from 'react'
import { Link } from 'react-router-dom'
import { openModal } from '../features/modalSlice'
import { useDispatch } from 'react-redux';
import instance from '../api/axios';
import Swal from 'sweetalert2';

function CategoryItem({ category }) {

    const dispatch = useDispatch();

    const updateCategoryName = () => {
        dispatch(openModal({
            name: 'updateCategoryName',
            data: {
                id: category.id,
                name: category.name
            }
        }))
    }

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
                    const response = instance.delete(`/CategoryDelete?id=${category.id}`)
                    setTimeout(() => {
                        window.location.reload();
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

    return (

        <div className='py-4 px-6 bg-white drop-shadow-xl rounded-lg w-full flex justify-between items-center'>
            <button
                onClick={updateCategoryName}
                className='text-sky-900 text-xl'>{category.name}</button>
            <div className='flex items-center gap-3'>
                <Link to={`/menu/category/${category.id}`} className='text-slate-400 p-2 me-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3z"></path></svg>
                </Link>
                <button
                    onClick={handleDelete}
                    className=' text-slate-400 p-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m15.5 15.5l-10-10zm0-10l-10 10"></path></svg>
                </button>
            </div>
        </div>
    )
}

export default CategoryItem