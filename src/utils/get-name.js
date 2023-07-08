const getName = (user) => {
	let name = "";

	if (user?.firstName) {
		name += user?.firstName;

		if (user?.lastName) name += " " + user?.lastName;
	} else name += user?.userName || "";

	return name;
};

export default getName;
