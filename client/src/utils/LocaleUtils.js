import config from '../config/config';

const { LOCALE } = config;

export const dateFormatter = new Intl.DateTimeFormat(LOCALE.locale, {
  dateStyle: 'medium',
}).format;

export const timeFormatter = new Intl.DateTimeFormat(LOCALE.locale, {
  timeStyle: 'short',
}).format;

export const currencyFormatter = new Intl.NumberFormat(LOCALE.locale, {
  style: 'currency', currency: 'INR',
}).format;
