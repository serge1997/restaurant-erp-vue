import { createI18n } from 'vue-i18n'
import pt from './pt'
import fr from './fr'

export const i18n = createI18n({
  legacy: false,
  locale: 'pt',
  fallbackLocale: 'pt',
  messages: {
    pt,
    fr
  }
})
