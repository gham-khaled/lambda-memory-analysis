import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress, TableSortLabel,
} from '@mui/material';
import Summary from "./summaryDetails";
// TODO: Add Error/Running Response depending on the status of the summary
// TODO: Use Virtualized table (https://mui.com/material-ui/react-table/#virtualized-table)
const data = [
    {
        "functionName": "StepFunctionAnalysisStack-analysisinitializerF1EF8-dfZokfvRqQdn",
        "runtime": "python3.10",
        "allDurationInSeconds": 23.8,
        "provisionedMemoryMB": 122.0703,
        "MemoryCost": 4.729e-05,
        "InvocationCost": 3.4e-06,
        "totalCost": 5.069e-05,
        "avgCostPerInvocation": 2.982e-06,
        "maxMemoryUsedMB": 78.2013,
        "overProvisionedMB": 43.869,
        "optimalMemory": 128,
        "optimalTotalCost": 4.958e-05,
        "potentialSavings": 1.103e-06,
        "avgDurationPerInvocation": 1.4,
        "timeoutInvocations": 1.0,
        "memoryExceededInvocation": null
    },
    {
        "functionName": "eks-workshop-ide-EksWorkshopC9BootstrapInstanceLam-Y2NGQ5t1BJHF",
        "runtime": "python3.12",
        "allDurationInSeconds": 145.324,
        "provisionedMemoryMB": 244.1406,
        "MemoryCost": 0.0005775,
        "InvocationCost": 2e-07,
        "totalCost": 0.0005777,
        "avgCostPerInvocation": 0.0005777,
        "maxMemoryUsedMB": 89.6454,
        "overProvisionedMB": 154.4952,
        "optimalMemory": 128,
        "optimalTotalCost": 0.0003028,
        "potentialSavings": 0.0002749,
        "avgDurationPerInvocation": 145.324,
        "timeoutInvocations": null,
        "memoryExceededInvocation": null
    }
    // Add more items as needed
];
const summaryData = {
  allDurationInSeconds: 169.124,
  avgProvisionedMemoryMB: 183.10545,
  MemoryCost: 0.00062479,
  InvocationCost: 0.0000036,
  totalCost: 0.00062839,
  avgCostPerInvocation: 0.000290341,
  avgMaxMemoryUsedMB: 83.92335,
  avgOverProvisionedMB: 99.1821,
  optimalTotalCost: 0.00035238,
  potentialSavings: 0.000276003,
  avgDurationPerInvocation: 73.362,
  status: 'Completed',
  reportID: 'third_report',
};
const columns = [
    {id: 'functionName', label: 'Function Name'},
    {id: 'runtime', label: 'Runtime'},
    {id: 'allDurationInSeconds', label: 'All Duration (s)'},
    {id: 'provisionedMemoryMB', label: 'Provisioned Memory (MB)'},
    {id: 'MemoryCost', label: 'Memory Cost'},
    {id: 'InvocationCost', label: 'Invocation Cost'},
    {id: 'totalCost', label: 'Total Cost'},
    {id: 'avgCostPerInvocation', label: 'Avg Cost Per Invocation'},
    {id: 'maxMemoryUsedMB', label: 'Max Memory Used (MB)'},
    {id: 'overProvisionedMB', label: 'Over Provisioned (MB)'},
    {id: 'optimalMemory', label: 'Optimal Memory'},
    {id: 'optimalTotalCost', label: 'Optimal Total Cost'},
    {id: 'potentialSavings', label: 'Potential Savings'},
    {id: 'avgDurationPerInvocation', label: 'Avg Duration Per Invocation'},
    {id: 'timeoutInvocations', label: 'Timeout Invocations'},
    {id: 'memoryExceededInvocation', label: 'Memory Exceeded Invocation'},
];

const ReportDetails = () => {

    const {reportID} = useParams();
    const [analysis, setAnalysis] = useState(data);
    const [summary, setSummary] = useState(summaryData);
    const [orderBy, setOrderBy] = useState('functionName');
    const [order, setOrder] = useState('asc');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(false)
        // axios.get(`https://h4x9eobxve.execute-api.eu-west-1.amazonaws.com/prod/report?reportID=${reportID}`)
        //     .then(response => {
        //         setAnalysis(response.data.analysis);
        //         setSummary(response.data.summary);
        //         console.log(response)
        //         setLoading(false);
        //     })
        //     .catch(error => {
        //         console.error("Error fetching report details: ", error);
        //         setError(error);
        //         setLoading(false);
        //     });
    }, [reportID]);

    if (loading) {
        return <CircularProgress/>;
    }

    if (error) {
        return <div>Error loading report details: {error.message}</div>;
    }

    if (!analysis) {
        return <div>No report found</div>;
    }
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedData = data.sort((a, b) => {
        if (b[orderBy] < a[orderBy]) {
            return order === 'asc' ? -1 : 1;
        }
        if (b[orderBy] > a[orderBy]) {
            return order === 'asc' ? 1 : -1;
        }
        return 0;
    });

    return (
        <div>
            <h2>Report Details for {reportID}</h2>
            <Summary data={summary}/>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    sortDirection={orderBy === column.id ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={orderBy === column.id ? order : 'asc'}
                                        onClick={() => handleRequestSort(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.map((row, index) => (
                            <TableRow key={index}>
                                {columns.map((column) => (
                                    <TableCell key={column.id}>
                                        {row[column.id] !== null ? row[column.id] : 'N/A'}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ReportDetails;
