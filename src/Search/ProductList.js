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
    const [meta, setMeta] = useState({ total: 0, from: 0, to: 0 });
    const [filters, setFilters] = useState({
        vendor: '',
        width: '',
        height: '',
        diameter: '',
        season: '',
        order: 'price',
        dir: 'asc'
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        const query = new URLSearchParams(filters).toString();
        fetch(`https://avtoshina.by/api/v1/products?${query}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setProducts(data.items || []);
                setMeta(data.meta || { total: 0, from: 0, to: 0 });

                if (data.filters) {
                    setVendors(data.filters.vendors || []);
                    setWidths(data.filters.widths || []);
                    setHeights(data.filters.heights || []);
                    setDiameters(data.filters.diameters || []);
                    setSeasons(data.filters.seasons || []);
                }

                // Update the URL in the browser
                const newUrl = `${window.location.pathname}?${query}`;
                window.history.pushState({ path: newUrl }, '', newUrl);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                // Handle error or display a message to the user
            });
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSortChange = (sortField, sortOrder) => {
        setFilters({ ...filters, order: sortField, dir: sortOrder });
    };

    return (
        <div>
            <section className="s-products s-category">
                <div className="container">
                    <h1 className="pg-title search-header">
                        <span>
                            <span className="search-header__title">Шины</span>
                            <span className="search-header__count">{meta.total} товаров</span>
                        </span>
                    </h1>

                    <h2>Найдено {meta.total} шин</h2>

                    <p>Показаны товары с {meta.from} по {meta.to}</p>
                    <p>Сортировка:
                        <a href="#sort-asc" onClick={() => handleSortChange('price', 'asc')}>Сначала дешевые</a>
                        <a href="#sort-desc" onClick={() => handleSortChange('price', 'desc')}>Сначала дорогие</a>
                    </p>
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
                                                        <select name="vendor" onChange={handleFilterChange}>
                                                            <option value="">Выберите бренд</option>
                                                            {vendors.map(vendor => (
                                                                <option key={`vendor${vendor.id}`} value={vendor.id}>{vendor.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="col-md-12">
                                                    <legend>Ширина</legend>
                                                    <div className="select">
                                                        <label htmlFor="sFilter-width" className="label4-select2">Ширина</label>
                                                        <select name="width" onChange={handleFilterChange}>
                                                            <option value="">Выберите ширину</option>
                                                            {widths.map(width => (
                                                                <option key={`width${width}`} value={width}>{width}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="col-md-12">
                                                    <legend>Высота</legend>
                                                    <div className="select">
                                                        <label htmlFor="sFilter-height" className="label4-select2">Высота</label>
                                                        <select name="height" onChange={handleFilterChange}>
                                                            <option value="">Выберите высоту</option>
                                                            {heights.map(height => (
                                                                <option key={`height${height}`} value={height}>{height}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="col-md-12">
                                                    <legend>Диаметр</legend>
                                                    <div className="select">
                                                        <label htmlFor="sFilter-diameter" className="label4-select2">Диаметр</label>
                                                        <select name="diameter" onChange={handleFilterChange}>
                                                            <option value="">Выберите диаметр</option>
                                                            {diameters.map(diameter => (
                                                                <option key={`diameter${diameter}`} value={diameter}>{diameter}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="col-md-12">
                                                    <legend>Сезон</legend>
                                                    <div className="select">
                                                        <label htmlFor="sFilter-season" className="label4-select2">Сезон</label>
                                                        <select name="season" onChange={handleFilterChange}>
                                                            <option value="">Выберите сезон</option>
                                                            {seasons.map(season => (
                                                                <option key={`season${season}`} value={season}>{season}</option>
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
