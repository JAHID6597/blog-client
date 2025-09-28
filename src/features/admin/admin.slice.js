import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminAuthService from "./admin.service";
import { adminTimeOut } from "../common/admin.common.service";

const authAdminKey = process.env.REACT_APP_AUTH_ADMIN_KEY;
const admin = JSON.parse(localStorage.getItem(authAdminKey));

adminTimeOut();

const initialState = {
	admin: admin ? admin : null,
	privateProfile: null,
	isError: false,
	isPrivateProfileError: false,
	isSuccess: false,
	isUpdateSuccess: false,
	isLoading: false,
	message: "",
};

export const signIn = createAsyncThunk(
	"admin/signin",
	async (formData, thunkAPI) => {
		try {
			return await adminAuthService.signIn(formData);
		} catch (error) {
			const message =
				(error.response && error.response.data) ||
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	},
);

export const logout = createAsyncThunk(
	"admin/logout",
	async (args, thunkAPI) => {
		try {
			const token = thunkAPI.getState().admin.admin.accessToken;

			return await adminAuthService.logout(token);
		} catch (error) {
			const message =
				(error.response && error.response.data) ||
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	},
);

export const getPrivateProfile = createAsyncThunk(
	"admin/get-private-profile",
	async (args, thunkAPI) => {
		try {
			const token = thunkAPI.getState().admin.admin.accessToken;

			return await adminAuthService.getPrivateProfile(token);
		} catch (error) {
			const message =
				(error.response && error.response.data) ||
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	},
);

export const updateProfile = createAsyncThunk(
	"admin/update-profile",
	async (formData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().admin.admin.accessToken;

			return await adminAuthService.updateProfile(formData, token);
		} catch (error) {
			const message =
				(error.response && error.response.data) ||
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	},
);

export const deleteProfile = createAsyncThunk(
	"admin/delete-profile",
	async (args, thunkAPI) => {
		try {
			const token = thunkAPI.getState().admin.admin.accessToken;

			return await adminAuthService.deleteProfile(token);
		} catch (error) {
			const message =
				(error.response && error.response.data) ||
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	},
);

const fulfilledState = (state) => {
	state.isError = false;
	state.isPrivateProfileError = false;
	state.isSuccess = true;
	state.isLoading = false;
	state.message = "";
};

const rejectedState = (state, message) => {
	state.isError = true;
	state.isPrivateProfileError = false;
	state.isSuccess = false;
	state.isUpdateSuccess = false;
	state.isLoading = false;
	state.message = message;
};

const resetState = (state) => {
	state.isError = false;
	state.isSuccess = false;
	state.isLoading = false;
	state.message = "";
};

const adminUserSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {
		resetUserPrivateState: (state) => {
			resetState(state);
			state.isPrivateProfileError = false;
			state.privateProfile = null;
		},
		resetUserCommonState: (state) => {
			resetState(state);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signIn.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(signIn.fulfilled, (state) => {
				fulfilledState(state);
				state.admin = JSON.parse(localStorage.getItem(authAdminKey));
			})
			.addCase(signIn.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(logout.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(logout.fulfilled, (state) => {
				fulfilledState(state);
				state.admin = null;
			})
			.addCase(logout.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(getPrivateProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getPrivateProfile.fulfilled, (state, action) => {
				fulfilledState(state);
				state.privateProfile = action.payload;
			})
			.addCase(getPrivateProfile.rejected, (state, action) => {
				rejectedState(state, action.payload);
				state.isError = false;
				state.isPrivateProfileError = true;
			})
			.addCase(updateProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				fulfilledState(state);
				state.privateProfile = action.payload;
			})
			.addCase(updateProfile.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(deleteProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteProfile.fulfilled, (state) => {
				fulfilledState(state);
				state.privateProfile = null;
			})
			.addCase(deleteProfile.rejected, (state, action) => {
				rejectedState(state, action.payload);
			});
	},
});

export const { resetUserPrivateState, resetUserCommonState } =
	adminUserSlice.actions;

export default adminUserSlice.reducer;
