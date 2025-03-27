import s from './page.module.css';

import { Footer } from '@/blocks/Footer';
import { Navbar } from '@/components/Navbar';
import { apiUrlBuilder } from '@/shared/utils/urlBuilder';
import { IProduct } from '@/shared/types/Product';
import { ProductsList } from '@/blocks/ProductsList';

async function getProducts() {
  try {
    const res = await fetch(apiUrlBuilder('/product'));
    const data = await res.json();
    if (data?.rows && !!data?.rows?.length) {
      return data?.rows;
    }
  } catch (error) {
    console.log(error);
  }
}

export default async function Catalog() {
  const products: IProduct[] = await getProducts();

  return (
    <div className={s.page}>
      <Navbar black />

      <ProductsList products={products} />

      <Footer />
    </div>
  );
}
