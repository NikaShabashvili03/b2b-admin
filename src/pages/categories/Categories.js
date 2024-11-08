import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IMG1 from "../../assets/kluchi.png";
import IMG2 from "../../assets/dencq.png";
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';

const initialCategories = [
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
    }
];

const Categories = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [categories, setCategories] = useState(initialCategories);
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
        setImage(category.image); // Set initial image
        setIsEditModalOpen(true);
    };

    const handleDeleteCategory = (category) => {
        setSelectedCategory(category);
        setIsDeleteModalOpen(true);
    };

    const handleSaveCategory = (data) => {
        if (isEditModalOpen) {
            // Update the existing category
            setCategories((prevCategories) =>
                prevCategories.map((cat) =>
                    cat.id === selectedCategory.id
                        ? { ...cat, title: data.name, description: data.desc, image: image || cat.image }
                        : cat
                )
            );
            setIsEditModalOpen(false);
        } else {
            // Add a new category
            const newCategory = {
                id: categories.length + 1,
                title: data.name,
                description: data.desc,
                image: image || IMG1 // Default image if no image is uploaded
            };
            setCategories([...categories, newCategory]);
            setIsModalOpen(false);
        }
        setImage(null); // Reset image after saving
    };

    const handleDeleteConfirm = () => {
        setCategories(categories.filter((cat) => cat.id !== selectedCategory.id));
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
                        key={category.id}
                        className="relative bg-white rounded-lg shadow-md p-6 w-full h-[300px] mx-auto transition-transform transform hover:scale-105 hover:shadow-lg m"
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
                        <h2 className="text-xl text-center mb-2">{category.title}</h2>
                        <img
                            src={category.image}
                            alt={`Image for ${category.title}`}
                            className="w-[180px] aspect-square mx-auto mb-4 object-cover"
                        />

                        <div className='w-full flex justify-end '>
                            <Link
                                to={`/Categories/${category.title}`}
                                className="rounded-lg px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
                            >
                                სუბ. კატეგორიები
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for adding/editing category */}
            {(isModalOpen || isEditModalOpen) && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
                        <h2 className="text-xl mb-4">{isEditModalOpen ? "კატეგორიის რედაქტირება" : "კატეგორიის დამატება"}</h2>

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
                                    onClick={() => (isEditModalOpen ? setIsEditModalOpen(false) : setIsModalOpen(false))}
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
