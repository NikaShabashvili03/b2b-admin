import React, { useState } from "react";
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import PROFILE_PIC from "../../assets/kvercxi 1.jpg"; // Profile image

const users = [
  { id: "1", name: "user1", lastname: "userishvili1", companyname: "Gm electronics" },
  { id: "2", name: "user2", lastname: "userishvili2", companyname: "Gm electronics" },
  { id: "3", name: "user3", lastname: "userishvili3", companyname: "Gm electronics" }
];

const Products = () => {
  const [productsData, setProductsData] = useState([
    {
      id: 1,
      serialNumber: "IPC3624LE-ADF28K-WL",
      name: "4 არხიანი IP ვიდეო ჩამწერი",
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleProductToggle = (product) => {
    setCheckedProducts((prevChecked) =>
      prevChecked.some((item) => item.id === product.id)
        ? prevChecked.filter((item) => item.id !== product.id)
        : [...prevChecked, product]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setCheckedProducts([]);
    } else {
      setCheckedProducts(productsData);
    }
    setSelectAll(!selectAll);
  };

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleUserToggle = (user) => {
    setCheckedUsers((prevChecked) =>
      prevChecked.some((item) => item.id === user.id)
        ? prevChecked.filter((item) => item.id !== user.id)
        : [...prevChecked, user]
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h2 className="flex justify-center text-2xl font-semibold mb-6">პროდუქტები</h2>

      {/* Button to Open Modal */}
      <div className="w-full flex justify-end mb-4">
        <button
          className="p-3 bg-black text-white rounded-lg"
          onClick={toggleModal}
        >
          აქციის გაცემა
        </button>
      </div>
      <div className="w-full flex justify-end mt-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            className="mr-2 w-5 h-5"
          />
          <span className="text-lg">Select All Products</span>
        </div>
      </div>
      {/* Products List */}
      <div className="grid grid-cols-1 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6">
        {productsData.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-lg relative">
            <div className="absolute top-2 left-2">
              <input
                type="checkbox"
                checked={checkedProducts.some((item) => item.id === product.id)}
                onChange={() => handleProductToggle(product)}
                className="mr-2 w-5 h-5"
              />
            </div>
            <img src={product.imgSrc} alt={product.name} className="h-32 object-contain mx-auto mb-4" />
            <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
            <p className="text-sm text-gray-500">{product.serialNumber}</p>
            <p className="text-sm text-gray-500">{product.price}</p>

            {/* Show input when checkbox is selected */}
            {checkedProducts.some(item => item.id === product.id) && (
              <div className="mt-4">
                <input
                  type="number"
                  min="1"
                  max="100"
                  placeholder="შეიყვანეთ %"
                  className="w-36 px-2 py-1 text-center border rounded-md"
                />
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  disabled={false} // Button will be enabled when there's input
                >
                  Save
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Select All Checkbox below the grid, aligned to the right */}
      

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-11/12 max-w-lg relative shadow-lg">
            <h2 className="text-2xl mb-4 text-center">Search Users</h2>
            <button onClick={toggleModal} className="absolute top-4 right-4 text-gray-500 hover:text-black">
              &times;
            </button>

            {/* Search Bar inside Modal */}
            <div className="mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search users..."
                className="p-2 w-full border rounded-md"
              />
            </div>

            <div className="overflow-y-auto max-h-60">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    checked={checkedUsers.some((item) => item.id === user.id)}
                    onChange={() => handleUserToggle(user)}
                    className="mr-2 w-5 h-5"
                  />
                  <img
                    src={PROFILE_PIC}
                    alt="Profile"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span>{user.name} {user.lastname} ({user.companyname})</span>
                </div>
              ))}
            </div>

            {/* Cancel and Submit Buttons */}
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                onClick={toggleModal}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
