import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useForm, useFieldArray } from 'react-hook-form';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubcategories, addSubcategory, updateSubcategory, removeSubcategory } from '../../redux/slices/subcategorySlice';

const SubCategories = () => {
    const { categoryId } = useParams();
    const { register, handleSubmit, reset, setValue, control } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "attributes"
    });

    const dispatch = useDispatch();
    const subcategories = useSelector((state) => state.subcategory.data);
    const status = useSelector((state) => state.subcategory.status);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchSubcategories({ categoryId: categoryId }));
        }
    }, [status, dispatch, categoryId]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setImage(URL.createObjectURL(acceptedFiles[0])); // Preview image
        },
        accept: 'image/*',
    });

    const handleAddSubcategory = () => {
        reset();
        setSelectedSubcategory(null);
        setIsCreateModalOpen(true);
    };

    const handleEditSubcategory = (subcategory) => {
        setSelectedSubcategory(subcategory);
        setValue("name", subcategory.name);
        setValue("attributes", subcategory.attributes?.map((attr) => ({ name: attr })));
        setValue("desc", subcategory.description);
        setIsEditModalOpen(true);
    };

    const handleDeleteSubcategory = (subcategory) => {
        setSelectedSubcategory(subcategory);
        setIsDeleteModalOpen(true);
    };

    const handleSaveSubcategory = (data) => {
        const attributes = data.attributes.map((attr) => attr.name);
        if (isEditModalOpen) {
            dispatch(updateSubcategory({ id: selectedSubcategory._id, data: { name: data.name, description: data.desc, attributes } }));
            setIsEditModalOpen(false);
        } else {
            const newSubcategory = {
                name: data.name,
                description: data.desc,
                attributes,
                categoryId: categoryId
            };
            dispatch(addSubcategory(newSubcategory));
            setIsCreateModalOpen(false);
        }
        setImage(null);
    };

    const handleDeleteConfirm = () => {
        dispatch(removeSubcategory(selectedSubcategory._id));
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="w-full mx-auto p-4 bg-gray-100 h-dvh overflow-y-auto">
            <h1 className="text-2xl text-center">სუბკატეგორიები</h1>

            <div className="w-[100%] flex justify-end">
                <button
                    className="p-3 bg-black text-white rounded-lg"
                    onClick={handleAddSubcategory}
                >
                    დაამატე სუბკატეგორია
                </button>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 mt-5 ">
                {subcategories.map(subcategory => (
                    <div
                        key={subcategory._id}
                        className="relative bg-white rounded-lg shadow-md p-6 w-full min-h-[350px] mx-auto transition-transform transform hover:scale-105 hover:shadow-lg m"
                    >
                        <div className="absolute top-2 right-2 flex gap-2">
                            <p
                                className="w-6 h-6 text-blue-500 cursor-pointer m-1"
                                onClick={() => handleEditSubcategory(subcategory)}
                            ><FaPencilAlt/></p>
                            <p
                                className="w-6 h-6 text-red-500 cursor-pointer m-1"
                                onClick={() => handleDeleteSubcategory(subcategory)}
                            ><FaTrash/></p>
                        </div>
                        <h2 className="text-xl text-center mb-2">{subcategory.name}</h2>
                        <p>{subcategory.description}</p>
                        <img
                            src={subcategory.image}
                            alt={`Image for ${subcategory.name}`}
                            className="w-[180px] aspect-square mx-auto mb-4 object-cover"
                        />

                        <div className='w-full flex justify-end '>
                            <Link
                                to={`/categories/${categoryId}/${subcategory._id}`}
                                className="rounded-lg px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
                            >
                                პროდუქტები
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for adding subcategory */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
                        <h2 className="text-xl mb-4">სუბკატეგორიის დამატება</h2>

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

                        {/* Subcategory Name and Description */}
                        <form onSubmit={handleSubmit(handleSaveSubcategory)}>
                            <input
                                {...register("name", { required: true })}
                                type="text"
                                placeholder="სუბკატეგორიის სახელი"
                                className="w-full p-2 mb-4 border border-gray-300 rounded"
                            />
                            <input
                                {...register("desc", { required: true })}
                                type="text"
                                placeholder="აღწერე სუბკატეგორია"
                                className="w-full p-2 mb-4 border border-gray-300 rounded"
                            />

                            {/* Attributes */}
                            <div className="mb-4">
                                <h3 className="text-lg mb-2">Attributes</h3>
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex mb-2">
                                        <input
                                            {...register(`attributes.${index}.name`, { required: true })}
                                            type="text"
                                            placeholder="Attribute Name"
                                            className="w-full p-2 border border-gray-300 rounded mr-2"
                                        />
                                        <button type="button" onClick={() => remove(index)} className="bg-red-500 text-white p-2 rounded">Remove</button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => append({ name: "" })} className="bg-blue-500 text-white p-2 rounded">Add Attribute</button>
                            </div>

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

            {/* Modal for editing subcategory */}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
                        <h2 className="text-xl mb-4">სუბკატეგორიის რედაქტირება</h2>

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

                        {/* Subcategory Name and Description */}
                        <form onSubmit={handleSubmit(handleSaveSubcategory)}>
                            <input
                                {...register("name", { required: true })}
                                type="text"
                                placeholder="სუბკატეგორიის სახელი"
                                className="w-full p-2 mb-4 border border-gray-300 rounded"
                            />
                            <input
                                {...register("desc", { required: true })}
                                type="text"
                                placeholder="აღწერე სუბკატეგორია"
                                className="w-full p-2 mb-4 border border-gray-300 rounded"
                            />

                            {/* Attributes */}
                            <div className="mb-4">
                                <h3 className="text-lg mb-2">Attributes</h3>
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex mb-2">
                                        <input
                                            {...register(`attributes.${index}.name`, { required: true })}
                                            type="text"
                                            placeholder="Attribute Name"
                                            className="w-full p-2 border border-gray-300 rounded mr-2"
                                        />
                                        <button type="button" onClick={() => remove(index)} className="bg-red-500 text-white p-2 rounded">Remove</button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => append({ name: "" })} className="bg-blue-500 text-white p-2 rounded">Add Attribute</button>
                            </div>

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
            {isDeleteModalOpen && selectedSubcategory && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
                        <h2 className="text-xl mb-4 text-red-600">გაფრთხილება</h2>
                        <p>თუ ამ სუბკატეგორიას წაიშლით, ყველა პროდუქტი წაიშლება!</p>
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

export default SubCategories;