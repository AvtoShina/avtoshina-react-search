import React from 'react';
import './css/legacy.css';
import ProductList from "./Search/ProductList";
import { Helmet } from 'react-helmet';

function App() {
    return (
        <div className="pg-wrap">
            <Helmet>
                <meta charSet="utf-8"/>
                <title>Подобрать шины</title>
            </Helmet>

            <section className="s-main -tire">
                <div className="main-wrapper">
                    <section className="s-products s-category">
                        <div className="container">
                            <ProductList/>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
}

export default App;
