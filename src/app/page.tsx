import { Clouds } from '@/blocks/Clouds';
import s from './page.module.css';

import { Footer } from '@/blocks/Footer';
import { Hero } from '@/blocks/Hero';
import {
  CapsulesProductsList,
  DripProductsList,
  EspressoProductsList,
  FiltroProductsList,
} from '@/blocks/ProductsList';
import { IProduct } from '@/shared/types/Product';
import { apiUrlBuilder } from '@/shared/utils/urlBuilder';
import { NotCoffee } from '@/blocks/NotCoffee';
import { Feautures } from '@/blocks/Feautures';
import { Button } from '@/shared/ui';
import Link from 'next/link';

async function getCategories() {
  try {
    const res = await fetch(apiUrlBuilder('/category'));
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

async function getProductsFiltro() {
  try {
    const res = await fetch(apiUrlBuilder('/product?categoryId=1&limit=4'));
    const data = await res.json();
    if (data?.rows && !!data?.rows?.length) {
      return data?.rows;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getProductsDrip() {
  try {
    const res = await fetch(apiUrlBuilder('/product?categoryId=2&limit=6'));
    const data = await res.json();
    if (data?.rows && !!data?.rows?.length) {
      return data?.rows;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getProductsEspresso() {
  try {
    const res = await fetch(apiUrlBuilder('/product?categoryId=3&limit=6'));
    const data = await res.json();
    if (data?.rows && !!data?.rows?.length) {
      return data?.rows;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getProductsCapsule() {
  try {
    const res = await fetch(apiUrlBuilder('/product?categoryId=4&limit=6'));
    const data = await res.json();
    if (data?.rows && !!data?.rows?.length) {
      return data?.rows;
    }
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const filtro: IProduct[] = await getProductsFiltro();
  const drip: IProduct[] = await getProductsDrip();
  const espresso: IProduct[] = await getProductsEspresso();
  const capsule: IProduct[] = await getProductsCapsule();

  const categories = await getCategories();

  return (
    <div className={s.page}>
      <Hero />
      <Feautures />
      <div className={s.products_wrapper}>
        {filtro && <FiltroProductsList products={filtro} />}
        {drip && <DripProductsList products={drip} />}
        {espresso && <EspressoProductsList products={espresso} />}
        {capsule && <CapsulesProductsList products={capsule} />}
      </div>

      <div style={{ width: '100%', padding: '40px', fontSize: '22px' }}>
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
