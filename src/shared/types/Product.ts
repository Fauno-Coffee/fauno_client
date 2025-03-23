import { IImage } from '@/shared/types/Image';

export interface IProduct {
  id: number;
  name: string;
  description: string;
  link: string;
  price: number;
  old_price: number;
  categoryId: number;
  about: string;
  weight: number;
  variation: string[];
  processing: string[];
  fermentation: string[];
  region: string;
  farmer: string;
  keyDescriptor: string;
  createdAt: string;
  updatedAt: string;
  images: IImage[];
  isDeleted?: boolean;
}
