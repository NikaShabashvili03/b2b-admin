import React, { useState } from 'react';
import styles from './invoice.module.css';

const users = [
  {
    id: 1,
    name: 'John Doe',
    invoices: [
      { id: 1, seller: 'GM Electronics', buyer: 'John Doe', bank: 'BOG', product: 'Laptop', price: 1200, date: '2024-11-01', confirmed: false },
      { id: 2, seller: 'GM Electronics', buyer: 'John Doe', bank: 'BOG', product: 'Mouse', price: 50, date: '2024-11-02', confirmed: false },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    invoices: [
      { id: 1, seller: 'GM Electronics', buyer: 'Jane Smith', bank: 'TBC', product: 'Phone', price: 800, date: '2024-11-03', confirmed: false },
      { id: 2, seller: 'GM Electronics', buyer: 'Jane Smith', bank: 'TBC', product: 'Headphones', price: 150, date: '2024-11-04', confirmed: false },
    ],
  },
  {
    id: 3,
    name: 'Alice Johnson',
    invoices: [
      { id: 1, seller: 'GM Electronics', buyer: 'Alice Johnson', bank: 'BOG', product: 'Tablet', price: 600, date: '2024-11-05', confirmed: false },
      { id: 2, seller: 'GM Electronics', buyer: 'Alice Johnson', bank: 'TBC', product: 'Keyboard', price: 100, date: '2024-11-06', confirmed: false },
    ],
  },
];

const Invoices = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [invoiceData, setInvoiceData] = useState(users);
  const [filter, setFilter] = useState('all');

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseDetails = () => {
    setSelectedUser(null);
  };

  const handleConfirm = (userId, invoiceId) => {
    const updatedData = invoiceData.map(user => 
      user.id === userId 
        ? { 
            ...user, 
            invoices: user.invoices.map(invoice => 
              invoice.id === invoiceId ? { ...invoice, confirmed: true } : invoice 
            )
          } 
        : user
    );
    setInvoiceData(updatedData);
  };

  const handleDelete = (userId, invoiceId) => {
    if (!window.confirm("Are you sure you want to delete this invoice?")) return;
    
    const updatedData = invoiceData.map(user => 
      user.id === userId 
        ? { 
            ...user, 
            invoices: user.invoices.filter(invoice => invoice.id !== invoiceId)
          } 
        : user
    );
    setInvoiceData(updatedData);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredInvoices = invoiceData.flatMap((user) =>
    user.invoices
      .filter((invoice) => {
        if (filter === 'all') return true;
        return filter === 'confirmed' ? invoice.confirmed : !invoice.confirmed;
      })
      .map((invoice) => ({
        ...invoice,
        userName: user.name,
        userId: user.id,
      }))
  );

  const totalConfirmed = invoiceData.flatMap(user => user.invoices).filter(invoice => invoice.confirmed).length;
  const totalPending = invoiceData.flatMap(user => user.invoices).filter(invoice => !invoice.confirmed).length;

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h3>Users</h3>
        <ul>
          {invoiceData.map((user) => (
            <li key={user.id} onClick={() => handleUserClick(user)}>
              {user.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.invoiceDetails}>
        <div className={styles.summary}>
          <h4>Total Confirmed: {totalConfirmed}</h4>
          <h4>Total Pending: {totalPending}</h4>
        </div>
        <div className={styles.filterContainer}>
          <label>Filter by status: </label>
          <select onChange={handleFilterChange} value={filter}>
            <option value="all">All</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        {selectedUser ? (
          <>
            <h3>{selectedUser.name}'s Invoices</h3>
            <div className={styles.invoiceCards}>
              {selectedUser.invoices.map((invoice) => (
                <div key={invoice.id} className={styles.invoiceCard}>
                  <h4>{invoice.product}</h4>
                  <p><strong>Seller:</strong> {invoice.seller}</p>
                  <p><strong>Buyer:</strong> {invoice.buyer}</p>
                  <p><strong>Recipient Bank:</strong> {invoice.bank}</p>
                  <p><strong>Price:</strong> ${invoice.price}</p>
                  <p><strong>Date:</strong> {invoice.date}</p>
                  <p><strong>Status:</strong> {invoice.confirmed ? 'Confirmed' : 'Pending'}</p>
                  <button
                    className={styles.confirmButton}
                    onClick={() => handleConfirm(selectedUser.id, invoice.id)}
                    disabled={invoice.confirmed}
                  >
                    Confirm
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(selectedUser.id, invoice.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <button className={styles.closeButton} onClick={handleCloseDetails}>
              Close
            </button>
          </>
        ) : (
          <>
            <h3>All Invoices</h3>
            <div className={styles.invoiceCards}>
              {filteredInvoices.map((invoice) => (
                <div key={`${invoice.userId}-${invoice.id}`} className={styles.invoiceCard}>
                  <h4>{invoice.product} (by {invoice.userName})</h4>
                  <p><strong>Seller:</strong> {invoice.seller}</p>
                  <p><strong>Buyer:</strong> {invoice.buyer}</p>
                  <p><strong>Recipient Bank:</strong> {invoice.bank}</p>
                  <p><strong>Price:</strong> ${invoice.price}</p>
                  <p><strong>Date:</strong> {invoice.date}</p>
                  <p><strong>Status:</strong> {invoice.confirmed ? 'Confirmed' : 'Pending'}</p>
                  <button
                    className={styles.confirmButton}
                    onClick={() => handleConfirm(invoice.userId, invoice.id)}
                    disabled={invoice.confirmed}
                  >
                    Confirm
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(invoice.userId, invoice.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Invoices;
