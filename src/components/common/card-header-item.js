import React, { useState } from "react";
import { Avatar, CardHeader, IconButton, Skeleton } from "@mui/material";
import { MoreVert, Edit, Delete } from "@mui/icons-material";
import moment from 'moment';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DropDown from "./drop-down";
import LinkTo from "./link-to";


const items = [{ icon: Edit, title: "Edit" }, { icon: Delete, title: "Delete" }];


const CardHeaderItem = ({ blog, pb }) => {
	const { privateProfile } = useSelector((state) => state.user);

	const [anchorEl, setAnchorEl] = useState(null);
	const handleOpen = (event) => setAnchorEl(event.currentTarget);

	const navigate = useNavigate();

	return (
		<>
			<CardHeader
				avatar={
					blog?.user?.userName ?
						<IconButton onClick={() => navigate(`/user/${blog?.user?.userName}`)}>
							<Avatar src={blog?.user?.profilePicture}>{blog?.user?.profilePicture ? '' : blog?.user?.userName[0]}</Avatar>
						</IconButton> :
						<IconButton>
							<Skeleton variant="circular" width={40} height={40} />
						</IconButton>
				}
				action={
					privateProfile && privateProfile.userName === blog?.user?.userName && <IconButton onClick={handleOpen}><MoreVert /></IconButton>
				}
				title={
					blog?.user?.userName ?
						<LinkTo url={`/user/${blog?.user?.userName}`}>{blog?.user?.userName}</LinkTo> :
						<Skeleton variant="text" width={150} />
				}
				subheader={
					blog?.createdAt ?
						moment(blog?.createdAt, "YYYYMMDD").fromNow() :
						<Skeleton variant="text" width={100} />
				}
				sx={{ pb }}
			/>

			<DropDown
				items={items}
				anchorEl={anchorEl}
				setAnchorEl={setAnchorEl}
			/>
		</>
	);
};

export default CardHeaderItem;
