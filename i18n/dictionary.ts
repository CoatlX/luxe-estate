import 'server-only';
import { cookies } from 'next/headers';

const dictionaries = {
  en: () => import('./locales/en.json').then((module) => module.default),
  es: () => import('./locales/es.json').then((module) => module.default),
  fr: () => import('./locales/fr.json').then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const getDictionary = async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value as Locale;
  
  const locale = localeCookie && dictionaries[localeCookie] ? localeCookie : 'en';
  
  return dictionaries[locale]();
};
