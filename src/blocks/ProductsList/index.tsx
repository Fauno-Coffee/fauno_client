import s from './ProductsList.module.css';
import { FC } from 'react';
import { IProduct } from '@/shared/types/Product';
import { ProductCard } from '@/components/ProductCard';
import { AllCategoriesCard, CategoryCard } from '@/components/CategoryCard';
import { Reveal } from '@/shared/ui/Reveal';

interface IProductsListProps {
  products: IProduct[];
}

interface IAllProductsListProps {
  products: IProduct[][];
}

export const FiltroProductsList: FC<IProductsListProps> = ({ products }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.big_2x2}>
        <AllCategoriesCard category={{ id: 5, name: 'Filtro' }} />
      </div>
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

export const DripProductsList: FC<IProductsListProps> = ({ products }) => {
  return (
    <div className={s.wrapper}>
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
            id: 6,
            name: 'Drip',
            description:
              'Редкий и необычный эксперимент с добавлением розмарина в ходе анаэробной кофе натурального кофе',
            imageUrl: '/drip.png',
          }}
          hardcodeImage
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
            id: 6,
            name: 'Espresso',
            description:
              'Редкий и необычный эксперимент с добавлением розмарина в ходе анаэробной кофе натурального кофе',
            imageUrl: '/espresso.png',
          }}
          hardcodeImage
        />
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
          hardcodeImage
        />
      </div>

      {products &&
        !!products?.length &&
        productsSliced[1]?.map(product => <ProductCard key={product?.id} product={product} />)}
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
