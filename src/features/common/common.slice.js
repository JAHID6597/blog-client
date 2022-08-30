import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentPublicUserInfoTabItem: 0,
	isPageLayoutPadding: false,
	userDashboardBackground: '',
}

const commonSlice = createSlice({
	name: 'common',
	initialState,
	reducers: {
		resetPublicUserInfoTabItemState: (state, action) => {
			state.currentPublicUserInfoTabItem = action.payload;
		},
		resetPageLayoutPadding: (state, action) => {
			state.isPageLayoutPadding = action.payload;
		},
		resetUserDashboardBackground: (state, action) => {
			state.userDashboardBackground = action.payload;
		}
	}
});

export const { resetPublicUserInfoTabItemState, resetPageLayoutPadding, resetUserDashboardBackground } = commonSlice.actions;

export default commonSlice.reducer;