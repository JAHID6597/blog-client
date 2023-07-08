const getGridItemArr = (data) => {
	const gridItem = [];

	for (let i = 0; i < data.length; i++) {
		if (i * 6 + 2 < data.length) gridItem.push(i * 6 + 1, i * 6 + 2);
		else break;
	}

	return gridItem;
};

export default getGridItemArr;
