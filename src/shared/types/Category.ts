export interface ICategory {
  id: number;
  parentId: number;
  parentCategory: ICategory;
  name: string;
  description?: string;
  imageUrl?: string;
  horizontalImageUrl?: string;
}
