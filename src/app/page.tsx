import { Clouds } from '@/blocks/Clouds';
import s from './page.module.css';

import { Footer } from '@/blocks/Footer';
import { Hero } from '@/blocks/Hero';
import {
  CapsulesProductsList,
  DripProductsList,
  EspressoProductsList,
  FiltroProductsList,
  MobileProductsList,
} from '@/blocks/ProductsList';
import { IProduct } from '@/shared/types/Product';
import {apiUrlBuilder, serverQueryUrlBuilder} from '@/shared/utils/urlBuilder';
import { NotCoffee } from '@/blocks/NotCoffee';
import { Feautures } from '@/blocks/Feautures';
import { Button } from '@/shared/ui';
import Link from 'next/link';
import { StickyNavbar } from '@/components/StickyNavbar';
import { ICategory } from '@/shared/types/Category';

async function getCategories() {
  try {
    const res = await fetch(apiUrlBuilder('/category'));
    // console.log(res);
  } catch (error) {
    console.log(error);
  }
}

async function getProductsFiltro() {
  try {
    const res = await fetch(serverQueryUrlBuilder('/product?categoryId=1&limit=4'));
    const data = await res.json();
    if (data?.rows && !!data?.rows?.length) {
      console.log(data)
      return data?.rows;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getProductsDrip() {
  try {
    const res = await fetch(serverQueryUrlBuilder('/product?categoryId=2&limit=6'));
    const data = await res.json();
    if (data?.rows && !!data?.rows?.length) {
      return {products: data?.rows, category: data?.category};
    }
  } catch (error) {
    console.log(error);
  }
}

async function getProductsEspresso() {
  try {
    const res = await fetch(serverQueryUrlBuilder('/product?categoryId=3&limit=6'));
    const data = await res.json();
    if (data?.rows && !!data?.rows?.length) {
      return {products: data?.rows, category: data?.category};
    }
  } catch (error) {
    console.log(error);
  }
}

async function getProductsCapsule() {
  try {
    const res = await fetch(serverQueryUrlBuilder('/product?categoryId=4&limit=6'));
    const data = await res.json();
    if (data?.rows && !!data?.rows?.length) {
      return {products: data?.rows, category: data?.category};
    }
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const filtro: IProduct[] = await getProductsFiltro();
  const drip: {products: IProduct[], category: ICategory} | undefined = await getProductsDrip();
  const espresso: {products: IProduct[], category: ICategory} | undefined = await getProductsEspresso();
  const capsule: {products: IProduct[], category: ICategory} | undefined = await getProductsCapsule();
  
  const categories = await getCategories();

  return (
    <div className={s.page}>
      <Hero />
      <StickyNavbar />
      <Feautures />
      <MobileProductsList products={[filtro, drip?.products || [], espresso?.products || [], capsule?.products || []]} />
      <div className={s.products_wrapper}>
        {filtro && <FiltroProductsList products={filtro} />}
        {drip && <DripProductsList category={drip.category} products={drip.products} />}
        {espresso && <EspressoProductsList category={espresso.category} products={espresso.products} />}
        {capsule && <CapsulesProductsList category={capsule.category} products={capsule.products} />}
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
