import React from 'react';

const HeightFilter = ({ heights, handleFilterChange }) => {
    return (
        <fieldset className="col-md-12">
            <div className="select">
                <label htmlFor="sFilter-height" className="label4-select2">Высота</label>
                <select name="height" onChange={handleFilterChange}>
                    <option value="">Выберите высоту</option>
                    {heights.map(height => (
                        <option key={`height${height}`} value={height}>{height}</option>
                    ))}
                </select>
            </div>
        </fieldset>
    );
};

export default HeightFilter;
