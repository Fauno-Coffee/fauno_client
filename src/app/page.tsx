import { Clouds } from '@/blocks/Clouds';
import s from './page.module.css';

import { Footer } from '@/blocks/Footer';
import { Hero } from '@/blocks/Hero';
import { ProductsList } from '@/blocks/ProductsList';
import { IProduct } from '@/shared/types/Product';
import { apiUrlBuilder } from '@/shared/utils/urlBuilder';

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
      <ProductsList products={products} />
      <Clouds />
      <Footer />
    </div>
  );
}
