'use client';

import s from './Catalog.module.css';

import { CatalogFilters } from '@/components/CatalogFilters';
import { ProductsList } from '@/blocks/ProductsList';
import { apiUrlBuilder } from '@/shared/utils/urlBuilder';
import { Suspense, useEffect, useState } from 'react';
import { IProduct } from '@/shared/types/Product';
import { CategoryCard } from '@/components/CategoryCard';
import { ICategory } from '@/shared/types/Category';

export const Catalog = () => {
  const [isMobile, setIsMobile] = useState(false);

  
  const [products, setProducts] = useState<IProduct[]>();
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<ICategory | null>(null);
  
  const [category, setCategory] = useState<ICategory | null>(null);
  
  useEffect(() => {
    if (window !== undefined) {
      setIsMobile(window?.innerWidth <= 768);
    }
  }, []);

  async function getProducts() {
    const url = category?.id ? `/product?categoryId=${category?.id}` : '/product';
    try {
      const res = await fetch(apiUrlBuilder(url));
      const data = await res.json();
      setProducts(data?.rows || []);
    } catch (error) {
      console.log(error);
    }
  }

  const mergeCategories = (
    selectedSubCategory: ICategory | null,
    selectedCategory: ICategory | null,
  ) => {
    if (selectedSubCategory?.id) {
      setCategory(selectedSubCategory);
      return;
    }
    if (selectedCategory?.id) {
      setCategory(selectedCategory);
      return;
    }
    setCategory(null);
  };

  useEffect(() => {
    mergeCategories(selectedSubCategory, selectedCategory);
  }, [selectedSubCategory, selectedCategory]);

  useEffect(() => {
    getProducts();
  }, [category?.id]);

  return (
    <div className={s.catalog_wrapper}>
      <Suspense>
        <CatalogFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSubCategory={selectedSubCategory}
          setSelectedSubCategory={setSelectedSubCategory}
        />
      </Suspense>
      <div className={s.products}>
        {category && !isMobile && <CategoryCard category={category} noButton />}
        {products && !!products?.length && <ProductsList products={products} />}
      </div>
    </div>
  );
};
