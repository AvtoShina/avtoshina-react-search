import React from 'react';
import PriceWithCurrency from './../common/PriceWithCurrency';

const ProductModel = ({ product }) => {
    const {
        id,
        price,
        price_old,
        available,
        quantity,
        delivery,
        type_prefix,
        vendor,
        model,
        picture,
        href,
        title,
        // purpose,
        // seat_diameter,
        // season,
        // profile_height,
        // width,
        // run_flat,
        // load_index,
        // speed_index,
        // construction,
        // type,
        // spikes,
        // spikes_possibility,
    } = product || {}; // Add fallback to prevent destructuring undefined

    const isSellable = () => {
        return quantity > 2 && available > 0;
    };

    // Return null or a placeholder if product is undefined
    if (!product) {
        return <div>No product data available</div>;
    }

    return (
        <a title={title} href={href} className="prod-link">
            <article className="art-card itemCard-abs itemCard-compact">
                <div className="itemCard-inner">
                    <div className="itemCard-image">
                        <img
                            alt={model || ''}
                            className="img-block-product"
                            src={picture || '/placeholder-image.jpg'} // Fallback image
                        />
                    </div>
                    <div className="itemCard-season">
                        {/* Optionally display season or other details */}
                        {/* Example: {season && <span>{season}</span>} */}
                    </div>
                    <div className="itemCard-misc">
                        <div className={`itemCard-avail availQuant availQuant-compact availQuant_${available > 0 ? 'yes' : 'no'}`}>
                            Доставка {delivery || 0} дней
                        </div>
                    </div>
                    <header className="itemCard-title">
                        <p className="prod-title">{type_prefix ? `${type_prefix} ` : ''}{model || ''}</p>
                        <p className="prod-vendor">{vendor || ''}</p>
                    </header>
                    <div className="itemCard-prices">
                        {price_old !== null && price_old !== undefined && (
                            <p className="old-price">
                                <s><PriceWithCurrency price={price_old} /></s>
                            </p>
                        )}
                        <p className="prod-price">
                            {isSellable() && (
                                <span data-href={`/order/tire/${id}`} className="to-cart js-buy pull-right">
                                    <span className="fa fa-shopping-cart" aria-hidden="true" />
                                    <span className="js-txt">Купить</span>
                                </span>
                            )}
                            <span className="highlight">
                                <PriceWithCurrency price={price} />
                            </span>
                        </p>
                    </div>
                </div>
            </article>
        </a>
    );
};

export default ProductModel;
