import React, { useState } from 'react'
import { useForm } from 'react-hook-form';


const categories = [
    {
        id: 321,
        title: 'სანტექნიკა',
        image: "",
        description: "ეს არის სანტექნიკის კატეგორია",
        subcategories: [
            {
                id: 1,
                title: "მილები",
            },
            {
                id: 2,
                title: "საკანალიზაციო მილები"
            },
            {
                id: 3,
                title: "ონკანები"
            },
            {
                id: 4,
                title: "სამზარეულოს ონკანები"
            }
        ]
    },
    {
        id: 123,
        title: 'ელექტროობა',
        image: "",
        description: "ელექტროობის კატეგორია",
        subcategories: [
            {
                id: 5,
                title: "კაბელი",
            },
            {
                id: 6,
                title: "ელექტრო-სამონტაჟო აქსესუარები",
            },
            {
                id: 7,
                title: "ხელსაწყოები",
            },
            {
                id: 8,
                title: "ჩამრთველები"
            }
        ]
    },
];

export default function Sales() {
  const [sales, setSales] = useState([

  ]);

  const [checkedCategories, setCheckedCategories] = useState(
        categories.map((category) => ({
            id: category.id,
            checked: false,
            subcategories: category.subcategories.map((subcategory) => ({
                id: subcategory.id,
                checked: false,
            })),
        }))
    );

    const handleCategoryChange = (categoryIndex) => {
            const updatedCategories = [...checkedCategories];
            const category = updatedCategories[categoryIndex];
            category.checked = !category.checked;
            category.subcategories = category.subcategories.map((sub) => ({
                ...sub,
                checked: category.checked,
            }));
        
            setCheckedCategories(updatedCategories);
    };

    const handleSubcategoryChange = (categoryIndex, subcategoryIndex) => {
        const updatedCategories = [...checkedCategories];
        updatedCategories[categoryIndex].subcategories[subcategoryIndex].checked =
            !updatedCategories[categoryIndex].subcategories[subcategoryIndex].checked;

        const allSubcategoriesChecked = updatedCategories[categoryIndex].subcategories.every(
            (sub) => sub.checked
        );
        updatedCategories[categoryIndex].checked = allSubcategoriesChecked;

        setCheckedCategories(updatedCategories);
  };

  
  return (
    <div className='px-8 py-10 flex flex-col gap-10'>
        {categories.map((category, i) => (
            <div key={category.id}>
                <div className='flex justify-start items-center gap-2 mb-4'>
                    <input
                        id={category.id}
                        type="checkbox"
                        checked={checkedCategories[i].checked}
                        onChange={() => handleCategoryChange(i)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label htmlFor={category.id} className="font-semibold text-gray-900 dark:text-white">
                        {category.title}
                    </label>
                </div>
                <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {category.subcategories.map((subcategory, j) => (
                        <li key={subcategory.id} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                            <div className="flex items-center px-3">
                                <input
                                    id={subcategory.id}
                                    type="checkbox"
                                    checked={checkedCategories[i].subcategories[j].checked}
                                    onChange={() => {
                                        handleSubcategoryChange(i, j)
                                        if(checkedCategories[i].subcategories[j].checked){
                                            setSales((prev) => [...prev, { id: subcategory.id, sale: 0 }])
                                        }else{
                                            setSales((prev) => prev.filter((sub) => sub.id !== subcategory.id))
                                        }
                                    }}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label htmlFor={subcategory.id} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {subcategory.title}
                                </label>
                                {checkedCategories[i].subcategories[j].checked && (
                                    <input type='number' value={0} className='h-full bg-gray-300 text-black rounded-md px-4 py-2' placeholder='%'/>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        ))}
        <div className='w-full h-full flex justify-end px-4 items-center'>
            <button className="px-4 py-2 bg-green-600 rounded-md text-white">
                Submit
            </button>

        </div>
    </div>
  )
}
