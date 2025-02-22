import React, { useState } from 'react';
import personalProfilePhoto from '../../assets/kvercxi 1.jpg';
import companyProfilePhoto from '../../assets/Gm.png';
import penIcon from '../../assets/pen-solid.svg';
import cameraIcon from '../../assets/camera-solid.svg';
import { useAuth } from '../../context/AuthContext';

function Profile() {
  const { admin } = useAuth()
  const [showTextPopup, setShowTextPopup] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [name, setName] = useState(admin.name);
  const [lastName, setLastName] = useState(admin.lastname);
  
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
        <>
            <div className="mb-10 bg-gray-100 p-5 rounded-lg shadow-md">
              <h2 className="text-2xl mb-4">პირადი პროფილი</h2>
              <div className="flex items-center">
                <div className="relative mr-5">
                  <img
                    src={personalProfilePhoto}
                    alt="Personal Profile"
                    className="w-32 h-32 rounded-full border border-blue-800 object-cover"
                  />
                </div>
                <div>
                  <p>
                    <strong>სახელი:</strong> {name}{' '}
                  </p>
                  <p>
                    <strong>გვარი:</strong> {lastName}{' '}
                  </p>
                </div>
              </div>
            </div>
          </>
      </div>
    </div>
  );
}

export default Profile;
