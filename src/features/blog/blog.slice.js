import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "./blog.service";
import { userTimeOut } from "../common/user.common.service";

userTimeOut();

const initialState = {
	blogs: [],
	metaData: {},
	blog: {},
	isError: false,
	isActionError: false,
	isSuccess: false,
	isUpdateSuccess: false,
	isDeleteSuccess: false,
	isCommentUpdateSuccess: false,
	isCommentDeleteSuccess: false,
	isLoading: false,
	message: "",
	resetData: false,

	readNextBlogs: [],
	readNextBlogsMetaData: {},

	comments: [],
	commentMetaData: {},
	comment: null,

	likedBlog: null,
	bookmarkedBlog: null,
	blogsByCategory: [],
	blogsByCategoryMetaData: {},
	blogsByTag: [],
	blogsByTagMetaData: {},

	blogsByPublicUser: [],
	blogsMetaDataByPublicUser: {},
	blogByPublicUser: {},

	blogsByPrivateUser: [],
	blogsMetaDataByPrivateUser: {},
	blogByPrivateUser: {},

	likedBlogsByPublicUser: [],
	likedBlogsMetaDataByPublicUser: {},

	likedBlogsByPrivateUser: [],
	likedBlogsMetaDataByPrivateUser: {},

	bookmarkedBlogsByPublicUser: [],
	bookmarkedBlogsMetaDataByPublicUser: {},

	bookmarkedBlogsByPrivateUser: [],
	bookmarkedBlogsMetaDataByPrivateUser: {},

	publicUserComments: [],
	publicUserCommentsMetaData: {},

	privateUserComments: [],
	privateUserCommentsMetaData: {},
};

export const getBlog = createAsyncThunk(
	"blog/get-blog",
	async (slug, thunkAPI) => {
		try {
			return await blogService.getBlog(slug);
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

export const getBlogs = createAsyncThunk(
	"blog/get-blogs",
	async (data = {}, thunkAPI) => {
		try {
			const { page, limit, search, category, tag } = data;

			return await blogService.getBlogs(
				page,
				limit,
				search || "",
				category || "",
				tag || "",
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

export const createBlog = createAsyncThunk(
	"blog/create-blog",
	async (formData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().user.user.accessToken;

			return await blogService.createBlog(formData, token);
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

export const updateBlog = createAsyncThunk(
	"blog/update-blog",
	async (data = {}, thunkAPI) => {
		try {
			const { formData, slug } = data;
			const token = thunkAPI.getState().user.user.accessToken;

			return await blogService.updateBlog(formData, slug, token);
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

export const deleteBlog = createAsyncThunk(
	"blog/delete-blog",
	async (slug, thunkAPI) => {
		try {
			const token = thunkAPI.getState().user.user.accessToken;

			return await blogService.deleteBlog(slug, token);
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

export const getReadNextBlogs = createAsyncThunk(
	"blog/get-read-next-blogs",
	async (data = {}, thunkAPI) => {
		try {
			const { slug, page, limit } = data;

			return await blogService.getReadNextBlogs(slug, page, limit);
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

export const likeBlog = createAsyncThunk(
	"blog/like-blog",
	async (slug, thunkAPI) => {
		try {
			const token = thunkAPI.getState().user.user.accessToken;

			return await blogService.likeBlog(slug, token);
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

export const bookmarkBlog = createAsyncThunk(
	"blog/bookmark-blog",
	async (slug, thunkAPI) => {
		try {
			const token = thunkAPI.getState().user.user.accessToken;

			return await blogService.bookmarkBlog(slug, token);
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

export const getComment = createAsyncThunk(
	"blog/get-comment",
	async (data = {}, thunkAPI) => {
		try {
			const { slug, id } = data;

			return await blogService.getComment(slug, id);
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

export const getComments = createAsyncThunk(
	"blog/get-comments",
	async (data = {}, thunkAPI) => {
		try {
			const { slug, page, limit, search } = data;

			return await blogService.getComments(
				slug,
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

export const createComment = createAsyncThunk(
	"blog/create-comment",
	async (data = {}, thunkAPI) => {
		try {
			const { formData, slug } = data;
			const token = thunkAPI.getState().user.user.accessToken;

			return await blogService.createComment(formData, slug, token);
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

export const updateComment = createAsyncThunk(
	"blog/update-comment",
	async (data = {}, thunkAPI) => {
		try {
			const { formData, slug, id } = data;
			const token = thunkAPI.getState().user.user.accessToken;

			return await blogService.updateComment(formData, slug, id, token);
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

export const deleteComment = createAsyncThunk(
	"blog/delete-comment",
	async (data = {}, thunkAPI) => {
		try {
			const { slug, id } = data;
			const token = thunkAPI.getState().user.user.accessToken;

			return await blogService.deleteComment(slug, id, token);
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

export const getCommentsByPublicUser = createAsyncThunk(
	"blog/get-comments-by-public-user",
	async (data = {}, thunkAPI) => {
		try {
			const { userName, page, limit, search } = data;

			return await blogService.getCommentsByPublicUser(
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

export const getCommentsByPrivateUser = createAsyncThunk(
	"blog/get-comments-by-private-user",
	async (data = {}, thunkAPI) => {
		try {
			const { page, limit, search } = data;

			const token = thunkAPI.getState().user.user.accessToken;

			return await blogService.getCommentsByPrivateUser(
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

export const getBlogsByCategory = createAsyncThunk(
	"blog/get-blogs-by-category",
	async (data = {}, thunkAPI) => {
		try {
			const { slug, page, limit, search } = data;
			return await blogService.getBlogsByCategory(
				slug,
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

export const getBlogsByTag = createAsyncThunk(
	"blog/get-blogs-by-tag",
	async (data = {}, thunkAPI) => {
		try {
			const { slug, page, limit, search } = data;
			return await blogService.getBlogsByTag(
				slug,
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

export const getBlogByPublicUser = createAsyncThunk(
	"user/get-blog-by-public-user",
	async (data, thunkAPI) => {
		try {
			const { userName, slug } = data;

			return await blogService.getBlogByPublicUser(userName, slug);
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

export const getBlogsByPublicUser = createAsyncThunk(
	"user/get-blogs-by-public-user",
	async (data = {}, thunkAPI) => {
		try {
			const { userName, page, limit, search } = data;

			return await blogService.getBlogsByPublicUser(
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

export const getBlogByPrivateUser = createAsyncThunk(
	"user/get-blog-by-private-user",
	async (slug, thunkAPI) => {
		try {
			const token = thunkAPI.getState().user.user.accessToken;

			return await blogService.getBlogByPrivateUser(slug, token);
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

export const getBlogsByPrivateUser = createAsyncThunk(
	"user/get-blogs-by-private-user",
	async (data = {}, thunkAPI) => {
		try {
			const token = thunkAPI.getState().user.user.accessToken;
			const { page, limit, search } = data;

			return await blogService.getBlogsByPrivateUser(
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

export const getLikedBlogsByPublicUser = createAsyncThunk(
	"user/get-liked-blogs-by-public-user",
	async (data = {}, thunkAPI) => {
		try {
			const { userName, page, limit, search } = data;

			return await blogService.getLikedBlogsByPublicUser(
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

export const getLikedBlogsByPrivateUser = createAsyncThunk(
	"user/get-liked-blogs-by-private-user",
	async (data = {}, thunkAPI) => {
		try {
			const token = thunkAPI.getState().user.user.accessToken;
			const { page, limit, search } = data;

			return await blogService.getLikedBlogsByPrivateUser(
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

export const getBookmarkedBlogsByPublicUser = createAsyncThunk(
	"user/get-bookmarked-blogs-by-public-user",
	async (data = {}, thunkAPI) => {
		try {
			const { userName, page, limit, search } = data;

			return await blogService.getBookmarkedBlogsByPublicUser(
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

export const getBookmarkedBlogsByPrivateUser = createAsyncThunk(
	"user/get-bookmarked-blogs-by-private-user",
	async (data = {}, thunkAPI) => {
		try {
			const token = thunkAPI.getState().user.user.accessToken;
			const { page, limit, search } = data;

			return await blogService.getBookmarkedBlogsByPrivateUser(
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
	state.isActionError = false;
	state.isSuccess = true;
	state.isLoading = false;
	state.message = "";
};

const rejectedState = (state, message) => {
	state.isError = true;
	state.isSuccess = false;
	state.isUpdateSuccess = false;
	state.isDeleteSuccess = false;
	state.isCommentUpdateSuccess = false;
	state.isCommentDeleteSuccess = false;
	state.isLoading = false;
	state.message = message;
};

const resetState = (state) => {
	state.isError = false;
	state.isActionError = false;
	state.isSuccess = false;
	state.isLoading = false;
	state.message = "";
	state.isUpdateSuccess = false;
	state.isDeleteSuccess = false;
	state.isCommentUpdateSuccess = false;
	state.isCommentDeleteSuccess = false;
	state.resetData = false;
};

const blogSlice = createSlice({
	name: "blog",
	initialState,
	reducers: {
		resetDataState: (state, action) => {
			state.resetData = action.payload;
		},
		resetBlogCommonState: (state) => {
			resetState(state);
		},
		resetBlogState: (state) => {
			resetState(state);

			state.blogs = [];
			state.metaData = {};
			state.blog = {};
		},
		resetBlogCommentState: (state) => {
			resetState(state);

			state.comments = [];
			state.commentMetaData = {};
			state.comment = null;
		},
		resetBlogByCategoryState: (state) => {
			resetState(state);

			state.blogsByCategory = [];
			state.blogsByCategoryMetaData = {};
		},
		resetBlogByTagState: (state) => {
			resetState(state);

			state.blogsByTag = [];
			state.blogsByTagMetaData = {};
		},
		resetBlogActionState: (state) => {
			resetState(state);

			state.likedBlog = null;
			state.bookmarkedBlog = null;
		},
		resetUserBlogState: (state) => {
			resetState(state);

			state.blogsByPublicUser = [];
			state.blogsMetaDataByPublicUser = {};
			state.blogByPublicUser = {};

			state.blogsByPrivateUser = [];
			state.blogsMetaDataByPrivateUser = {};
			state.blogByPrivateUser = {};
		},
		resetUserLikedBlogState: (state) => {
			resetState(state);

			state.likedBlogsByPublicUser = [];
			state.likedBlogsMetaDataByPublicUser = {};

			state.likedBlogsByPrivateUser = [];
			state.likedBlogsMetaDataByPrivateUser = {};
		},
		resetUserBookmarkedBlogState: (state) => {
			resetState(state);

			state.bookmarkedBlogsByPublicUser = [];
			state.bookmarkedBlogsMetaDataByPublicUser = {};

			state.bookmarkedBlogsByPrivateUser = [];
			state.bookmarkedBlogsMetaDataByPrivateUser = {};
		},
		resetUserCommentState: (state) => {
			resetState(state);

			state.publicUserComments = [];
			state.publicUserCommentsMetaData = {};
			state.privateUserComments = [];
			state.privateUserCommentsMetaData = {};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getBlog.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getBlog.fulfilled, (state, action) => {
				fulfilledState(state);
				state.blog = action.payload;
			})
			.addCase(getBlog.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(getBlogs.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getBlogs.fulfilled, (state, action) => {
				fulfilledState(state);
				state.blogs = action.payload.blogs;
				state.metaData = action.payload.metaData;
			})
			.addCase(getBlogs.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(createBlog.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createBlog.fulfilled, (state, action) => {
				fulfilledState(state);
				state.blog = action.payload;
				state.isUpdateSuccess = true;
			})
			.addCase(createBlog.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(updateBlog.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateBlog.fulfilled, (state, action) => {
				fulfilledState(state);
				state.blogByPrivateUser = action.payload;
				state.blogsByPrivateUser = state.blogsByPrivateUser.map(
					(blg) =>
						blg._id === action.payload._id ? action.payload : blg,
				);
				state.isUpdateSuccess = true;
			})
			.addCase(updateBlog.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(deleteBlog.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteBlog.fulfilled, (state, action) => {
				fulfilledState(state);
				state.isDeleteSuccess = true;

				state.blogs = state.blogs.filter(
					(blg) => blg._id !== action.payload._id,
				);
				state.metaData.total = state.metaData.total - 1;

				state.blogsByPublicUser = state.blogsByPublicUser.filter(
					(blg) => blg._id !== action.payload._id,
				);
				state.blogsMetaDataByPublicUser.total =
					state.blogsMetaDataByPublicUser.total - 1;

				state.blogsByPrivateUser = state.blogsByPrivateUser.filter(
					(blg) => blg._id !== action.payload._id,
				);
				state.blogsMetaDataByPrivateUser.total =
					state.blogsMetaDataByPrivateUser.total - 1;

				state.blogsByCategory = state.blogsByCategory.filter(
					(blg) => blg._id !== action.payload._id,
				);
				state.blogsByCategoryMetaData.total =
					state.blogsByCategoryMetaData.total - 1;

				state.blogsByTag = state.blogsByTag.filter(
					(blg) => blg._id !== action.payload._id,
				);
				state.blogsByTagMetaData.total =
					state.blogsByTagMetaData.total - 1;

				state.likedBlogsByPublicUser =
					state.likedBlogsByPublicUser.filter(
						(blg) => blg.blog._id !== action.payload._id,
					);
				state.likedBlogsMetaDataByPublicUser.total =
					state.likedBlogsMetaDataByPublicUser.total - 1;

				state.likedBlogsByPrivateUser =
					state.likedBlogsByPrivateUser.filter(
						(blg) => blg.blog._id !== action.payload._id,
					);
				state.likedBlogsMetaDataByPrivateUser.total =
					state.likedBlogsMetaDataByPrivateUser.total - 1;

				state.bookmarkedBlogsByPublicUser =
					state.bookmarkedBlogsByPublicUser.filter(
						(blg) => blg.blog._id !== action.payload._id,
					);
				state.bookmarkedBlogsMetaDataByPublicUser.total =
					state.bookmarkedBlogsMetaDataByPublicUser.total - 1;

				state.bookmarkedBlogsByPrivateUser =
					state.bookmarkedBlogsByPrivateUser.filter(
						(blg) => blg.blog._id !== action.payload._id,
					);
				state.bookmarkedBlogsMetaDataByPrivateUser.total =
					state.bookmarkedBlogsMetaDataByPrivateUser.total - 1;

				state.readNextBlogs = state.readNextBlogs.filter(
					(blg) => blg._id !== action.payload._id,
				);
				state.readNextBlogsMetaData.total =
					state.readNextBlogsMetaData.total - 1;
			})
			.addCase(deleteBlog.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(getReadNextBlogs.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getReadNextBlogs.fulfilled, (state, action) => {
				fulfilledState(state);
				state.readNextBlogs = action.payload.blogs;
				state.readNextBlogsMetaData = action.payload.metaData;
			})
			.addCase(getReadNextBlogs.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(likeBlog.fulfilled, (state, action) => {
				fulfilledState(state);
				state.blog.likes = action.payload.likes;
				state.likedBlog = action.payload;

				state.likedBlogsByPublicUser =
					state.likedBlogsByPublicUser.filter(
						(blg) => blg.blog._id !== action.payload._id,
					);
				state.likedBlogsMetaDataByPublicUser.total =
					state.likedBlogsMetaDataByPublicUser.total - 1;

				state.likedBlogsByPrivateUser =
					state.likedBlogsByPrivateUser.filter(
						(blg) => blg.blog._id !== action.payload._id,
					);
				state.likedBlogsMetaDataByPrivateUser.total =
					state.likedBlogsMetaDataByPrivateUser.total - 1;

				state.isUpdateSuccess = true;
			})
			.addCase(likeBlog.rejected, (state, action) => {
				rejectedState(state, action.payload);
				state.isError = false;
				state.isActionError = true;
			})
			.addCase(bookmarkBlog.fulfilled, (state, action) => {
				fulfilledState(state);
				state.blog.bookmarks = action.payload.bookmarks;
				state.bookmarkedBlog = action.payload;
				state.isUpdateSuccess = true;

				state.bookmarkedBlogsByPublicUser =
					state.bookmarkedBlogsByPublicUser.filter(
						(blg) => blg.blog._id !== action.payload._id,
					);
				state.bookmarkedBlogsMetaDataByPublicUser.total =
					state.bookmarkedBlogsMetaDataByPublicUser.total - 1;

				state.bookmarkedBlogsByPrivateUser =
					state.bookmarkedBlogsByPrivateUser.filter(
						(blg) => blg.blog._id !== action.payload._id,
					);
				state.bookmarkedBlogsMetaDataByPrivateUser.total =
					state.bookmarkedBlogsMetaDataByPrivateUser.total - 1;
			})
			.addCase(bookmarkBlog.rejected, (state, action) => {
				rejectedState(state, action.payload);
				state.isError = false;
				state.isActionError = true;
			})
			.addCase(getComment.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getComment.fulfilled, (state, action) => {
				fulfilledState(state);
				state.comment = action.payload;
			})
			.addCase(getComment.rejected, (state, action) => {
				rejectedState(state, action.payload);
				state.isError = false;
				state.isActionError = true;
			})
			.addCase(getComments.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getComments.fulfilled, (state, action) => {
				fulfilledState(state);
				state.comments = action.payload.comments;
				state.commentMetaData = action.payload.metaData;
			})
			.addCase(getComments.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(createComment.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createComment.fulfilled, (state, action) => {
				fulfilledState(state);
				state.isCommentUpdateSuccess = true;
				state.comments = [action.payload];
				state.commentMetaData.total = state.commentMetaData.total + 1;
				state.blog = {
					...state.blog,
					comments: [
						{ _id: action.payload._id, user: action.payload.user },
						...state.blog.comments,
					],
				};
			})
			.addCase(createComment.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(updateComment.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateComment.fulfilled, (state, action) => {
				fulfilledState(state);
				state.isCommentUpdateSuccess = true;

				state.comments = state.comments.map((cmnt) =>
					cmnt._id === action.payload._id
						? {
								...action.payload,
								blog: cmnt.blog,
								user: cmnt.user,
						  }
						: cmnt,
				);

				state.privateUserComments = state.privateUserComments.map(
					(cmnt) =>
						cmnt._id === action.payload._id
							? {
									...action.payload,
									blog: cmnt.blog,
									user: cmnt.user,
							  }
							: cmnt,
				);
			})
			.addCase(updateComment.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(deleteComment.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteComment.fulfilled, (state, action) => {
				fulfilledState(state);
				state.isCommentDeleteSuccess = true;

				state.comments = state.comments.filter(
					(cmnt) => cmnt._id !== action.payload._id,
				);
				state.commentMetaData.total = state.commentMetaData.total - 1;

				state.privateUserComments = state.privateUserComments.filter(
					(cmnt) => cmnt._id !== action.payload._id,
				);
				state.privateUserCommentsMetaData.total =
					state.privateUserCommentsMetaData.total - 1;
			})
			.addCase(deleteComment.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(getCommentsByPublicUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCommentsByPublicUser.fulfilled, (state, action) => {
				fulfilledState(state);
				state.publicUserComments = action.payload.comments;
				state.publicUserCommentsMetaData = action.payload.metaData;
			})
			.addCase(getCommentsByPublicUser.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(getCommentsByPrivateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCommentsByPrivateUser.fulfilled, (state, action) => {
				fulfilledState(state);
				state.privateUserComments = action.payload.comments;
				state.privateUserCommentsMetaData = action.payload.metaData;
			})
			.addCase(getCommentsByPrivateUser.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(getBlogsByCategory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getBlogsByCategory.fulfilled, (state, action) => {
				fulfilledState(state);
				state.blogsByCategory = action.payload.blogs;
				state.blogsByCategoryMetaData = action.payload.metaData;
			})
			.addCase(getBlogsByCategory.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(getBlogsByTag.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getBlogsByTag.fulfilled, (state, action) => {
				fulfilledState(state);
				state.blogsByTag = action.payload.blogs;
				state.blogsByTagMetaData = action.payload.metaData;
			})
			.addCase(getBlogsByTag.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(getBlogByPublicUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getBlogByPublicUser.fulfilled, (state, action) => {
				fulfilledState(state);
				state.blogByPublicUser = action.payload;
			})
			.addCase(getBlogByPublicUser.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(getBlogsByPublicUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getBlogsByPublicUser.fulfilled, (state, action) => {
				fulfilledState(state);
				state.blogsByPublicUser = action.payload.blogs;
				state.blogsMetaDataByPublicUser = action.payload.metaData;
			})
			.addCase(getBlogsByPublicUser.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(getBlogByPrivateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getBlogByPrivateUser.fulfilled, (state, action) => {
				fulfilledState(state);
				state.blogByPrivateUser = action.payload;
			})
			.addCase(getBlogByPrivateUser.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(getBlogsByPrivateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getBlogsByPrivateUser.fulfilled, (state, action) => {
				fulfilledState(state);
				state.blogsByPrivateUser = action.payload.blogs;
				state.blogsMetaDataByPrivateUser = action.payload.metaData;
			})
			.addCase(getBlogsByPrivateUser.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(getLikedBlogsByPublicUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getLikedBlogsByPublicUser.fulfilled, (state, action) => {
				fulfilledState(state);
				state.likedBlogsByPublicUser = action.payload.blogs.map(
					(blg) => blg?.blog,
				);
				state.likedBlogsMetaDataByPublicUser = action.payload.metaData;
			})
			.addCase(getLikedBlogsByPublicUser.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(getLikedBlogsByPrivateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getLikedBlogsByPrivateUser.fulfilled, (state, action) => {
				fulfilledState(state);
				state.likedBlogsByPrivateUser = action.payload.blogs;
				state.likedBlogsMetaDataByPrivateUser = action.payload.metaData;
			})
			.addCase(getLikedBlogsByPrivateUser.rejected, (state, action) => {
				rejectedState(state, action.payload);
			})
			.addCase(getBookmarkedBlogsByPublicUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				getBookmarkedBlogsByPublicUser.fulfilled,
				(state, action) => {
					fulfilledState(state);
					state.bookmarkedBlogsByPublicUser =
						action.payload.blogs.map((blg) => blg?.blog);
					state.bookmarkedBlogsMetaDataByPublicUser =
						action.payload.metaData;
				},
			)
			.addCase(
				getBookmarkedBlogsByPublicUser.rejected,
				(state, action) => {
					rejectedState(state, action.payload);
				},
			)
			.addCase(getBookmarkedBlogsByPrivateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				getBookmarkedBlogsByPrivateUser.fulfilled,
				(state, action) => {
					fulfilledState(state);
					state.bookmarkedBlogsByPrivateUser = action.payload.blogs;
					state.bookmarkedBlogsMetaDataByPrivateUser =
						action.payload.metaData;
				},
			)
			.addCase(
				getBookmarkedBlogsByPrivateUser.rejected,
				(state, action) => {
					rejectedState(state, action.payload);
				},
			);
	},
});

export const {
	resetDataState,
	resetBlogState,
	resetBlogCommentState,
	resetBlogActionState,
	resetBlogCommonState,
	resetBlogByCategoryState,
	resetBlogByTagState,
	resetUserBlogState,
	resetUserLikedBlogState,
	resetUserBookmarkedBlogState,
	resetUserCommentState,
} = blogSlice.actions;

export default blogSlice.reducer;
