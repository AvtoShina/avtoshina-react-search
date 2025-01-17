import React from 'react';

const WidthFilter = ({ widths, handleFilterChange }) => {
    return (
        <fieldset className="col-md-12">
            <legend>Ширина</legend>
            <div className="select">
                <label htmlFor="sFilter-width" className="label4-select2">Ширина</label>
                <select name="width" onChange={handleFilterChange}>
                    <option value="">Выберите ширину</option>
                    {widths.map(width => (
                        <option key={`width${width}`} value={width}>{width}</option>
                    ))}
                </select>
            </div>
        </fieldset>
    );
};

export default WidthFilter;
