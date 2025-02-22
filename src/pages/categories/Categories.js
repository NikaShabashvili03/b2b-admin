import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IMG1 from "../../assets/kluchi.png";
import IMG2 from "../../assets/dencq.png";
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, addCategory, updateCategory, removeCategory } from '../../redux/slices/categorySlice';

const Categories = () => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.data);
    const status = useSelector((state) => state.category.status);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCategories());
        }
    }, [status, dispatch]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setImage(URL.createObjectURL(acceptedFiles[0])); // Preview image
        },
        accept: 'image/*',
    });

    const handleAddCategory = () => {
        reset()
        setSelectedCategory(null);
        setIsCreateModalOpen(true);
    };

    const handleEditCategory = (category) => {
        setSelectedCategory(category);
        setValue("name", category.name);
        setValue("desc", category.description); 
        setIsEditModalOpen(true);
    };

    const handleDeleteCategory = (category) => {
        setSelectedCategory(category);
        setIsDeleteModalOpen(true);
    };

    const handleSaveCategory = (data) => {
        if (isEditModalOpen) {
            dispatch(updateCategory({ id: selectedCategory._id, data: { name: data.name, description: data.desc } }));
            setIsEditModalOpen(false);
        } else {
            const newCategory = {
                name: data.name,
                description: data.desc,
            };
            dispatch(addCategory(newCategory));
            setIsCreateModalOpen(false);
        }
        setImage(null); 
    };

    const handleDeleteConfirm = () => {
        dispatch(removeCategory(selectedCategory._id));
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="w-full mx-auto p-4 bg-gray-100 h-screen">
            <h1 className="text-2xl text-center">კატეგორიები</h1>

            <div className="w-[100%] flex justify-end">
                <button
                    className="p-3 bg-black text-white rounded-lg"
                    onClick={handleAddCategory}
                >
                    დაამატე კატეგორია
                </button>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 mt-5 ">
                {categories.map(category => (
                    <div
                        key={category._id}
                        className="relative bg-white rounded-lg shadow-md p-6 w-full min-h-[350px] mx-auto transition-transform transform hover:scale-105 hover:shadow-lg m"
                    >
                        <div className="absolute top-2 right-2 flex gap-2">
                            <p
                                className="w-6 h-6 text-blue-500 cursor-pointer m-1"
                                onClick={() => handleEditCategory(category)}
                            ><FaPencilAlt/></p>
                            <p
                                className="w-6 h-6 text-red-500 cursor-pointer m-1"
                                onClick={() => handleDeleteCategory(category)}
                            ><FaTrash/></p>
                        </div>
                        <h2 className="text-xl text-center mb-2">{category.name}</h2>
                        <p>{category.description}</p>
                        <img
                            src={category.image}
                            alt={`Image for ${category.name}`}
                            className="w-[180px] aspect-square mx-auto mb-4 object-cover"
                        />

                        <div className='w-full flex justify-end '>
                            <Link
                                to={`/categories/${category._id}`}
                                className="rounded-lg px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
                            >
                                სუბ. კატეგორიები
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for adding category */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
                        <h2 className="text-xl mb-4">კატეგორიის დამატება</h2>

                        {/* Image upload */}
                        <div
                            {...getRootProps()}
                            className="border-2 border-dashed p-4 mb-4 text-center cursor-pointer"
                        >
                            <input {...getInputProps()} />
                            {image ? (
                                <img src={image} alt="Uploaded" className="mx-auto w-40 h-40 mb-4" />
                            ) : (
                                <p>დაწექით რათა ატვირთოთ სურათი</p>
                            )}
                        </div>

                        {/* Category Name and Description */}
                        <form onSubmit={handleSubmit(handleSaveCategory)}>
                            <input
                                {...register("name", { required: true })}
                                type="text"
                                placeholder="კატეგორიის სახელი"
                                className="w-full p-2 mb-4 border border-gray-300 rounded"
                            />
                            <input
                                {...register("desc", { required: true })}
                                type="text"
                                placeholder="აღწერე კატეგორია"
                                className="w-full p-2 mb-4 border border-gray-300 rounded"
                            />
                            <div className="flex justify-between">
                                <button
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="bg-gray-300 text-black p-2 rounded"
                                    type="button"
                                >
                                    დახურვა
                                </button>
                                <button
                                    className="bg-blue-600 text-white p-2 rounded"
                                    type="submit"
                                >
                                    შენახვა
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal for editing category */}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
                        <h2 className="text-xl mb-4">კატეგორიის რედაქტირება</h2>

                        {/* Image upload */}
                        <div
                            {...getRootProps()}
                            className="border-2 border-dashed p-4 mb-4 text-center cursor-pointer"
                        >
                            <input {...getInputProps()} />
                            {image ? (
                                <img src={image} alt="Uploaded" className="mx-auto w-40 h-40 mb-4" />
                            ) : (
                                <p>დაწექით რათა ატვირთოთ სურათი</p>
                            )}
                        </div>

                        {/* Category Name and Description */}
                        <form onSubmit={handleSubmit(handleSaveCategory)}>
                            <input
                                {...register("name", { required: true })}
                                type="text"
                                placeholder="კატეგორიის სახელი"
                                className="w-full p-2 mb-4 border border-gray-300 rounded"
                            />
                            <input
                                {...register("desc", { required: true })}
                                type="text"
                                placeholder="აღწერე კატეგორია"
                                className="w-full p-2 mb-4 border border-gray-300 rounded"
                            />
                            <div className="flex justify-between">
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="bg-gray-300 text-black p-2 rounded"
                                    type="button"
                                >
                                    დახურვა
                                </button>
                                <button
                                    className="bg-blue-600 text-white p-2 rounded"
                                    type="submit"
                                >
                                    შენახვა
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {isDeleteModalOpen && selectedCategory && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
                        <h2 className="text-xl mb-4 text-red-600">გაფრთხილება</h2>
                        <p>თუ ამ კატეგორიას წაიშლით, ყველა სუბკატეგორია და პროდუქტი წაიშლება!</p>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="bg-gray-300 text-black p-2 rounded"
                                type="button"
                            >
                                გაუქმება
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="bg-red-600 text-white p-2 rounded"
                            >
                                წაშლა
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;