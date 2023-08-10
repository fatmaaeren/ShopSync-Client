import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import instance from '../api/axios';


function AddProductToList({ data, close }) {

    const handleClose = () => {
        close();
    }

    const { values, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            description: ""
        },
        onSubmit: async (values) => {

            const formData = {
                description: values.description,
                shoppingListId: data.shoppingListId,
                userId: data.userId,
                productId: data.productId,

            };
            try {
                const response = await instance.post('/AddProductBuyShoppingList', formData);
                toast.success(response.data);

                if (response.data !== "Bu ürün zaten listede var, aynı ürünü ikinci defa ekleyemezsiniz.") {
                    setTimeout(() => {
                        close();
                        window.location.reload();
                    }, 1500);
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
                    Add Product To List
                </div>
                <button className='text-slate-400' onClick={handleClose} type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m15.5 15.5l-10-10zm0-10l-10 10"></path></svg>
                </button>
            </div>
            <hr className="my-4" />
            <div className="flex">
                <div className='overflow-hidden rounded-md me-6'>
                    <img className='w-14 h-14 object-cover' src={data.image} alt="" />
                </div>
                <div>
                    <div className="text-sky-500 text-xl mb-1">{data.productName}</div>
                    <div className="text-slate-500 text-xs mb-6">{data.category}</div>
                </div>
            </div>
            <form
                onSubmit={handleSubmit}
            >
                <input
                    autoComplete='off'
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name='description'
                    className="outline-none"
                    type="text"
                    placeholder="Add description"
                />

                <hr className="my-4" />
                <button
                    disabled={isSubmitting}
                    className='bg-sky-500 text-white font-sans text-sm px-3 py-2 rounded-lg w-full'
                    type="submit"
                >Add To List</button>
            </form>

        </div>
    )
}

export default AddProductToList