import React from "react";
import { RiseLoader } from "react-spinners";
import CenterScreenLayout from "../../layout/center-screen-layout";

const FullPageLoading = () => {
	return (
		<CenterScreenLayout height="100vh">
			<RiseLoader color="#bebeca" />
		</CenterScreenLayout>
	);
};

export default FullPageLoading;
