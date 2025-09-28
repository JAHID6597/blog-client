import Loader from "../../components/common/loader";

const options = (
	page,
	setPage,
	limit,
	setLimit,
	setSearch,
	isLoading,
	metaData,
) => {
	return {
		search: false,
		searchAlwaysOpen: true,
		searchPlaceholder: "Search from here",
		selectableRows: "none",
		pagination: true,
		elevation: 1,
		print: false,
		download: false,
		viewColumns: false,
		filter: false,
		responsive: "standard",
		jumpToPage: true,
		page: page - 1,
		count: metaData.total,
		serverSide: true,
		rowsPerPage: limit,
		rowsPerPageOptions: [5, 10, 25, 50, 100],
		onChangePage: (currentPage) => setPage(currentPage + 1),
		onChangeRowsPerPage: (numberOfRows) => {
			setLimit(numberOfRows);
			setPage(1);
		},
		searchProps: { onKeyUp: (e) => setSearch(e.target.value) },
		enableNestedDataAccess: ".",
		textLabels: {
			body: {
				noMatch: isLoading ? (
					<Loader loading={isLoading} />
				) : (
					"Sorry, there is no matching data to display"
				),
			},
		},
	};
};

export default options;
