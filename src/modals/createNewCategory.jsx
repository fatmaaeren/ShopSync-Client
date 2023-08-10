import instance from '../api/axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup'
import { useFormik } from 'formik'

function CreateNewCategory({ close }) {

    const handleClose = () => {
        close();
    }

    const categorySchema = yup.object().shape({
        name: yup.string().required(),
    })

    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: categorySchema,
        onSubmit: async (values) => {

            const data = {
                name: values.name,
            };
            try {
                const response = await instance.post('/CategoryAddOrUpdate', data);
                toast.success(response.data);

                if (response.data !== "Bu isimde zaten kategori bulunuyor, ekleyemezsiniz.") {
                    setTimeout(() => {
                        window.location.reload();
                        close();
                    }, 1000);
                }
            } catch (error) {
                toast.error(error)
            }
        }
    })


    return (
        <div className="bg-white w-[250px] h-[250px]">
            <div className="flex justify-between">
                <div className="text-slate-700 font-bold ">
                    Create New Category
                </div>
                <button className='text-slate-400' onClick={handleClose} type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m15.5 15.5l-10-10zm0-10l-10 10"></path></svg>
                </button>
            </div>
            <hr className="my-4" />
            <form
                onSubmit={handleSubmit}
            >
                <input
                    autoComplete='off'
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type='text'
                    name='name'
                    placeholder="Category Name"
                    className="outline-none w-full" />
                {errors.name && touched.name && <span className="text-xs text-rose-500">{errors.name}</span>}
                <hr className="my-4" />

                <button
                    className='bg-sky-500 text-white font-sans text-sm px-3 py-2 rounded-lg w-full'
                    type="submit"
                    disabled={isSubmitting}
                >Create
                </button>
            </form>
            <ToastContainer autoClose={1000} />

        </div>
    )
}

export default CreateNewCategory