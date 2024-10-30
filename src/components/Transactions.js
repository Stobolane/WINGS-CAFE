// src/components/Transactions.js
import React, { useState } from 'react';

function Transactions() {
    const [transactions, setTransactions] = useState(JSON.parse(localStorage.getItem('transactions')) || []);
    const [form, setForm] = useState({ product: '', quantity: '', date: '' });
    const [editingIndex, setEditingIndex] = useState(null);

    const handleAddOrUpdate = () => {
        const updatedTransactions = [...transactions];
        if (editingIndex !== null) {
            updatedTransactions[editingIndex] = form;
        } else {
            updatedTransactions.push(form);
        }
        setTransactions(updatedTransactions);
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
        setForm({ product: '', quantity: '', date: '' });
        setEditingIndex(null);
    };

    const handleEdit = (index) => {
        setForm(transactions[index]);
        setEditingIndex(index);
    };

    const handleDelete = (index) => {
        const updatedTransactions = transactions.filter((_, i) => i !== index);
        setTransactions(updatedTransactions);
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    };

    return (
        <div className="Transactions">
            <h1>Transactions</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleAddOrUpdate(); }}>
                <input type="text" placeholder="Product" value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} required/>
                <input type="number" placeholder="Quantity" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} required/>
                <input type="date"  placeholder="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}required/>
                <button type="submit">{editingIndex !== null ? 'Update' : 'Add'} Transaction</button>
            </form>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index}>
                        {transaction.product} - {transaction.quantity} pcs - {transaction.date}
                        <button onClick={() => handleEdit(index)}>Edit</button>
                        <button onClick={() => handleDelete(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Transactions;
