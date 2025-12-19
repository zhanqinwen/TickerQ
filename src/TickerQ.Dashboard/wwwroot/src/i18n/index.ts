import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zhCN from './locales/zh-CN.json'

const SUPPORTED_LOCALES = ['en', 'zh-CN'] as const
const DEFAULT_LOCALE = 'en'

export const supportedLocales = [
  { value: 'en', label: 'English' },
  { value: 'zh-CN', label: '简体中文' },
]

const resolveLocale = () => {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE
  }

  const storedLocale = window.localStorage.getItem('tickerq-locale')
  if (storedLocale && SUPPORTED_LOCALES.includes(storedLocale as (typeof SUPPORTED_LOCALES)[number])) {
    return storedLocale
  }

  const browserLocale = window.navigator.language
  if (SUPPORTED_LOCALES.includes(browserLocale as (typeof SUPPORTED_LOCALES)[number])) {
    return browserLocale
  }

  if (browserLocale.startsWith('zh')) {
    return 'zh-CN'
  }

  return DEFAULT_LOCALE
}

export const i18n = createI18n({
  legacy: false,
  locale: resolveLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages: {
    en,
    'zh-CN': zhCN,
  },
})

export const setLocale = (locale: string) => {
  if (!SUPPORTED_LOCALES.includes(locale as (typeof SUPPORTED_LOCALES)[number])) {
    return
  }

  i18n.global.locale.value = locale

  if (typeof window !== 'undefined') {
    window.localStorage.setItem('tickerq-locale', locale)
  }
}
