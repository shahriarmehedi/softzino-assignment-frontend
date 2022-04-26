import React from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { AiFillPlusCircle } from 'react-icons/ai'
import { useState } from 'react';

const CreateProductModal = ({ isOpen, closeModal, allProduct, setAllProduct }) => {


    // Create a post request to save product to database
    const saveProduct = (product) => {
        const url = 'https://softzino-backend.herokuapp.com/products';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })

            .then(
                (response) => {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    response.json().then((data) => {
                        setAllProduct(data);
                        closeModal();
                        // force update the state
                        setAllProduct([...allProduct, data]);


                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Product successfully added',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });
                }
            )
    }


    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        saveProduct(data);
        reset();
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-20 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 " />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            {/* MODAL CONTENT */}

                            <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-xl font-semibold leading-6 text-rose-500 pt-5 pb-8 w-11/12 mx-auto"
                                >
                                    <span className="inline-block text-2xl mr-3 relative top-1 justify-center">
                                        <AiFillPlusCircle />
                                    </span>
                                    Create a new product
                                </Dialog.Title>

                                <div className='w-11/12 mx-auto'>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="flex flex-col">
                                            <label htmlFor="name">Name of the product</label>
                                            <input className='py-3 px-3 outline-none bg-gray-100 mb-3 rounded-md' id="name" {...register('name', { required: true })} />
                                            {errors.name && errors.name.type === "required" && <span className="text-red-600 italic"><small>Type a product name</small></span>}

                                            <label htmlFor="description">Description</label>
                                            <textarea className='py-3 px-3 outline-none bg-gray-100 mb-3 rounded-md' id="description" {...register('description', { required: true })} />
                                            {errors.description && errors.description.type === "required" && <span className="text-red-600 italic"><small>Type a description</small></span>}

                                            <label htmlFor="price">Price</label>
                                            <input className='py-3 px-3 outline-none bg-gray-100 mb-3 rounded-md' id="price" {...register('price', { required: true })} />
                                            {errors.price && errors.price.type === "required" && <span className="text-red-600 italic"><small>Type a price</small></span>}

                                            <label htmlFor="stock">Stock</label>
                                            <input className='py-3 px-3 outline-none bg-gray-100 mb-3 rounded-md' id="stock" {...register('stock', { required: true })} />
                                            {errors.stock && errors.stock.type === "required" && <span className="text-red-600 italic"><small>Type a stock</small></span>}

                                            <div className='flex'>
                                                <div className='w-1/2 mr-3'>
                                                    <input type="submit" value="Create product" className='w-full  px-5 py-3 bg-rose-500 mt-5 text-white rounded cursor-pointer hover:bg-rose-600 transition duration-300' />
                                                </div>
                                                <div onClick={closeModal} className='ml-3 w-1/2 px-10 text-center py-3 mt-5 bg-gray-500 text-white rounded cursor-pointer hover:bg-gray-600 transition duration-300'>Cancel</div>
                                            </div>



                                        </div>
                                    </form>

                                </div>


                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default CreateProductModal;