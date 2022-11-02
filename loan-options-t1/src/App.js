//Importing css file for the application
import "./App.css";

//Import the redux and material UI components
import React, { useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

//This function is the main function that populates the data, creates additional nested functions to handle buttons click,
//fetching data, error handling and populate data. It also returns html codes to help design the website
function App() {
	//Defining variables with hooks and default error messages
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const errorMessage = "Please contact your admin";
	const errorButtonMessage =
		"No data in the table, populate it by pressing the load button";

	//Defining function where it fetches the data while setting the use state to be true so that a loading bar will appear
	//It is also defined in a try catch block for error handling
	const fetchData = async () => {
		try {
			setLoading(true);
			const request = await fetch(
				"http://universities.hipolabs.com/search?country=Australia"
			);

			if (request.ok) {
				const response = await request.json();
				setData(response);
				setLoading(false);
			} else {
				setLoading(false);
				throw new Error(errorMessage);
			}
		} catch (error) {
			setLoading(false);
			throw new Error(error.message);
		}
	};

	//Defining this function to delete the last item by using the in built function- pop and send an alert to let users know that an item has been deleted
	//Try and catch block is also defined for error handling
	const deleteData = async () => {
		try {
			//Setting this hook true so that the progress bar will appear
			setLoading(true);
			let dataPop = await data.pop();

			//If the deletion is successful, save the data in the hook
			if (dataPop) {
				alert(`${dataPop.name} has been deleted from the table`);
				setData(data);
				setLoading(false);

				//Otherwise alert an error message
			} else {
				setLoading(false);
				alert(errorButtonMessage);
				throw new Error(errorMessage);
			}
		} catch (err) {
			setLoading(false);
			throw new Error(err.message);
		}
	};

	//Defining the function to add the first item in the dataset to the last by using the in built function - push and
	//send an alert to let the users know that the first item has been added
	//Try and catch block is also implemented for error handling
	const addData = async () => {
		try {
			//Setting this hook true so that the progress bar will appear
			setLoading(true);
			//If data is present (after load button has been pressed), add the data into the existing dataset and update the
			//dataset
			if (data.length !== 0) {
				let dataPush = await data.push(data[0]);
				if (dataPush) {
					alert(`${data[0].name} has been added to the table`);
					setData(data);
					setLoading(false);
				}
				//Otherwise alert the users with the appropriate error message
			} else {
				setLoading(false);
				alert(errorButtonMessage);
				throw new Error(errorMessage);
			}
		} catch (err) {
			setLoading(false);
			throw new Error(err.message);
		}
	};

	//This is used to configure and manipulate HTML and material UI components to work cohesively with the application
	const populateData = (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 700 }} aria-label="simple table">
				<TableHead>
					{/* Creating table cells for each row*/}
					<TableRow>
						<TableCell align="left">Name</TableCell>
						<TableCell align="left">Domains</TableCell>
						<TableCell align="left">Web Pages</TableCell>
						<TableCell align="left">Country Name</TableCell>
						<TableCell align="left">Country Code</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row) => (
						<TableRow
							key={row.name}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{row.name}
							</TableCell>
							<TableCell>
								{/* Extract the nested array in domains */}
								{row.domains.map((domainsRow) => (
									<Stack>{domainsRow}</Stack>
								))}
							</TableCell>

							<TableCell>
								{/* Extract the nested array in web pages */}
								{row.web_pages.map((webPagesRow) => (
									<Stack>{webPagesRow}</Stack>
								))}
							</TableCell>

							<TableCell align="left">{row.country}</TableCell>
							<TableCell align="center">{row.alpha_two_code}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);

	return (
		<div className="App">
			<div className="App-header">
				<Stack
					direction="row"
					justifyContent="center"
					alignItems="center"
					spacing={2}
				>
					{/* First button (Load button) */}
					<Button
						variant="contained"
						onClick={fetchData}
						startIcon={<SendIcon />}
					>
						Load
					</Button>
					{/* Second button (Delete button) */}
					<Button
						variant="contained"
						onClick={deleteData}
						startIcon={<DeleteIcon />}
					>
						Delete
					</Button>
					{/* Third button (Add button) */}
					<Button variant="contained" onClick={addData} startIcon={<AddIcon />}>
						Add
					</Button>
				</Stack>
				{/* If loading is true, input progress logo otherwise popualte the table */}
				<div className="table">
					{loading ? <CircularProgress /> : populateData}
				</div>
			</div>
		</div>
	);
}

export default App;
