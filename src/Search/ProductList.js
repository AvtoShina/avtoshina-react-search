import React, { useState, useEffect, useCallback } from 'react';
import { useQueryState } from 'nuqs';
import ProductModel from './ProductModel';
import BrandFilter from './Filters/BrandFilter';
import WidthFilter from './Filters/WidthFilter';
import HeightFilter from './Filters/HeightFilter';
import DiameterFilter from './Filters/DiameterFilter';
import SeasonFilter from './Filters/SeasonFilter';
import './../css/product-list.css';

const ProductList = () => {
    // Define useQueryState hooks for each filter
    const [vendor, setVendor] = useQueryState('vendor', { defaultValue: '' });
    const [width, setWidth] = useQueryState('width', { defaultValue: '' });
    const [height, setHeight] = useQueryState('height', { defaultValue: '' });
    const [diameter, setDiameter] = useQueryState('diameter', { defaultValue: '' });
    const [season, setSeason] = useQueryState('season', { defaultValue: '' });
    const [order, setOrder] = useQueryState('order', { defaultValue: 'price' });
    const [dir, setDir] = useQueryState('dir', { defaultValue: 'asc' });

    const [products, setProducts] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [widths, setWidths] = useState([]);
    const [heights, setHeights] = useState([]);
    const [diameters, setDiameters] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [meta, setMeta] = useState({ total: 0, from: 0, to: 0 });
    const [apiEndpoint, setApiEndpoint] = useState('');

    // Combine query state values into a single filters object
    let filters;
    filters = {
        vendor,
        width,
        height,
        diameter,
        season,
        order,
        dir,
    };

    const fetchProducts = useCallback(async (apiEndpoint, filters) => {
        if (!apiEndpoint) return;
        const defaultMeta = { total: 0, from: 0, to: 0 }; // Moved inside

        try {
            const query = new URLSearchParams(filters).toString();
            const response = await fetch(`${apiEndpoint}/products?${query}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            setProducts(data.items || []);
            setMeta(data.meta || defaultMeta);
            setVendors(data.filters?.vendors || []);
            setWidths(data.filters?.widths || []);
            setHeights(data.filters?.heights || []);
            setDiameters(data.filters?.diameters || []);
            setSeasons(data.filters?.seasons || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }, []);

    const handleSortChange = (sortField, sortOrder) => {
        setOrder(sortField);
        setDir(sortOrder);
    };

    useEffect(() => {
        const apiEndpointFromMeta = document
            .querySelector('meta[name="api-endpoint"]')
            ?.getAttribute('content');

        if (apiEndpointFromMeta) {
            setApiEndpoint(apiEndpointFromMeta);
        }
    }, []);

    useEffect(() => {
        if (apiEndpoint) {
            fetchProducts(apiEndpoint, filters);
        }
    }, [filters, apiEndpoint, fetchProducts]);

    // Handler functions to update the query parameters:
    const handleBrandFilterChange = (e) => {
        setVendor(e.target.value);
    };

    const handleWidthFilterChange = (e) => {
        setWidth(e.target.value);
    };

    const handleHeightFilterChange = (e) => {
        setHeight(e.target.value);
    };

    const handleDiameterFilterChange = (e) => {
        setDiameter(e.target.value);
    };

    const handleSeasonFilterChange = (e) => {
        setSeason(e.target.value);
    };

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
                            <span onClick={() => handleSortChange('price', 'asc')}>
                                Сначала дешевые
                            </span>
                            <span onClick={() => handleSortChange('price', 'desc')}>
                                Сначала дорогие
                            </span>
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
                                                <BrandFilter
                                                    vendors={vendors}
                                                    handleFilterChange={handleBrandFilterChange}
                                                    value={vendor}
                                                />
                                                <WidthFilter
                                                    widths={widths}
                                                    handleFilterChange={handleWidthFilterChange}
                                                    value={width}
                                                />
                                                <HeightFilter
                                                    heights={heights}
                                                    handleFilterChange={handleHeightFilterChange}
                                                    value={height}
                                                />
                                                <DiameterFilter
                                                    diameters={diameters}
                                                    handleFilterChange={handleDiameterFilterChange}
                                                    value={diameter}
                                                />
                                                <SeasonFilter
                                                    seasons={seasons}
                                                    handleFilterChange={handleSeasonFilterChange}
                                                    value={season}
                                                />
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
                                {products.map((product) => (
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
