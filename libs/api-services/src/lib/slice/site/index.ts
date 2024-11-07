import { createSlice } from '@reduxjs/toolkit'
import { getStaticFileDomainAsync } from './thunk'

type TSiteState = {
	isInitialized: boolean
	getBannerUrl: (url: string) => string
	getImageUrl: (url: string) => string
	getPaymentUrl: (url: string) => string
	getSportImageUrl: (url: string) => string
  getStoreImgDomain:(url:string) => string
}

const initialState: TSiteState = {
	isInitialized: false,
	getBannerUrl: url => url,
	getImageUrl: url => url,
	getSportImageUrl: url => url,
	getPaymentUrl: url => url,
  getStoreImgDomain:url => url
}

const siteSlice = createSlice({
	name: 'site',
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder.addCase(getStaticFileDomainAsync.fulfilled, (state, action) => {
			const {
				bannerDomain = '',
				imgDomain = '',
				paymentDomain = '',
				sportImgDomain = '',
        storeImgDomain = ''
			} = action.payload
			state.isInitialized = true
			state.getBannerUrl = (url: string) => {
				return bannerDomain ? `https://${bannerDomain}${url}` : url
			}
			state.getImageUrl = (url: string) => {
				return imgDomain ? `https://${imgDomain}${url}` : url
			}
			state.getPaymentUrl = (url: string) => {
				return paymentDomain ? `https://${paymentDomain}${url}` : url
			}
			state.getSportImageUrl = (url: string) => {
				return sportImgDomain ? `https://${sportImgDomain}${url}` : url
			}
      state.getStoreImgDomain = (url: string) => {
        return storeImgDomain ? `https://${storeImgDomain}${url}` : url
      }
		}),
})

// 統一 return 5 個 url function
export const selectUrlMethods = ({ site }: { site: TSiteState }) => ({
	getBannerUrl: site.getBannerUrl,
	getImageUrl: site.getImageUrl,
	getPaymentUrl: site.getPaymentUrl,
	getSportImageUrl: site.getSportImageUrl,
  getStoreImgDomain:site.getStoreImgDomain
})

export const selectUrlMethodInitialized = ({ site }: { site: TSiteState }) =>
	site.isInitialized

export const siteReducer = siteSlice.reducer
