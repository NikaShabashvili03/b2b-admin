import React, { useState } from 'react';
import styles from './Home.module.css'; 


const Home = () => {
    const [activeTab, setActiveTab] = useState('customers');
    const [categories, setCategories] = useState([
        {
            id: 1,
            name: 'Electronics',
            subcategories: [
                { id: 1, name: 'Phones' },
                { id: 2, name: 'Laptops' },
            ],
        },
        {
            id: 2,
            name: 'Mechanical',
            subcategories: [
                { id: 3, name: 'nails' },
                { id: 4, name: 'pipes' },
            ],
        },
    ]);
    const [customers, setCustomers] = useState([
        { id: 1, username: 'john_doe', email: 'john.doe@example.com', password: 'password123' },
        { id: 2, username: 'jane_doe', email: 'jane.doe@example.com', password: 'password456' },
        { id: 3, username: 'mary_jane', email: 'mary.jane@example.com', password: 'password789' },
    ]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleCategoriesClick = () => {
        setActiveTab('categories');
    };

    const handleAddCategory = () => {
        const newCategoryName = prompt("Enter the name of the new category (Max 30 characters):");
        if (newCategoryName && newCategoryName.length <= 30) {
            const newCategory = { 
                id: Date.now(), 
                name: newCategoryName, 
                subcategories: [] 
            };
            setCategories([...categories, newCategory]);
        } else if (newCategoryName) {
            alert("Category name cannot exceed 30 characters.");
        } else {
            alert("Category name cannot be empty.");
        }
    };

    const handleAddSubcategory = (categoryId) => {
        const subcategoryName = prompt("Enter subcategory name (Max 30 characters):");
        if (subcategoryName && subcategoryName.length <= 30) {
            setCategories(categories.map(category => 
                category.id === categoryId 
                    ? { 
                        ...category, 
                        subcategories: [...category.subcategories, { id: Date.now(), name: subcategoryName }]
                    }
                    : category
            ));
        } else if (subcategoryName) {
            alert("Subcategory name cannot exceed 30 characters.");
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredCustomers = customers.filter(customer => customer.username.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className={styles.container}>
            <div className={styles.tab}>
                <div className={styles.container1}>
                    <div className={styles.logo}>Logo</div>
                    <div className={styles.profile}></div>
                    <div className={styles.name}>John Doe</div>
                </div>
                <div className={styles.list}>
                    <div 
                        className={`${styles.listItem} ${activeTab === 'customers' ? styles.active : ''}`} 
                        onClick={() => setActiveTab('customers')}
                    >
                        Customers
                    </div>
                    <div 
                        className={`${styles.listItem} ${activeTab === 'categories' ? styles.active : ''}`} 
                        onClick={handleCategoriesClick}
                    >
                        Categories
                    </div>
                </div>
            </div>

            <div className={styles.customerStaff}>
                {activeTab === 'categories' ? (
                    <>
                        <div className={styles.categoriesStaff}>
                            <button onClick={handleAddCategory}>Add Category</button>
                            {categories.map((category) => (
                                <div key={category.id} className={styles.categoryItem}>
                                    <div className={styles.categoryName}>
                                        <h3>{category.name}</h3>
                                        <button onClick={() => handleAddSubcategory(category.id)}>Add Subcategory</button>
                                    </div>
                                    <div className={styles.subcategoryList}>
                                        {category.subcategories.map((subcategory) => (
                                            <div key={subcategory.id} className={styles.subcategoryItem}>
                                                {subcategory.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div>
                        <input 
                            type="text" 
                            className={styles.searchBar} 
                            placeholder="Search customers..." 
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <div className={styles.customersList}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Password</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCustomers.map((customer) => (
                                        <tr key={customer.id}>
                                            <td>{customer.username}</td>
                                            <td>{customer.email}</td>
                                            <td>{customer.password}</td>
                                            <td>
                                                <button>Edit</button>
                                                <button>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
