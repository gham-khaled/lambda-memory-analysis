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
// TODO: Use Virtualized table (https://mui.com/material-ui/react-table/#virtualized-table)
// TODO: Add Error/Running Response depending on the status of the summary
// TODO: Add Bubble info/danger on some fields in the columns names to explain more in details (For example, Explain how the Optimal cost was calculated)
// TODO: Add info bubble to explain that these calculations have been made using the latest configuration. (Example: For most of the fields, if the configuration have changed, the calculations won't take it into account and therefore won't be accurate)



const columns = [
    {id: 'functionName', label: 'Function Name'},
    {id: 'runtime', label: 'Runtime'},
    {id: 'allDurationInSeconds', label: 'All Duration (s)'},
    {id: 'provisionedMemoryMB', label: 'Provisioned Memory (MB)'},
    {id: 'MemoryCost', label: 'Memory Cost'},
    {id: 'StorageCost', label: 'Storage Cost'},
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
    const [analysis, setAnalysis] = useState(null);
    const [summary, setSummary] = useState(null);
    const [orderBy, setOrderBy] = useState('functionName');
    const [order, setOrder] = useState('asc');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // setLoading(false)
        axios.get(`api/report?reportID=${reportID}`)
            .then(response => {
                setAnalysis(response.data.analysis);
                setSummary(response.data.summary);
                console.log(response)
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching report details: ", error);
                setError(error);
                setLoading(false);
            });
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

    const sortedAnalysis = analysis.sort((a, b) => {
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
                        {sortedAnalysis.map((row, index) => (
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
