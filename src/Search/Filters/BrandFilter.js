import React from 'react';

const BrandFilter = ({ vendors, handleFilterChange }) => {
    return (
        <fieldset className="col-md-12">
            <legend>Бренд</legend>
            <div className="select has-select2-label">
                <label htmlFor="sFilter-vendor" className="label4-select2">Бренд</label>
                <select name="vendor" onChange={handleFilterChange}>
                    <option value="">Выберите бренд</option>
                    {vendors.map(brand => (
                        <option key={`brand-${brand.slug}`} value={brand.slug}>{brand.name}</option>
                    ))}
                </select>
            </div>
        </fieldset>
    );
};

export default BrandFilter;
