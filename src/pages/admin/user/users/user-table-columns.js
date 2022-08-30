const userTableColumns = [
	{
		name: "userName",
		label: "User Name",
		options: {
			filter: true,
			sort: true,
		},
	},
	{
		name: "email",
		label: "Email",
		options: {
			filter: true,
			sort: false,
		},
	},
];

export default userTableColumns;
