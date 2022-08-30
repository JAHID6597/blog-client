import React from "react";
import { useSelector } from "react-redux";
import CreateCategoryForm from "../../../components/category-form/create-category-form";
import AdminDashboardLayout from "../../../layout/admin-dashboard-layout";
import CenterScreenLayout from "../../../layout/center-screen-layout";

const CreateCategory = () => {
	const { privateProfile } = useSelector((state) => state.admin);

	return (
		<AdminDashboardLayout privateProfile={privateProfile} background="#EAEDED">
			<CenterScreenLayout>
				<CreateCategoryForm />
			</CenterScreenLayout>
		</AdminDashboardLayout>
	);
};

export default CreateCategory;
