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
  category?: ICategory
}

interface IAllProductsListProps {
  products: IProduct[][];
}

export const BigLeftVideoProductsList: FC<IProductsListProps> = ({ products, category }) => {
  const productsToShow = products.slice(0, 4)
  return (
    <div className={s.wrapper}>
      <div className={s.big_2x2}>
        <AllCategoriesCard category={category} />
      </div>
      {productsToShow?.map((product, index) => {
            return(
              <Reveal key={product.id} delay={index * 0.1} height='100%'>
                <ProductCard key={product?.id} product={product} />
              </Reveal>
            )
          })
        }
    </div>
  );
};

export const RightImageProductsList: FC<IProductsListProps> = ({ products, category }) => {
  return (
    <Link href={"/catalog?category="+category?.id} className={s.wrapper}>
      {products?.map((product, index) => {
            return(
              <Reveal key={product.id} delay={index * 0.1} height='100%'>
                <ProductCard key={product?.id} product={product} />
              </Reveal>
            )
          })
        }
      <div className={s.big_2x1}>
        <CategoryCard
          category={{
            id: category?.id || 0,
            name: category?.name || '',
            description: category?.description || '',
            imageUrl: category?.imageUrl || '',
          }}
          // hardcodeImage
        />
      </div>
    </Link>
  );
};

export const LeftImageProductsList: FC<IProductsListProps> = ({ products, category }) => {
  const productsSliced = [products.slice(0, 4), products.slice(4)];
  return (
    <Link href={"/catalog?category="+category?.id} className={s.wrapper}>
      {products &&
        !!products?.length &&
        productsSliced[0]?.map((product, index) => {
          return(
            <Reveal key={product.id} delay={index * 0.1} height='100%'>
              <ProductCard key={product?.id} product={product} />
            </Reveal>
          )
        })
        }

      <div className={s.big_2x1}>
        <CategoryCard
          category={{
            id: category?.id || 0,
            name: category?.name || '',
            description: category?.description || '',
            imageUrl: category?.imageUrl || '',
          }} />
      </div>

      {products &&
        !!products?.length &&
        productsSliced[1]?.map((product, index) => {
          return(
            <Reveal key={product.id} delay={index * 0.1} height='100%'>
              <ProductCard key={product?.id} product={product} />
            </Reveal>
          )
        })
      }
    </Link>
  );
};

export const CenterImageProductsList: FC<IProductsListProps> = ({ products, category }) => {
  const productsSliced = [products.slice(0, 5), products.slice(5)];
  return (
    <Link href={"/catalog?category="+category?.id} className={s.wrapper}>
      {products &&
        !!products?.length &&
        productsSliced[0]?.map(product => <ProductCard key={product?.id} product={product} />)}
      <div className={s.big_2x1}>
        <CategoryCard
          category={{
            id: category?.id || 0,
            name: category?.name || '',
            description: category?.description || '',
            imageUrl: category?.imageUrl || '',
          }}
        />
      </div>
      {products &&
        !!products?.length &&
        productsSliced[1]?.map(product => <ProductCard key={product?.id} product={product} />)}
    </Link>
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
            return(
              <Reveal key={product.id} delay={index * 0.1} height='100%'>
                <ProductCard key={product?.id} product={product} />
              </Reveal>
            )
          })
        }
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
            return(
              <Reveal key={product.id} delay={index * 0.1} height='100%'>
                <ProductCard key={product?.id} product={product} />
              </Reveal>
            )
          })
        }
    </div>
  );
};
