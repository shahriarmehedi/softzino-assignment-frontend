import React, { useEffect, useState } from 'react';
import CreateProductModal from '../../components/modals/CreateProductModal';
import { MdAddCircle } from 'react-icons/md'
import EditProductModal from '../../components/modals/EditProductModal';
import Swal from 'sweetalert2';
const Products = () => {

    // ALL PRODUCTS

    const [allProduct, setAllProduct] = useState([])

    // GET ALL PRODUCTS

    useEffect(() => {
        getAllProducts();
    }, [allProduct]);



    const getAllProducts = () => {
        const url = 'https://softzino-backend.herokuapp.com/products';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setAllProduct(data);
            })
    }



    // FOR - CREATE PRODUCT MODAL
    let [isAddProductModalOpen, setisAddProductModalOpen] = useState(false)
    function closeAddProductModal() {
        setisAddProductModalOpen(false)
    }
    function openAddProductModal() {

        setisAddProductModalOpen(true)
    }

    // FOR - EDIT PRODUCT MODAL

    let [isEditProductModalOpen, setisEditProductModalOpen] = useState(false)
    function closeEditProductModal() {
        setisEditProductModalOpen(false)
    }
    function openEditProductModal() {
        setisEditProductModalOpen(true)
    }

    // SEND PRODUCT DATA TO EDIT PRODUCT MODAL

    let [productToEdit, setProductToEdit] = useState({})

    const sendProductToEdit = (product) => {
        // setProductToEdit(product)

        // set product to edit without _id field
        setProductToEdit(product)
        openEditProductModal()
    }


    // delete product from database
    const handleDeleteProduct = (product) => {
        const proceed = window.confirm('Are you sure to delete this Product?');
        if (proceed) {
            const url = `https://softzino-backend.herokuapp.com/products/${product._id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Product successfully deleted',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setAllProduct(allProduct.filter(item => item._id !== product._id))
                    }
                });
        }
    }



    return (
        <div>
            <h3 className='text-3xl font-bold pt-10 pl-10 text-left'>Products</h3>
            <div onClick={openAddProductModal} className="px-5 py-3 w-[250px] m-10 bg-rose-500 hover:bg-rose-600 transition duration-300 rounded text-white flex justify-center cursor-pointer">
                <span className="inline-block text-2xl mr-3 justify-center">
                    <MdAddCircle />
                </span>
                <h2>Create a new product</h2>
            </div>

            {/* Show product table */}
            <table className=" border-separate table-auto ml-10">
                <thead>
                    <tr className="bg-gray-700 text-white">
                        <th className="text-left p-4">Product ID</th>
                        <th className="text-left p-4">Product Name</th>
                        <th className="text-left p-4">Product Price</th>
                        <th className="text-left p-4">Product Description</th>
                        <th className="text-left p-4">Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {allProduct.map(product => (
                        <tr key={product._id}>
                            <td className="p-4 bg-gray-50">{product._id}</td>
                            <td className="p-4 bg-gray-50">{product.name}</td>
                            <td className="p-4 bg-gray-50">{product.price}</td>
                            <td className="p-4 bg-gray-50">{product.description}</td>
                            <td className="p-4 bg-gray-50">
                                <button className='px-2 py-2 bg-sky-500 text-white rounded-md mr-2' onClick={() => sendProductToEdit(product)}>Edit</button>
                                <button className='px-2 py-2 bg-red-500 text-white rounded-md' onClick={() => handleDeleteProduct(product)}>Delete</button>


                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>







            {/* Create product modal */}
            <CreateProductModal isOpen={isAddProductModalOpen} closeModal={closeAddProductModal} allProduct={allProduct} setAllProduct={setAllProduct} />
            <EditProductModal isOpen={isEditProductModalOpen} closeModal={closeEditProductModal} allProduct={allProduct} setAllProduct={setAllProduct} productToEdit={productToEdit} />
        </div>
    );
};

export default Products;