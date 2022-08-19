import { Currencies } from "../../../constants";
import { ILangOption } from "./type";

enum ILangEnum {
  en = "en",
  cs = "cs",
  my = "my",
  th_en = "th_en",
  th = "th",
  id_en = "id_en",
  id = "id",
}

export const defLangOptions: ILangOption[] = [
  {
    countryName: "Malaysia",
    currencyId: Currencies.MYR,
    flag: "ch",
    lang: [
      { displayText: "English", value: ILangEnum.en },
      { displayText: "简体中文", value: ILangEnum.cs },
      { displayText: "Malay", value: ILangEnum.my }
    ]
  },
  {
    countryName: "Thailand",
    currencyId: Currencies.THB,
    flag: "th",
    lang: [
      { displayText: "English", value: ILangEnum.th_en },
      { displayText: "ไทย", value: ILangEnum.th }
    ]
  },
  {
    countryName: "Indonesia",
    currencyId: Currencies.IDR,
    flag: "id",
    lang: [
      { displayText: "English", value: ILangEnum.id_en },
      { displayText: "Bhs Indonesia", value: ILangEnum.id }
    ]
  }
];
