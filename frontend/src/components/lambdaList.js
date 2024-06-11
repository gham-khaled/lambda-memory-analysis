import React, {useState} from 'react';
import axios from 'axios';
import {
    Button,
    Checkbox,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper, TextField,

} from '@mui/material';
// import DatePicker from '@mui/lab/DatePicker';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import MultiSelect from "./MultiSelect";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// TODO: Add Error message if no lambda is returned after applying filter
const LaunchAnalysis = () => {
    const runtimeOptions = [
        'nodejs20.x',
        'nodejs18.x',
        'nodejs16.x',
        'python3.12',
        'python3.11',
        'python3.10',
        'python3.9',
        'python3.8',
        'java21',
        'java17',
        'java11',
        'java8.al2',
        'dotnet8',
        'dotnet7',
        'dotnet6',
        'ruby3.3',
        'ruby3.2',
        'provided.al2023',
        'provided.al2',
        'nodejs14.x',
        'ruby2.7',
        'provided',
        'go1.x',
        'java8'


    ];
    const packageTypeOptions = ['Zip', 'Image'];
    const architectureOptions = ['x86_64', 'arm64'];
    const [startDate, setStartDate] = useState(dayjs().subtract(7, 'day'));
    const [endDate, setEndDate] = useState(dayjs());
    const [analysisID, setAnalysisID] = useState('');
    const [selectedRuntime, setSelectedRuntime] = useState([...runtimeOptions]);
    const [selectedPackageType, setSelectedPackageType] = useState([...packageTypeOptions]);
    const [selectedArchitecture, setSelectedArchitecture] = useState([...architectureOptions]);
    const [lambdaFunctions, setLambdaFunctions] = useState([]);
    const [selectedFunctions, setSelectedFunctions] = useState([]);
    const [openError, setOpenError] = useState(false);

    const [loading, setLoading] = useState(false);


    const handleLaunchAnalysis = async () => {
        if (selectedFunctions.length === 0) {
            setOpenError(true);
            console.log(startDate.startOf('day').toISOString())
            console.log(endDate.endOf('day').toISOString())
        } else {
            const reportID = analysisID || dayjs().unix(); // Use analysisID if provided, otherwise use timestamp
            const payload = {
                lambda_functions_name: selectedFunctions,
                report_id: reportID,
                start_date: startDate.startOf('day').toISOString(),
                end_date: endDate.endOf('day').toISOString()
            };
            console.log(payload)
            setLoading(true);
            try {
                const response = await axios.post('api/startExecution', payload);
                console.log(response)
                // TODO: Add message that it was successfully launched
                // TODO: Wait until a response is received and move to the Report ID details page
                setLoading(false);
            } catch (error) {
                console.error("Error fetching lambda functions: ", error);
                setLoading(false);
            }

        }
    };

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenError(false);
    };
    const handleFetchFunctions = async () => {
        setLoading(true);
        try {
            const response = await axios.get('api/lambdaFunctions?selectedRuntime=$[selectedRuntime]', {
                params: new URLSearchParams({
                    'selectedRuntime': selectedRuntime,
                    'selectedPackageType': selectedPackageType,
                    'selectedArchitecture': selectedArchitecture
                })
            });
            const functions = response.data
            setLambdaFunctions(functions);
            setSelectedFunctions(functions.map(func => func.FunctionName));
            setLoading(false);
        } catch (error) {
            console.error("Error fetching lambda functions: ", error);
            setLoading(false);
        }
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedFunctions(lambdaFunctions.map(func => func.FunctionName));
        } else {
            setSelectedFunctions([]);
        }
    };

    const handleSelectFunction = (event, functionName) => {
        if (event.target.checked) {
            setSelectedFunctions([...selectedFunctions, functionName]);
        } else {
            setSelectedFunctions(selectedFunctions.filter(name => name !== functionName));
        }
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Launch New Analysis
            </Typography>
            <Box display="flex" alignItems="center">

                <LocalizationProvider dateAdapter={AdapterDayjs} style={{marginRight: '10px'}}>
                    <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        renderInput={(params) => <TextField {...params} variant="outlined"/>}
                    />
                    <DatePicker
                        label="End Date (Inclusive)"
                        value={endDate}
                        maxDate={dayjs()}
                        onChange={(date) => setEndDate(date)}
                        renderInput={(params) => <TextField {...params} variant="outlined"/>}
                    />
                </LocalizationProvider>
                <MultiSelect options={runtimeOptions} selectedOptions={selectedRuntime} onChange={setSelectedRuntime}
                             label={"Runtime"}/>
                <MultiSelect options={packageTypeOptions} selectedOptions={selectedPackageType}
                             onChange={setSelectedPackageType} label={"Package Options"}/>
                <MultiSelect options={architectureOptions} selectedOptions={selectedArchitecture}
                             onChange={setSelectedArchitecture}
                             label={"Architecture"}/>
                <Button variant="contained" color="secondary" onClick={handleFetchFunctions} disabled={loading}>
                    {loading ? 'Fetching...' : 'Fetch Lambda Functions'}
                </Button>

            </Box>
            <Box mt={3}>
                <TextField
                    id="analysisID"
                    label="Analysis ID (optional)"
                    variant="outlined"
                    value={analysisID}
                    onChange={(e) => setAnalysisID(e.target.value)}
                    style={{marginRight: '10px'}}/>
                <Button variant="contained" color="primary" onClick={handleLaunchAnalysis} style={{marginTop: '10px'}}>
                    Launch Analysis

                </Button>
                <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>

                    <div><Alert onClose={handleCloseError} severity="error">
                        Please select at least one function before launching the analysis.
                    </Alert></div>
                </Snackbar>

            </Box>
            {lambdaFunctions.length > 0 && (
                <Paper style={{marginTop: '20px'}}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            indeterminate={selectedFunctions.length > 0 && selectedFunctions.length < lambdaFunctions.length}
                                            checked={lambdaFunctions.length > 0 && selectedFunctions.length === lambdaFunctions.length}
                                            onChange={handleSelectAll}
                                        />
                                    </TableCell>
                                    <TableCell>Function Name</TableCell>
                                    <TableCell>Runtime</TableCell>
                                    <TableCell>Last Modified</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lambdaFunctions.map((func, index) => (
                                    <TableRow key={index}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={selectedFunctions.indexOf(func.FunctionName) > -1}
                                                onChange={(event) => handleSelectFunction(event, func.FunctionName)}
                                            />
                                        </TableCell>
                                        <TableCell>{func.FunctionName}</TableCell>
                                        <TableCell>{func.Runtime}</TableCell>
                                        <TableCell>{func.LastModified}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            )}
        </div>
    );
};

export default LaunchAnalysis;
