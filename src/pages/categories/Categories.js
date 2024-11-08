import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IMG1 from "../../assets/kluchi.png";
import IMG2 from "../../assets/dencq.png";
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
// import { TrashIcon, PencilIcon } from '@heroicons/react/outline';

const categories = [
    {
        id: 1,
        title: 'სანტექნიკა',
        image: IMG1,
        description: "ეს არის სანტექნიკის კატეგორია",
        links: ["მილები", "საკანალიზაციო მილები", "ონკანები", "სამზარეულოს ონკანები"]
    },
    {
        id: 2,
        title: 'ელექტროობა',
        image: IMG2,
        description: "ელექტროობის კატეგორია",
        links: ["კაბელი", "ელექტრო-სამონტაჟო აქსესუარები", "ხელსაწყოები", "ჩამრთველები"]
    },

    {
        id: 1,
        title: 'სანტექნიკა',
        image: IMG1,
        description: "ეს არის სანტექნიკის კატეგორია",
        links: ["მილები", "საკანალიზაციო მილები", "ონკანები", "სამზარეულოს ონკანები"]
    },

    {
        id: 2,
        title: 'ელექტროობა',
        image: IMG2,
        description: "ელექტროობის კატეგორია",
        links: ["კაბელი", "ელექტრო-სამონტაჟო აქსესუარები", "ხელსაწყოები", "ჩამრთველები"]
    },

    {
        id: 1,
        title: 'სანტექნიკა',
        image: IMG1,
        description: "ეს არის სანტექნიკის კატეგორია",
        links: ["მილები", "საკანალიზაციო მილები", "ონკანები", "სამზარეულოს ონკანები"]
    },


    {
        id: 2,
        title: 'ელექტროობა',
        image: IMG2,
        description: "ელექტროობის კატეგორია",
        links: ["კაბელი", "ელექტრო-სამონტაჟო აქსესუარები", "ხელსაწყოები", "ჩამრთველები"]
    },

    {
        id: 1,
        title: 'სანტექნიკა',
        image: IMG1,
        description: "ეს არის სანტექნიკის კატეგორია",
        links: ["მილები", "საკანალიზაციო მილები", "ონკანები", "სამზარეულოს ონკანები"]
    },

    {
        id: 2,
        title: 'ელექტროობა',
        image: IMG2,
        description: "ელექტროობის კატეგორია",
        links: ["კაბელი", "ელექტრო-სამონტაჟო აქსესუარები", "ხელსაწყოები", "ჩამრთველები"]
    },

    {
        id: 1,
        title: 'სანტექნიკა',
        image: IMG1,
        description: "ეს არის სანტექნიკის კატეგორია",
        links: ["მილები", "საკანალიზაციო მილები", "ონკანები", "სამზარეულოს ონკანები"]
    },
];

const Categories = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [image, setImage] = useState(null);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setImage(URL.createObjectURL(acceptedFiles[0])); // Preview image
        },
        accept: 'image/*',
    });

    const handleAddCategory = () => {
        setIsModalOpen(true);
    };

    const handleEditCategory = (category) => {
        setSelectedCategory(category);
        setValue("name", category.title);
        setValue("desc", category.description);
        setIsEditModalOpen(true);
    };

    const handleDeleteCategory = (category) => {
        setSelectedCategory(category);
        setIsDeleteModalOpen(true);
    };

    const handleSaveCategory = (data) => {
        console.log('Category Saved:', { ...data, image });
        setIsModalOpen(false); // Close the modal after saving
    };

    const handleDeleteConfirm = () => {
        console.log('Category Deleted:', selectedCategory);
        setIsDeleteModalOpen(false); // Close delete confirmation modal
    };

    return (
        <div className="w-full mx-auto p-4 bg-gray-100">
            <h1 className="text-2xl text-center">კატეგორიები</h1>

            <div className="w-[100%] flex justify-end">
                <button
                    className="p-3 bg-black text-white rounded-lg"
                    onClick={handleAddCategory}
                >
                    დაამატე კატეგორია
                </button>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 mt-5 justify-center ">
                {categories.map(category => (
                    <div
                        key={category.id}
                        className="relative bg-white rounded-lg shadow-md p-6 w-full h-[300px] mx-auto transition-transform transform hover:scale-105 hover:shadow-lg m"
                    >
                        <div className="absolute top-2 right-2 flex gap-2">
                            <p
                                className="w-6 h-6 text-blue-500 cursor-pointer"
                                onClick={() => handleEditCategory(category)}
                            >aa</p>
                            <p
                                className="w-6 h-6 text-red-500 cursor-pointer"
                                onClick={() => handleDeleteCategory(category)}
                            >DD</p>
                        </div>
                        <h2 className="text-xl text-center mb-4">{category.title}</h2>
                        <img
                            src={category.image}
                            alt={`Image for ${category.title}`}
                            className="w-[180px] aspect-square mx-auto mb-4 object-cover"
                        />
                        <Link
                            to={`/Categories/${category.title}`}
                            className="absolute bottom-4 rounded-lg right-4 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
                        >
                            სუბ. კატეგორიები
                        </Link>
                    </div>
                ))}
            </div>

            {/* Modal for adding category */}
            {isModalOpen && (
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
                                    onClick={() => setIsModalOpen(false)}
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

            {/* Edit Modal */}
            {isEditModalOpen && selectedCategory && (
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

                        {/* Edit Category Name and Description */}
                        <form onSubmit={handleSubmit(handleSaveCategory)}>
                            <input
                                {...register("name", { required: true })}
                                type="text"
                                placeholder="კატეგორიის სახელი"
                                className="w-full p-2 mb-4 border border-gray-300 rounded"
                                defaultValue={selectedCategory.title}
                            />
                            <input
                                {...register("desc", { required: true })}
                                type="text"
                                placeholder="აღწერე კატეგორია"
                                className="w-full p-2 mb-4 border border-gray-300 rounded"
                                defaultValue={selectedCategory.description}
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
