import React from 'react';

const SearchBarServices = ({ searchInput, handleSearchChange, handleFilterChance }) => {
  return (
    <div className="container">
      <div className="row">

        <div className="col-3">
          <div className='btn-group' role='group' aria-label="Tags button group">
            <input type="checkbox" value="math" id="math-tag" className='btn-check' autoComplete='off' onChange={handleFilterChance} />
            <label htmlFor="math-tag" className="btn btn-outline-secondary">Math</label>

            <input type="checkbox" value="writing" id="writing-tag" className='btn-check' autoComplete='off' onChange={handleFilterChance} />
            <label htmlFor="writing-tag" className="btn btn-outline-secondary">Writing</label>

            <input type="checkbox" value="other" id="other-tag" className='btn-check' autoComplete='off' onChange={handleFilterChance} />
            <label htmlFor="other-tag" className="btn btn-outline-secondary">Other</label>
          </div>
        </div>

        <div className="col-9">
          <input
            type="text"
            className="form-control"
            placeholder="Type to search..."
            value={searchInput}
            onChange={handleSearchChange}
          />
          <br />
        </div>

      </div>
    </div>
  );
};

export default SearchBarServices;
