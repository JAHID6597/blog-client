import React, { useEffect } from "react";
import CenterScreenLayout from "../../../layout/center-screen-layout";
import CreateBlogForm from "../../../components/blog-form/create-blog-form";
import { resetUserDashboardBackground } from "../../../features/common/common.slice";
import { useDispatch } from "react-redux";


const CreateBlog = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(resetUserDashboardBackground('#EAEDED'));

		return () => dispatch(resetUserDashboardBackground(''));
	}, [dispatch])

	return (
		<CenterScreenLayout>
			<CreateBlogForm />
		</CenterScreenLayout>
	);
};

export default CreateBlog;
