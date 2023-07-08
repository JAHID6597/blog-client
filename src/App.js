import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/common/scroll-to-top";

import Home from "./pages/home";
import Search from "./pages/search";
import CategoryList from "./pages/category-list";
import TagList from "./pages/tag-list";
import SingleBlog from "./pages/single-blog";

import UserAuth from "./pages/user/auth/user-auth";
import UserDashboard from "./pages/user/user-dashboard";
import UserProfile from "./pages/user-profile";
import UpdateProfile from "./pages/user/account-settings/update-profile/update-profile";
import ChangePassword from "./pages/user/account-settings/change-password/change-password";

import CreateBlog from "./pages/user/blogs/create-blog";
import UpdateBlog from "./pages/user/blogs/update-blog";

import AdminAuth from "./pages/admin/auth/admin-auth";
import AdminDashboard from "./pages/admin/admin-dashboard";
import Users from "./pages/admin/user/users/users";

import Page404 from "./pages/404.page";

import PrivateAdminOutletRoute from "./components/route/private-admin-outlet-route";
import PrivateUserOutletRoute from "./components/route/private-user-outlet-route";
import UnauthenticatedUserOutletRoute from "./components/route/unauthenticated-user-outlet-route";
import PageLayout from "./layout/page-layout";

import "./App.css";
import UnauthenticatedAdminOutletRoute from "./components/route/unauthenticated-admin-outlet-route";
import CreateCategory from "./pages/admin/category/create-category";
import Categories from "./pages/admin/category/categories/categories";
import SingleCategoryBlogs from "./pages/single-category-blogs";
import SingleTagBlogs from "./pages/single-tag-blogs";
import FollowerUsers from "./pages/public-user/follower-users";
import PublicUserInfoLayout from "./layout/public-user-info-layout";
import AllBlogs from "./pages/public-user/all-blogs";
import LikedBlogs from "./pages/public-user/liked-blogs";
import BookmarkedBlogs from "./pages/public-user/bookmarked-blogs";
import Comments from "./pages/public-user/comments";
import FollowingUsers from "./pages/public-user/following-users";
import Blogs from "./pages/user/blogs/blogs";
import CommentDetails from "./pages/user/comments/comment-details";
import UpdateComment from "./pages/user/comments/update-comment";
import LikedBlogsDetails from "./pages/user/liked-blogs/liked-blogs-details";
import BookmarkedBlogsDetails from "./pages/user/bookmarked-blogs/bookmarked-blogs-details";
import FollowersDetails from "./pages/user/follow/followers-details";
import FollowingsDetails from "./pages/user/follow/followings-details";

const App = () => {
	return (
		<BrowserRouter>
			<ScrollToTop />

			<Routes>
				<Route path="/" element={<PageLayout />}>
					<Route index element={<Home />} />

					<Route path="/search" element={<Search />} />
					<Route path="/categories" element={<CategoryList />} />
					<Route
						path="/category/:slug"
						element={<SingleCategoryBlogs />}
					/>
					<Route path="/tags" element={<TagList />} />
					<Route path="/tag/:slug" element={<SingleTagBlogs />} />

					<Route path="/user/:userName" element={<UserProfile />} />

					<Route element={<PublicUserInfoLayout />}>
						<Route
							path="/user/:userName/all-blogs"
							element={<AllBlogs />}
						/>
						<Route
							path="/user/:userName/liked-blogs"
							element={<LikedBlogs />}
						/>
						<Route
							path="/user/:userName/bookmarked-blogs"
							element={<BookmarkedBlogs />}
						/>
						<Route
							path="/user/:userName/comments"
							element={<Comments />}
						/>
						<Route
							path="/user/:userName/followers"
							element={<FollowerUsers />}
						/>
						<Route
							path="/user/:userName/Followings"
							element={<FollowingUsers />}
						/>
					</Route>

					<Route path="/blog/:slug" element={<SingleBlog />} />

					<Route element={<UnauthenticatedUserOutletRoute />}>
						<Route
							path="/user/signin"
							element={<UserAuth isSignup={false} />}
						/>
						<Route
							path="/user/signup"
							element={<UserAuth isSignup />}
						/>
					</Route>

					<Route element={<UnauthenticatedAdminOutletRoute />}>
						<Route path="/admin/auth" element={<AdminAuth />} />
					</Route>
				</Route>

				<Route element={<PrivateUserOutletRoute />}>
					<Route path="/user/dashboard" element={<UserDashboard />} />
					<Route
						path="/user/profile/update"
						element={<UpdateProfile />}
					/>
					<Route
						path="/user/password/change"
						element={<ChangePassword />}
					/>
					<Route path="/user/blogs" element={<Blogs />} />
					<Route path="/user/blog/create" element={<CreateBlog />} />
					<Route
						path="/user/blog/:slug/update"
						element={<UpdateBlog />}
					/>
					<Route path="/user/comments" element={<CommentDetails />} />
					<Route
						path="/user/blog/:slug/comment/:id/update"
						element={<UpdateComment />}
					/>
					<Route
						path="/user/liked-blogs"
						element={<LikedBlogsDetails />}
					/>
					<Route
						path="/user/bookmarked-blogs"
						element={<BookmarkedBlogsDetails />}
					/>
					<Route
						path="/user/followers"
						element={<FollowersDetails />}
					/>
					<Route
						path="/user/followings"
						element={<FollowingsDetails />}
					/>
				</Route>

				<Route element={<PrivateAdminOutletRoute />}>
					<Route
						path="/admin/dashboard"
						element={<AdminDashboard />}
					/>
					<Route path="/admin/users" element={<Users />} />
					<Route path="/admin/categories" element={<Categories />} />
					<Route
						path="/admin/category/create"
						element={<CreateCategory />}
					/>
				</Route>

				<Route path="/404" element={<Page404 />} />
				<Route path="/*" element={<Navigate to="/404" replace />} />
			</Routes>

			<ToastContainer />
		</BrowserRouter>
	);
};

export default App;
