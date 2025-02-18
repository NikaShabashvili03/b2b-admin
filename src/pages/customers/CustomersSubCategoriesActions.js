import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import IMG1 from "../../assets/kluchi.png";
import IMG2 from "../../assets/dencq.png";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

const categories = [
  {
    id: 1,
    title: "სანტექნიკა",
    image: IMG1,
    description: "ეს არის სანტექნიკის კატეგორია",
    links: ["მილები", "საკანალიზაციო მილები", "ონკანები", "სამზარეულოს ონკანები"],
    percent: 75,
  },
  {
    id: 2,
    title: "ელექტროობა",
    image: IMG2,
    description: "ელექტროობის კატეგორია",
    links: ["კაბელი", "ელექტრო-სამონტაჟო აქსესუარები", "ხელსაწყოები", "ჩამრთველები"],
    percent: 50,
  },
];

const SubCategories = () => {
  const { CategoryId } = useParams();
  
  return (
    <div className="w-full mx-auto p-4 bg-gray-100 h-screen">
      <h1 className="text-2xl text-center mb-6">გაცემული აქციები</h1>
      
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 mt-5 justify-center">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative bg-white rounded-lg shadow-md p-6 w-full mx-auto transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            {/* Percentage Indicator */}
            <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
              {category.percent}%
            </div>
            
            <h2 className="text-xl text-center mb-4">{category.title}</h2>
            <img
              src={category.image}
              alt={`Image for ${category.title}`}
              className="w-[180px] aspect-square mx-auto mb-4 object-cover"
            />

            <div className="flex justify-end items-center w-full">
              <Link
                to={`/customers/customersact/${CategoryId}/${category.title}`}
                className="rounded-lg px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
              >
                პროდუქტები
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategories;
