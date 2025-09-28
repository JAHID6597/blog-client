import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_URL;

const config = (token) => {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
};

const getBlog = async (slug) => {
	const { data } = await axios.get(`${baseURL}/api/blog/${slug}`);

	return data;
};

const getBlogs = async (page, limit, search, category, tag) => {
	const { data } = await axios.get(
		`${baseURL}/api/blogs?page=${page}&limit=${limit}&search=${search}&category=${category}&tag=${tag}`,
	);

	return data;
};

const createBlog = async (formData, token) => {
	const { data } = await axios.post(
		`${baseURL}/api/blog`,
		formData,
		config(token),
	);

	return data;
};

const updateBlog = async (formData, slug, token) => {
	const { data } = await axios.put(
		`${baseURL}/api/blog/${slug}`,
		formData,
		config(token),
	);

	return data;
};

const deleteBlog = async (slug, token) => {
	const { data } = await axios.delete(
		`${baseURL}/api/blog/${slug}`,
		config(token),
	);

	return data;
};

const getReadNextBlogs = async (slug, page, limit) => {
	const { data } = await axios.get(
		`${baseURL}/api/blog/${slug}/read-next?page=${page}&limit=${limit}`,
	);

	return data;
};

const likeBlog = async (slug, token) => {
	const { data } = await axios.post(
		`${baseURL}/api/blog/${slug}/like`,
		{},
		config(token),
	);

	return data;
};

const bookmarkBlog = async (slug, token) => {
	const { data } = await axios.post(
		`${baseURL}/api/blog/${slug}/bookmark`,
		{},
		config(token),
	);

	return data;
};

const getComment = async (slug, id) => {
	const { data } = await axios.get(
		`${baseURL}/api/blog/${slug}/comment/${id}`,
	);

	return data;
};

const getComments = async (slug, page, limit, search) => {
	const { data } = await axios.get(
		`${baseURL}/api/blog/${slug}/comments?page=${page}&limit=${limit}&search=${search}`,
	);

	return data;
};

const createComment = async (formData, slug, token) => {
	const { data } = await axios.post(
		`${baseURL}/api/blog/${slug}/comment`,
		formData,
		config(token),
	);

	return data;
};

const updateComment = async (formData, slug, id, token) => {
	const { data } = await axios.put(
		`${baseURL}/api/blog/${slug}/comment/${id}`,
		formData,
		config(token),
	);

	return data;
};

const deleteComment = async (slug, id, token) => {
	const { data } = await axios.delete(
		`${baseURL}/api/blog/${slug}/comment/${id}`,
		config(token),
	);

	return data;
};

const getBlogsByCategory = async (slug, page, limit, search) => {
	const { data } = await axios.get(
		`${baseURL}/api/category/${slug}/blogs?page=${page}&limit=${limit}&search=${search}`,
	);

	return data;
};

const getBlogsByTag = async (slug, page, limit, search) => {
	const { data } = await axios.get(
		`${baseURL}/api/tag/${slug}/blogs?page=${page}&limit=${limit}&search=${search}`,
	);

	return data;
};

const getBlogByPublicUser = async (userName, slug) => {
	const { data } = await axios.get(
		`${baseURL}/api/user/${userName}/blog/${slug}`,
	);

	return data;
};

const getBlogsByPublicUser = async (userName, page, limit, search) => {
	const { data } = await axios.get(
		`${baseURL}/api/user/${userName}/blogs?page=${page}&limit=${limit}&search=${search}`,
	);

	return data;
};

const getBlogByPrivateUser = async (slug, token) => {
	const { data } = await axios.get(
		`${baseURL}/api/user/blog/${slug}`,
		config(token),
	);

	return data;
};

const getBlogsByPrivateUser = async (page, limit, search, token) => {
	const { data } = await axios.get(
		`${baseURL}/api/user/blogs?page=${page}&limit=${limit}&search=${search}`,
		config(token),
	);

	return data;
};

const getLikedBlogsByPublicUser = async (userName, page, limit, search) => {
	const { data } = await axios.get(
		`${baseURL}/api/user/${userName}/blogs/liked?page=${page}&limit=${limit}&search=${search}`,
	);

	return data;
};

const getLikedBlogsByPrivateUser = async (page, limit, search, token) => {
	const { data } = await axios.get(
		`${baseURL}/api/user/blogs/liked?page=${page}&limit=${limit}&search=${search}`,
		config(token),
	);

	return data;
};

const getBookmarkedBlogsByPublicUser = async (
	userName,
	page,
	limit,
	search,
) => {
	const { data } = await axios.get(
		`${baseURL}/api/user/${userName}/blogs/bookmarked?page=${page}&limit=${limit}&search=${search}`,
	);

	return data;
};

const getBookmarkedBlogsByPrivateUser = async (page, limit, search, token) => {
	const { data } = await axios.get(
		`${baseURL}/api/user/blogs/bookmarked?page=${page}&limit=${limit}&search=${search}`,
		config(token),
	);

	return data;
};

const getCommentsByPublicUser = async (userName, page, limit, search) => {
	const { data } = await axios.get(
		`${baseURL}/api/user/${userName}/blogs/comments?page=${page}&limit=${limit}&search=${search}`,
	);

	return data;
};

const getCommentsByPrivateUser = async (page, limit, search, token) => {
	const { data } = await axios.get(
		`${baseURL}/api/user/blogs/comments?page=${page}&limit=${limit}&search=${search}`,
		config(token),
	);

	return data;
};

const blogService = {
	getBlogs,
	getBlog,
	createBlog,
	updateBlog,
	deleteBlog,
	getReadNextBlogs,
	likeBlog,
	bookmarkBlog,
	getComment,
	getComments,
	createComment,
	updateComment,
	deleteComment,
	getBlogsByCategory,
	getBlogsByTag,
	getBlogByPublicUser,
	getBlogsByPublicUser,
	getBlogByPrivateUser,
	getBlogsByPrivateUser,
	getLikedBlogsByPublicUser,
	getLikedBlogsByPrivateUser,
	getBookmarkedBlogsByPublicUser,
	getBookmarkedBlogsByPrivateUser,
	getCommentsByPublicUser,
	getCommentsByPrivateUser,
};

export default blogService;
