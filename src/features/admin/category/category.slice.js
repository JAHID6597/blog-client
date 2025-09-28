import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminTimeOut } from "../../common/admin.common.service";
import adminCategoryService from "./category.service";

adminTimeOut();

const initialState = {
	categories: [],
	categoryMetaData: {},
	category: null,
	isError: false,
	isSuccess: false,
	isUpdateSuccess: false,
	isDeleteSuccess: false,
	isLoading: false,
	message: "",
};

export const getCategory = createAsyncThunk(
	"adminCategory/get-category",
	async (slug, thunkAPI) => {
		try {
			const token = thunkAPI.getState().admin.admin.accessToken;

			return await adminCategoryService.getCategory(slug, token);
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
	"adminCategory/get-categories",
	async (data = {}, thunkAPI) => {
		try {
			const token = thunkAPI.getState().admin.admin.accessToken;

			const { page, limit, search } = data;

			return await adminCategoryService.getCategories(
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

export const createCategory = createAsyncThunk(
	"adminCategory/create-category",
	async (formData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().admin.admin.accessToken;

			return await adminCategoryService.createCategory(formData, token);
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

export const updateCategory = createAsyncThunk(
	"adminCategory/update-category",
	async ({ formData, slug }, thunkAPI) => {
		try {
			const token = thunkAPI.getState().admin.admin.accessToken;

			return await adminCategoryService.updateCategory(
				formData,
				slug,
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

export const deleteCategory = createAsyncThunk(
	"adminCategory/delete-category",
	async (slug, thunkAPI) => {
		try {
			const token = thunkAPI.getState().admin.admin.accessToken;

			return await adminCategoryService.deleteCategory(slug, token);
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
	state.isDeleteSuccess = false;
	state.isLoading = false;
	state.message = message;
};

const resetState = (state) => {
	state.isError = false;
	state.isSuccess = false;
	state.isUpdateSuccess = false;
	state.isDeleteSuccess = false;
	state.isLoading = false;
	state.message = "";
};

const adminCategorySlice = createSlice({
	name: "adminCategory",
	initialState,
	reducers: {
		resetCategoryCommonState: (state) => {
			resetState(state);
		},
		resetCategoryState: (state) => {
			resetState(state);

			state.categories = [];
			state.categoryMetaData = {};
			state.category = {};
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
				state.categoryMetaData = action.payload.metaData;
			})
			.addCase(getCategories.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(createCategory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createCategory.fulfilled, (state) => {
				fulfilledState(state);
				state.isUpdateSuccess = true;
			})
			.addCase(createCategory.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(updateCategory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateCategory.fulfilled, (state, action) => {
				fulfilledState(state);
				state.categories = state.categories.map((cat) =>
					cat._id === action.payload._id ? action.payload : cat,
				);
				state.isUpdateSuccess = true;
			})
			.addCase(updateCategory.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(deleteCategory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteCategory.fulfilled, (state, action) => {
				fulfilledState(state);
				state.categories = state.categories.filter(
					(cat) => cat._id !== action.payload._id,
				);
				state.isDeleteSuccess = true;
			})
			.addCase(deleteCategory.rejected, (state, action) => {
				rejectedState(state, action.payload);
			});
	},
});

export const { resetCategoryCommonState, resetCategoryState } =
	adminCategorySlice.actions;

export default adminCategorySlice.reducer;
