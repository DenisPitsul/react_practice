/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { Filters } from './components/Filters';
import { ProductsTable } from './components/ProductsTable';
import { ORDER, SORT_FIELDS } from './constants';

const products = productsFromServer.map(product => {
  const category =
    categoriesFromServer.find(cat => cat.id === product.categoryId) || null;
  const user = usersFromServer.find(u => u.id === category.ownerId) || null;

  return {
    ...product,
    category,
    user,
  };
});

const ownersFilter = usersFromServer.map(u => u.name);

const categoriesFilter = categoriesFromServer.map(c => c.title);

const getFilteredProducts = (
  productsArg,
  { owner, query, selectedCategories },
) => {
  let filteredProducts = [...productsArg];

  if (owner !== '') {
    filteredProducts = filteredProducts.filter(
      product => product.user.name === owner,
    );
  }

  if (query !== '') {
    const normalizedQuery = query.trim().toLowerCase();

    filteredProducts = filteredProducts.filter(product => {
      return product.name.toLowerCase().includes(normalizedQuery);
    });
  }

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(product => {
      return selectedCategories.includes(product.category.title);
    });
  }

  return filteredProducts;
};

const getSortedProducts = (productsArg, { sortField, order }) => {
  let copyProducts = [...productsArg];

  if (sortField === SORT_FIELDS.ID && order === ORDER.ASK) {
    copyProducts = [...copyProducts].sort((p1, p2) => p1.id - p2.id);
  } else if (sortField === SORT_FIELDS.ID && order === ORDER.DESK) {
    copyProducts = [...copyProducts].sort((p1, p2) => p2.id - p1.id);
  } else if (sortField === SORT_FIELDS.PRODUCT && order === ORDER.ASK) {
    copyProducts = [...copyProducts].sort((p1, p2) => {
      return p1.name.localeCompare(p2.name);
    });
  } else if (sortField === SORT_FIELDS.PRODUCT && order === ORDER.DESK) {
    copyProducts = [...copyProducts].sort((p1, p2) => {
      return p2.name.localeCompare(p1.name);
    });
  } else if (sortField === SORT_FIELDS.CATEGORY && order === ORDER.ASK) {
    copyProducts = [...copyProducts].sort((p1, p2) => {
      return p1.category.title.localeCompare(p2.category.title);
    });
  } else if (sortField === SORT_FIELDS.CATEGORY && order === ORDER.DESK) {
    copyProducts = [...copyProducts].sort((p1, p2) => {
      return p2.category.title.localeCompare(p1.category.title);
    });
  } else if (sortField === SORT_FIELDS.USER && order === ORDER.ASK) {
    copyProducts = [...copyProducts].sort((p1, p2) => {
      return p1.user.name.localeCompare(p2.user.name);
    });
  } else if (sortField === SORT_FIELDS.USER && order === ORDER.DESK) {
    copyProducts = [...copyProducts].sort((p1, p2) => {
      return p2.user.name.localeCompare(p1.user.name);
    });
  }

  return copyProducts;
};

export const App = () => {
  const [ownerFilter, setOwnerFilter] = useState('');
  const [queryFilter, setQueryFilter] = useState('');
  const [selectedCategoriesFilter, setSelectedCategoriesFilter] = useState([]);
  const [sortField, setSortField] = useState(SORT_FIELDS.DEFAULT);
  const [order, setOrder] = useState(ORDER.DEFAULT);

  const filteredProducts = getFilteredProducts(products, {
    owner: ownerFilter,
    query: queryFilter,
    selectedCategories: selectedCategoriesFilter,
  });

  const sortedFilteredProducts = getSortedProducts(filteredProducts, {
    sortField,
    order,
  });

  const onSelectedCategoriesFilterChange = category => {
    if (selectedCategoriesFilter.includes(category)) {
      setSelectedCategoriesFilter(currentSelectedCategories => {
        return currentSelectedCategories.filter(c => c !== category);
      });
    } else {
      setSelectedCategoriesFilter(currentSelectedCategories => {
        return [...currentSelectedCategories, category];
      });
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <Filters
            owners={ownersFilter}
            owner={ownerFilter}
            onOwnerSelect={setOwnerFilter}
            query={queryFilter}
            onQueryChange={setQueryFilter}
            categories={categoriesFilter}
            selectedCategories={selectedCategoriesFilter}
            setSelectedCategories={setSelectedCategoriesFilter}
            onCategoryClick={onSelectedCategoriesFilterChange}
          />
        </div>

        <div className="box table-container">
          {sortedFilteredProducts.length === 0 ? (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          ) : (
            <ProductsTable
              products={sortedFilteredProducts}
              sortField={sortField}
              setSortField={setSortField}
              order={order}
              setOrder={setOrder}
            />
          )}
        </div>
      </div>
    </div>
  );
};
