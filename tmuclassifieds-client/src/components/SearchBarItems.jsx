import React from 'react';

const SearchBarItems = ({ searchInput, handleSearchChange, handleFilterChance }) => {
  return (
    <div className="container">
      <div className="row">

        <div className="col">
          <div className='btn-group' role='group' aria-label="Tags button group">
            <input type="checkbox" value="textbooks" id="textbooks-tag" className='btn-check' autoComplete='off' onChange={handleFilterChance} />
            <label htmlFor="textbooks-tag" className="btn btn-outline-secondary">Textbooks</label>

            <input type="checkbox" value="tools" id="tools-tag" className='btn-check' autoComplete='off' onChange={handleFilterChance} />
            <label htmlFor="tools-tag" className="btn btn-outline-secondary">Tools</label>

            <input type="checkbox" value="other" id="other-tag" className='btn-check' autoComplete='off' onChange={handleFilterChance} />
            <label htmlFor="other-tag" className="btn btn-outline-secondary">Other</label>
          </div>
        </div>

        <div className="col">
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

export default SearchBarItems;
