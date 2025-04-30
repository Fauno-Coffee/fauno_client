export interface IRecipe {
  id: number;
  imageUrl: string;
  link: string;
  recipeCategoryId: number;
  name: string;
  steps: {text: string, imageUrl: string}[];
  productId: number;
}

export interface IRecipeCategory {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  previewUrl: string;
}
