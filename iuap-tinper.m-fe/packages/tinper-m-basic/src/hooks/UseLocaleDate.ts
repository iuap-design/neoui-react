// import { zhCN, zhTW, enUS } from 'date-fns/locale';
import { zhCN } from 'date-fns/locale/zh-CN';
import { zhTW } from 'date-fns/locale/zh-TW';
import { enUS } from 'date-fns/locale/en-US';
import { useConfig } from '@components/config-provider/src';
import { format } from 'date-fns';
import { Locale } from '@/locales/iLocale';


export  function useLocaleDate(date: Date, precision: 'year' | 'month' = 'month') {
  const { locale } = useConfig()
  return getLocaleDate(date, locale, precision)

}

export  function useLocaleDate2(date: Date, formatStr: string) {
  const { locale } = useConfig()
  return getLocaleDate2(date, formatStr, locale)

}

export function getLocaleDate(date: Date, locale: Locale, precision: 'year' | 'month' = 'month') {
  const localeMap = { 'zh-CN': zhCN, 'zh-TW': zhTW, 'en-US': enUS  }
  const yearLocale = locale.DateTimePicker.year
  const formatStr = precision === 'year' ? `yyyy${yearLocale}` : locale.locale === 'en-US' ? 'MMM yyyy' : `yyyy${yearLocale}MMM`
  return format(date,
    formatStr,
    { locale: localeMap[locale.locale as keyof typeof  localeMap] })
}


export function getLocaleDate2(date: Date, formatStr: string, locale: Locale) {
  const localeMap = { 'zh-CN': zhCN, 'zh-TW': zhTW, 'en-US': enUS  }
  return format(date,
    formatStr,
    { locale: localeMap[locale.locale as keyof typeof  localeMap] })
}
