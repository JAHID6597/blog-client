import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../components/header/header";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	getPrivateProfile,
	resetUserPrivateState,
} from "../features/user/user.slice";
import ScrollTopButton from "../components/common/scroll-top-button";

const PageLayout = () => {
	const { user } = useSelector((state) => state.user);
	const { isPageLayoutPadding } = useSelector((state) => state.common);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user) {
			dispatch(getPrivateProfile()).then((data) => {
				if (data.error)
					localStorage.removeItem(
						process.env.REACT_APP_AUTH_USER_KEY,
					);
			});
		}

		return () => dispatch(resetUserPrivateState());
	}, [dispatch, user]);

	return (
		<>
			<Header />

			<Box sx={{ background: "#f5f5f5", minHeight: "100vh" }}>
				<Box sx={{ py: isPageLayoutPadding ? 0 : 1.5 }}>
					<Outlet />
				</Box>
			</Box>

			<ScrollTopButton />
		</>
	);
};

export default PageLayout;
