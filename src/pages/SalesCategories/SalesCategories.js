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

    // New state to manage selected categories with discounts
    const [selectedCategories, setSelectedCategories] = useState({});

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

    // New handler for checkbox toggle
    const handleCheckboxToggle = (id) => {
        setSelectedCategories((prevSelectedCategories) => ({
            ...prevSelectedCategories,
            [id]: prevSelectedCategories[id] ? null : { discount: '' }
        }));
    };

    // New handler for updating discount value
    const handleDiscountChange = (id, value) => {
        setSelectedCategories((prevSelectedCategories) => ({
            ...prevSelectedCategories,
            [id]: { discount: value }
        }));
    };

    return (
        <div className="w-full mx-auto p-4 bg-gray-100 h-screen">
            <h1 className="text-2xl text-center">აქციების გაცემა</h1>

            <div className="w-[100%] flex justify-end">
                <button
                    className="p-3 bg-black text-white rounded-lg"
                    onClick={handleAddCategory}
                >
                    აქციის გაცემა 
                </button>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 mt-5">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="relative flex flex-col gap-2 bg-white rounded-lg shadow-md p-6 w-full  mx-auto transition-transform transform hover:scale-105 hover:shadow-lg"
                    >
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={!!selectedCategories[category.id]}
                                onChange={() => handleCheckboxToggle(category.id)}
                                className="mr-2 w-5 h-5"
                            />
                        </div>

                        <h2 className="text-xl text-center mb-4">{category.title}</h2>
                        <img
                            src={category.image}
                            alt={`Image for ${category.title}`}
                            className="w-[180px] aspect-square mx-auto mb-4 object-cover"
                        />

                        {/* Discount input field (only visible when checkbox is selected) */}
                        {selectedCategories[category.id] && (
                            <div className="flex items-center justify-center gap-2">
                                <input 
                                    type="number"
                                    min="1"
                                    max="100"
                                    placeholder="შეიყვანეთ %"
                                    value={selectedCategories[category.id]?.discount || ''}
                                    onChange={(e) =>
                                        handleDiscountChange(category.id, e.target.value)
                                    }
                                    className="w-36 px-2 py-1 text-center border rounded-md"
                                />
                                <button
                                    onClick={() => handleDiscountChange(category.id, '')}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                                >
                                    Save
                                </button>
                            </div>
                        )}

                        <div className="w-full flex justify-center">
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
                        <h2 className="text-xl mb-4">აქციის გაცემა</h2>

                            
                           
                            <div className="flex justify-between">
                                <button
                                    className="bg-gray-300 text-black p-2 rounded">
                                    დახურვა
                                </button>
                                <button
                                    className="bg-blue-600 text-white p-2 rounded">
                                    შენახვა
                                </button>
                            </div>
                        
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            
        </div>
    );
};

export default Categories;
