import React, { useState, useEffect, useCallback } from 'react';
import ProductModel from "./ProductModel";
import BrandFilter from "./Filters/BrandFilter";
import WidthFilter from "./Filters/WidthFilter";
import HeightFilter from "./Filters/HeightFilter";
import DiameterFilter from "./Filters/DiameterFilter";
import SeasonFilter from "./Filters/SeasonFilter";
import './../css/product-list.css';

const ProductList = () => {
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
        dir: 'asc',
    });
    const [apiEndpoint, setApiEndpoint] = useState('');

    const updateURL = useCallback(() => {
        const query = new URLSearchParams(filters).toString();
        console.log(filters, query);
        const newUrl = `${window.location.pathname}?${query}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    }, [filters]);

    const fetchProducts = useCallback((apiEndpoint, filters) => {
        const query = new URLSearchParams(filters).toString();
        fetch(`${apiEndpoint}/products?${query}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setProducts(data.items || []);
                setMeta(data.meta || { total: 0, from: 0, to: 0 });
                setVendors(data.filters?.vendors || []);
                setWidths(data.filters?.widths || []);
                setHeights(data.filters?.heights || []);
                setDiameters(data.filters?.diameters || []);
                setSeasons(data.filters?.seasons || []);
                updateURL();
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, [updateURL]);


    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleSortChange = (sortField, sortOrder) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            order: sortField,
            dir: sortOrder,
        }));
    };

    useState(() => {
        const apiEndpoint = document.querySelector('meta[name="api-endpoint"]').getAttribute('content');
        setApiEndpoint(apiEndpoint);
        fetchProducts(apiEndpoint, filters);
    });

    useEffect(() => {
        fetchProducts(apiEndpoint, filters);
    }, [filters, apiEndpoint, fetchProducts]);

    return (
        <div>
            <section className="s-products s-category">
                <div className="rs-container">
                    <div className="b-meta">
                        <div className="meta-total">
                            <div className="meta-found">
                                Найдено {meta.total} шин
                            </div>

                            <div className="meta-from-to">
                                Показаны товары с {meta.from} по {meta.to}
                            </div>
                        </div>

                        <div className="meta-sort">
                            <span className="sort-title">Сортировка:</span>

                            <a href="#sort-asc" onClick={() => handleSortChange('price', 'asc')}>
                                Сначала дешевые
                            </a>

                            <a href="#sort-desc" onClick={() => handleSortChange('price', 'desc')}>
                                Сначала дорогие
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="s-products s-list s-index">
                <div className="rs-container">
                    <div className="rs-main-row">
                        <aside className="rs-sidebar">
                            <div className="sidebar">
                                <div className="widget">
                                    <div className="searchform s-form searchform-sm">
                                        <h3 className="form-title h3">
                                            Подбор по параметрам
                                        </h3>

                                        <form method="get" className="rs-filter-form">
                                            <div className="rs-filters">
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

                        <main className="rs-products">
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
};

export default ProductList;
