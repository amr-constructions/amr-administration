import config from '../config/config';

const { LOCALE } = config;

export const dateFormatter = new Intl.DateTimeFormat(LOCALE.locale, {
  dateStyle: LOCALE.dateStyle,
}).format;

export const timeFormatter = new Intl.DateTimeFormat(LOCALE.locale, {
  timeStyle: LOCALE.timeStyle,
}).format;

export const currencyFormatter = new Intl.NumberFormat(LOCALE.locale, {
  style: 'currency', currency: LOCALE.currency,
}).format;
