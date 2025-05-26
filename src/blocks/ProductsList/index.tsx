import s from './ProductsList.module.css';
import { FC } from 'react';
import { IProduct } from '@/shared/types/Product';
import { ProductCard } from '@/components/ProductCard';
import { AllCategoriesCard, CategoryCard } from '@/components/CategoryCard';
import { Reveal } from '@/shared/ui/Reveal';
import { ICategory } from '@/shared/types/Category';
import Link from 'next/link';

interface IProductsListProps {
  products: IProduct[];
  category?: ICategory;
}

interface IAllProductsListProps {
  products: IProduct[][];
}

export const BigLeftVideoProductsList: FC<IProductsListProps> = ({ products, category }) => {
  const productsToShow = products.slice(0, 8);
  console.log(productsToShow)
  return (
    <div className={s.wrapper}>
      <div className={s.big_2x2}>
        <AllCategoriesCard category={category} />
      </div>
      {productsToShow?.map((product, index) => {
        return (
          <Reveal key={product.id} delay={index * 0.1} height='100%'>
            <ProductCard key={product?.id} product={product} />
          </Reveal>
        );
      })}
    </div>
  );
};

export const RightImageProductsList: FC<IProductsListProps> = ({ products, category }) => {
  return (
    <div className={s.wrapper}>
      {products?.slice(0,2).map((product, index) => {
        return (
          <Reveal key={product.id} delay={index * 0.1} height='100%'>
            <ProductCard key={product?.id} product={product} />
          </Reveal>
        );
      })}
      <Link href={'/catalog?category=' + category?.id} className={s.big_2x1}>
        <CategoryCard
          category={{
            id: category?.id || 0,
            name: category?.name || '',
            description: category?.description || '',
            imageUrl: category?.imageUrl || '',
          }}
          // hardcodeImage
          />
      </Link>
      {products?.slice(2,6).map((product, index) => {
        return (
          <Reveal key={product.id} delay={index * 0.1} height='100%'>
            <ProductCard key={product?.id} product={product} />
          </Reveal>
        );
      })}
    </div>
  );
};

export const LeftImageProductsList: FC<IProductsListProps> = ({ products, category }) => {
  return (
    <div className={s.wrapper}>
      <Link href={'/catalog?category=' + category?.id} className={s.big_2x1}>
        <CategoryCard
          category={{
            id: category?.id || 0,
            name: category?.name || '',
            description: category?.description || '',
            imageUrl: category?.imageUrl || '',
          }}
        />
      </Link>

      {products &&
        !!products?.length &&
        products.slice(0, 6)?.map((product, index) => {
          return (
            <Reveal key={product.id} delay={index * 0.1} height='100%'>
              <ProductCard key={product?.id} product={product} />
            </Reveal>
          );
        })}
    </div>
  );
};

export const CenterImageProductsList: FC<IProductsListProps> = ({ products, category }) => {
  const productsSliced = [products.slice(0, 5), products.slice(5, 6)];
  return (
    <div className={s.wrapper}>
      {products &&
        !!products?.length &&
        productsSliced[0]?.map(product => <ProductCard key={product?.id} product={product} />)}

      <Link href={'/catalog?category=' + category?.id} className={s.big_2x1}>
        <CategoryCard
          category={{
            id: category?.id || 0,
            name: category?.name || '',
            description: category?.description || '',
            imageUrl: category?.imageUrl || '',
          }}
        />
      </Link>

      {products &&
        !!products?.length &&
        productsSliced[1]?.map(product => <ProductCard key={product?.id} product={product} />)}
    </div>
  );
};

export const NoImageProductsList: FC<IProductsListProps> = ({ products }) => {
  return (
    <div className={s.wrapper}>
      {products &&
        !!products?.length &&
        products.map(product => <ProductCard key={product?.id} product={product} />)}
    </div>
  );
};

// ИСПОЛЬЗОВАТЬ ТОЛЬКО НА СТРАНИЦЕ КАТАЛОГА
export const ProductsList: FC<IProductsListProps> = ({ products }) => {
  return (
    <div className={s.catalog_wrapper}>
      {products?.map((product, index) => {
        return (
          <Reveal key={product.id} delay={(index % 4) * 0.1} height='100%'>
            <ProductCard key={product?.id} product={product} cartButton isAddToCart />
          </Reveal>
        );
      })}
    </div>
  );
};

export const MobileProductsList: FC<IAllProductsListProps> = ({ products }) => {
  const allProducts: IProduct[] = [];
  products.forEach(productsList => {
    if (productsList && productsList.length) {
      allProducts.push(...productsList);
    }
  });
  return (
    <div className={s.mobileWrapper}>
      {allProducts?.map((product, index) => {
        return (
          <Reveal key={product.id} delay={(index % 2) * 0.1} height='100%'>
            <ProductCard key={product?.id} product={product} />
          </Reveal>
        );
      })}
    </div>
  );
};
