'use client';

import s from './Catalog.module.css';

import { CatalogFilters } from '@/components/CatalogFilters';
import { ProductsList } from '@/blocks/ProductsList';
import { apiUrlBuilder } from '@/shared/utils/urlBuilder';
import { useEffect, useState } from 'react';
import { IProduct } from '@/shared/types/Product';

export const Catalog = () => {
  const [products, setProducts] = useState<IProduct[]>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number | null>(null);

  const [categoryId, setCategoryId] = useState<number | null>(null);

  async function getProducts() {
    const url = categoryId ? `/product?categoryId=${categoryId}` : '/product';
    try {
      const res = await fetch(apiUrlBuilder(url));
      const data = await res.json();
      setProducts(data?.rows || []);
    } catch (error) {
      console.log(error);
    }
  }

  const mergeCategories = (
    selectedSubCategoryId: number | null,
    selectedCategoryId: number | null,
  ) => {
    if (selectedSubCategoryId) {
      setCategoryId(selectedSubCategoryId);
      return;
    }
    if (selectedCategoryId) {
      setCategoryId(selectedCategoryId);
      return;
    }
    setCategoryId(null);
  };

  useEffect(() => {
    mergeCategories(selectedSubCategoryId, selectedCategoryId);
  }, [selectedSubCategoryId, selectedCategoryId]);

  useEffect(() => {
    getProducts();
  }, [categoryId]);

  return (
    <div className={s.catalog_wrapper}>
      <CatalogFilters
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
        selectedSubCategoryId={selectedSubCategoryId}
        setSelectedSubCategoryId={setSelectedSubCategoryId}
      />
      {products && !!products?.length && <ProductsList products={products} />}
    </div>
  );
};
