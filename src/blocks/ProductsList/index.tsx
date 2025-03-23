import s from './ProductsList.module.css';
import { FC } from 'react';
import { IProduct } from '@/shared/types/Product';
import { ProductCard } from '@/components/ProductCard';

interface IProductsListProps {
  products: IProduct[];
}

const products: IProduct[] = [
  {
    id: 1,
    name: 'Элитный кофе из Эфиопии',
    description: 'Ароматный кофе с яркими нотами цитрусов и цветов.',
    link: 'elite-coffee',
    price: 1200,
    old_price: 1500,
    categoryId: 101,
    about:
      'Этот кофе выращен на высокогорных плантациях Эфиопии, обладает насыщенным вкусом и ароматом.',
    weight: 250,
    variation: ['Зерновой', 'Молотый'],
    processing: ['Мытая обработка'],
    fermentation: ['Естественная ферментация'],
    region: 'Сидамо, Эфиопия',
    farmer: 'Абдул Карим',
    keyDescriptor: 'Цитрусовые, цветочные ноты',
    createdAt: '2023-10-01T12:00:00Z',
    updatedAt: '2023-10-05T15:30:00Z',
    images: [
      {
        imageUrl: 'products/5c95c7ab-0f68-4ead-89a2-7a3e6794bcfc.png',
        previewUrl: 'products/previews/11a1bd24-9495-4b2a-94a5-2ae95d0e742b.png',
      },
      {
        imageUrl: 'products/5c95c7ab-0f68-4ead-89a2-7a3e6794bcfc.png',
        previewUrl: 'products/previews/11a1bd24-9495-4b2a-94a5-2ae95d0e742b.png',
      },
    ],
    isDeleted: false,
  },
];

export const ProductsList: FC<IProductsListProps> = ({ products: fake }) => {
  return (
    <div className={s.wrapper}>
      {products?.map(product => <ProductCard key={product?.id} product={product} />)}
    </div>
  );
};
