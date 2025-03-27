import s from './ProductsList.module.css';
import { FC } from 'react';
import { IProduct } from '@/shared/types/Product';
import { ProductCard } from '@/components/ProductCard';
import { AllCategoriesCard, CategoryCard } from '@/components/CategoryCard';

interface IProductsListProps {
  products: IProduct[];
}

export const FiltroProductsList: FC<IProductsListProps> = ({ products }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.big_2x2}>
        <AllCategoriesCard category={{ id: 5, name: 'Filtro' }} />
      </div>
      {products?.map(product => <ProductCard key={product?.id} product={product} />)}
    </div>
  );
};

export const DripProductsList: FC<IProductsListProps> = ({ products }) => {
  return (
    <div className={s.wrapper}>
      {products?.map(product => <ProductCard key={product?.id} product={product} />)}
      <div className={s.big_2x1}>
        <CategoryCard
          category={{
            id: 6,
            name: 'Drip',
            description:
              'Редкий и необычный эксперимент с добавлением розмарина в ходе анаэробной кофе натурального кофе',
            imageUrl: '/drip.png',
          }}
        />
      </div>
    </div>
  );
};

export const EspressoProductsList: FC<IProductsListProps> = ({ products }) => {
  const productsSliced = [products.slice(0, 4), products.slice(4)];
  return (
    <div className={s.wrapper}>
      {products &&
        !!products?.length &&
        productsSliced[0]?.map(product => <ProductCard key={product?.id} product={product} />)}

      <div className={s.big_2x1}>
        <CategoryCard
          category={{
            id: 6,
            name: 'Espresso',
            description:
              'Редкий и необычный эксперимент с добавлением розмарина в ходе анаэробной кофе натурального кофе',
            imageUrl: '/espresso.png',
          }}
        />
      </div>

      {products &&
        !!products?.length &&
        productsSliced[1]?.map(product => <ProductCard key={product?.id} product={product} />)}
    </div>
  );
};

export const CapsulesProductsList: FC<IProductsListProps> = ({ products }) => {
  const productsSliced = [products.slice(0, 5), products.slice(5)];
  return (
    <div className={s.wrapper}>
      {products &&
        !!products?.length &&
        productsSliced[0]?.map(product => <ProductCard key={product?.id} product={product} />)}

      <div className={s.big_2x1}>
        <CategoryCard
          category={{
            id: 6,
            name: 'Capsules',
            description:
              'Редкий и необычный эксперимент с добавлением розмарина в ходе анаэробной кофе натурального кофе',
            imageUrl: '/capsules.png',
          }}
        />
      </div>

      {products &&
        !!products?.length &&
        productsSliced[1]?.map(product => <ProductCard key={product?.id} product={product} />)}
    </div>
  );
};

export const ProductsList: FC<IProductsListProps> = ({ products }) => {
  return (
    <div className={s.wrapper}>
      {products?.map(product => <ProductCard key={product?.id} product={product} />)}
    </div>
  );
};
