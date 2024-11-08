import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import IMG1 from "../../assets/kluchi.png";
import IMG2 from "../../assets/dencq.png";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

const categories = [
    {
        id: 1,
        title: 'სანტექნიკა',
        image: "https://www.shutterstock.com/image-vector/realistic-black-modern-thin-frame-260nw-2260871101.jpg",
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
        image: "https://img.freepik.com/free-psd/psd-phone-template-with-blank-frame-design_1409-4126.jpg",
        description: "ეს არის სანტექნიკის კატეგორია",
        links: ["მილები", "საკანალიზაციო მილები", "ონკანები", "სამზარეულოს ონკანები"]
    },

    {
        id: 2,
        title: 'ელექტროობა',
        image: "https://img.freepik.com/free-psd/psd-phone-template-with-blank-frame-design_1409-4126.jpg",
        description: "ელექტროობის კატეგორია",
        links: ["კაბელი", "ელექტრო-სამონტაჟო აქსესუარები", "ხელსაწყოები", "ჩამრთველები"]
    },

    {
        id: 1,
        title: 'სანტექნიკა',
        image: "https://www.shutterstock.com/image-vector/realistic-black-modern-thin-frame-260nw-2260871101.jpg",
        description: "ეს არის სანტექნიკის კატეგორია",
        links: ["მილები", "საკანალიზაციო მილები", "ონკანები", "სამზარეულოს ონკანები"]
    },


    {
        id: 2,
        title: 'ელექტროობა',
        image: "https://img.freepik.com/free-psd/psd-phone-template-with-blank-frame-design_1409-4126.jpg",
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
        image: "https://www.shutterstock.com/image-vector/realistic-black-modern-thin-frame-260nw-2260871101.jpg",
        description: "ელექტროობის კატეგორია",
        links: ["კაბელი", "ელექტრო-სამონტაჟო აქსესუარები", "ხელსაწყოები", "ჩამრთველები"]
    },

    {
        id: 1,
        title: 'სანტექნიკა',
        image: "https://img.freepik.com/free-psd/psd-phone-template-with-blank-frame-design_1409-4126.jpg",
        description: "ეს არის სანტექნიკის კატეგორია",
        links: ["მილები", "საკანალიზაციო მილები", "ონკანები", "სამზარეულოს ონკანები"]
    },
];

const SubCategories = () => {
  const { CategoryId } = useParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [image, setImage] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => setImage(URL.createObjectURL(acceptedFiles[0])), 
    accept: "image/*",
  });

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
    console.log("Category Saved:", { ...data, image });
    setIsEditModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    console.log("Category Deleted:", selectedCategory);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="w-full mx-auto p-4 bg-gray-100">
      <h1 className="text-2xl text-center">{CategoryId}</h1>

      <div className="w-[100%] flex justify-end">
        <button
          className="p-3 bg-black text-white rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          დაამატე სუბ.კატეგორია
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 mt-5 justify-center">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative bg-white rounded-lg shadow-md p-6 w-full mx-auto transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <h2 className="text-xl text-center mb-4">{category.title}</h2>
            <img
              src={category.image}
              alt={`Image for ${category.title}`}
              className="w-[180px] aspect-square mx-auto mb-4 object-cover"
            />

            {/* Edit and Delete Icons */}
            <div className="absolute top-3 right-3 flex space-x-2">
              <button
                onClick={() => handleEditCategory(category)}
                className="text-gray-600 hover:text-gray-800"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCategory(category)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>

            <div className="flex justify-end items-center w-full">
              <Link
                to={`/Categories/${CategoryId}/${category.title}`}
                className="rounded-lg px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
              >
                პროდუქტები
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <h2 className="text-xl mb-4">კატეგორიის დამატება</h2>

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

      {/* Edit Category Modal */}
      {isEditModalOpen && selectedCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <h2 className="text-xl mb-4">კატეგორიის რედაქტირება</h2>

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

      {/* Delete Category Modal */}
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

export default SubCategories;
