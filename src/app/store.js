import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/admin/admin.slice";
import blogReducer from "../features/blog/blog.slice";
import categoryReducer from "../features/category/category.slice";
import tagReducer from "../features/tag/tag.slice";
import userReducer from "../features/user/user.slice";
import adminUserReducer from "../features/admin/user/user.slice";
import adminCategoryReducer from "../features/admin/category/category.slice";
import commonReducer from "../features/common/common.slice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		blog: blogReducer,
		category: categoryReducer,
		tag: tagReducer,
		admin: adminReducer,
		adminUser: adminUserReducer,
		adminCategory: adminCategoryReducer,
		common: commonReducer,
	},
});
