import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userAuthService from "./user.service";
import { adminTimeOut } from "../../common/admin.common.service";
import { userTimeOut } from "../../common/user.common.service";

userTimeOut();

adminTimeOut();

const initialState = {
	users: [],
	isError: false,
	isSuccess: false,
	isUpdateSuccess: false,
	isLoading: false,
	message: "",
};

export const getUsers = createAsyncThunk(
	"adminUser/get-users",
	async (data = {}, thunkAPI) => {
		try {
			const token = thunkAPI.getState().admin.admin.accessToken;

			const { page, limit, search } = data;

			return await userAuthService.getUsers(
				page,
				limit,
				search || "",
				token,
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
	state.isSuccess = true;
	state.isLoading = false;
	state.message = "";
};

const rejectedState = (state, message) => {
	state.isError = true;
	state.isSuccess = false;
	state.isUpdateSuccess = false;
	state.isLoading = false;
	state.message = message;
};

const userSlice = createSlice({
	name: "adminUser",
	initialState,
	reducers: {
		resetState: (state) => {
			state.users = [];
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUsers.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				fulfilledState(state);
				state.users = action.payload.users;
			})
			.addCase(getUsers.rejected, (state, action) => {
				rejectedState(state, action.payload);
			});
	},
});

export const { resetState } = userSlice.actions;

export default userSlice.reducer;
