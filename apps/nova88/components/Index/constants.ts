import { imageUrl } from "config";

export const sliderList = [
  { id: 1, img: `${imageUrl}/img/banner.jpg` },
  { id: 2, img: `${imageUrl}/img/banner.jpg` },
  { id: 3, img: `${imageUrl}/img/banner.jpg` }
];

export enum tabOption {
  ALL = 0,
  FAVORITE = 999,
}
export const DEFAULT_PAGE_SIZE_COUNT = 6

export const monthObj = {
  1: "JANUARY",
  2: "FEBRUARY",
  3: "MARCH",
  4: "APRIL",
  5: "MAY",
  6: "JUNE",
  7: "JULY",
  8: "AUGUST",
  9: "SEPTEMBER",
  10: "OCTOBER",
  11: "NOVEMBER",
  12: "DECEMBER"
};
export const defDisplayPage = {
  Home: 1,
  ContactUs: 2,
  App: 3,
  Footer: 4
};

export const buttonTypeList = ["Livachat"];

export const sideBarIconName = {
  Livechat: "icon icon icon-chat",
  WhatsApp: "icon icon-whatsapp",
  Telegram: "icon icon-telegram",
  "E-mail": "icon icon icon-envelope",
  Facebook: "icon icon-facebook2",
  Twitter: "icon icon-twitter",
  Instagram: "icon icon-instagram",
  LINE: "icon icon-line",
  Youtube: "icon icon-youtube"
};

export const defLinkType = {
  url: 1,
  qrCode: 2
};
