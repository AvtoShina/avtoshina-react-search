import React from 'react';

const DiameterFilter = ({ diameters, handleFilterChange }) => {
    return (
        <fieldset className="col-md-12">
            <legend>Диаметр</legend>
            <div className="select">
                <label htmlFor="sFilter-diameter" className="label4-select2">Диаметр</label>
                <select name="diameter" onChange={handleFilterChange}>
                    <option value="">Выберите диаметр</option>
                    {diameters.map(diameter => (
                        <option key={`diameter${diameter}`} value={diameter}>{diameter}</option>
                    ))}
                </select>
            </div>
        </fieldset>
    );
};

export default DiameterFilter;
