import React, { useContext } from 'react'
import zhCN from '../../../locales/zh-CN'
import zhTW from '../../../locales/zh-TW'
import enUS from '../../../locales/en-US'
import idID from '../../../locales/id-ID'
import jaJP from '../../../locales/ja-JP'
import thTH from '../../../locales/th-TH'
import { mapLangFn, globalLangs } from '../../../locales/tools'
import { ConfigProviderProps } from './iConfigProvider'
import { Locale } from '../../../locales/base';


const localesMap = {
  'zh-CN': { locale: zhCN },
  'zh-TW': { locale: zhTW },
  'en-US': { locale: enUS },
  'id-ID': { locale: idID },
  'ja-JP': { locale: jaJP },
  'th-TH': { locale: thTH }
}

type Config = {
  locale: Locale
}

export const defaultConfigRef: {
  current: Config
} = { current: { locale: zhCN, }, }


const tinpermLocaleConfig = React.createContext<Config | null>(null);

export const MyConfigProvider: React.FC<ConfigProviderProps> = props => {
  const { locale, children } = props
  const allLocals = { ...localesMap, ...globalLangs }
  const localeConfig = allLocals[locale]
  const parentConfig = useConfig()
  return (
    <tinpermLocaleConfig.Provider value={{ ...parentConfig, ...localeConfig }}>
      {children}
    </tinpermLocaleConfig.Provider>
  )
}

export function getTinpermLocaleConfig() {
  return defaultConfigRef.current
}

export function setTinpermLocaleConfig(locale: string) {
  if (locale && (hasRegisterLang(locale) || !!localesMap[locale])) {
    const allLocals = { ...localesMap, ...globalLangs }
    const localeConfig = allLocals[locale]
    defaultConfigRef.current = localeConfig
  } else {
    console.error('locale params can not be undefined or locale has not registered')
  }
}
export function useConfig() {
  return useContext(tinpermLocaleConfig) ?? getTinpermLocaleConfig()
}

export function hasRegisterLang(name: string) {
  if (name) {
    return !!globalLangs[name]
  }
  return false
}
export function registerLang(name: string, config: { [key: string]: string }) {
  if (config && name && !hasRegisterLang(name)) {
    const configMap = mapLangFn(config);
    if (configMap && Object.keys?.(configMap)?.length) {
      globalLangs[name] = { locale: configMap } || {}
    }
  }
}
