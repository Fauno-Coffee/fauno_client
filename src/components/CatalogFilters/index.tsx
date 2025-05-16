'use client';

import s from './CatalogFilters.module.css';
import { FC, useEffect, useState } from 'react';
import { ICategory } from '@/shared/types/Category';
import { apiUrlBuilder } from '@/shared/utils/urlBuilder';
import { useSearchParams } from 'next/navigation';

interface ICatalogFiltersProps {
  selectedCategory: ICategory | null;
  setSelectedCategory: (category: ICategory | null) => void;

  selectedSubCategory: ICategory | null;
  setSelectedSubCategory: (category: ICategory | null) => void;
}

export const CatalogFilters: FC<ICatalogFiltersProps> = props => {
  const { selectedCategory, setSelectedCategory, selectedSubCategory, setSelectedSubCategory } =
    props;

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [subCategories, setSubCategories] = useState<ICategory[]>([]);

  const searchParams = useSearchParams();

  async function getCategories() {
    try {
      const res = await fetch(apiUrlBuilder('/category/main'));
      const categories = await res.json()
      setCategories(categories);
      const categoryId = searchParams?.get("category")
      const subcategoryId = searchParams?.get("subcategory")
      const selectedCategory = categories.find((x: any) => x.id === Number(categoryId)) || null

      if(categoryId){
        setSelectedCategory(selectedCategory)
      }
      if(selectedCategory && subcategoryId){
        const res = await fetch(apiUrlBuilder(`/category/by/parent/${selectedCategory.id}`));
        const subCategories = await res.json()

        setSelectedSubCategory(subCategories.find((x: any) => x.id === Number(subcategoryId)) || null)
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getSubCategories() {
    try {
      const res = await fetch(apiUrlBuilder(`/category/by/parent/${selectedCategory?.id}`));
      setSubCategories(await res.json());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setSelectedSubCategory(null);
    setSubCategories([]);
    if (selectedCategory !== null) {
      getSubCategories();
    }
  }, [selectedCategory]);

  return (
    <div className={s.container}>
      <div className={s.paper}>
        <div
          className={`${s.button} ${selectedCategory === null && s.selected}`}
          onClick={() => setSelectedCategory(null)}
        >
          Все категории
        </div>
        {categories &&
          !!categories?.length &&
          categories?.map(category => (
            <div
              key={category?.id}
              className={`${s.button} ${selectedCategory?.id === category?.id && s.selected}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category?.name}
            </div>
          ))}
      </div>

      {subCategories && !!subCategories?.length && (
        <div className={s.paper}>
          <div
            className={`${s.button} ${selectedSubCategory === null && s.selected}`}
            onClick={() => setSelectedSubCategory(null)}
          >
            Все коллекции
          </div>
          {subCategories?.map(subCategory => (
            <div
              key={subCategory?.id}
              className={`${s.button} ${selectedSubCategory?.id === subCategory?.id && s.selected}`}
              onClick={() => setSelectedSubCategory(subCategory)}
            >
              {subCategory?.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
