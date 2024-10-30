import React, { useState } from 'react';

function Products() {
    const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products')) || []);
    const [form, setForm] = useState({ name: '', price: '', quantity: '' });
    const [editingIndex, setEditingIndex] = useState(null);

    const handleAddOrUpdate = () => {
        const updatedProducts = [...products];
        if (editingIndex !== null) {
            updatedProducts[editingIndex] = form;
        } else {
            updatedProducts.push(form);
        }
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setForm({ name: '', price: '', quantity: '' });
        setEditingIndex(null);
    };

    const handleEdit = (index) => {
        setForm(products[index]);
        setEditingIndex(index);
    };

    const handleDelete = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    return ( <div className="products">
        <h1> Products </h1> <
        form onSubmit = {
            (e) => {
                e.preventDefault();
                handleAddOrUpdate();
            }
        } >
        <
        input type = "text"
        placeholder = "Product Name"
        value = { form.name }
        onChange = {
            (e) => setForm({...form, name: e.target.value })
        }
        required/>
        <input type = "number" placeholder = "Price"
        value = { form.price }
        onChange = {
            (e) => setForm({...form, price: e.target.value })
        }
        required/>
        <
        input type = "number"
        placeholder = "Quantity"
        value = { form.quantity }
        onChange = {
            (e) => setForm({...form, quantity: e.target.value })
        }
        required />
        <
        button type = "submit" > { editingIndex !== null ? 'Update' : 'Add' }
        Product < /button> < /
        form ><ul> {
            products.map((product, index) => ( <
                li key = { index } > { product.name } - $ { product.price } - { product.quantity }
                pcs <
                button onClick = {
                    () => handleEdit(index)
                }> Edit < /button> <
                button onClick = {
                    () => handleDelete(index)
                } > Delete < /button></li>
            ))
        } </ul></div>
    );
}

export default Products;