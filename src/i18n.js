import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n';
import axios from 'axios';

export const SUPPORT_LOCALES = ['en', 'ru'];

export function getLocale(i18n) {
  return i18n.mode === 'legacy'
    ? (i18n.global).locale
    : (i18n.global).locale.value;
}

export function setLocale(i18n, locale) {
  if (i18n.mode === 'legacy') {
    // eslint-disable-next-line no-param-reassign
    (i18n.global).locale = locale;
  } else {
    // eslint-disable-next-line no-param-reassign
    i18n.global.locale.value = locale;
  }
}

export function setI18nLanguage(i18n, locale) {
  setLocale(i18n, locale);
  document.querySelector('html').setAttribute('lang', locale);
}

export function setupI18n(options = { locale: 'en' }) {
  const i18n = createI18n(options);
  setI18nLanguage(i18n, options.locale);
  return i18n;
}

const getResourceMessages = (r) => r.default || r;

export async function loadLocaleMessages(i18n, locale) {
  const messages = await axios.get(`/api/translation/GetForLangType/${locale}`)
    .then(getResourceMessages);
  i18n.global.setLocaleMessage(locale, messages.data);
  // console.log(i18n.global.messages);
  return nextTick();
}
