import React, { useEffect, useState } from 'react';
import ProductModel from "./Search/ProductModel";
import './css/search.css'; // Import custom CSS file

function Products() {
    const [products, setProducts] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [widths, setWidths] = useState([]);
    const [heights, setHeights] = useState([]);

    useEffect(() => {
        // Replace with your API call
        fetch('https://avtoshina.by/api/v1/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data.items || []);
                setVendors(data.filters.vendors || []);
                setWidths(data.filters.widths || []);
                setHeights(data.filters.heights || []);
            });
    }, []);

    return (
        <div className="row">
            <div className="col-md-3">
                <h2>Vendors</h2>
                <select>
                    {vendors.map(vendor => (
                        <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
                    ))}
                </select>
                <h2>Widths</h2>
                <select>
                    {widths.map(width => (
                        <option key={width} value={width}>{width}</option>
                    ))}
                </select>
                <h2>Heights</h2>
                <select>
                    {heights.map(height => (
                        <option key={height} value={height}>{height}</option>
                    ))}
                </select>
            </div>

            <div className="col-md-9">
                <h2>Найдено {products.length} шин</h2>
                <p>Показаны товары с 1 по 40</p>
                <p>Сортировка: <a href="#todo">Сначала дешевые</a> <a href="#todo">Сначала дорогие</a> </p>

                <div className="view-products grid">
                    {products.map(product => (
                        <div key={product.id}>
                            <ProductModel product={product}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Products;
