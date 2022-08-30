import React, { useEffect } from "react";
import CenterScreenLayout from "../../../layout/center-screen-layout";
import UpdateBlogForm from "../../../components/blog-form/update-blog-form";
import { useDispatch } from "react-redux";
import { resetUserDashboardBackground } from "../../../features/common/common.slice";


const UpdateBlog = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(resetUserDashboardBackground('#EAEDED'));

		return () => dispatch(resetUserDashboardBackground(''));
	}, [dispatch])

	return (
		<CenterScreenLayout>
			<UpdateBlogForm />
		</CenterScreenLayout>
	);
};

export default UpdateBlog;
