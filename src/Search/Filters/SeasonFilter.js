import React from 'react';

const SeasonFilter = ({ seasons, handleFilterChange, value }) => {
    return (
        <fieldset className="col-md-12">
            <div className="select">
                <label htmlFor="sFilter-season" className="label4-select2">Сезон</label>
                <select
                    name="season"
                    onChange={handleFilterChange}
                    value={value || ''} // Bind to the passed value, default to empty string
                >
                    <option value="">Выберите сезон</option>
                    {seasons.map(season => (
                        <option
                            key={`season${season}`}
                            value={season}
                        >
                            {season}
                        </option>
                    ))}
                </select>
            </div>
        </fieldset>
    );
};

export default SeasonFilter;