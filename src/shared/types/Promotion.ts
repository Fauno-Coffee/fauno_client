export interface IPromotion {
  id: number;
  name: string;
  description: string;
  isDeleted: boolean;
  imageUrl: string;
  dateFrom: Date;
  dateTo: Date;
  createdAt: string;
  updatedAt: string;
}
