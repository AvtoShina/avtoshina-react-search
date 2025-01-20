import React, { useEffect, useState } from 'react';
import ProductModel from "./ProductModel";
import BrandFilter from "./Filters/BrandFilter";
import WidthFilter from "./Filters/WidthFilter";
import HeightFilter from "./Filters/HeightFilter";
import DiameterFilter from "./Filters/DiameterFilter";
import SeasonFilter from "./Filters/SeasonFilter";
import './../css/search.css';

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
                    const filters = data.filters || [];

                    if (filters) {
                        setVendors(filters.vendors || []);
                        setWidths(filters.widths || []);
                        setHeights(filters.heights || []);
                        setDiameters(filters.diameters || []);
                        setSeasons(filters.seasons || []);
                    }
                })
                .catch(error => {
                    console.error('Error fetching pgiroducts:', error);
                });
        };

        fetchProducts();
    }, [filters]); // Запускается только при изменении filters

    useEffect(() => {
        const query = new URLSearchParams(filters).toString();
        const newUrl = `${window.location.pathname}?${query}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    }, [filters]); // Обновление URL при изменении filters

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
                                                <BrandFilter vendors={vendors} handleFilterChange={handleFilterChange} />
                                                <WidthFilter widths={widths} handleFilterChange={handleFilterChange} />
                                                <HeightFilter heights={heights} handleFilterChange={handleFilterChange} />
                                                <DiameterFilter diameters={diameters} handleFilterChange={handleFilterChange} />
                                                <SeasonFilter seasons={seasons} handleFilterChange={handleFilterChange} />
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
                                    <ProductModel key={`product${product.id}`} product={product} />
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
