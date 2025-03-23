import { Clouds } from '@/blocks/Clouds';
import s from './page.module.css';

import { Footer } from '@/blocks/Footer';
import { Hero } from '@/blocks/Hero';
import { ProductsList } from '@/blocks/ProductsList';
import { IProduct } from '@/shared/types/Product';
import { apiUrlBuilder } from '@/shared/utils/urlBuilder';
import { NotCoffee } from '@/blocks/NotCoffee';
import { Feautures } from '@/blocks/Feautures';

async function getProducts() {
  try {
    const res = await fetch(apiUrlBuilder('/product'));
    console.log(res)
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const products: IProduct[] = await getProducts();

  return (
    <div className={s.page}>
      <Hero />
      <Feautures />
      <ProductsList products={products} />
      <Clouds />
      <NotCoffee />
      <Footer />
    </div>
  );
}
