import React from 'react';

const DiameterFilter = ({ diameters, handleFilterChange, value }) => {
    return (
        <fieldset className="col-md-12">
            <div className="select">
                <label htmlFor="sFilter-diameter" className="label4-select2">Диаметр</label>
                <select
                    name="diameter"
                    onChange={handleFilterChange}
                    value={value || ''} // Bind to the passed value, default to empty string
                >
                    <option value="">Любой</option>
                    {diameters.map(diameter => (
                        <option
                            key={`diameter${diameter}`}
                            value={diameter}
                        >
                            {diameter}
                        </option>
                    ))}
                </select>
            </div>
        </fieldset>
    );
};

export default DiameterFilter;