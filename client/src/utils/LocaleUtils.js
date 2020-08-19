import config from '../config/config';

const { locale } = config;

export const dateFormatter = new Intl.DateTimeFormat(locale.locale, {
  dateStyle: 'medium',
}).format;

export const timeFormatter = new Intl.DateTimeFormat(locale.locale, {
  timeStyle: 'short',
}).format;

export const currencyFormatter = new Intl.NumberFormat(locale.locale, {
  style: 'currency', currency: 'INR',
}).format;
