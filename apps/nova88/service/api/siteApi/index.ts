import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery } from "service/axiosBaseQuery";
import { baseUrl } from "service/Api";
import { IGetSocialChannelResponse, IGetSocialChannelArgs } from "./type";

const siteApi = createApi({
  reducerPath: "siteApi",
  baseQuery: axiosBaseQuery({ baseUrl }),
  tagTypes: ["Post"],
  endpoints: builder => ({
    getSocialChannel: builder.mutation<IGetSocialChannelResponse,
      IGetSocialChannelArgs>({
      query: ({ langId, currencyId, displayPage }) => ({
        url: `site/GetSocialChannel`,
        method: "POST",
        data: {
          langId,
          currencyId,
          displayPage
        }
      }),
      invalidatesTags: ["Post"]
    })
  })
});

export const { useGetSocialChannelMutation } = siteApi;

export default siteApi;
