import React from 'react';

const BrandFilter = ({ vendors, handleFilterChange, value }) => {
    return (
        <fieldset className="col-md-12">
            <div className="select select-box">
                <label htmlFor="sFilter-vendor" className="label4-select2">Бренд</label>
                <select
                    name="vendor"
                    onChange={handleFilterChange}
                    value={value || ''} // Bind to the passed value
                >
                    <option value="">Выберите бренд</option>
                    {vendors.map(brand => (
                        <option
                            key={`brand-${brand.slug}`}
                            value={brand.slug}
                        >
                            {brand.name}
                        </option>
                    ))}
                </select>
            </div>
        </fieldset>
    );
};

export default BrandFilter;