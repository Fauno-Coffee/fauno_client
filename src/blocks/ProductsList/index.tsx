import s from './ProductsList.module.css';
import { FC } from 'react';
import { IProduct } from '@/shared/types/Product';
import { ProductCard } from '@/components/ProductCard';
import { AllCategoriesCard, CategoryCard } from '@/components/CategoryCard';
import { Reveal } from '@/shared/ui/Reveal';
import { ICategory } from '@/shared/types/Category';

interface IProductsListProps {
  products: IProduct[];
  category?: ICategory
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

export const DripProductsList: FC<IProductsListProps> = ({ products, category }) => {
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
            id: category?.id || 0,
            name: category?.name || '',
            description: category?.description || '',
            imageUrl: category?.imageUrl || '',
          }}
          // hardcodeImage
        />
      </div>
    </div>
  );
};

export const EspressoProductsList: FC<IProductsListProps> = ({ products, category }) => {
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

        

        
    </div>
  );
};

export const CapsulesProductsList: FC<IProductsListProps> = ({ products, category }) => {
  const productsSliced = [products.slice(0, 5), products.slice(5)];
  return (
    <div className={s.wrapper}>
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
