import React, { useEffect, useState } from 'react';
import ProductModel from "./ProductModel";
import './../css/search.css'; // Import custom CSS file

function ProductList() {
    const [products, setProducts] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [widths, setWidths] = useState([]);
    const [heights, setHeights] = useState([]);
    const [diameters, setDiameters] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [meta, setMeta] = useState({ total: 0 });

    useEffect(() => {
        // Replace with your API call
        fetch('https://avtoshina.by/api/v1/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data.items || []);
                setVendors(data.filters.vendors || []);
                setWidths(data.filters.widths || []);
                setHeights(data.filters.heights || []);
                setDiameters(data.filters.diameters || []);
                setSeasons(data.filters.seasons || []);
                setMeta(data.meta || { total: 0 });
            });
    }, []);

    return (
        <div>
            <section className="s-products s-category">
                <div className="container">
                    <h1 className="pg-title search-header">
                        <span>
                            <span className="search-header__title">Шины</span>
                            <span className="search-header__count">{products.length} товаров</span>
                        </span>
                    </h1>

                    <h2>Найдено {products.length} шин</h2>

                    <p>Показаны товары с {meta.from} по {meta.to}</p>
                    <p>Сортировка: <a href="#todo">Сначала дешевые</a> <a href="#todo">Сначала дорогие</a></p>
                </div>
            </section>

            <section className="s-products s-list s-index">
                <div className="container">
                    <div className="row main-row">
                        <aside className="col-md-3 sidebar">
                            <div className="sidebar">
                                <div className="widget">
                                    <div className="searchform s-form searchform-sm">
                                        <h3 className="form-title h3">
                                            Подбор по параметрам
                                        </h3>

                                        <form method="get">
                                            <div className="row">
                                                <fieldset className="col-md-12">
                                                    <legend>Бренд</legend>
                                                    <div className="select has-select2-label">
                                                        <label htmlFor="sFilter-vendor" className="label4-select2">Бренд</label>
                                                        <select name="vendor">
                                                            {vendors.map(vendor => (
                                                                <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="col-md-12">
                                                    <legend>Ширина</legend>
                                                    <div className="select">
                                                        <label htmlFor="sFilter-width" className="label4-select2">Ширина</label>
                                                        <select name="width">
                                                            {widths.map(width => (
                                                                <option key={width} value={width}>{width}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="col-md-12">
                                                    <legend>Высота</legend>
                                                    <div className="select">
                                                        <label htmlFor="sFilter-height" className="label4-select2">Высота</label>
                                                        <select name="height">
                                                            {heights.map(height => (
                                                                <option key={height} value={height}>{height}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="col-md-12">
                                                    <legend>Диаметр</legend>
                                                    <div className="select">
                                                        <label htmlFor="sFilter-diameter" className="label4-select2">Диаметр</label>
                                                        <select name="diameter">
                                                            {diameters.map(diameter => (
                                                                <option key={diameter} value={diameter}>{diameter}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="col-md-12">
                                                    <legend>Сезон</legend>
                                                    <div className="select">
                                                        <label htmlFor="sFilter-season" className="label4-select2">Сезон</label>
                                                        <select name="season">
                                                            {seasons.map(season => (
                                                                <option key={season} value={season}>{season}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </fieldset>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        <main className="main col-md-9 view-cat">
                            <p className="h3 search-result-header">
                                <span className="search-result-title">
                                    Найдено {meta.total} шин.
                                </span>
                            </p>

                            <div className="view-products grid">
                                {products.map(product => (
                                    <ProductModel key={product.id} product={product}/>
                                ))}
                            </div>
                        </main>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProductList;
