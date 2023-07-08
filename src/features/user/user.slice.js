import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./user.service";
import { userTimeOut } from "../common/user.common.service";

const authUserKey = process.env.REACT_APP_AUTH_USER_KEY;
const user = JSON.parse(localStorage.getItem(authUserKey));

userTimeOut();

const initialState = {
	user: user ? user : null,
	publicProfile: null,
	privateProfile: null,
	isError: false,
	isPrivateProfileError: false,
	isSuccess: false,
	isUpdateSuccess: false,
	isLoading: false,
	message: "",
	resetData: false,
	isActionError: false,

	followers: [],
	followersMetaData: {},
	followings: [],
	followingsMetaData: {},
};

export const signUp = createAsyncThunk(
	"user/signup",
	async (formData, thunkAPI) => {
		try {
			return await userService.signUp(formData);
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

export const signIn = createAsyncThunk(
	"user/signin",
	async (formData, thunkAPI) => {
		try {
			return await userService.signIn(formData);
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
	"user/logout",
	async (args, thunkAPI) => {
		try {
			const token = thunkAPI.getState().user.user.accessToken;

			return await userService.logout(token);
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

export const getPublicProfile = createAsyncThunk(
	"user/get-public-profile",
	async (userName, thunkAPI) => {
		try {
			return await userService.getPublicProfile(userName);
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
	"user/get-private-profile",
	async (args, thunkAPI) => {
		try {
			const token = thunkAPI.getState().user.user.accessToken;

			return await userService.getPrivateProfile(token);
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
	"user/update-profile",
	async (formData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().user.user.accessToken;

			return await userService.updateProfile(formData, token);
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
	"user/delete-profile",
	async (args, thunkAPI) => {
		try {
			const token = thunkAPI.getState().user.user.accessToken;

			return await userService.updateProfile(token);
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

export const changePassword = createAsyncThunk(
	"user/change-password",
	async (formData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().user.user.accessToken;

			return await userService.changePassword(formData, token);
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

export const followUser = createAsyncThunk(
	"user/follow-user",
	async (userName, thunkAPI) => {
		try {
			const token = thunkAPI.getState().user.user.accessToken;

			return await userService.followUser(userName, token);
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

export const getFollowerUsers = createAsyncThunk(
	"user/follower-user",
	async (data = {}, thunkAPI) => {
		try {
			const { userName, page, limit, search } = data;
			return await userService.getFollowerUsers(
				userName,
				page,
				limit,
				search || "",
			);
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

export const getFollowingUsers = createAsyncThunk(
	"user/following-user",
	async (data = {}, thunkAPI) => {
		try {
			const { userName, page, limit, search } = data;
			return await userService.getFollowingUsers(
				userName,
				page,
				limit,
				search || "",
			);
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
	state.isActionError = false;
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
	state.isActionError = false;
	state.isSuccess = false;
	state.isLoading = false;
	state.message = "";
	state.resetData = false;
	state.isUpdateSuccess = false;
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		resetDataState: (state, action) => {
			state.resetData = action.payload;
		},
		resetUserPrivateState: (state) => {
			resetState(state);
			state.isPrivateProfileError = false;
			state.privateProfile = null;
		},
		resetUserPublicState: (state) => {
			resetState(state);
			state.publicProfile = null;
		},
		resetUserActionState: (state) => {
			resetState(state);

			state.followers = [];
			state.followersMetaData = {};
			state.followings = [];
			state.followingsMetaData = {};
		},
		resetUserCommonState: (state) => {
			resetState(state);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signUp.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(signUp.fulfilled, (state) => {
				fulfilledState(state);
				state.isUpdateSuccess = true;
			})
			.addCase(signUp.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(signIn.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(signIn.fulfilled, (state) => {
				fulfilledState(state);
				state.user = JSON.parse(localStorage.getItem(authUserKey));
				state.isUpdateSuccess = true;
			})
			.addCase(signIn.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(logout.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(logout.fulfilled, (state) => {
				fulfilledState(state);
				state.user = null;
			})
			.addCase(logout.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(getPublicProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getPublicProfile.fulfilled, (state, action) => {
				fulfilledState(state);
				state.publicProfile = action.payload;
			})
			.addCase(getPublicProfile.rejected, (state, action) => {
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
				state.isUpdateSuccess = true;
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
			})
			.addCase(followUser.fulfilled, (state, action) => {
				fulfilledState(state);

				state.privateProfile.followers = action.payload.followers;
				state.privateProfile.followings = action.payload.followings;

				if (state.publicProfile) {
					if (
						state.publicProfile.followers.some(
							(flwr) => flwr === state.privateProfile._id,
						)
					) {
						state.publicProfile.followers =
							state.publicProfile?.followers.filter(
								(flwng) => flwng !== state.privateProfile._id,
							);
					} else {
						state.publicProfile.followers = [
							state.privateProfile._id,
							...state.publicProfile?.followers,
						];
					}
				}

				state.isUpdateSuccess = true;
			})
			.addCase(followUser.rejected, (state, action) => {
				rejectedState(state, action.payload);
				state.isError = false;
				state.isActionError = true;
			})
			.addCase(getFollowerUsers.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getFollowerUsers.fulfilled, (state, action) => {
				fulfilledState(state);
				state.followers = action.payload.users;
				state.followersMetaData = action.payload.metaData;
			})
			.addCase(getFollowerUsers.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(getFollowingUsers.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getFollowingUsers.fulfilled, (state, action) => {
				fulfilledState(state);
				state.followings = action.payload.users;
				state.followingsMetaData = action.payload.metaData;
			})
			.addCase(getFollowingUsers.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(changePassword.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(changePassword.fulfilled, (state) => {
				fulfilledState(state);
				state.isUpdateSuccess = true;
			})
			.addCase(changePassword.rejected, (state, action) => {
				rejectedState(state, action.payload);
			});
	},
});

export const {
	resetDataState,
	resetUserPrivateState,
	resetUserPublicState,
	resetUserActionState,
	resetUserCommonState,
} = userSlice.actions;

export default userSlice.reducer;
