import { Clouds } from '@/blocks/Clouds';
import s from './page.module.css';

import { Footer } from '@/blocks/Footer';
import { Hero } from '@/blocks/Hero';
import {
  BigLeftVideoProductsList,
  CenterImageProductsList,
  LeftImageProductsList,
  MobileProductsList,
  NoImageProductsList,
  RightImageProductsList,
} from '@/blocks/ProductsList';
import { IProduct } from '@/shared/types/Product';
import {apiUrlBuilder, serverQueryUrlBuilder} from '@/shared/utils/urlBuilder';
import { NotCoffee } from '@/blocks/NotCoffee';
import { Feautures } from '@/blocks/Feautures';
import { Button } from '@/shared/ui';
import Link from 'next/link';
import { StickyNavbar } from '@/components/StickyNavbar';
import { ICategory } from '@/shared/types/Category';
import { ReactElement } from 'react';

async function getProductsByCategory(categoryId: number) {
  try {
    const res = await fetch(apiUrlBuilder(`/product?categoryId=${categoryId}&limit=6`));
    const data = await res.json();
    if (data?.rows && !!data?.rows?.length) {
      return {category: data?.category, products: data?.rows};
    }
  } catch (error) {
    console.log(error);
  }
}

async function getCategories() {
  try {
    const res = await fetch(apiUrlBuilder('/block?name=products'));
    const data = await res.json();
    const result = await Promise.all(data.data.categories.map(async (category: any) => {
      const products = await getProductsByCategory(category.id)
      return({
        id: category.id,
        layout: category.layout,
        products: products?.products,
        category: products?.category,
      })
    }))
    return result;
  } catch (error) {
    console.log(error);
  }
}


export type Layouts = "bigLeftVideo" | "rightImage" | "leftImage" | "centerImage" | "noImage"

const getComponentByLayout = (layout: Layouts, products: IProduct[], category: ICategory) => {
  if(!category){
    return null
  }
  const Layouts: Record<Layouts, ReactElement> = {
    "bigLeftVideo": <BigLeftVideoProductsList key={category.id} products={products} category={category} />,
    "rightImage": <RightImageProductsList key={category.id} products={products} category={category} />,
    "leftImage": <RightImageProductsList key={category.id} products={products} category={category} />,
    "centerImage": <CenterImageProductsList key={category.id} products={products} category={category} />,
    "noImage": <NoImageProductsList key={category.id} products={products} category={category} />,
  }

  return Layouts[layout]
}

export default async function Home() {
  const categories = await getCategories();

  if(!categories) return null

  return (
    <div className={s.page}>
      <Hero />
      <StickyNavbar />
      <Feautures />
      <MobileProductsList products={categories?.map((c) => c.products || [])} />
      <div className={s.products_wrapper}>
        {
          categories.map((c: any) => getComponentByLayout(c.layout, c.products, c.category))
        }

        {/* {filtro && <FiltroProductsList products={filtro} />}
        {drip && <DripProductsList category={drip.category} products={drip.products} />}
        {espresso && <EspressoProductsList category={espresso.category} products={espresso.products} />}
        {capsule && <CapsulesProductsList category={capsule.category} products={capsule.products} />} */}
      </div>

      <div className={s.catalog}>
        <Link href='/catalog'>
          <Button>Перейти в каталог</Button>
        </Link>
      </div>
      <Clouds />
      <NotCoffee />
      <Footer />
    </div>
  );
}
