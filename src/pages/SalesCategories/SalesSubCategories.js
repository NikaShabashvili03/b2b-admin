import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import IMG1 from "../../assets/kluchi.png";
import IMG2 from "../../assets/dencq.png";
import PROFILE_PIC from "../../assets/kvercxi 1.jpg"; // Profile image
import { useForm } from "react-hook-form";

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
  }
];

const users = [
  {
    id: "1",
    name: "user1",
    lastname: "userishvili1",
    companyname: "Gm electronics"
  },
  {
    id: "2",
    name: "user2",
    lastname: "userishvili2",
    companyname: "Gm electronics"
  },
  {
    id: "3",
    name: "user3",
    lastname: "userishvili3",
    companyname: "Gm electronics"
  }
];

const SalesSubCategories = () => {
  const { CategoryId } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [selectAllUsers, setSelectAllUsers] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCheckboxToggle = (category) => {
    setCheckedCategories(prevChecked =>
      prevChecked.some(item => item.id === category.id)
        ? prevChecked.filter(item => item.id !== category.id)
        : [...prevChecked, category]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setCheckedCategories([]);
    } else {
      setCheckedCategories(categories);
    }
    setSelectAll(!selectAll);
  };

  const handleUserToggle = (user) => {
    setCheckedUsers((prevChecked) =>
      prevChecked.some((item) => item.id === user.id)
        ? prevChecked.filter((item) => item.id !== user.id)
        : [...prevChecked, user]
    );
  };

  const handleSelectAllUsers = () => {
    setCheckedUsers(selectAllUsers ? [] : users);
    setSelectAllUsers(!selectAllUsers);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full mx-auto p-4 bg-gray-100 h-screen">
      
      {/* Centered "აქციების გაცემა" Title */}
      <h1 className="text-2xl text-center mb-4">აქციების გაცემა</h1>

      {/* Button to Open Modal, Updated Text */}
      <div className="w-full flex justify-end mb-4">
        <button
          className="p-3 bg-black text-white rounded-lg"
          onClick={toggleModal}
        >
          აქციის გაცემა
        </button>
      </div>

      <div className="flex justify-end mb-4">
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
          className="mr-2 w-5 h-5"
        />
        <span className="text-lg">Select All Sub-Categories</span>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 mt-5">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative flex flex-col gap-2 bg-white rounded-lg shadow p-6 w-full mx-auto"
          >
            <div className="absolute top-2 left-2">
              <input
                type="checkbox"
                checked={checkedCategories.some(item => item.id === category.id)}
                onChange={() => handleCheckboxToggle(category)}
                className="mr-2 w-5 h-5"
              />
            </div>

            <h2 className="text-xl text-center mb-4">{category.title}</h2>
            <img
              src={category.image}
              alt={`Image for ${category.title}`}
              className="w-[180px] aspect-square mx-auto mb-4 object-cover"
            />

            {checkedCategories.some(item => item.id === category.id) && (
              <div className="flex items-center justify-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="100"
                  placeholder="შეიყვანეთ %"
                  className="w-36 px-2 py-1 text-center border rounded-md"
                />
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            )}

            <div className="w-full flex justify-center">
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

            <div className="mb-4">
              <input
                type="checkbox"
                checked={selectAllUsers}
                onChange={handleSelectAllUsers}
                className="mr-2 w-5 h-5"
              />
              <span className="text-lg">Select All Users</span>
            </div>

            <div className="overflow-y-auto max-h-60">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    checked={checkedUsers.some(item => item.id === user.id)}
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
                className="px-4 py-2 bg-gray-300 rounded-lg mr-[270px]"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                onClick={() => {
                  // Handle submit logic here
                  toggleModal();
                }}
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

export default SalesSubCategories;
