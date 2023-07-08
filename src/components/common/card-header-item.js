import { Edit, MoreVert } from "@mui/icons-material";
import { Avatar, CardHeader, IconButton, Skeleton } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DropDown from "./drop-down";
import LinkTo from "./link-to";

const CardHeaderItem = ({ blog, pb }) => {
	const { privateProfile } = useSelector((state) => state.user);

	const [anchorEl, setAnchorEl] = useState(null);
	const handleOpen = (event) => setAnchorEl(event.currentTarget);

	const navigate = useNavigate();

	const items = [
		{ icon: Edit, title: "Edit", url: `/user/blog/${blog?.slug}/update` },
	];

	const navigateToUpdate = (url) => navigate(url);

	return (
		<>
			<CardHeader
				avatar={
					blog?.user?.userName ? (
						<IconButton
							onClick={() =>
								navigate(`/user/${blog?.user?.userName}`)
							}
						>
							<Avatar src={blog?.user?.profilePicture}>
								{blog?.user?.profilePicture
									? ""
									: blog?.user?.userName[0]}
							</Avatar>
						</IconButton>
					) : (
						<IconButton>
							<Skeleton
								variant="circular"
								width={40}
								height={40}
							/>
						</IconButton>
					)
				}
				action={
					privateProfile &&
					privateProfile.userName === blog?.user?.userName && (
						<IconButton onClick={handleOpen}>
							<MoreVert />
						</IconButton>
					)
				}
				title={
					blog?.user?.userName ? (
						<LinkTo url={`/user/${blog?.user?.userName}`}>
							{blog?.user?.userName}
						</LinkTo>
					) : (
						<Skeleton variant="text" width={150} />
					)
				}
				subheader={
					blog?.createdAt ? (
						moment(blog?.createdAt, "YYYYMMDD").fromNow()
					) : (
						<Skeleton variant="text" width={100} />
					)
				}
				sx={{ pb }}
			/>

			<DropDown
				items={items}
				anchorEl={anchorEl}
				setAnchorEl={setAnchorEl}
				handleItemClicked={navigateToUpdate}
			/>
		</>
	);
};

export default CardHeaderItem;
