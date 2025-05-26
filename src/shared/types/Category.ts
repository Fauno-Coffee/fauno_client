export interface ICategory {
  id: number;
  parentId: number;
  name: string;
  description?: string;
  imageUrl?: string;
  horizontalImageUrl?: string;
}
