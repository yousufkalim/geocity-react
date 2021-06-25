import React from "react";
import DefaultImage from "../Theme/images/8ff2fc404f633816f64064b2a064f4e8436068c4.png";

export default function TableRow({ project, DeleteProject, step }) {
	//   const onDeletContributor = (id) => {
	//     DeletContributor(id);
	//   };
	return (
		<>
			{project.isDeleted === true ? (
				""
			) : (
				<tr className="text-center">
					<td style={{ padding: "0.4rem 0.4rem 0rem 0.4rem" }}>
						<img
							style={{
								width: "45px",
								height: "45px",
								borderRadius: "100%",
								// marginRight: "auto",
								// marginBottom: "0.5rem",
								position: "relative",
								margin: "0 auto",
							}}
							src={
								project.general_photo
									? `http://160.153.249.64:7002/views/uploads/${project.general_photo}`
									: DefaultImage
							}
							alt="alternative"
						/>
					</td>
					<td style={{ padding: "0.4rem 0.4rem 0rem 0.4rem" }}>
						{project.title}
					</td>
					<td style={{ padding: "0.4rem 0.4rem 0rem 0.4rem" }}>
						<span> {project.project_owner.username}</span>
					</td>
					<td style={{ padding: "0.4rem 0.4rem 0rem 0.4rem" }}>{step.name}</td>
					<td style={{ padding: "0.4rem 0.4rem 0rem 0.4rem" }}>
						{step.status}
					</td>
					<td
						style={{ padding: "0.4rem 0.5rem 0rem 0.5rem" }}
						className="text-left"
					>
						<button
							onClick={() => DeleteProject(project._id)}
							type="button"
							id="modalButton1"
							className="btn btn-primary text-white  "
						>
							Delete Project
						</button>
					</td>
				</tr>
			)}
		</>
	);
}
