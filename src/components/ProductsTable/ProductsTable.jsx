import cn from 'classnames';
import { ORDER, SORT_FIELDS } from '../../constants';

const COLUMNS = ['ID', 'Product', 'Category', 'User'];

export const ProductsTable = ({
  products,
  sortField,
  setSortField,
  order,
  setOrder,
}) => {
  const getSortFieldClassName = column => {
    if (
      (column === SORT_FIELDS.ID &&
        sortField === SORT_FIELDS.ID &&
        order === ORDER.ASK) ||
      (column === SORT_FIELDS.PRODUCT &&
        sortField === SORT_FIELDS.PRODUCT &&
        order === ORDER.ASK) ||
      (column === SORT_FIELDS.CATEGORY &&
        sortField === SORT_FIELDS.CATEGORY &&
        order === ORDER.ASK) ||
      (column === SORT_FIELDS.USER &&
        sortField === SORT_FIELDS.USER &&
        order === ORDER.ASK)
    ) {
      return cn('fas', 'fa-sort-up');
    }

    if (
      (column === SORT_FIELDS.ID &&
        sortField === SORT_FIELDS.ID &&
        order === ORDER.DESK) ||
      (column === SORT_FIELDS.PRODUCT &&
        sortField === SORT_FIELDS.PRODUCT &&
        order === ORDER.DESK) ||
      (column === SORT_FIELDS.CATEGORY &&
        sortField === SORT_FIELDS.CATEGORY &&
        order === ORDER.DESK) ||
      (column === SORT_FIELDS.USER &&
        sortField === SORT_FIELDS.USER &&
        order === ORDER.DESK)
    ) {
      return cn('fas', 'fa-sort-down');
    }

    return cn('fas', 'fa-sort');
  };

  const onSortFieldClick = column => {
    if (column === sortField) {
      if (order === ORDER.DEFAULT) {
        setOrder(ORDER.ASK);
      } else if (order === ORDER.ASK) {
        setOrder(ORDER.DESK);
      } else {
        setOrder(ORDER.DEFAULT);
      }
    } else {
      setSortField(column);
      setOrder(ORDER.ASK);
    }
  };

  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMNS.map(column => (
            <th key={column}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column}
                <a href="#/" onClick={() => onSortFieldClick(column)}>
                  <span className="icon">
                    <i
                      data-cy="SortIcon"
                      className={getSortFieldClassName(column)}
                    />
                  </span>
                </a>
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {products.map(product => (
          <tr key={product.id} data-cy="Product">
            <td className="has-text-weight-bold" data-cy="ProductId">
              {product.id}
            </td>

            <td data-cy="ProductName">{product.name}</td>
            <td data-cy="ProductCategory">
              {product.category.icon} - {product.category.title}
            </td>

            <td
              data-cy="ProductUser"
              className={
                product.user.sex === 'm' ? 'has-text-link' : 'has-text-danger'
              }
            >
              {product.user.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
