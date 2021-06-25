import React from "react";

export default function comments({
	comment,
	data,
	DefaultImage,
	DeleteComment,
	ClearOutlinedIcon,
	getUser,
}) {
	return (
		<div className="row text-left" style={{ marginTop: "2rem" }}>
			<div className="text-right" style={{ width: "10%" }}>
				<img
					className="com-image"
					src={
						comment.profile_picture
							? `http://160.153.249.64:7002/views/uploads/${comment.profile_picture}`
							: DefaultImage
					}
					alt="alternative"
				/>
			</div>
			<div className="text-left" style={{ width: "75%" }}>
				<div style={{ marginLeft: "2rem" }}>
					<h5 style={{ fontWeight: "bold" }}>
						{getUser() ? getUser().firstName : ""}
						<small className="ml-2">
							{new Date(comment.date).toString().split(" ")[2]}
							{"/"}
							{new Date(comment.date).getMonth() + 1}
							{"/"}
							{new Date(comment.date).getFullYear()}
						</small>
					</h5>
					<p style={{ opacity: 0.7 }} className="mt-2">
						{comment.comment}
					</p>
				</div>
			</div>
			<div>
				{/* <ClearOutlinedIcon onClick={() => DeleteComment(comment.comment)} /> */}
			</div>
		</div>
	);
}
