import { IAxiosResponse } from "../../axiosBaseQuery";

export interface IGetSocialChannelArgs {
  langId: string;
  currencyId: number;
  displayPage: number;
}

export interface IGetSocialChannelData {
  channelName: string;
  id: number;
  link: string;
  linkType: number;
  scheme: { ios: string; android: string };
  title: string;
}

export type IGetSocialChannelResponse = IAxiosResponse<IGetSocialChannelData[]>
