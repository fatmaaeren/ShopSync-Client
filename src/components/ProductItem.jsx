import React from 'react'
import { openModal } from '../features/modalSlice'
import { useDispatch, useSelector } from 'react-redux'

function ProductItem({ product, listId }) {


    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const { isGoShopping } = useSelector(state => state.shopping);

    const addProductToList = () => {
        dispatch(openModal({
            name: 'addProductToList',
            data: {
                shoppingListId: listId,
                userId: user.id,
                productId: product.id,
                productName: product.name,
                image: product.image,
                category: product.category.name,
            }
        }))
    }

    return (
        <div className='bg-stone-50 py-2 px-4 rounded-2xl  flex justify-between mb-4 drop-shadow-xl '>

            <div className='flex'>
                <div className='overflow-hidden rounded-md me-6'>
                    <img className={`w-14 h-14 object-cover ${isGoShopping && 'blur-sm ' }`} src={product.image} loading='lazy' />
                </div>
                <div className='mt-2'>
                    <div className={` font-medium text-sm ${isGoShopping ? 'text-slate-300' : 'text-slate-600' }`}>
                        {product.name}
                    </div>
                    <div className={`font-medium text-xs ${isGoShopping ? 'text-slate-300' : 'text-slate-400' }`}>
                        {product.category.name}
                    </div>
                </div>

            </div>

            <div className='flex items-center'>
                <button
                disabled={isGoShopping}
                onClick={addProductToList} className={`me-2 border border-gray-300  py-2 px-4 rounded-lg text-xs transition-all ease-in-out  ${isGoShopping ? 'text-slate-300 border-slate-300 ' : 'text-gray-600 hover:bg-rose-500 hover:text-white hover:border-rose-500   ' }`}>
                    Add
                </button>
            </div>

        </div>
    )
}

export default ProductItem