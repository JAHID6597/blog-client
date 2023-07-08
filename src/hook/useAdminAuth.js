import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPrivateProfile, resetState } from "../features/admin/admin.slice";

const useAdminAuth = () => {
	const {
		admin,
		privateProfile: adminPrivateProfile,
		isLoading,
		isSuccess,
	} = useSelector((state) => state.admin);
	const dispatch = useDispatch();

	useEffect(() => {
		if (admin) {
			dispatch(getPrivateProfile()).then((data) => {
				if (data.error)
					localStorage.removeItem(
						process.env.REACT_APP_AUTH_ADMIN_KEY,
					);
			});
		}

		return () => dispatch(resetState());
	}, [dispatch, admin]);

	return { admin, adminPrivateProfile, isLoading, isSuccess };
};

export default useAdminAuth;
