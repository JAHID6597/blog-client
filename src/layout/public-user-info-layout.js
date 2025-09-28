import React, { useEffect } from "react";
import {
	Box,
	Container,
	List,
	ListItem,
	ListItemButton,
	Tabs,
	Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	getPublicProfile,
	resetUserPublicState,
	resetDataState as resetUserDataState,
} from "../features/user/user.slice";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import useWindowSize from "../hook/useWindowSize";
import { resetDataState as resetBlogDataState } from "../features/blog/blog.slice";

const PublicUserInfoLayout = () => {
	const { currentPublicUserInfoTabItem } = useSelector(
		(state) => state.common,
	);
	const windowSize = useWindowSize();
	const { userName } = useParams();

	const { isError } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (userName) dispatch(getPublicProfile(userName));

		return () => dispatch(resetUserPublicState());
	}, [dispatch, userName]);

	useEffect(() => {
		if (isError) navigate("/404", { replace: true });

		return () => dispatch(resetUserPublicState());
	}, [dispatch, isError, navigate]);

	const items = [
		{
			id: "infoBtn1",
			name: "All Blogs",
			url: `/user/${userName}/all-blogs`,
		},
		{
			id: "infoBtn2",
			name: "Liked Blogs",
			url: `/user/${userName}/liked-blogs`,
		},
		{
			id: "infoBtn3",
			name: "Bookmarked Blogs",
			url: `/user/${userName}/bookmarked-blogs`,
		},
		{ id: "infoBtn4", name: "Comments", url: `/user/${userName}/comments` },
		{
			id: "infoBtn5",
			name: "Followers",
			url: `/user/${userName}/followers`,
		},
		{
			id: "infoBtn6",
			name: "Followings",
			url: `/user/${userName}/followings`,
		},
	];

	const handleNavigate = (url) => {
		navigate(url, { replace: true });

		dispatch(resetUserDataState(true));
		dispatch(resetBlogDataState(true));
	};

	return (
		<Container maxWidth="xl">
			<Box sx={{ py: 2 }}>
				<Grid container>
					<Grid
						item
						md={3}
						xs={12}
						sx={{ px: 2, mb: { md: 0, xs: 3 } }}
					>
						<Box
							sx={{
								position: { md: "sticky", xs: "" },
								zIndex: 1000,
								top: 70,
							}}
						>
							<List
								variant="scrollable"
								as={Tabs}
								orientation={
									windowSize.width > 899
										? "vertical"
										: "horizontal"
								}
								sx={{ p: 0, background: "#ffffff" }}
								value={currentPublicUserInfoTabItem}
							>
								{items.map((item) => (
									<ListItem
										key={item.id}
										disablePadding
										onClick={() => handleNavigate(item.url)}
										sx={{
											"&:hover": {
												background:
													"rgba(25, 118, 210, 0.08)",
											},
											width: "inherit",
										}}
									>
										<ListItemButton sx={{ py: 2, px: 4 }}>
											{item.name}
										</ListItemButton>
									</ListItem>
								))}
							</List>
						</Box>
					</Grid>

					<Grid item md={9} xs={12} sx={{ px: 2 }}>
						<Outlet />
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};

export default PublicUserInfoLayout;
