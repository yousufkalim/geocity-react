import React, { useState, useEffect } from "react";
import { Nav, Row, Col, Tab, Container } from "react-bootstrap";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "../../Components/UI/Theme/styles";
import Autocomplete from "react-autocomplete";
import ChipArray from "../../Components/UI/MaterialChip";
import SkillChipArray from "../../Components/UI/SkillChipCard";
import { useToasts } from "react-toast-notifications";
import { getUser, SignOut } from "../../Auth/Index";
import ListOfInterests from "../../Components/ListOfInterests";
import AddInterestModal from "../../Components/UI/Modals/AddInterestModal";
import LoadedClients from "../../shared/Loaders";
import {
	signupskillRequired,
	editProfileRequired,
	editProfileData,
	signupstepData,
} from "../../shared/Data";
import Header from "../../Components/Header/header";
import axios from "axios";
import UserTable from "../../shared/ProjectsTable";
import InviteTable from "../../shared/InviteTable";
import DropDown from "../../shared/DropdownMenu";
import NotificationMenu from "../../shared/NotificationMenu";
import UserForm from "../../Components/UserForm";
import { useHistory, useParams } from "react-router-dom";

export default function UserDashboard(props) {
	const { notificationsData } = props;
	const history = useHistory();

	const socialLinks = {
		facebook: "",
		instagram: "",
		youtube: "",
	};
	const { addToast } = useToasts();
	// states start ************************************
	const [skillformData, setskillFormData] = useState(signupstepData);
	const [socialformData, setsocialFormData] = useState(socialLinks);

	const [formData, setFormData] = useState(editProfileData);
	const [interest, setInterest] = useState("");

	const [data, setData] = useState({ data: "" });
	const [ProjectdataList, setProjectdataList] = useState([]);
	const [profilemodal, setprofileModal] = useState(false);
	const [address, setAddress] = useState("");
	const [items, setItems] = useState([]);
	const [photo, setPhoto] = useState("");
	const [skillArrayData, setskillArrayData] = useState([]);
	const [materialArrayData, setmaterialArrayData] = useState([]);
	const [aboutRequiredFields, setAboutRequiredFields] =
		useState(editProfileRequired);
	const [interestRequiredFields, setinterestRequiredFields] = useState({
		interest: "",
	});
	const [materialRequiredFields, setmaterialRequiredFields] = useState({
		name: "",
		error: "",
		otherMaterial: "",
	});
	const [skillRequiredFields, setskillRequiredFields] =
		useState(signupskillRequired);
	const [materialList, setMaterialList] = useState("");
	const [skillList, setskillList] = useState("");
	const [material, setMaterial] = useState("");
	const [otherSKill, setotherSkill] = useState("");

	const [skillFieldList, setskillFieldList] = useState("");

	const [isLoading, setisLoading] = useState(false);
	const [CategoryList, setCategoryList] = useState("");
	const [InterestList, setInterestList] = useState("");
	const [addInterestmodal, setaddInterestModal] = useState(false);

	const [key, setKey] = useState("first");
	const [invitationData, setinvitationData] = useState("");
	const [otherMaterial, setotherMaterial] = useState("");

	// functions
	const AddInteresttoggle = () => {
		setInterest("");
		setaddInterestModal(!addInterestmodal);
	};
	const AddinterestSubmit = () => {
		setisLoading(true);
		const check = ValidateInterest();

		if (check == true) {
			const headers = {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			};
			try {
				axios
					.post(
						`http://160.153.249.64:7002/api/v1/profile/create-interest?id=${props.match.params.id}`,
						{ interest: interest },
						headers
					)
					.then((res) => {
						setTimeout(() => {
							setisLoading(false);
						}, 1000);
						addToast("Interest added successfully", {
							appearance: "success",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
						const msg = "";
						setinterestRequiredFields({
							...interestRequiredFields,
							interest: msg,
						});
						setaddInterestModal(!addInterestmodal);
						setInterest("");
						// console.log(res, "res material");
					})
					.catch((err) => {
						setTimeout(() => {
							setisLoading(false);
						}, 1500);
						if (err.response.data) {
							if (err.response.data.message) {
								addToast(`${err.response.data.message}`, {
									appearance: "error",
									autoDismiss: true,
									autoDismissTimeout: 3000,
								});
								const msg = err.response.data.message;
								setinterestRequiredFields({
									...interestRequiredFields,
									interest: msg,
								});
							} else {
								addToast(`${err.response.data}`, {
									appearance: "error",
									autoDismiss: true,
									autoDismissTimeout: 3000,
								});
								const msg = err.response.data;
								setinterestRequiredFields({
									...interestRequiredFields,
									interest: msg,
								});
							}
						}
					});
			} catch (error) {
				setTimeout(() => {
					setisLoading(false);
				}, 1000);
				// console.log(error, "error catch");
			}
		} else {
			setTimeout(() => {
				setisLoading(false);
			}, 1500);
		}
	};
	const DeleteInterest = (id) => {
		setisLoading(true);
		const headers = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
		};
		try {
			axios
				.post(
					`http://160.153.249.64:7002/api/v1/profile/delete-interest?id=${props.match.params.id}`,
					{ interest: id },
					headers
				)
				.then((res) => {
					setTimeout(() => {
						setisLoading(false);
					}, 2000);
					const filter = CategoryList.filter((dt) => dt._id !== id);
					setCategoryList(filter);
					addToast("Interest has been deleted Successfully", {
						appearance: "success",
						autoDismiss: true,
						autoDismissTimeout: 3000,
					});

					// console.log(res, "res material");
				})
				.catch((err) => {
					setTimeout(() => {
						setisLoading(false);
					}, 1000);
					if (err.response.data) {
						if (err.response.data.message) {
							addToast(`${err.response.data.message}`, {
								appearance: "error",
								autoDismiss: true,
								autoDismissTimeout: 3000,
							});
						} else {
							addToast(`${err.response.data}`, {
								appearance: "error",
								autoDismiss: true,
								autoDismissTimeout: 3000,
							});
						}
					}
				});
		} catch (error) {
			setTimeout(() => {
				setisLoading(false);
			}, 1000);
			// console.log(error, "error catch");
		}
	};

	const handleSocialChange = (e) => {
		setsocialFormData({ ...socialformData, [e.target.name]: e.target.value });
	};
	const getAddress = (e) => {
		setAddress(e.target.value);
		fetch(
			"https://api-adresse.data.gouv.fr/search/?q=" +
				e.target.value +
				"&type=housenumber&autocomplete=1&limit=10"
		)
			.then((response) => response.json())
			.then((responseJson) => {
				// const msg = "";
				// setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
				// console.log("res address", responseJson);
				var addressToSet = [];
				// ""
				for (var i = 0; i < responseJson.features.length; i++) {
					addressToSet.push({
						id: i,
						label: responseJson.features[i].properties.label,
						city: responseJson.features[i].properties.city,
						PostalCode: responseJson.features[i].properties.postcode,
						lat: responseJson.features[0].geometry.coordinates[1],
						lng: responseJson.features[0].geometry.coordinates[0],
					});
				}
				if (addressToSet.length === responseJson.features.length) {
					// setFormData({ ...formData,items:addressToSet })
					setItems(addressToSet);
				}
			})
			.catch((error) => {
				const msg = "Required";
				// setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
				// console.error(error);
			});
	};

	const SetAddress = (item) => {
		// console.log(item,'item')
		setAddress(item);
		// this.setState({ address: item });
		for (let i = 0; i < items.length; i++) {
			if (items[i].label === item) {
				// ""
				var city = items[i].city;
				var zipCode = items[i].PostalCode;
				var lat = items[i].lat.toString();
				var lng = items[i].lng.toString();
				var newAddress = items[i].label.split(String(zipCode));
				setFormData({
					address: newAddress[0],
					zipCode: zipCode,
					city: city,
					latitude: lat,
					longitude: lng,
					email: formData.email,
					password: formData.password,
					confirm_password: formData.confirm_password,
					availability: formData.availability,
				});
			}
		}
		// validateCity();
	};

	// *** skill end

	// validation
	const ValidateInterest = () => {
		if (!interest) {
			const msg = "Required";
			setinterestRequiredFields({ ...interestRequiredFields, interest: msg });
			return false;
		} else if (interest.length < 3) {
			const msg = "interest needs to be more than 3 characters long";
			setinterestRequiredFields({ ...interestRequiredFields, interest: msg });
			return false;
		} else {
			const msg = "";
			setinterestRequiredFields({ ...interestRequiredFields, interest: msg });
			return true;
		}
	};
	const validatePhoneNumber = () => {
		if (!formData.phone) {
			const msg = "Required";
			setAboutRequiredFields({ ...aboutRequiredFields, phone: msg });
			return false;
		} else if (formData.phone.length < 10 || formData.phone.length > 10) {
			const msg = "Phone number needs to be equal to 10 characters long";
			setAboutRequiredFields({ ...aboutRequiredFields, phone: msg });
			return false;
		} else {
			const msg = "";
			setAboutRequiredFields({ ...aboutRequiredFields, phone: msg });
			return true;
		}
	};

	const validateEmail = () => {
		const isValid =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-z]+)*$/.test(
				formData.email
			);
		if (!formData.email) {
			const msg = "Required";
			setAboutRequiredFields({ ...aboutRequiredFields, email: msg });
			return false;
		} else if (formData.email) {
			if (formData.email && !isValid) {
				const msg = "You have entered an invalid email address!";
				setAboutRequiredFields({ ...aboutRequiredFields, email: msg });
				return false;
			}
			setAboutRequiredFields({ ...aboutRequiredFields, email: "" });
			return true;
		}
	};
	const validateAvailability = () => {
		if (!formData.availability) {
			const msg = "Required";
			setAboutRequiredFields({ ...aboutRequiredFields, availability: msg });
			return false;
		} else {
			const msg = "";
			setAboutRequiredFields({ ...aboutRequiredFields, availability: msg });
			return true;
		}
	};
	const ValidateSkillField = () => {
		// alert(skillformData.skillField);
		if (skillformData.skillField) {
			const msg = "";
			setskillRequiredFields({ ...skillRequiredFields, skillField: msg });
			return true;
		} else if (!skillformData.skillField) {
			const msg = "Required";
			setskillRequiredFields({ ...skillRequiredFields, skillField: msg });
			return false;
		}
	};

	const ValidateSkill = () => {
		if (skillformData.skill) {
			const msg = "";
			setskillRequiredFields({ ...skillRequiredFields, skill: msg });
			return true;
		} else if (!skillformData.skill) {
			const msg = "Required";
			setskillRequiredFields({ ...skillRequiredFields, skill: msg });
			return false;
		}
	};
	const ValidateOtherSkill = () => {
		if (otherSKill) {
			const msg = "";
			setskillRequiredFields({ ...skillRequiredFields, otherSKill: msg });
			return true;
		} else if (!otherSKill) {
			const msg = "Required";
			setskillRequiredFields({ ...skillRequiredFields, otherSKill: msg });
			return false;
		}
	};

	const validateProfileDesc = () => {
		if (!formData.profile_description) {
			const msg = "Required";
			setAboutRequiredFields({
				...aboutRequiredFields,
				profile_description: msg,
			});
			return false;
		} else if (formData.profile_description.length < 10) {
			const msg =
				"Profile Description  needs to be atleast  10 characters long";
			setAboutRequiredFields({
				...aboutRequiredFields,
				profile_description: msg,
			});
			return false;
		} else {
			const msg = "";
			setAboutRequiredFields({
				...aboutRequiredFields,
				profile_description: msg,
			});
			return true;
		}
	};
	const validateFirstName = () => {
		if (!formData.firstname || formData.firstname == "") {
			const msg = "Required";
			setAboutRequiredFields({ ...aboutRequiredFields, firstname: msg });
			return false;
		} else {
			const msg = "";
			setAboutRequiredFields({ ...aboutRequiredFields, firstname: msg });
			return true;
		}
	};
	const validateLastName = () => {
		if (!formData.lastname || formData.lastname === "") {
			const msg = "Required";
			setAboutRequiredFields({ ...aboutRequiredFields, lastname: msg });
			return false;
		} else {
			const msg = "";
			setAboutRequiredFields({ ...aboutRequiredFields, lastname: msg });
			return true;
		}
	};

	const validateScore = () => {
		// ""
		// alert(skillformData.score);
		// console.log(skillformData.score);
		if (!skillformData.score) {
			const msg = "Required";
			setskillRequiredFields({ ...skillRequiredFields, score: msg });
			return false;
		} else {
			const msg = "";
			setskillRequiredFields({ ...skillRequiredFields, score: msg });
			return true;
		}
	};

	const validateCity = () => {
		// ""
		if (address === "") {
			let msg = "Required";
			setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
			return false;
		} else {
			const msg = "";
			setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
			return true;
		}
	};
	const validateMaterial = () => {
		if (!material) {
			let msg = "Required";
			setmaterialRequiredFields({
				...materialRequiredFields,
				name: msg,
				error: "",
			});
			return false;
		} else {
			let msg = "";
			setmaterialRequiredFields({ ...materialRequiredFields, name: msg });

			return true;
		}
	};
	const validatePassword = () => {
		if (!formData.password.length) {
			const msg = "Required";
			setAboutRequiredFields({ ...aboutRequiredFields, password: msg });
			return false;
		} else if (formData.password.length < 6) {
			const msg = "Passowrd needs to be at least 6 characters";
			setAboutRequiredFields({ ...aboutRequiredFields, password: msg });

			return false;
		} else {
			setAboutRequiredFields({ ...aboutRequiredFields, password: "" });
			setFormData({ ...formData, password: formData.password });
			return true;
		}
	};
	const validateConfirmPassword = () => {
		// ""
		if (!formData.confirm_password.length) {
			const msg = "Required";
			setAboutRequiredFields({ ...aboutRequiredFields, confirm_password: msg });
			return false;
		} else if (formData.confirm_password !== formData.password) {
			const msg = "Confirm_Password should be same as Password";
			setAboutRequiredFields({
				...aboutRequiredFields,
				confirm_password: msg,
			});
			return false;
		} else if (formData.confirm_password.length < 6) {
			const msg = "Confirm_Password needs to be at least 6 characters";
			setAboutRequiredFields({ ...aboutRequiredFields, confirm_password: msg });
			return false;
		} else {
			setAboutRequiredFields({ ...aboutRequiredFields, confirm_password: "" });
			setFormData({ ...formData, confirm_password: formData.confirm_password });
			return true;
		}
	};

	// *
	const checkValidateForm = () => {
		let obj = {};
		let reqFields = true;

		Object.keys(formData).map((key) => {
			const hasKey = aboutRequiredFields.hasOwnProperty([key]);

			if (hasKey && formData[key] === "") {
				obj[key] = "Required";
				reqFields = false;
			}
			return obj;
		});
		if (
			!reqFields
			// !vfn ||
			// !vln ||
			// !vun ||
			// !ve ||
			// !vp ||
			// !vcp ||
			// !vcity ||
			// !vphone ||
			// !vavail ||
			// !vpd
		) {
			setAboutRequiredFields(obj);

			// setmaterialArrayData((prevState) => [...prevState, material]);
			return false;
		} else {
			setAboutRequiredFields(editProfileRequired);
			return true;
		}
	};
	const checkValidateForm2 = () => {
		let obj = {};
		let reqFields = true;

		Object.keys(skillformData).map((key) => {
			if (skillformData[key] === "") {
				if (key === "specialization") {
					obj[key] = "";
				} else {
					obj[key] = "Required";
					reqFields = false;
				}
			}
			return obj;
		});
		if (!reqFields) {
			const msg = "Required";
			if (otherSKill !== "") {
				obj.skill = "";
				// setskillRequiredFields((prevState) => {
				//   Object.assign(skillRequiredFields, obj);
				// });
				setskillRequiredFields(obj);
				return false;
			} else {
				obj.otherSKill = "Required";
				setskillRequiredFields(obj);
				return false;
			}
		} else {
			setskillRequiredFields(signupskillRequired);
			return true;
		}
	};

	// ***************
	const onMaterialAdd = () => {
		validateMaterial();
		// ""
		if (materialArrayData.length > 0) {
			const tempCheck = materialArrayData.find((cont) => cont === material);

			if (tempCheck) {
				addToast("Material already existed", {
					appearance: "error",
					autoDismiss: true,
					autoDismissTimeout: 3000,
				});
				setMaterial("");
			} else {
				var array = materialArrayData.filter((mat) => mat !== material);

				if (material) {
					array.push(material);
				}
				setmaterialArrayData(array);
				// setMaterial("");
				const msg = "";
				setmaterialRequiredFields({
					...materialRequiredFields,
					error: msg,
				});
				setMaterial("");
			}
		} else {
			if (material) {
				setmaterialArrayData((prevState) => [...prevState, material]);
				setMaterial("");
			}
		}
	};
	const ValidateOtherMaterial = () => {
		if (!otherMaterial) {
			const msg = "Required";
			setmaterialRequiredFields({
				...materialRequiredFields,
				otherMaterial: msg,
			});
			return false;
		} else {
			const msg = "";
			setmaterialRequiredFields({
				...materialRequiredFields,
				otherMaterial: msg,
			});
			return true;
		}
	};
	const onskillAdd = () => {
		checkValidateForm2();

		// validateScore();
		if (skillArrayData.length > 0) {
			const tempCheck = skillArrayData.find(
				(cont) => cont.skillField === skillformData.skillField
			);
			const tempCheck2 = skillArrayData.find(
				(cont) => cont.skill === skillformData.skill
			);
			if (tempCheck && tempCheck2) {
				const msg = "Skill already existed";
				addToast("Skill already existed", {
					appearance: "error",
					autoDismiss: true,
					autoDismissTimeout: 3000,
				});
			} else {
				if (otherSKill !== "") {
					skillformData.skill = otherSKill;
				}
				// ""
				const check = Object.values(skillformData).map((obj) => {
					if (obj !== "") {
						return true;
					} else {
						return false;
					}
				});
				if (check[0] === true && check[1] === true) {
					if (skillArrayData.length === 5) {
						// alert(skillArrayData.length);
						addToast("skills length must be 1 or less than equal to 5", {
							appearance: "error",
							autoDismiss: true,
							autoDismissTimeout: 3000,
						});
						// seterrorMessage("You can only add upto 3 skills  or less");
					} else {
						if (skillformData.skill === "Other") {
							if (otherSKill !== "") {
								skillformData.skill = otherSKill;

								setskillArrayData([...skillArrayData, skillformData]);
								setskillFormData(signupstepData);
								setskillRequiredFields(signupskillRequired);
								setotherSkill("");
							} else {
								ValidateOtherSkill();
							}
						} else {
							setskillArrayData([...skillArrayData, skillformData]);
							setskillFormData(signupstepData);
							setskillRequiredFields(signupskillRequired);
						}
					}
				}
			}
		} else {
			// ""
			const check = Object.values(skillformData).map((obj) => {
				if (obj !== "") {
					return true;
				} else {
					return false;
				}
			});
			if (check[0] === true && check[1] === true) {
				if (skillArrayData.length === 5) {
					// alert(skillArrayData.length);
					addToast("skills length must be 1 or less than equal to 5", {
						appearance: "error",
						autoDismiss: true,
						autoDismissTimeout: 3000,
					});
					// seterrorMessage("You can only add upto 3 skills  or less");
				} else {
					// if (otherSKill !== "") {
					//   skillformData.skill = otherSKill;
					// }
					if (skillformData.skill === "Other") {
						if (otherSKill !== "") {
							skillformData.skill = otherSKill;

							setskillArrayData([...skillArrayData, skillformData]);
							setskillFormData(signupstepData);
							setskillRequiredFields(signupskillRequired);
							setotherSkill("");
						} else {
							ValidateOtherSkill();
						}
					} else {
						setskillArrayData([...skillArrayData, skillformData]);
						setskillFormData(signupstepData);
						setskillRequiredFields(signupskillRequired);
					}
				}
			}
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		checkValidateForm();
		if (skillArrayData.length == 0) {
			addToast(`You must add atleast one skill`, {
				appearance: "error",
				autoDismiss: true,
				autoDismissTimeout: 3000,
			});
		} else if (materialArrayData.length == 0) {
			validateMaterial();
			addToast(`You must add atleast one material`, {
				appearance: "error",
				autoDismiss: true,
				autoDismissTimeout: 3000,
			});
		} else {
			const newFormData = new FormData();

			setisLoading(true);

			newFormData.append("firstName", formData.firstname);
			newFormData.append("lastName", formData.lastname);

			newFormData.append("availability", formData.availability);
			newFormData.append("city", formData.city);
			// newFormData.append("email", formData.email);
			newFormData.append("latitude", formData.latitude);
			newFormData.append("longitude", formData.longitude);
			newFormData.append("phone", formData.phone);
			newFormData.append("profile_description", formData.profile_description);
			newFormData.append("profile_picture", photo);
			newFormData.append("zipCode", formData.zipCode);

			newFormData.append("facebook", socialformData.facebook);
			newFormData.append("instagram", socialformData.instagram);
			newFormData.append("youtube", socialformData.youtube);
			if (skillArrayData.length > 0 && materialArrayData.length > 0) {
				newFormData.append("skills", JSON.stringify(skillArrayData));
				newFormData.append("material", JSON.stringify(materialArrayData));
			} else {
				newFormData.append("skills", JSON.stringify(formData.skills));
				newFormData.append("material", JSON.stringify(formData.material));
			}

			try {
				const headers = {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("jwt")}`,
					},
				};
				await axios
					.post(
						`http://160.153.249.64:7002/api/v1/profile/editProfile?id=${props.match.params.id}`,
						newFormData,
						headers
					)
					.then((response) => {
						setTimeout(() => {
							setisLoading(false);
						}, 1000);
						localStorage.setItem("user", JSON.stringify(response.data.user));
						// setprofileModal(false);
						history.push(`/profile/${getUser()._id}`);
						if (response.data) {
							if (response.data.message) {
								addToast(`${response.data.message}`, {
									appearance: "success",
									autoDismiss: true,
									autoDismissTimeout: 3000,
								});
							} else {
								addToast(`${response.data}`, {
									appearance: "success",
									autoDismiss: true,
									autoDismissTimeout: 3000,
								});
							}
						}

						// console.log(res,"res")
					})
					.catch((err) => {
						setTimeout(() => {
							setisLoading(false);
						}, 1000);

						if (err.response.data) {
							if (err.response.data.message) {
								addToast(`${err.response.data.message}`, {
									appearance: "error",
									autoDismiss: true,
									autoDismissTimeout: 3000,
								});
							} else {
								addToast(`${err.response.data}`, {
									appearance: "error",
									autoDismiss: true,
									autoDismissTimeout: 3000,
								});
							}
						}
						// console.log(" error =>", err);
					});
			} catch (error) {
				console.log(error, "error catch");
				setTimeout(() => {
					setisLoading(false);
				}, 1000);
			}
		}
	};
	const handleInterestChange = (e) => {
		setInterest(e.target.value);
	};
	const handleChange = (e) => {
		if (e.target.name === "phone") {
			if (e.target.value.length <= 10) {
				setFormData({
					...formData,
					[e.target.name]: e.target.value.replace(/\D/g, ""),
				});
			}

			// }
		} else if (e.target.name === "availability") {
			const avail = e.target.value.replace(/\D/g, "");
			if (e.target.value <= 168) {
				if (avail !== "") {
					if (avail.length <= 3 && avail < 169) {
						setFormData({
							...formData,
							[e.target.name]: avail,
						});
					}
				} else {
					if (e.target.value) {
						setFormData({
							...formData,
							[e.target.name]: e.target.value.replace(/\D/g, ""),
						});
					} else {
						setFormData({
							...formData,
							[e.target.name]: "",
						});
					}
				}
				const msg = "";
				setAboutRequiredFields({ ...aboutRequiredFields, availability: msg });
			} else {
				const msg = "Availibilty must be less than equal to 168";
				setAboutRequiredFields({ ...aboutRequiredFields, availability: msg });
			}
		} else {
			setFormData({ ...formData, [e.target.name]: e.target.value });
		}
	};
	const handleSkillChange = (e) => {
		let value = e.target.value;
		if (skillArrayData.length === 5) {
			// alert(skillArrayData.length);
			addToast("skills length must be 1 or less than equal to 5", {
				appearance: "error",
				autoDismiss: true,
				autoDismissTimeout: 3000,
			});
			// seterrorMessage("You can only add upto 3 skills  or less");
		} else {
			if (e.target.name === "skillField") {
				setskillFormData({ ...skillformData, [e.target.name]: value });

				skillFieldList.map((skill) =>
					skill._id === e.target.value ? setskillList(skill.skill) : ""
				);
			} else if (e.target.name === "score") {
				// var avail = e.target.value.replace(/\D/g, "");
				// if (e.target.value <= 5) {
				//   if (avail !== "") {
				//     if (avail.length >= 2 && e.target.value >= 5) {
				//     } else {
				//       setskillFormData({
				//         ...skillformData,
				//         [e.target.name]: avail,
				//       });
				//     }
				//   } else {
				//     if (e.target.value) {
				//       setskillFormData({
				//         ...skillformData,
				//         [e.target.name]: e.target.value.replace(/\D/g, ""),
				//       });
				//     } else {
				//       setskillFormData({
				//         ...skillformData,
				//         [e.target.name]: "",
				//       });
				//     }
				//   }
				//   const msg = "";
				//   setskillRequiredFields({ ...skillRequiredFields, score: msg });
				// } else {
				//   const msg = "Rating must be less than equal to 5";
				//   setskillRequiredFields({ ...skillRequiredFields, score: msg });
				// }
				setskillFormData({ ...skillformData, [e.target.name]: value });
			} else {
				setskillFormData({ ...skillformData, [e.target.name]: value });
			}
		}
	};
	const onMaterialChange = (e) => {
		setMaterial(e.target.value);
		if (e.target.value !== "") {
			const msg = "";
			setmaterialRequiredFields({
				...materialRequiredFields,
				name: msg,
			});
		}
	};
	// *******************

	// useEffect

	useEffect(() => {
		const headers = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
		};
		try {
			axios
				.get("http://160.153.249.64:7002/api/v1/auth/materialList")
				.then((res) => {
					setMaterialList(res.data.materials);
					// console.log(res, "res material");
				})
				.catch((err) => console.log(" error =>", err));
		} catch (error) {
			// console.log(error, "error catch");
		}

		try {
			axios
				.get("http://160.153.249.64:7002/api/v1/auth/skillList")
				.then((res) => {
					setskillFieldList(res.data.skills);
					// console.log(res, "res skill");
				})
				.catch((err) => console.log(" error =>", err));
		} catch (error) {
			// console.log(error, "error catch");
		}
		try {
			axios
				.get("http://160.153.249.64:7002/api/v1/auth/categoryList")
				.then((res) => {
					setCategoryList(res.data.category);
					// console.log(res, "response category");
				})
				.catch((err) => console.log(" error category =>", err));
		} catch (error) {
			// console.log(error, "error catch");
		}
		try {
			axios
				.get(
					`http://160.153.249.64:7002/api/v1/profile/all-interest?id=${props.match.params.id}`
				)
				.then((res) => {
					setInterestList(res.data.interests[0].interests);
					console.log(res, "response interest");
				})
				.catch((err) => console.log(" error interest =>", err));
		} catch (error) {
			// console.log(error, "error catch");
		}

		try {
			axios
				.get("http://160.153.249.64:7002/api/v1/profile/myProjects", headers)
				.then((res) => {
					setProjectdataList(res.data.ownedProjects);
					// console.log(res.data, "res owened projects");
				})
				.catch((err) => {
					console.log(" error projects =>", err);
				});
		} catch (error) {
			// console.log(error, "error catch");
		}
	}, [key]);
	useEffect(() => {
		fecthEditProfile();
	}, [key]);
	const fecthEditProfile = async () => {
		const headers = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
		};
		await axios
			.get(
				`http://160.153.249.64:7002/api/v1/profile/view-profile?id=${props.match.params.id}`,
				headers
			)
			.then((res) => {
				// const obj = { ...res.data };

				setData({ ["data"]: res.data.user });
				setinvitationData(res.data.user.invitation);
				UserData(res.data.user);
				// console.log(res.data, "res data user");
			})
			.catch((err) => {
				// console.log(" error =>", err);
			});
	};
	const UserData = (data) => {
		const tempskillArray = [];
		// skills
		// let skillData = "";
		// let tempSkills=""
		data.skills.map((skill, i) => {
			let skillData = skill.skillField._id;
			let skillsObj = skill;
			let tempSkills = { ...skillsObj };
			tempSkills.score = skill.score.toString();
			tempSkills.skillField = skillData;
			delete tempSkills.recommendedBy;
			delete tempSkills._id;
			tempskillArray.push(tempSkills);
		});
		delete data.email;
		// material

		const materialArray = [];
		var tempMaterial = data.material;
		tempMaterial.map((mat) => {
			materialArray.push(mat._id);
		});
		tempMaterial = materialArray;

		// *****

		// **************
		const projectData = {
			firstname: data.firstName ? data.firstName : "",
			lastname: data.lastName ? data.lastName : "",
			// email: data.email,
			city: data.city,
			zipCode: data.zipCode,
			latitude: data.latitude,
			longitude: data.longitude,
			phone: data.phone,

			availability: data.availability,
			profile_description: data.profile_description,
			skills: tempskillArray,
			material: tempMaterial,
		};
		const socialData = {
			facebook: data.facebook,
			instagram: data.instagram,
			youtube: data.youtube,
		};
		setPhoto(data.profile_picture);
		// console.log(projectData.socialLinks, "project data");
		// projectData.socialLinks = socialData;
		setmaterialArrayData(tempMaterial);
		setskillArrayData(tempskillArray);

		// setPhoto(data.profile_picture);
		setAddress(data.city);
		setFormData({ ...projectData });
		setsocialFormData({ ...socialData });
	};
	// console.log(formData, "fomrdata sanksajh");
	// console.log(photo, "fomrdata photo");
	if (data) {
		return (
			<div>
				<AddInterestModal
					modal={addInterestmodal}
					toggle={AddInteresttoggle}
					isLoading={isLoading}
					handleInterestChange={handleInterestChange}
					interest={interest}
					CategoryList={CategoryList}
					interestRequiredFields={interestRequiredFields}
					ValidateInterest={ValidateInterest}
					AddinterestSubmit={AddinterestSubmit}
				/>
				<Header notificationsData={notificationsData} />
				<div id="services" className="cards-1">
					<div className="container">
						<div className="row">
							<div className="col-lg-12">
								<h2>User Dashboard</h2>
								{/* <p class="p-heading p-large">We serve small and medium sized companies in all tech related industries with high quality growth services which are presented below</p> */}
							</div>{" "}
							<div className="container">
								{" "}
								<div className="col-lg-12 text-right ">
									{key == "fourth" ? (
										<button
											onClick={AddInteresttoggle}
											type="button"
											id="modalButton1"
											className="btn btn-primary text-white"
										>
											Add Interest
										</button>
									) : (
										""
									)}
								</div>
							</div>
							<Container className="mt-4 userdashboard text-left">
								<Tab.Container
									id="left-tabs-example"
									defaultActiveKey="first"
									activeKey={key}
									onSelect={(k) => setKey(k)}
								>
									<Row>
										<Col
											sm={12}
											md={12}
											lg={3}
											style={{ marginBottom: "1rem" }}
										>
											<Nav variant="pills" className="flex-column">
												<Nav.Item>
													<Nav.Link eventKey="first">
														General information
													</Nav.Link>
												</Nav.Item>
												<Nav.Item>
													<Nav.Link eventKey="second"> Projects </Nav.Link>
												</Nav.Item>
												<Nav.Item>
													<Nav.Link eventKey="third">
														{" "}
														Invite Requests{" "}
													</Nav.Link>
												</Nav.Item>
												<Nav.Item>
													<Nav.Link eventKey="fourth"> Interests </Nav.Link>
												</Nav.Item>
											</Nav>
										</Col>
										<Col sm={12} md={12} lg={9}>
											<Tab.Content>
												<Tab.Pane eventKey="first">
													<UserForm
														setmaterialArrayData={setmaterialArrayData}
														setskillArrayData={setskillArrayData}
														onSubmit={onSubmit}
														formData={formData}
														skillformData={skillformData}
														handleSkillChange={handleSkillChange}
														skillArrayData={skillArrayData}
														materialArrayData={materialArrayData}
														handleChange={handleChange}
														handleSocialChange={handleSocialChange}
														socialformData={socialformData}
														SetAddress={SetAddress}
														getAddress={getAddress}
														items={items}
														skillList={skillList}
														skillFieldList={skillFieldList}
														materialList={materialList}
														Form={Form}
														Row={Row}
														Col={Col}
														addToast={addToast}
														FormGroup={FormGroup}
														Input={Input}
														Label={Label}
														Autocomplete={Autocomplete}
														setPhoto={setPhoto}
														CategoryList={CategoryList}
														material={material}
														onMaterialChange={onMaterialChange}
														onskillAdd={onskillAdd}
														onMaterialAdd={onMaterialAdd}
														address={address}
														ChipArray={ChipArray}
														SkillChipArray={SkillChipArray}
														isLoading={isLoading}
														useStyles={useStyles}
														CircularProgress={CircularProgress}
														//
														skillRequiredFields={skillRequiredFields}
														aboutRequiredFields={aboutRequiredFields}
														materialRequiredFields={materialRequiredFields}
														validateAvailability={validateAvailability}
														validateConfirmPassword={validateConfirmPassword}
														validateEmail={validateEmail}
														validatePassword={validatePassword}
														validatePhoneNumber={validatePhoneNumber}
														validateProfileDesc={validateProfileDesc}
														validateScore={validateScore}
														ValidateSkillField={ValidateSkillField}
														ValidateSkill={ValidateSkill}
														validateFirstName={validateFirstName}
														validateLastName={validateLastName}
														ValidateOtherSkill={ValidateOtherSkill}
														validateMaterial={validateMaterial}
														validateCity={validateCity}
														//
														otherSKill={otherSKill}
														setotherSkill={setotherSkill}
													/>
												</Tab.Pane>
												<Tab.Pane eventKey="second">
													{Object.keys(data) ? (
														<div>
															<UserTable
																data={data}
																addToast={addToast}
																materialList={materialList}
																skillFieldList={skillFieldList}
															/>
														</div>
													) : (
														""
													)}
												</Tab.Pane>
												<Tab.Pane eventKey="third">
													{Object.keys(data) ? (
														<div>
															<InviteTable
																data={data}
																addToast={addToast}
																invitationData={invitationData}
																setinvitationData={setinvitationData}
															/>
														</div>
													) : (
														""
													)}
												</Tab.Pane>
												<Tab.Pane eventKey="fourth">
													<ListOfInterests
														addToast={addToast}
														InterestList={InterestList}
														DeleteInterest={DeleteInterest}
														CategoryList={CategoryList}

														// EditCategoryToggle={EditCategoryToggle}
													/>
												</Tab.Pane>
											</Tab.Content>
										</Col>
									</Row>
								</Tab.Container>
							</Container>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return <LoadedClients />;
	}
}
