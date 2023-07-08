import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./category.service";

const initialState = {
	categories: [],
	metaData: {},
	category: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
	resetData: false,
};

export const getCategory = createAsyncThunk(
	"category/get-category",
	async (slug, thunkAPI) => {
		try {
			return await categoryService.getCategory(slug);
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

export const getCategories = createAsyncThunk(
	"category/get-categories",
	async (data = {}, thunkAPI) => {
		try {
			const { page, limit, search } = data;
			return await categoryService.getCategories(
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

const categorySlice = createSlice({
	name: "category",
	initialState,
	reducers: {
		resetDataState: (state, action) => {
			state.resetData = action.payload;
		},
		resetState: (state) => {
			state.categories = [];
			state.metaData = {};
			state.category = null;
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = "";
			state.resetData = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCategory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCategory.fulfilled, (state, action) => {
				fulfilledState(state);
				state.category = action.payload;
			})
			.addCase(getCategory.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(getCategories.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCategories.fulfilled, (state, action) => {
				fulfilledState(state);
				state.categories = action.payload.categories;
				state.metaData = action.payload.metaData;
			})
			.addCase(getCategories.rejected, (state, action) => {
				rejectedState(state, action.payload);
			});
	},
});

export const { resetDataState, resetState } = categorySlice.actions;

export default categorySlice.reducer;
