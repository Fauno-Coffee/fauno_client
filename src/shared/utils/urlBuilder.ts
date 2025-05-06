export const apiUrlBuilder = (url: string) => {
  if (!url) return '';
  return process?.env?.NEXT_PUBLIC_API_URL + url;
};

export const serverQueryUrlBuilder = (url: string) => {
  if (!url) return '';
  return 'http://localhost:5050/api/public' + url;
};

export const imageUrlBuilder = (url: string) => {
  if (!url) return '';
  return process?.env?.NEXT_PUBLIC_S3_URL + '/' + url;
};
