import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useQueryState } from 'nuqs';
import ProductModel from './ProductModel';
import BrandFilter from './Filters/BrandFilter';
import WidthFilter from './Filters/WidthFilter';
import HeightFilter from './Filters/HeightFilter';
import DiameterFilter from './Filters/DiameterFilter';
import SeasonFilter from './Filters/SeasonFilter';
import './../css/product-list.css';
import Loader from './Loader';
import debounce from 'lodash.debounce';

// Define the debounced function outside the component
const debouncedFetchProducts = debounce((endpoint, filterVals, fetchFn) => {
    fetchFn(endpoint, filterVals);
}, 300);

// Custom hook to only run the effect on updates (not initial mount)
function useUpdateEffect(effect, dependencies) {
    const prevValue = useRef(JSON.stringify(dependencies));

    useEffect(() => {
        const currentDeps = JSON.stringify(dependencies);
        if (prevValue.current !== currentDeps) {
            effect();
            prevValue.current = currentDeps;
        }
    }, [dependencies, effect]); // Add both dependencies explicitly
}

const ProductList = () => {
    // Define useQueryState hooks for each filter
    const [vendor, setVendor] = useQueryState('vendor', { defaultValue: '' });
    const [width, setWidth] = useQueryState('width', { defaultValue: '' });
    const [height, setHeight] = useQueryState('height', { defaultValue: '' });
    const [diameter, setDiameter] = useQueryState('diameter', { defaultValue: '' });
    const [season, setSeason] = useQueryState('season', { defaultValue: '' });
    const [order, setOrder] = useQueryState('order', { defaultValue: 'price' });
    const [dir, setDir] = useQueryState('dir', { defaultValue: 'asc' });
    const [page, setPage] = useQueryState('page', { defaultValue: 1 }); // Add page state

    const [products, setProducts] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [widths, setWidths] = useState([]);
    const [heights, setHeights] = useState([]);
    const [diameters, setDiameters] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [meta, setMeta] = useState({
        current_page: 1,
        last_page: 1,
        from: 0,
        to: 0,
        total: 0
    });  // Initialize with backend meta properties

    const [apiEndpoint, setApiEndpoint] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Combine query state values into a single filters object
    const filters = useMemo(() => ({
        vendor,
        width,
        height,
        diameter,
        season,
        order,
        dir,
        page, // Include page in filters
    }), [vendor, width, height, diameter, season, order, dir, page]);

    const fetchProducts = useCallback(async (apiEndpoint, filters) => {
        if (!apiEndpoint || isLoading) return;
        setIsLoading(true);

        try {
            const query = new URLSearchParams(filters).toString();
            const response = await fetch(`${apiEndpoint}/products?${query}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            setProducts(data.items || []);
            setMeta(data.meta || {
                current_page: 1,
                last_page: 1,
                from: 0,
                to: 0,
                total: 0
            });
            setVendors(data.filters?.vendors || []);
            setWidths(data.filters?.widths || []);
            setHeights(data.filters?.heights || []);
            setDiameters(data.filters?.diameters || []);
            setSeasons(data.filters?.seasons || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

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

    // Inline debounce with explicit dependencies
    const debouncedFetch = useCallback((endpoint, filterVals) => {
        debouncedFetchProducts(endpoint, filterVals, fetchProducts);
    }, [fetchProducts]); // Only fetchProducts as dependency

    useUpdateEffect(() => {
        if (apiEndpoint) {
            debouncedFetch(apiEndpoint, filters);
        }
    }, [filters, apiEndpoint, debouncedFetch]);

    const handleBrandFilterChange = (e) => {
        setVendor(e.target.value);
        setPage(1);
    };

    const handleWidthFilterChange = (e) => {
        setWidth(e.target.value);
        setPage(1);
    };

    const handleHeightFilterChange = (e) => {
        setHeight(e.target.value);
        setPage(1);
    };

    const handleDiameterFilterChange = (e) => {
        setDiameter(e.target.value);
        setPage(1);
    };

    const handleSeasonFilterChange = (e) => {
        setSeason(e.target.value);
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    // Generate pagination links
    const paginationLinks = () => {
        const links = [];
        const totalPages = meta.last_page;
        const currentPage = meta.current_page;

        if (totalPages < 2) {
            return;
        }

        // Always show the first page
        links.push(
            <span
                key={1}
                onClick={() => handlePageChange(1)}
                style={{
                    cursor: 'pointer',
                    fontWeight: currentPage === 1 ? 'bold' : 'normal',
                    margin: '0 5px',
                }}
            >
            1
        </span>
        );

        // Add dots if current page is far from the start
        if (currentPage > 4) {
            links.push(<span key="start-dots" style={{ margin: '0 5px' }}>...</span>);
        }

        // Show 2 pages before the current page, current page, and 2 pages after it
        for (let i = Math.max(2, currentPage - 2); i <= Math.min(currentPage + 2, totalPages - 1); i++) {
            links.push(
                <span
                    key={i}
                    onClick={() => handlePageChange(i)}
                    style={{
                        cursor: 'pointer',
                        fontWeight: currentPage === i ? 'bold' : 'normal',
                        margin: '0 5px',
                    }}
                >
                {i}
            </span>
            );
        }

        // Add dots if current page is far from the end
        if (currentPage < totalPages - 3) {
            links.push(<span key="end-dots" style={{ margin: '0 5px' }}>...</span>);
        }

        // Always show the last page
        if (totalPages > 1) {
            links.push(
                <span
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    style={{
                        cursor: 'pointer',
                        fontWeight: currentPage === totalPages ? 'bold' : 'normal',
                        margin: '0 5px',
                    }}
                >
                {totalPages}
            </span>
            );
        }

        return links;
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
                                                    value={vendor || ''}
                                                />
                                                <WidthFilter
                                                    widths={widths}
                                                    handleFilterChange={handleWidthFilterChange}
                                                    value={width || ''}
                                                />
                                                <HeightFilter
                                                    heights={heights}
                                                    handleFilterChange={handleHeightFilterChange}
                                                    value={height || ''}
                                                />
                                                <DiameterFilter
                                                    diameters={diameters}
                                                    handleFilterChange={handleDiameterFilterChange}
                                                    value={diameter || ''}
                                                />
                                                <SeasonFilter
                                                    seasons={seasons}
                                                    handleFilterChange={handleSeasonFilterChange}
                                                    value={season || ''}
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
                                    Найдено {meta.total} шин
                                </span>
                            </p>
                            {isLoading ? (
                                <Loader />
                            ) : (
                                <div className="view-products grid">
                                    {products.map((product) => (
                                        <ProductModel key={`product${product.id}`} product={product} />
                                    ))}
                                </div>
                            )}
                            <div className="pagination">
                                {paginationLinks()}
                            </div>
                        </main>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductList;
