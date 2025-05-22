import cn from 'classnames';

export const Filters = ({
  owners,
  owner,
  onOwnerSelect,
  query,
  onQueryChange,
  categories,
  selectedCategories,
  setSelectedCategories,
  onCategoryClick,
}) => {
  const resetAllFilters = () => {
    onOwnerSelect('');
    onQueryChange('');
    setSelectedCategories([]);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs has-text-weight-bold">
        <a
          data-cy="FilterAllUsers"
          href="#/"
          className={cn({ 'is-active': owner === '' })}
          onClick={() => onOwnerSelect('')}
        >
          All
        </a>

        {owners.map(own => (
          <a
            key={own}
            data-cy="FilterUser"
            href="#/"
            className={cn({ 'is-active': own === owner })}
            onClick={() => onOwnerSelect(own)}
          >
            {own}
          </a>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left has-icons-right">
          <input
            data-cy="SearchField"
            type="text"
            className="input"
            placeholder="Search"
            value={query}
            onChange={e => onQueryChange(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>

          {query !== '' && (
            <span className="icon is-right">
              <button
                data-cy="ClearButton"
                type="button"
                className="delete"
                onClick={() => onQueryChange('')}
              />
            </span>
          )}
        </p>
      </div>

      <div className="panel-block is-flex-wrap-wrap">
        <a
          href="#/"
          data-cy="AllCategories"
          className={cn('button', 'is-success', 'mr-6', {
            'is-outlined': selectedCategories.length !== 0,
          })}
          onClick={() => setSelectedCategories([])}
        >
          All
        </a>

        {categories.map(category => (
          <a
            key={category}
            data-cy="Category"
            className={cn('button', 'mr-2', 'my-1', {
              'is-info': selectedCategories.includes(category),
            })}
            href="#/"
            onClick={() => onCategoryClick(category)}
          >
            {category}
          </a>
        ))}
      </div>

      <div className="panel-block">
        <a
          data-cy="ResetAllButton"
          href="#/"
          className="button is-link is-outlined is-fullwidth"
          onClick={() => resetAllFilters()}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
