import { IImage } from '@/shared/types/Image';
import { ICategory } from './Category';

export interface IProduct {
  id: number;
  name: string;
  description: string;
  link: string;
  price: number;
  brightness: number;
  old_price: number;
  categoryId: number;
  about: string;
  recipe: object;
  additionalFields: object;
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
  selector?: Record<string, any>;
  category?: ICategory;
}
