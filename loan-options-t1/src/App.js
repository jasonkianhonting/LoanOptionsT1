import "./App.css";
import React, { useEffect, useState } from "react";
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
import LinearProgress from "@mui/material/LinearProgress";

function App() {
	//Defining variables with hooks
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

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
				throw new Error("Please contact your admin");
			}
		} catch (error) {
			setLoading(false);
			throw new Error(error.message);
		}
	};

	//This is used to configure and manipulate HTML and material UI components to work cohesively with the application
	const populateData = (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell align="left">Domains</TableCell>
						<TableCell align="left">Web Pages</TableCell>
						<TableCell align="left">Country Code</TableCell>
						<TableCell align="left">Country</TableCell>
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
							<TableCell align="left">{row.domains}</TableCell>
							<TableCell align="left">{row.web_pages}</TableCell>
							<TableCell align="left">{row.alpha_two_code}</TableCell>
							<TableCell align="left">{row.country}</TableCell>
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
					<Button
						variant="contained"
						onClick={fetchData}
						startIcon={<SendIcon />}
					>
						Load
					</Button>
					<Button variant="contained" startIcon={<DeleteIcon />}>
						Delete
					</Button>
					<Button variant="contained" startIcon={<AddIcon />}>
						Add
					</Button>
				</Stack>
				{loading ? <LinearProgress /> : populateData}
			</div>
		</div>
	);
}

export default App;
