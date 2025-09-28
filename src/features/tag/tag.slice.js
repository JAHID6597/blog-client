import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tagService from "./tag.service";

const initialState = {
	tags: [],
	metaData: {},
	tag: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
	resetData: false,
};

export const getTag = createAsyncThunk(
	"tag/get-tag",
	async (slug, thunkAPI) => {
		try {
			return await tagService.getTag(slug);
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

export const getTags = createAsyncThunk(
	"tag/get-tags",
	async (data = {}, thunkAPI) => {
		try {
			const { page, limit, search } = data;

			return await tagService.getTags(page, limit, search || "");
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
	state.isLoading = false;
	state.message = message;
};

const tagSlice = createSlice({
	name: "tag",
	initialState,
	reducers: {
		resetDataState: (state, action) => {
			state.resetData = action.payload;
		},
		resetState: (state) => {
			state.tags = [];
			state.metaData = {};
			state.tag = null;
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = "";
			state.resetData = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getTag.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getTag.fulfilled, (state, action) => {
				fulfilledState(state);
				state.tag = action.payload;
			})
			.addCase(getTag.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(getTags.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getTags.fulfilled, (state, action) => {
				fulfilledState(state);
				state.tags = action.payload.tags;
				state.metaData = action.payload.metaData;
			})
			.addCase(getTags.rejected, (state, action) => {
				rejectedState(state, action.payload);
			});
	},
});

export const { resetDataState, resetState, resetTagBlogActionState } =
	tagSlice.actions;

export default tagSlice.reducer;
