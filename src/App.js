import React from 'react';
import './css/legacy.css';
import ProductList from "./Search/ProductList";

function App() {
    return (
        <div className="pg-wrap">
            <section className="s-main -tire">
                <div className="main-wrapper">
                    <section className="s-products s-category">
                        <div className="rs-container">
                            <ProductList/>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
}

export default App;
