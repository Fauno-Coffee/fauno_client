import localFont from 'next/font/local';

export const SuisseIntl = localFont({
  src: [
    {
      path: './SuisseIntl-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './SuisseIntl-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: './SuisseIntl-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './SuisseIntl-RegularItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './SuisseIntl-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './SuisseIntl-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
  ],
});
