import React, { Component } from 'react';
import ProductModel from "./ProductModel";
import BrandFilter from "./Filters/BrandFilter";
import WidthFilter from "./Filters/WidthFilter";
import HeightFilter from "./Filters/HeightFilter";
import DiameterFilter from "./Filters/DiameterFilter";
import SeasonFilter from "./Filters/SeasonFilter";
import './../css/product-list.css';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            vendors: [],
            widths: [],
            heights: [],
            diameters: [],
            seasons: [],
            meta: { total: 0, from: 0, to: 0 },
            filters: {
                vendor: '',
                width: '',
                height: '',
                diameter: '',
                season: '',
                order: 'price',
                dir: 'asc'
            },
            apiEndpoint: '',
        };
    }

    componentDidMount() {
        const apiEndpoint = document.querySelector('meta[name="api-endpoint"]').getAttribute('content');
        this.setState({ apiEndpoint }, this.fetchProducts);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.filters !== this.state.filters) {
            this.updateURL();
            this.fetchProducts();
        }
    }

    fetchProducts = () => {
        const { filters, apiEndpoint } = this.state;
        const query = new URLSearchParams(filters).toString();
        fetch(`${apiEndpoint}/products?${query}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.setState({
                    products: data.items || [],
                    meta: data.meta || { total: 0, from: 0, to: 0 },
                    vendors: data.filters?.vendors || [],
                    widths: data.filters?.widths || [],
                    heights: data.filters?.heights || [],
                    diameters: data.filters?.diameters || [],
                    seasons: data.filters?.seasons || []
                });
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

    updateURL = () => {
        const query = new URLSearchParams(this.state.filters).toString();
        const newUrl = `${window.location.pathname}?${query}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    };

    handleFilterChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            filters: { ...prevState.filters, [name]: value }
        }));
    };

    handleSortChange = (sortField, sortOrder) => {
        this.setState(prevState => ({
            filters: { ...prevState.filters, order: sortField, dir: sortOrder }
        }));
    };

    render() {
        const { products, vendors, widths, heights, diameters, seasons, meta } = this.state;

        return (
            <div>
                <section className="s-products s-category">
                    <div className="container">
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

                                <a href="#sort-asc" onClick={() => this.handleSortChange('price', 'asc')}>
                                    Сначала дешевые
                                </a>

                                <a href="#sort-desc" onClick={() => this.handleSortChange('price', 'desc')}>
                                    Сначала дорогие
                                </a>
                            </div>
                        </div>
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
                                                <div className="b-filters">
                                                    <BrandFilter vendors={vendors} handleFilterChange={this.handleFilterChange} />
                                                    <WidthFilter widths={widths} handleFilterChange={this.handleFilterChange} />
                                                    <HeightFilter heights={heights} handleFilterChange={this.handleFilterChange} />
                                                    <DiameterFilter diameters={diameters} handleFilterChange={this.handleFilterChange} />
                                                    <SeasonFilter seasons={seasons} handleFilterChange={this.handleFilterChange} />
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
}

export default ProductList;
