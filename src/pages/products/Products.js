import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaCheck, FaTrash, FaPencilAlt } from 'react-icons/fa';
import { ImCross } from "react-icons/im";
import { useDropzone } from 'react-dropzone';
import { fetchProducts, addProduct, updateProduct, removeProduct } from '../../redux/slices/productSlice';
import axios from '../../utils/axios'
import { set } from "react-hook-form";

const Products = () => {
  const { subcategoryId, categoryId } = useParams();
  const dispatch = useDispatch();
  const [attributes, setAttributes] = useState([]);
  useEffect(() => {
    axios.get(`/subcategory/${subcategoryId}/attributes`).then((res) => {
      setAttributes(res.data)
    }).catch((err) => {
      console.log(err);
    })
  }, [subcategoryId])

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const { data: productsData, status } = useSelector((state) => state.product);

  console.log(productsData)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    prod_id: "",
    price: "",
    description: "",
    images: [],
    categoryId: categoryId,
    quantity: "",
    subcategoryId: subcategoryId,
    attributes: {}
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts({ subcategoryId }));
    }
  }, [status, dispatch, subcategoryId]);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      setIsEditMode(false);
      setNewProduct({
        name: "",
        prod_id: "",
        price: "",
        description: "",
        images: [],
        categoryId: categoryId,
        quantity: "",
        subcategoryId: subcategoryId,
        attributes: {}
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

  const handleImageDrop = (acceptedFiles) => {
    setNewProduct({
      ...newProduct,
      images: acceptedFiles.map(file => URL.createObjectURL(file))
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImageDrop,
    accept: 'image/*'
  });

  const handleAttributeChange = (name, value) => {
    setNewProduct((prevProduct) => ({
        ...prevProduct,
        attributes: {
            ...prevProduct.attributes,
            [name]: value
        }
    }));
};

const handleRemoveAttribute = (name) => {
    const updatedAttributes = { ...newProduct.attributes };
    delete updatedAttributes[name];

    setNewProduct({
        ...newProduct,
        attributes: updatedAttributes
    });
};


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.prod_id || !newProduct.price || !newProduct.description || !newProduct.quantity) {
      alert("გთხოვთ შეავსოთ ყველა ველი.");
      return;
    }

    if (isEditMode) {
      dispatch(updateProduct({ id: editProductId, data: {
          prod_id: newProduct.prod_id,
          name: newProduct.name,
          price: newProduct.price,
          categoryId: categoryId,
          description: newProduct.description,
          quantity: newProduct.quantity,
          attributes: newProduct.attributes
      } }));
    } else {
      dispatch(addProduct({
        data: {
          prod_id: newProduct.prod_id,
          name: newProduct.name,
          price: newProduct.price,
          description: newProduct.description,
          categoryId: categoryId,
          subcategoryId: subcategoryId,
          quantity: newProduct.quantity,
          attributes: newProduct.attributes
        }
      }));
    }

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
                <form onSubmit={handleSubmit} className=" overflow-y-auto max-h-[500px] pr-10">
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
                    <label className="block text-sm font-medium">პროდუქტის ID</label>
                    <input
                      type="text"
                      name="prod_id"
                      value={newProduct.prod_id}
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
                    <label className="block text-sm font-medium">აღწერა</label>
                    <textarea
                      name="description"
                      value={newProduct.description}
                      onChange={handleInputChange}
                      className="border w-full p-2 mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">ფოტოები</label>
                    {/* Drag and Drop for Images */}
                    <div {...getRootProps()} className="border-2 border-dashed p-4 mt-1 flex justify-center items-center">
                      <input {...getInputProps()} />
                      {newProduct.images.length ? (
                        newProduct.images.map((image, index) => (
                          <img key={index} src={image} alt="Uploaded" className="max-w-full h-32 object-contain mx-2" />
                        ))
                      ) : (
                        <span className="text-gray-500">გადაიყვანეთ სურათები აქ</span>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">რაოდენობა</label>
                    <input
                      type="text"
                      name="quantity"
                      value={newProduct.quantity}
                      onChange={handleInputChange}
                      className="border w-full p-2 mt-1"
                    />
                  </div>
                  <div className="w-full justify-end flex">
              </div>
                <h2>Attributes</h2>
                <div className="w-full overflow-y-auto max-h-[500px] my-2 gap-2 flex flex-col py-2">
                  {Object.entries(newProduct.attributes).map(([key, value], index) => (
                    <div key={index} className="flex gap-2">
                      <p
                        type="text"
                        disabled={attributes?.includes(key)}
                        className="w-full flex justify-start items-center px-2 border rounded-full"
                        placeholder="Attribute Name"
                      >{key}</p>
                      <p
                        type="text"
                        onChange={(e) => handleAttributeChange(key, e.target.value)}
                        className="w-full flex justify-start items-center px-2 border rounded-full"
                        placeholder="Attribute Value"
                      >{value}</p>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveAttribute(key)} 
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  {/* Add Attribute Button */}
                  {/* {Object.entries(attributes?.map((attr) => ({ name: attr, value: "" })).reduce((acc, item) => {
                        acc[item.name] = item.value;
                        return acc;
                    }, {})).map(([key, value], index) => (
                        <div>
                            <p>{key} - {value}</p>
                        </div>
                    ))} */}
                  <div className="flex">
                    <input
                        type="text"
                        className="w-full px-2 border rounded-full"
                        placeholder="Attribute Name"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                    />
                    <input
                      type="text"
                      onChange={(e) => setValue(e.target.value)}
                      className="w-full px-2 border rounded-full"
                      placeholder="Attribute Value"
                      value={value}
                    />
                    <button type="button" onClick={() => {
                      if(!key || !value) return;
                      setNewProduct({
                        ...newProduct,
                        attributes: {
                          ...newProduct.attributes,
                          [key]: value 
                        }
                      });
                      setKey("");
                      setValue("");
                    }} className="bg-blue-500 text-white p-2 rounded mt-2">Add</button>
                  </div>
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
        {productsData?.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow-lg">
            {/* <img src={product.images[0]} alt={product.name} className="h-32 object-contain mx-auto mb-4" /> */}
            <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
            <p className="text-sm text-gray-500">{product.prod_id}</p>
            <p className="text-sm text-gray-500">{product.price}</p>
            <div className="flex justify-between mt-4">
              <button
                className="text-blue-500"
                onClick={() => {
                  setIsModalOpen(true);
                  setIsEditMode(true);
                  setNewProduct(product);
                  setEditProductId(product._id);
                }}
              >
                <FaPencilAlt />
              </button>
              <button
                className="text-red-500"
                onClick={() => {
                  dispatch(removeProduct(product._id));
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