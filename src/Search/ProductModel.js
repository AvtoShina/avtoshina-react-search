import React from 'react';

const ProductModel = ({ product }) => {
    const {
        id,
        price,
        price_old,
        available,
        quantity,
        category_id,
        category_name,
        delivery,
        type_prefix,
        vendor,
        vendor_name,
        model,
        description,
        picture,
        purpose,
        seat_diameter,
        season,
        profile_height,
        width,
        release_date,
        run_flat,
        load_index,
        speed_index,
        construction,
        type,
        spikes,
        created_at,
        updated_at,
        importer,
        service_center,
        spikes_possibility,
        source,
        metric
    } = product;

    return (
        <a title={`Купить ${model} в Минске`} href={`https://avtoshina.by/tire/${id}`} className="prod-link">
            <article className="art-card itemCard-abs itemCard-compact">
                <div className="itemCard-inner">
                    <div className="itemCard-image">
                        <img alt={model} className="img-block-product" src={picture} />
                    </div>
                    <div className="itemCard-season">
                        {/* Add season details if needed */}
                    </div>
                    <div className="itemCard-misc">
                        <div className={`itemCard-avail availQuant availQuant-compact availQuant_${available > 0 ? 'yes' : 'no'}`}>
                            Доставка {delivery} дней
                        </div>
                    </div>
                    <header className="itemCard-title">
                        <p className="prod-title">{model}</p>
                        <p className="prod-vendor">{vendor}</p>
                    </header>
                    <div className="itemCard-prices">
                        {price_old !== null && (
                            <p className="old-price" style={{ margin: 0, color: '#777' }}>
                                <s><span className="price-cur"><strong className="price">{price_old}</strong><small className="currency">BYN</small></span></s>
                            </p>
                        )}
                        <p className="prod-price">
                            <span data-href={`https://avtoshina.by/order/tire/${id}`} className="to-cart js-buy pull-right">
                                <span className="fa fa-shopping-cart" aria-hidden="true" />
                                <span className="js-txt">Купить</span>
                            </span>
                            <span className="highlight">
                                <span className="price-cur"><strong className="price">{price}</strong><small className="currency">BYN</small></span>
                            </span>
                        </p>
                    </div>
                </div>
            </article>
        </a>
    );
};

export default ProductModel;
