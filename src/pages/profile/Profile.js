import React, { useState } from 'react';
import personalProfilePhoto from '../../assets/kvercxi 1.jpg';
import companyProfilePhoto from '../../assets/Gm.png';
import penIcon from '../../assets/pen-solid.svg';
import cameraIcon from '../../assets/camera-solid.svg';

function Profile() {
  const [selectedCategory, setSelectedCategory] = useState('profile');
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [showCompanyImagePopup, setShowCompanyImagePopup] = useState(false);
  const [showTextPopup, setShowTextPopup] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [position, setPosition] = useState("");
  const [currentText, setCurrentText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [burgerOpen, setBurgerOpen] = useState(false);

  const handleImageChange = (event) => {
    setImageFile(URL.createObjectURL(event.target.files[0]));
  };

  const handleSaveImage = () => {
    setShowImagePopup(false);
  };

  const handleSaveText = () => {
    if (currentField === 'name') setName(currentText);
    else if (currentField === 'lastName') setLastName(currentText);
    else if (currentField === 'phone') setPhone(currentText);
    else if (currentField === 'companyName') setCompanyName(currentText);
    else if (currentField === 'companyId') setCompanyId(currentText);
    else if (currentField === 'position') setPosition(currentText);
    setShowTextPopup(false);
  };

  const handleCancel = () => {
    setShowImagePopup(false);
    setShowCompanyImagePopup(false);
    setShowTextPopup(false);
    setCurrentText('');
  };

  const handlePenClick = (field) => {
    setCurrentField(field);
    setCurrentText('');
    setShowTextPopup(true);
  };

  const toggleBurgerMenu = () => setBurgerOpen(!burgerOpen);

  const fieldLabels = {
    name: 'სახელი',
    lastName: 'გვარი',
    phone: 'ტელეფონის ნომერი',
    companyName: 'კომპანიის სახელი',
    companyId: 'IDENTIFICATION NUMBER',
    position: 'თანამდებობა',
    password: 'პაროლი',
    email: 'ელ. ფოსტა'
  };

  const popupHeadingText = {
    name: 'შეცვალეთ სახელი',
    lastName: 'შეცვალეთ გვარი',
    phone: 'შეცვალეთ ტელეფონის ნომერი',
    companyName: 'შეცვალეთ კომპანიის სახელი',
    companyId: 'შეცვალეთ იდენტიფიკაციის კოდი',
    position: 'შეცვალეთ თანამდებობა',
    password: 'შეცვალეთ პაროლი',
    email: 'შეცვალეთ ელ. ფოსტა'
  };

  const placeholderText = {
    name: 'შეიყვანეთ სახელი',
    lastName: 'შეიყვანეთ გვარი',
    phone: 'შეიყვანეთ ტელეფონის ნომერი',
    companyName: 'შეიყვანეთ კომპანიის სახელი',
    companyId: 'შეიყვანეთ იდენტიფიკაციის კოდი',
    position: 'შეიყვანეთ თანამდებობა',
    password: 'შეიყვანეთ პაროლი',
    email: 'შეიყვანეთ ელ. ფოსტა'
  };

  return (
    <div className="flex w-full h-screen relative">
      {/* Main Content */}
      <div className="flex-1 p-5 mt-5">
        {selectedCategory === 'profile' && (
          <>
            <div className="mb-10 bg-gray-100 p-5 rounded-lg shadow-md">
              <h2 className="text-2xl mb-4">პირადი პროფილი</h2>
              <div className="flex items-center">
                <div className="relative mr-5">
                  <img
                    src={imageFile || personalProfilePhoto}
                    alt="Personal Profile"
                    className="w-32 h-32 rounded-full border border-blue-800 object-cover"
                  />
                  <img
                    src={cameraIcon}
                    alt="Change Profile Photo"
                    className="absolute bottom-2 right-4 w-6 h-6 cursor-pointer text-gray-700 hover:text-blue-600"
                    onClick={() => setShowImagePopup(true)}
                  />
                </div>
                <div>
                  <p>
                    <strong>სახელი:</strong> {name}{' '}
                    <img
                      src={penIcon}
                      alt="Edit"
                      className="inline ml-2 w-4 h-4 cursor-pointer hover:text-blue-600"
                      onClick={() => handlePenClick('name')}
                    />
                  </p>
                  <p>
                    <strong>გვარი:</strong> {lastName}{' '}
                    <img
                      src={penIcon}
                      alt="Edit"
                      className="inline ml-2 w-4 h-4 cursor-pointer hover:text-blue-600"
                      onClick={() => handlePenClick('lastName')}
                    />
                  </p>
                  <p>
                    <strong>ტელეფონის ნომერი:</strong> {phone}{' '}
                    <img
                      src={penIcon}
                      alt="Edit"
                      className="inline ml-2 w-4 h-4 cursor-pointer hover:text-blue-600"
                      onClick={() => handlePenClick('phone')}
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-10 bg-gray-100 p-5 rounded-lg shadow-md">
              <h2 className="text-2xl mb-4">დაცვა</h2>
              <p>
                <strong>შეცვალეთ პაროლი</strong>{' '}
                <img
                  src={penIcon}
                  alt="Edit"
                  className="inline ml-2 w-4 h-4 cursor-pointer hover:text-blue-600"
                  onClick={() => handlePenClick('password')}
                />
              </p>
              <p>
                <strong>ელ. ფოსტა:</strong> {""}{' '}
                <img
                  src={penIcon}
                  alt="Edit"
                  className="inline ml-2 w-4 h-4 cursor-pointer hover:text-blue-600"
                  onClick={() => handlePenClick('email')}
                />
              </p>
            </div>
          </>
        )}

        {selectedCategory === 'security' && (
          <div className="bg-gray-100 p-5 rounded-lg shadow-md">
            <h2 className="text-2xl mb-4">დაცვა</h2>
            <p>
              <strong>შეცვალეთ პაროლი</strong>{' '}
              <img
                src={penIcon}
                alt="Edit"
                className="inline ml-2 w-4 h-4 cursor-pointer hover:text-blue-600"
                onClick={() => handlePenClick('password')}
              />
            </p>
            <p>
              <strong>ელ. ფოსტა:</strong> {""}{' '}
              <img
                src={penIcon}
                alt="Edit"
                className="inline ml-2 w-4 h-4 cursor-pointer hover:text-blue-600"
                onClick={() => handlePenClick('email')}
              />
            </p>
          </div>
        )}
      </div>

      {/* Popup for Editing */}
      {showTextPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-80 shadow-lg">
            <h2 className="mb-4">{popupHeadingText[currentField]}</h2>
            <input
              type="text"
              placeholder={placeholderText[currentField]}
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            <div className="flex justify-center gap-4">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                onClick={handleSaveText}
              >
                Save
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
