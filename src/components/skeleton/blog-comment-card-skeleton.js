import React from "react";
import Comment from "../single-blog-post/main/comment/comment";

const BlogCommentCardSkeleton = ({ skeletonLoading }) => {
	const data = skeletonLoading ? [1] : [1, 2, 3];

	return data.map((d) => <Comment key={d} comment={d} />);
};

export default BlogCommentCardSkeleton;
