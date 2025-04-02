'use client';

import s from './CatalogFilters.module.css';
import { FC, useEffect, useState } from 'react';
import { ICategory } from '@/shared/types/Category';
import { apiUrlBuilder } from '@/shared/utils/urlBuilder';

interface ICatalogFiltersProps {
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;

  selectedSubCategoryId: number | null;
  setSelectedSubCategoryId: (id: number | null) => void;
}

export const CatalogFilters: FC<ICatalogFiltersProps> = props => {
  const {
    selectedCategoryId,
    setSelectedCategoryId,
    selectedSubCategoryId,
    setSelectedSubCategoryId,
  } = props;

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [subCategories, setSubCategories] = useState<ICategory[]>([]);

  async function getCategories() {
    try {
      const res = await fetch(apiUrlBuilder('/category/main'));
      setCategories(await res.json());
    } catch (error) {
      console.log(error);
    }
  }

  async function getSubCategories() {
    try {
      const res = await fetch(apiUrlBuilder(`/category/by/parent/${selectedCategoryId}`));
      setSubCategories(await res.json());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setSelectedSubCategoryId(null);
    setSubCategories([]);
    if (selectedCategoryId !== null) {
      getSubCategories();
    }
  }, [selectedCategoryId]);

  return (
    <div className={s.container}>
      <div className={s.paper}>
        <div
          className={`${s.button} ${selectedCategoryId === null && s.selected}`}
          onClick={() => setSelectedCategoryId(null)}
        >
          Все категории
        </div>
        {categories &&
          !!categories?.length &&
          categories?.map(category => (
            <div
              key={category?.id}
              className={`${s.button} ${selectedCategoryId === category?.id && s.selected}`}
              onClick={() => setSelectedCategoryId(category?.id)}
            >
              {category?.name}
            </div>
          ))}
      </div>

      {subCategories && !!subCategories?.length && (
        <div className={s.paper}>
          <div
            className={`${s.button} ${selectedSubCategoryId === null && s.selected}`}
            onClick={() => setSelectedCategoryId(null)}
          >
            Все коллекции
          </div>
          {subCategories?.map(subCategory => (
            <div
              key={subCategory?.id}
              className={`${s.button} ${selectedSubCategoryId === subCategory?.id && s.selected}`}
              onClick={() => setSelectedSubCategoryId(subCategory?.id)}
            >
              {subCategory?.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
