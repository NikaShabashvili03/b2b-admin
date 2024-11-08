import { useState } from 'react';

const categories = [
    {
        id: 321,
        title: 'სანტექნიკა',
        subcategories: [
            {
                id: 1,
                title: "მილები",
                products: [
                    { id: 128, title: "სამსუნგ G1" },
                    { id: 122, title: "სამსუნგ G3" }
                ]
            },
            {
                id: 2,
                title: "საკანალიზაციო მილები",
                products: [
                    { id: 124, title: "სამსუნგ G3" }
                ]
            },
            {
                id: 3,
                title: "ონკანები",
                products: [
                    { id: 120, title: "სამსუნგ G4" }
                ]
            },
        ]
    },
    {
        id: 123,
        title: 'ელექტროობა',
        subcategories: [
            {
                id: 5,
                title: "კაბელი",
                products: [
                    { id: 131, title: "აიფონ 16" }
                ]
            },
            {
                id: 6,
                title: "ელექტრო-სამონტაჟო აქსესუარები",
                products: [
                    { id: 132, title: "აიფონ 15" }
                ]
            },
        ]
    },
];

export default function Sales() {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [productSales, setProductSales] = useState([]);  // New state for sale percentages

    const handleCategoryChange = (category) => {
        const allProductsInCategory = category.subcategories.flatMap(sub => sub.products);
        const isCategorySelected = allProductsInCategory.every(product => selectedProducts.some(p => p.id === product.id));

        setSelectedProducts(prev =>
            isCategorySelected
                ? prev.filter(p => !allProductsInCategory.some(product => product.id === p.id)) // Deselect all in category
                : [...prev, ...allProductsInCategory.filter(product => !prev.some(p => p.id === product.id))] // Select all in category
        );
    };

    const handleSubcategoryChange = (subcategory) => {
        const isSubcategorySelected = subcategory.products.every(product => selectedProducts.some(p => p.id === product.id));

        setSelectedProducts(prev =>
            isSubcategorySelected
                ? prev.filter(p => !subcategory.products.some(product => product.id === p.id)) // Deselect all in subcategory
                : [...prev, ...subcategory.products.filter(product => !prev.some(p => p.id === product.id))] // Select all in subcategory
        );
    };

    const handleProductChange = (product) => {
        const isSelected = selectedProducts.some(p => p.id === product.id);

        setSelectedProducts(prev =>
            isSelected
                ? prev.filter(p => p.id !== product.id)
                : [...prev, product] 
        );

        if (isSelected) {
            setProductSales(prev => prev.filter(p => p.product !== product.id));
        }
    };

    const handleSaleChange = (productId, saleValue) => {
        setProductSales(prev => {
            if (saleValue === "") {
                return prev.filter(p => p.product !== productId);
            }
         
            const existingSale = prev.find(p => p.product === productId);
            if (existingSale) {
                return prev.map(p => p.product === productId ? { ...p, sale: saleValue } : p);
            } else {
                return [...prev, { product: productId, sale: saleValue }];
            }
        });
    };

    return (
        <div className='px-8 py-10 flex flex-col gap-10'>
            {categories.map((category) => (
                <div key={category.id}>
                    <div className='flex justify-start items-center gap-2 mb-4'>
                        <input
                            type="checkbox"
                            checked={category.subcategories.every(sub => sub.products.every(product => selectedProducts.some(p => p.id === product.id)))}
                            onChange={() => handleCategoryChange(category)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="font-semibold text-gray-900">{category.title}</label>
                    </div>
                    {category.subcategories.map((subcategory) => (
                        <div key={subcategory.id} className="ml-6">
                            <div className="flex items-center gap-2 mb-2">
                                <input
                                    type="checkbox"
                                    checked={subcategory.products.every(product => selectedProducts.some(p => p.id === product.id))}
                                    onChange={() => handleSubcategoryChange(subcategory)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label className="text-gray-700">{subcategory.title}</label>
                            </div>
                            <ul className="ml-6">
                                {subcategory.products.map((product) => (
                                    <li key={product.id} className="flex items-center gap-2 mb-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedProducts.some(p => p.id === product.id)}
                                            onChange={() => handleProductChange(product)}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <label className="text-gray-600">{product.title}</label>
                                        {selectedProducts.some(p => p.id === product.id) && (
                                            <input
                                                type="number"
                                                value={productSales.find(p => p.product === product.id)?.sale || ""}
                                                onChange={(e) => handleSaleChange(product.id, e.target.value)}
                                                placeholder="%"
                                                className="w-16 px-2 py-1 text-center border rounded-md"
                                            />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ))}


            <div className='w-full h-full flex justify-end px-4 items-center'>
                <button className="px-4 py-2 bg-green-600 rounded-md text-white" onClick={() => console.log(productSales)}>
                    Submit
                </button>
            </div>
        </div>
    );
}
