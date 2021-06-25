import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import InviteTableRow from "../Components/InviteTableRow";
import PrivateInviteTableRow from "../shared/PrivateInviteTableRow";

import { projectData } from "./Data";
export default function UserTable(props) {
	const { data, addToast, invitationData, setinvitationData } = props;
	// ******
	// Accept invitation from user for collaboration

	const AcceptInviteCollaborator = async (
		setcheckDecision,
		projectId,
		stepId,
		decision,
		invitation
	) => {
		var array = invitationData.filter((com) => com._id !== invitation);
		// console.log(array, "array main");
		setinvitationData(array);
		// alert("sender");
		try {
			const headers = {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			};
			await axios
				.post(
					`http://160.153.249.64:7002/api/v1/project/view-project/invite-collaborator/decison?id=${projectId}`,
					{ step: stepId, decision: decision, invitation: invitation },
					headers
				)
				.then((res) => {
					if (res.data.message) {
						addToast(`${res.data.message}`, {
							appearance: "success",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
					} else {
						addToast(`Success`, {
							appearance: "success",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
					}

					setcheckDecision(true);
				})
				.catch((err) => {
					if (err.res.data.message) {
						addToast(`${err.res.data.message}`, {
							appearance: "error",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
					} else {
						addToast(`Error`, {
							appearance: "error",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
					}

					setcheckDecision(true);
				});
		} catch (error) {
			console.log(error, "error catch");
		}
	};
	// Decline invitation from user for collaboration
	const DeclineInviteCollaborator = async (
		setcheckDecision,
		projectId,
		stepId,
		decision,
		invitation
	) => {
		var array = invitationData.filter((com) => com._id !== invitation);
		// console.log(array, "array main");
		setinvitationData(array);
		try {
			const headers = {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			};
			await axios
				.post(
					`http://160.153.249.64:7002/api/v1/project/view-project/invite-collaborator/decison?id=${projectId}`,
					{ step: stepId, decision: decision, invitation: invitation },
					headers
				)
				.then((res) => {
					if (res.data.message) {
						addToast(`${res.data.message}`, {
							appearance: "success",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
						setcheckDecision(true);
					} else {
						addToast(`Error`, {
							appearance: "success",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
					}
				})
				.catch((err) => {
					if (err.res.data.message) {
						addToast(`${err.res.data.message}`, {
							appearance: "error",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
					} else {
						addToast(`Error`, {
							appearance: "error",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
					}
				});
		} catch (error) {
			console.log(error, "error catch");
		}
	};

	// Accept Request to view private project from a project_owner
	const AcceptRequestToView = async (
		setcheckDecision,
		projectId,
		sender,
		decision,
		invitation
	) => {
		// alert(sender);
		var array = invitationData.filter((com) => com._id !== invitation);
		// console.log(array, "array main");
		setinvitationData(array);
		try {
			const headers = {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			};
			await axios
				.post(
					`http://160.153.249.64:7002/api/v1/project/view-project/requests/decision?id=${projectId}`,
					{ sender: sender, decision: decision, invitation: invitation },
					headers
				)
				.then((res) => {
					if (res.data.message) {
						addToast(`${res.data.message}`, {
							appearance: "success",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
					} else {
						addToast(`Success`, {
							appearance: "success",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
					}

					setcheckDecision(true);
				})
				.catch((err) => {
					if (err.res.data.message) {
						addToast(`${err.res.data.message}`, {
							appearance: "error",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
					} else {
						addToast(`Error`, {
							appearance: "error",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
					}

					setcheckDecision(true);
				});
		} catch (error) {
			console.log(error, "error catch");
		}
	};

	// Decline Request to view private project from a project_owner

	const DeclineRequestToView = async (
		setcheckDecision,
		projectId,
		sender,
		decision,
		invitation
	) => {
		var array = invitationData.filter((com) => com._id !== invitation);
		// console.log(array, "array main");
		setinvitationData(array);
		try {
			const headers = {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			};
			await axios
				.post(
					`http://160.153.249.64:7002/api/v1/project/view-project/requests/decision?id=${projectId}`,
					{ sender: sender, decision: decision, invitation: invitation },
					headers
				)
				.then((res) => {
					if (res.data.message) {
						addToast(`${res.data.message}`, {
							appearance: "success",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
					} else {
						addToast(`Success`, {
							appearance: "success",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
					}

					setcheckDecision(true);
				})
				.catch((err) => {
					if (err.res.data.message) {
						addToast(`${err.res.data.message}`, {
							appearance: "error",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
					} else {
						addToast(`Error`, {
							appearance: "error",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
					}

					setcheckDecision(true);
				});
		} catch (error) {
			console.log(error, "error catch");
		}
	};

	// Accept request from a projectowner to collaborate with us in a project
	const AcceptRequestToCollaborate = async (
		setcheckDecision,
		projectId,
		stepId,
		decision,
		invitation
	) => {
		var array = invitationData.filter((com) => com._id !== invitation);
		// console.log(array, "array main");
		setinvitationData(array);
		try {
			const headers = {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			};
			await axios
				.post(
					`http://160.153.249.64:7002/api/v1/project/view-project/sendInviteToCollaborateByUser/decison?id=${projectId}`,
					{ step: stepId, decision: decision, invitation: invitation },
					headers
				)
				.then((res) => {
					if (res.data.message) {
						addToast(`${res.data.message}`, {
							appearance: "success",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
					} else {
						addToast(`Success`, {
							appearance: "success",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
					}

					setcheckDecision(true);
				})
				.catch((err) => {
					if (err.res.data.message) {
						addToast(`${err.res.data.message}`, {
							appearance: "error",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
					} else {
						addToast(`Error`, {
							appearance: "error",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
					}

					setcheckDecision(true);
				});
		} catch (error) {
			console.log(error, "error catch");
		}
	};

	// Decline request from a projectOwner to collaborate with us in a project
	const DeclineRequestToCollaborate = async (
		setcheckDecision,
		projectId,
		stepId,
		decision,
		invitation
	) => {
		// alert(stepId);
		var array = invitationData.filter((com) => com._id !== invitation);
		// console.log(array, "array main");
		setinvitationData(array);
		try {
			const headers = {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			};
			await axios
				.post(
					`http://160.153.249.64:7002/api/v1/project/view-project/sendInviteToCollaborateByUser/decison?id=${projectId}`,
					{ step: stepId, decision: decision, invitation: invitation },
					headers
				)
				.then((res) => {
					if (res.data.message) {
						addToast(`${res.data.message}`, {
							appearance: "success",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
					} else {
						addToast(`Success`, {
							appearance: "success",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
					}

					setcheckDecision(true);
				})
				.catch((err) => {
					if (err.res.data.message) {
						addToast(`${err.res.data.message}`, {
							appearance: "error",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
					} else {
						addToast(`Error`, {
							appearance: "error",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
					}

					setcheckDecision(true);
				});
		} catch (error) {
			console.log(error, "error catch");
		}
	};
	// *****************

	return (
		<Table bordered className="text-center">
			<thead>
				<tr>
					<th>Date of request</th>
					<th>Sent By</th>
					<th>Invite (For)</th>

					<th>Invite Type</th>
					<th>Project name </th>
					<th>Step name </th>
					<th>Invite status</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{invitationData && invitationData.length > 0 ? (
					invitationData.map((project) =>
						project.type === "inviteProjectOwner" ? (
							<InviteTableRow
								project={project}
								DeclineFunc={DeclineRequestToCollaborate}
								data={data}
								type={project.type}
								AcceptFunc={AcceptRequestToCollaborate}
							/>
						) : project.type === "inviteCollaborator" ? (
							<InviteTableRow
								project={project}
								DeclineFunc={DeclineInviteCollaborator}
								data={data}
								type={project.type}
								AcceptFunc={AcceptInviteCollaborator}
							/>
						) : project.type === "viewProject" ? (
							<PrivateInviteTableRow
								project={project}
								DeclineFunc={DeclineRequestToView}
								data={data}
								type={project.type}
								AcceptFunc={AcceptRequestToView}
							/>
						) : (
							""
						)
					)
				) : (
					<tr>
						<td colSpan={8}>
							<p className="text-dark text-center mt-2">No invitations found</p>
						</td>
					</tr>
				)}
			</tbody>
		</Table>
	);
}
