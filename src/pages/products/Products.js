import React, { useState } from "react";
import { FaCheck, FaTrash, FaPencilAlt } from 'react-icons/fa';
import { ImCross } from "react-icons/im";
import { useDropzone } from 'react-dropzone';


const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    serialNumber: "",
    name: "",
    price: "",
    imgSrc: "",
    inStock: true,
    isNew: false,
    date: "",
  });

  const [productsData, setProductsData] = useState([
    {
      id: 1,
      serialNumber: "IPC3624LE-ADF28K-WL",
      name: "4 არხიანი IP ვიდეო ჩამწერი ",
      price: "151.49ლ",
      imgSrc: "https://b2b-front-chi.vercel.app/static/media/1707289109360.04e7d71b90c0fab7bf09.png",
      inStock: true,
      isNew: true,
      date: "2024-08-01"
    },
    {
      id: 2,
      serialNumber: "IPC3624LE-ADF28K-WL",
      name: "4 არხიანი IP ვიდეო ჩამწერი",
      price: "114.97ლ",
      imgSrc: "https://b2b-front-chi.vercel.app/static/media/1707289109360.04e7d71b90c0fab7bf09.png",
      inStock: false,
      isNew: false,
      date: "2024-09-14"
    }
  ]);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      // Reset form when opening modal for Add Product
      setIsEditMode(false);
      setNewProduct({
        serialNumber: "",
        name: "",
        price: "",
        imgSrc: "",
        inStock: true,
        isNew: false,
        date: "",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({
          ...newProduct,
          imgSrc: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newProduct.serialNumber || !newProduct.name || !newProduct.price || !newProduct.imgSrc || !newProduct.date) {
      alert("გთხოვთ შეავსოთ ყველა ველი.");
      return;
    }

    // Add the new product to the list
    if (isEditMode) {
      setProductsData((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editProductId ? { ...newProduct, id: editProductId } : product
        )
      );
    } else {
      const newProductWithId = { ...newProduct, id: productsData.length + 1 };
      setProductsData((prevProducts) => [...prevProducts, newProductWithId]);
    }

    // Close the modal and reset form
    handleModalToggle();
  };

  const isFormValid = Object.values(newProduct).every((value) => value !== "" && value !== null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">პროდუქტები</h2>
      <div className="flex">
        <div className="pl-6">
          <div className="w-full flex justify-end items-center mb-4">
            {/* Add Product Button */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleModalToggle}
            >
              პროდუქტის დამატება
            </button>
          </div>

          {/* Modal for Create/Edit Product */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg w-1/2 relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 text-lg"
                  onClick={handleModalToggle}
                >
                  &times;
                </button>
                <h3 className="text-2xl font-semibold mb-4">{isEditMode ? "პროდუქტის რედაქტირება" : "პროდუქტის დამატება"}</h3>
                <form onSubmit={handleSubmit}>
                  {/* Form Fields for Product */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium">სახელი</label>
                    <input
                      type="text"
                      name="name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                      className="border w-full p-2 mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">სერიული ნომერი</label>
                    <input
                      type="text"
                      name="serialNumber"
                      value={newProduct.serialNumber}
                      onChange={handleInputChange}
                      className="border w-full p-2 mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">ფასი</label>
                    <input
                      type="text"
                      name="price"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      className="border w-full p-2 mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">ფოტო</label>
                    {/* Drag and Drop for Image */}
                    <div
                      onDrop={handleImageDrop}
                      onDragOver={(e) => e.preventDefault()}
                      className="border-2 border-dashed p-4 mt-1 flex justify-center items-center"
                    >
                      {newProduct.imgSrc ? (
                        <img src={newProduct.imgSrc} alt="Uploaded" className="max-w-full h-32 object-contain" />
                      ) : (
                        <span className="text-gray-500">გადაიყვანეთ სურათი აქ</span>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">თარიღი</label>
                    <input
                      type="date"
                      name="date"
                      value={newProduct.date}
                      onChange={handleInputChange}
                      className="border w-full p-2 mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">ახალი</label>
                    <input
                      type="checkbox"
                      name="isNew"
                      checked={newProduct.isNew}
                      onChange={(e) => setNewProduct({ ...newProduct, isNew: e.target.checked })}
                      className="mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    className={`bg-blue-500 text-white px-4 py-2 rounded-md mt-4 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!isFormValid}
                  >
                    {isEditMode ? "განახლება" : "გამოაქვეყნეთ"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products List */}
      <div className="grid grid-cols-1 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6">
        {productsData.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-lg">
            <img src={product.imgSrc} alt={product.name} className="h-32 object-contain mx-auto mb-4" />
            <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
            <p className="text-sm text-gray-500">{product.serialNumber}</p>
            <p className="text-sm text-gray-500">{product.price}</p>
            <div className="flex justify-between mt-4">
              <button
                className="text-blue-500"
                onClick={() => {
                  setIsModalOpen(true);
                  setIsEditMode(true);
                  setNewProduct(product);
                  setEditProductId(product.id);
                }}
              >
                <FaPencilAlt />
              </button>
              <button
                className="text-red-500"
                onClick={() => {
                  setProductsData(productsData.filter((item) => item.id !== product.id));
                }}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
