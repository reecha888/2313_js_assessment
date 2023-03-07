import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useRef, useState } from "react";
import useInput from "../../hooks/use-input";
import { Input } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import {
  Container,
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  TextField,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
// import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import FormLabel from "@mui/material/FormLabel";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useEffect } from "react";
import { Country, State, City } from "country-state-city";
import MuiPhoneNumber from "material-ui-phone-number";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

import { useMediaQuery } from "react-responsive";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const EmailRegEx = new RegExp(
  /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/
);

const nameValidation = (value) => value.trim().length !== 0;
const emailValidation = (value) => EmailRegEx.test(value);
const passwordValidation = (value) => value.length > 6;

const PatientForm = (props) => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gurdianFisrtName, setGurdianFirstName] = useState("");
  const [gurdianLastName, setGurdianLastName] = useState("");
  const [primaryReason, setPrimaryReason] = useState("");
  const [currentMedication, setCurrentMedication] = useState("");
  const [allergies, setAllergies] = useState("");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [allStates, setAllStates] = useState([]);
  const [radioValue, setRadioValue] = React.useState("Any");
  const [startDate, setStartDate] = useState("");
  const [valError, setError] = useState("");
  const [isDisableRadio, setIsDisableRadio] = useState(true);
  const {
    ref: firstNameRef,
    value: ffFirstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: firstNameResetHandler,
  } = useInput(nameValidation);
  const {
    ref: lastNameref,
    value: llastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: lastNameResetHandler,
  } = useInput(nameValidation);
  const {
    ref: gurdianFirstNameRef,
    value: ggurdianFisrtName,
    isValid: gurdianFirstNameIsValid,
    hasError: gurdianFirstNameHasError,
    valueChangeHandler: gurdianFirstNameChangeHandler,
    inputBlurHandler: gurdianFirstNameBlurHandler,
    reset: gurdianFirstNameResetHandler,
  } = useInput(nameValidation);
  const {
    ref: gurdianLastNameRef,
    value: ggurdianLastName,
    isValid: gurdianLastNameIsValid,
    hasError: gurdianLastNameHasError,
    valueChangeHandler: gurdianLastNameChangeHandler,
    inputBlurHandler: gurdianLastNameBlurHandler,
    reset: gurdianLastNameResetHandler,
  } = useInput(nameValidation);
  const {
    ref: primaryReasonRef,
    value: pprimaryReason,
    isValid: primaryReasonIsValid,
    hasError: primaryReasonHasError,
    valueChangeHandler: primaryReasonChangeHandler,
    inputBlurHandler: primaryReasonBlurHandler,
    reset: primaryReasonResetHandler,
  } = useInput(nameValidation);
  const {
    ref: currentMedicationRef,
    value: ccurrentMedication,
    isValid: currentMedicationIsValid,
    hasError: currentMedicationHasError,
    valueChangeHandler: currentMedicationChangeHandler,
    inputBlurHandler: currentMedicationBlurHandler,
    reset: currentMedicationResetHandler,
  } = useInput(nameValidation);
  const {
    ref: allergiesRef,
    value: aallergies,
    isValid: allergiesIsValid,
    hasError: allergiesHasError,
    valueChangeHandler: allergiesChangeHandler,
    inputBlurHandler: allergiesBlurHandler,
    reset: allergiesResetHandler,
  } = useInput(nameValidation);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!firstNameIsValid) {
      setError("Enter valid your first name.");
    } else if (!lastNameIsValid) {
      setError("Enter valid your last name.");
    } else if (startDate === "") {
      setError("Enter valid your Date of birth.");
    } else if (radioValue === "Any") {
      setError("Please select valid option of above 18.");
    } else if (!gurdianFirstNameIsValid) {
      setError("Please enter your gurdians first name.");
    } else if (!gurdianLastNameIsValid) {
      setError("Please enter your gurdians last name.");
    } else if (!primaryReasonIsValid) {
      setError("Please enter your visit reason.");
    } else if (!currentMedicationIsValid) {
      setError("Please enter your current medication.");
    } else if (!allergiesIsValid) {
      setError("Please enter allergies that you have.");
    } else if (selectedState === "") {
      setError("Please select the state from you are belongs.");
    } else if (phoneNumber === "") {
      setError("Please enter your phone number.");
    } else {
      setError("");
      let map = {
        firstName: "",
        lastName: "",
        DOB: "",
        above18: false,
        gurdianFirstName: "",
        gurdianLastName: "",
        primaryReason: "",
        currentMedication: "",
        allergies: "",
        state: "",
        phoneNumber: "",
        uploadedFiles: "",
      };
      map["firstName"] = firstName;
      map["lastName"] = lastName;
      map["DOB"] = startDate;
      map["above18"] = radioValue;
      map["gurdianFirstName"] = gurdianFisrtName;
      map["gurdianLastName"] = gurdianLastName;
      map["primaryReason"] = primaryReason;
      map["currentMedication"] = currentMedication;
      map["allergies"] = allergies;
      map["state"] = selectedState;
      map["phoneNumber"] = phoneNumber;
      map["uploadedFiles"] = file;
      console.log("MAP MAP MAP", map);
      localStorage.setItem("submittedData", JSON.stringify(map));
      localStorage.setItem("timer", new Date().getTime());
      alert("Your form is successfully submitted !!");
    }
  };
  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const onChangeFirstName = (event) => {
    firstNameChangeHandler(event);
    setFirstName(event.target.value);
  };

  const onChangeLastName = (event) => {
    lastNameChangeHandler(event);
    setLastName(event.target.value);
  };
  const onChangeGurdianFirstName = (event) => {
    gurdianFirstNameChangeHandler(event);
    setGurdianFirstName(event.target.value);
  };
  const onChangeGurdianLastName = (event) => {
    gurdianLastNameChangeHandler(event);
    setGurdianLastName(event.target.value);
  };
  const onChangePrimaryReason = (event) => {
    primaryReasonChangeHandler(event);
    setPrimaryReason(event.target.value);
  };
  const onChangeCurrentMedication = (event) => {
    currentMedicationChangeHandler(event);
    setCurrentMedication(event.target.value);
  };
  const onChangeAllergies = (event) => {
    allergiesChangeHandler(event);
    setAllergies(event.target.value);
  };

  useEffect(() => {
    let State = require("country-state-city").State;
    let allStatesFinded = State.getStatesOfCountry("IN");
    console.log("State", allStatesFinded);
    let list = [];
    allStatesFinded.map((item) => {
      list.push(item.name);
    });
    setAllStates(list);

    let storageTimer = localStorage.getItem("timer");
    let currentTimer = new Date().getTime();
    let differentTimer = currentTimer - storageTimer;
    var minutes = Math.floor(differentTimer / 60000);
    console.log("minutes", minutes);
    if (minutes <= 30) {
      let data = localStorage.getItem("submittedData");
      let parsedData = JSON.parse(data);
      console.log("parsedData", parsedData);
      setStartDate(dayjs(parsedData.DOB));
      setRadioValue(parsedData.above18);
      setIsDisableRadio(parsedData.above18 === "Yes" ? false : true);
      setPhoneNumber(parsedData.phoneNumber);
      setSelectedState(parsedData.state);
      setFirstName(parsedData.firstName);
      setLastName(parsedData.lastName);
      setGurdianFirstName(parsedData.gurdianFirstName);
      setGurdianLastName(parsedData.gurdianLastName);
      setPrimaryReason(parsedData.primaryReason);
      setCurrentMedication(parsedData.currentMedication);
      setAllergies(parsedData.allergies);
      //   fisrtName = parsedData["firstName"];
    } else {
      localStorage.removeItem("timer");
      localStorage.removeItem("submittedData");
    }
  }, []);

  const handleStateChange = (e) => {
    let value = null;

    console.log("EE ::", e);

    if (e.target.value !== "all") {
      value = e.target.value;
    }

    setSelectedState(value);
  };

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
  };

  const handleFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      },
    };
    axios
      .post(
        `https://firebasestorage.googleapis.com/v0/b/marketplace-5438b.appspot.com/o/${file}`,
        formData,
        config
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ margin: "0 0% 0 10%", padding: "30px 30px 15px 0px" }}>
      <Box sx={{ flexGrow: 1 }}>
        <form onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth={true}
                type={"text"}
                id="fisrtName"
                label={"Patient First Name"}
                value={firstName}
                onChange={onChangeFirstName}
                onBlur={firstNameBlurHandler}
                inputRef={firstNameRef}
                error={firstNameHasError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth={true}
                type={"text"}
                id="lastName"
                label={"Patient Last Name"}
                value={lastName}
                onChange={onChangeLastName}
                onBlur={lastNameBlurHandler}
                inputRef={lastNameref}
                error={lastNameHasError}
              />
            </Grid>
          </Grid>
          <Grid style={{ padding: "15px 0px 0px 0px" }} container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl required fullWidth variant="outlined">
                <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Patient DOB"
                    inputFormat="MM/DD/YYYY"
                    fullWidth
                    required
                    value={startDate}
                    disableFuture
                    // minDate={startDate}
                    onChange={(date) => {
                      console.log("END DATE", date.$d.toISOString());
                      // onChange("endDate", date.$d.toISOString());
                      var todayDate = new Date();
                      var selectedDate = date;
                      var time_difference =
                        new Date(todayDate).getTime() -
                        new Date(selectedDate).getTime();
                      var days_difference =
                        time_difference / (1000 * 60 * 60 * 24);
                      console.log("difference", Math.round(days_difference));

                      var is18Above = Math.round(days_difference) >= 6570;
                      console.log("is18Above", is18Above);
                      if (is18Above === true) {
                        setIsDisableRadio(false);
                      } else {
                        setIsDisableRadio(true);
                        setRadioValue("Any");
                      }

                      setStartDate(date);
                    }}
                    renderInput={(params) => (
                      <TextField
                        required
                        id="datetime-local"
                        // label="Next appointment"
                        type="datetime-local"
                        {...params}
                        error={false}
                        helperText="Patient DOB"
                      />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl required fullWidth variant="outlined">
                <FormLabel>Above 18</FormLabel>
                <div>
                  <FormControlLabel
                    value="end"
                    control={
                      <Radio
                        checked={radioValue === "Yes"}
                        onChange={handleRadioChange}
                        value="Yes"
                        disabled={isDisableRadio}
                        name="radio-buttons"
                        inputProps={{ "aria-label": "Yes" }}
                      />
                    }
                    label="Yes"
                  />
                  <FormControlLabel
                    value="end"
                    control={
                      <Radio
                        checked={radioValue === "No"}
                        onChange={handleRadioChange}
                        value="No"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "No" }}
                      />
                    }
                    label="No"
                  />
                </div>
              </FormControl>
            </Grid>
          </Grid>
          <Grid style={{ padding: "15px 0px 0px 0px" }} container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth={true}
                type={"text"}
                id="gurdianFisrtName"
                label={"Guardian First Name"}
                value={gurdianFisrtName}
                onChange={onChangeGurdianFirstName}
                onBlur={gurdianFirstNameBlurHandler}
                inputRef={gurdianFirstNameRef}
                error={gurdianFirstNameHasError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth={true}
                type={"text"}
                id="gurdianLastName"
                label={"Guardian Last Name"}
                value={gurdianLastName}
                onChange={onChangeGurdianLastName}
                onBlur={gurdianLastNameBlurHandler}
                inputRef={gurdianLastNameRef}
                error={gurdianLastNameHasError}
              />
            </Grid>
          </Grid>
          <Grid style={{ padding: "15px 0px 0px 0px" }} container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth={true}
                type={"text"}
                id="primaryReason"
                multiline={true}
                minRows={5}
                label={"Primary Reason to visit"}
                value={primaryReason}
                onChange={onChangePrimaryReason}
                onBlur={primaryReasonBlurHandler}
                inputRef={primaryReasonRef}
                error={primaryReasonHasError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth={true}
                type={"text"}
                multiline={true}
                minRows={5}
                id="currentMedication"
                label={"Current Medication"}
                value={currentMedication}
                onChange={onChangeCurrentMedication}
                onBlur={currentMedicationBlurHandler}
                inputRef={currentMedicationRef}
                error={currentMedicationHasError}
              />
            </Grid>
          </Grid>
          <Grid style={{ padding: "15px 0px 0px 0px" }} container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth={true}
                type={"text"}
                id="allergies"
                multiline={true}
                label={"Allergies"}
                value={allergies}
                minRows={5}
                onChange={onChangeAllergies}
                onBlur={allergiesBlurHandler}
                inputRef={allergiesRef}
                error={allergiesHasError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>State</FormLabel>
              <FormControl fullWidth variant="outlined">
                {/* <InputLabel>Status</InputLabel> */}
                <Select
                  value={selectedState}
                  onChange={handleStateChange}
                  fullWidth
                  helperText="State"
                >
                  {allStates.map((statusOption) => (
                    <MenuItem key={statusOption} value={statusOption}>
                      {statusOption}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid style={{ padding: "15px 0px 0px 0px" }} container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl required fullWidth variant="outlined">
                <FormLabel>Pharmacy Phone Number</FormLabel>
                <MuiPhoneNumber
                  defaultCountry={"in"}
                  value={phoneNumber}
                  variant="outlined"
                  onChange={handlePhoneChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>Upload Photos(Optional)</FormLabel>
              <FormControl fullWidth variant="outlined">
                <div variant="outlined">
                  <input type="file" onChange={handleFileSelect} />
                  <button onClick={handleFileUpload}>Upload</button>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ width: "100%", mr: 1 }}>
                      <LinearProgress variant="determinate" value={progress} />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >{`${progress}%`}</Typography>
                    </Box>
                  </Box>
                </div>
              </FormControl>
            </Grid>
          </Grid>
          {valError && (
            <div
              style={{
                textAlign: "center",
                color: "red",
                fontSize: ".9rem",
                marginBottom: ".5rem",
              }}
            >
              *{valError}
            </div>
          )}
          <Button
            sx={{ margin: 1, float: "right" }}
            variant="contained"
            onClick={submitHandler}
          >
            Save
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default PatientForm;
