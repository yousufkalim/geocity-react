import React, { useState, useEffect } from "react";
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Col,
	Row,
} from "reactstrap";
import "../Theme/css/main.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "../Theme/styles";
import Autocomplete from "react-autocomplete";
import ChipArray from "../shared/Chip";
import SkillChipArray from "../SkillChip";

const ModalExample = (props) => {
	const {
		buttonLabel,
		className,
		formData,
		handleChange,
		getAddress,
		SetAddress,
		setPhoto,
		address,
		onSubmit,
		isLoading,
		addToast,
		CategoryList,
		items,
		skillformData,
		onMaterialChange,
		material,
		handleSkillChange,
		onskillAdd,
		skillFieldList,
		materialList,
		skillList,
		materialArrayData,
		data,
		DefaultImage,
		setmaterialArrayData,
		skillArrayData,
		setskillArrayData,
		errormessage,
	} = props;
	//   useEffect

	//
	const [profilePreview, setProfilePreview] = useState(DefaultImage);
	// console.log(materialArrayData, "material array datA FORM MODAL");
	// console.log(skillArrayData, "skillArrayData array datA FORM MODAL");

	return (
		<div id="Profilemodal">
			<Modal
				isOpen={props.modal}
				toggle={props.toggle}
				className={className}
				// style={{ width: "70%", borderRadius: "4rem" }}
				className="modal-xl"
			>
				<ModalHeader toggle={props.toggle}>Edit Profile</ModalHeader>
				<ModalBody>
					<Form>
						<Row form>
							<Col md={4}>
								<FormGroup>
									<Label for="exampleEmail">User_name*</Label>
									<Input
										type="text"
										name="username"
										id="username"
										value={formData.username}
										placeholder="username"
										onChange={handleChange}
									/>
								</FormGroup>
							</Col>

							<Col md={4}>
								<FormGroup>
									<Label for="exampleEmail">City*</Label>
									<Autocomplete
										items={items}
										// shouldItemRender={(item, value) =>
										//   item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
										// }
										getItemValue={(item) => item.label}
										renderItem={(item, highlighted) => (
											<div
												key={item.id}
												style={{
													backgroundColor: highlighted ? "#eee" : "transparent",
												}}
											>
												{item.label}
											</div>
										)}
										wrapperStyle={{
											display: "block",
										}}
										menuStyle={{
											zIndex: "1",
											position: "static",
											borderRadius: "3px",
											boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
											background: "rgba(255, 255, 255, 0.9)",
											padding: "2px 12px",
											fontSize: "90%",
											color: "#000",
											overflow: "auto",
											maxHeight: "50%",
										}}
										inputProps={{
											className: "form-control",
											placeholder: "Enter City ",
										}}
										value={address}
										name="address"
										onChange={getAddress}
										onSelect={SetAddress}
									/>
								</FormGroup>
							</Col>

							<Col md={4}>
								<FormGroup>
									<Label for="exampleAddress">Phone_number*</Label>
									<Input
										type="text"
										name="phone"
										id="phone"
										value={formData.phone}
										placeholder="phone"
										onChange={handleChange}
									/>
								</FormGroup>
							</Col>
							<Col md={4}>
								<FormGroup>
									<Label for="exampleAddress">Availability*</Label>
									<Input
										type="text"
										name="availability"
										id="availability"
										value={formData.availability}
										placeholder="Availability"
										onChange={handleChange}
									/>
								</FormGroup>
							</Col>
							<Col md={4}>
								<FormGroup>
									<Label for="examplePassword">Profile_picture*</Label>

									<Input
										type="file"
										accept="image/x-png,image/gif,image/jpeg"
										name="profile_picture"
										id="profile_picture"
										onChange={(e) => {
											const file = e.target.files[0];
											const type = e.target.files[0].type;
											if (
												type === "image/jpeg" ||
												type === "image/jpg" ||
												type === "image/png"
											) {
												setPhoto(file);
												setProfilePreview(URL.createObjectURL(file));
											} else {
												addToast(`File should be png/jpg`, {
													appearance: "error",
													autoDismiss: true,
													autoDismissTimeout: 3000,
												});
												setPhoto("");
											}
											// validatePhoto(file);
										}}
									/>
								</FormGroup>
							</Col>

							<Col md={4}>
								<FormGroup>
									<Label for="exampleAddress2">Description</Label>
									<Input
										type="textarea"
										rows={3}
										name="profile_description"
										id="profile_description"
										value={formData.profile_description}
										onChange={handleChange}
										placeholder="Description"
									/>
								</FormGroup>
							</Col>
							{/* <Col md={4}>
                <img
                  className="editproject-image"
                  src={
                    profilePreview
                      ? profilePreview
                      : `http://160.153.249.64:7002/views/uploads/${data.data.profile_picture}`
                  }
                  alt="alternative"
                />
              </Col> */}
						</Row>
						<hr />
						<h5 style={{ fontWeight: "bold" }}>Skills*</h5>
						<Row form className="mt-3">
							<Col md={4}>
								<FormGroup>
									<Label for="exampleAddress">Skill_field*</Label>
									<Input
										name="skillField"
										id="skillField"
										type="select"
										value={skillformData.skillField}
										onChange={handleSkillChange}
									>
										<option value="">Select SkillField</option>

										{skillFieldList
											? skillFieldList.map((skill) => (
													<option value={skill._id}>{skill.skillField}</option>
											  ))
											: ""}
									</Input>
								</FormGroup>
							</Col>

							<Col md={4}>
								<FormGroup>
									<Label for="exampleAddress2">Specialization*</Label>
									<Input
										type="text"
										name="specialization"
										id="specialization"
										value={skillformData.specialization}
										placeholder="Specialization"
										onChange={handleSkillChange}
									/>
								</FormGroup>
							</Col>
							<Col md={4}>
								<FormGroup>
									<Label for="exampleAddress2">Score*</Label>
									<Input
										type="text"
										name="score"
										id="score"
										value={skillformData.score}
										placeholder="Score"
										onChange={handleSkillChange}
									/>
								</FormGroup>
							</Col>
							{skillList.length > 0 ? (
								<Col md={4}>
									<FormGroup>
										<>
											<Label for="exampleAddress">Skills*</Label>

											<Input
												name="skill"
												id="skill"
												type="select"
												value={skillformData.skill}
												onChange={handleSkillChange}
											>
												<option value="">Select Skill</option>

												{skillList.map((skill) => (
													<option value={skill}>{skill}</option>
												))}

												{CategoryList
													? CategoryList.map((cat) => (
															<option value={cat._id} key={cat._id}>
																{cat.name}
															</option>
													  ))
													: ""}
											</Input>
										</>
									</FormGroup>
								</Col>
							) : (
								""
							)}
							<Col md={4}>
								<FormGroup>
									<Label for="exampleAddress">Material*</Label>
									<Input
										type="select"
										name="material"
										id="material"
										value={material}
										onChange={onMaterialChange}
									>
										<option value="">Select Material</option>

										{materialList
											? materialList.map((mat) => (
													<option value={mat._id}>{mat.name}</option>
											  ))
											: ""}
									</Input>
								</FormGroup>
							</Col>
							<Col md={4} className="text-left">
								{skillList.length > 0 ? (
									<button
										type="button"
										onClick={onskillAdd}
										// id="userButton"
										id="modalButton"
										style={{
											marginTop: "1.9rem",
										}}
										className="btn "
									>
										Add
									</button>
								) : (
									<button
										disabled
										type="button"
										style={{
											marginTop: "1.9rem",
											background: "rgba(0, 0, 0, 0.26)",
										}}
										// id="userButton"
										id="modalButton"
										style={{ marginTop: "1.9rem" }}
										className="btn "
									>
										Add
									</button>
								)}
							</Col>
						</Row>
						<Row>
							<Col md={4}>
								{materialArrayData && materialArrayData.length > 0 ? (
									<>
										<Col className="mb-3">Material:</Col>
										<Col>
											<ChipArray
												materialArrayData={
													materialArrayData ? materialArrayData : ""
												}
												setmaterialArrayData={setmaterialArrayData}
												materialList={materialList}
											/>
										</Col>
									</>
								) : (
									""
								)}
							</Col>

							<Col md={4}>
								{skillArrayData && skillArrayData.length > 0 ? (
									<>
										<Col className="mb-3">Skills:</Col>
										<Col>
											<SkillChipArray
												skillArrayData={skillArrayData ? skillArrayData : ""}
												setskillArrayData={setskillArrayData}
												skillFieldList={skillFieldList}
											/>
										</Col>
									</>
								) : (
									""
								)}
							</Col>
						</Row>

						<Col className="mt-5">
							{errormessage !== "" ? (
								<p className="error"> {errormessage}</p>
							) : (
								""
							)}
						</Col>
						<Col className="text-right">
							{isLoading === true ? (
								<center>
									<div className={useStyles.root}>
										<CircularProgress disableShrink />
									</div>
								</center>
							) : (
								<button
									onClick={onSubmit}
									type="button"
									// id="userButton"
									id="modalButton"
									className="btn "
								>
									Submit
								</button>
							)}
						</Col>
					</Form>
				</ModalBody>
				{/* <ModalFooter>
          <Button color="primary" onClick={props.toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter> */}
			</Modal>
		</div>
	);
};

export default ModalExample;
