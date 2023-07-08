import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";

import MetaCard from "../../common/meta-card";
import useWindowSize from "../../../hook/useWindowSize";
import { useSelector } from "react-redux";
import {
	getAvailableItems,
	getCurrentlyHackingItems,
	getCurrentlyLearningItems,
	getOrganizationsData,
	getProfileMetaInfoItems,
	getSkillsAndLanguagesItems,
} from "./getSidebarData";

const LeftSidebar = () => {
	const { publicProfile } = useSelector((state) => state.user);

	const organizations = getOrganizationsData(publicProfile);
	const currentlyLearningItems = getCurrentlyLearningItems(publicProfile);
	const skillsAndLanguagesItems = getSkillsAndLanguagesItems(publicProfile);

	const currentlyHackingItems = getCurrentlyHackingItems(publicProfile);
	const availableItems = getAvailableItems(publicProfile);
	const profileMetaInfoItems = getProfileMetaInfoItems(publicProfile);

	const windowSize = useWindowSize();
	const [activeMoreInfo, setActiveMoreInfo] = useState();

	useEffect(() => {
		setActiveMoreInfo(windowSize.width >= 900);
	}, [windowSize.width]);

	return (
		<Box>
			{activeMoreInfo && (
				<>
					{organizations?.length ? (
						<MetaCard title="Organizations" items={organizations} />
					) : (
						""
					)}

					{currentlyLearningItems?.length ? (
						<MetaCard
							title="Currently learning"
							items={currentlyLearningItems}
						/>
					) : (
						""
					)}

					{skillsAndLanguagesItems?.length ? (
						<MetaCard
							title="Skills/Languages"
							items={skillsAndLanguagesItems}
						/>
					) : (
						""
					)}

					{currentlyHackingItems?.length ? (
						<MetaCard
							title="Currently hacking on"
							items={currentlyHackingItems}
						/>
					) : (
						""
					)}

					{availableItems?.length ? (
						<MetaCard
							title="Available for"
							items={availableItems}
						/>
					) : (
						""
					)}

					{profileMetaInfoItems?.length ? (
						<MetaCard items={profileMetaInfoItems} />
					) : (
						""
					)}
				</>
			)}

			<Button
				color="inherit"
				variant="outlined"
				sx={{ display: { sx: "block", md: "none" } }}
				onClick={() =>
					setActiveMoreInfo((activeMoreInfo) => !activeMoreInfo)
				}
				fullWidth
			>
				{activeMoreInfo ? "Hide" : "More"} info about @Jahid
			</Button>
		</Box>
	);
};

export default LeftSidebar;
