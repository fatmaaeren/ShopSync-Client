import AddProductToList from "./modals/addProductToList"
import EditProductDescription from "./modals/editProductDescription";
import EditProduct from "./modals/editProduct";
import CreateNewCategory from "./modals/createNewCategory";
import CreateNewList from "./modals/createNewList";
import UpdateCategoryName from "./modals/updateCategoryName";

const modals = [
    {
        name: 'addProductToList',
        element: AddProductToList
    },
    {
        name: 'editProductDescription',
        element: EditProductDescription
    },
    {
        name: 'editProduct',
        element: EditProduct
    },
    {
        name: 'createNewCategory',
        element: CreateNewCategory
    },
    {
        name: 'createnewList',
        element: CreateNewList
    },

    {
        name: 'updateCategoryName',
        element: UpdateCategoryName
    },
]

export default modals;