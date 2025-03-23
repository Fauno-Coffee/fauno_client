export const apiUrlBuilder = (url: string) => {
  if (!url) return '';
  return process?.env?.NEXT_PUBLIC_API_URL + url;
};

export const imageUrlBuilder = (url: string) => {
  if (!url) return '';
  return process?.env?.NEXT_PUBLIC_S3_URL + '/' + url;
};
