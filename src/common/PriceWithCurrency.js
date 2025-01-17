import React from 'react';

const PriceWithCurrency = ({ price }) => (
    <span className="price-cur">
        <strong className="price">{price}</strong>
        <small className="currency">BYN</small>
    </span>
);

export default PriceWithCurrency;
