import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    CircularProgress,
    TablePagination,
} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';

const AnalysisTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [continuationToken, setContinuationToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [page, rowsPerPage]);

    const fetchData = () => {
        setLoading(true);
        axios
            .get('https://h4x9eobxve.execute-api.eu-west-1.amazonaws.com/prod/reportSummaries', {
                params: {
                    page,
                    rowsPerPage,
                    continuationToken,
                },
            })
            .then(response => {
                const {jsonContents, newContinuationToken} = response.data;
                setData(jsonContents);
                setContinuationToken(newContinuationToken);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                setLoading(false);
            });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <Button variant="contained" color="primary" style={{marginBottom: '20px'}} component={Link} to="/lambda">
                Launch New Analysis
                <Link to={`/lambda`}></Link>
            </Button>
            {loading ? (
                <CircularProgress/>
            ) : (
                <Paper>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Report ID</TableCell>
                                    <TableCell>All Duration (Seconds)</TableCell>
                                    <TableCell>Avg Provisioned Memory (MB)</TableCell>
                                    <TableCell>Memory Cost</TableCell>
                                    <TableCell>Invocation Cost</TableCell>
                                    <TableCell>Total Cost</TableCell>
                                    <TableCell>Avg Cost Per Invocation</TableCell>
                                    <TableCell>Avg Max Memory Used (MB)</TableCell>
                                    <TableCell>Avg Over Provisioned Memory (MB)</TableCell>
                                    <TableCell>Optimal Total Cost</TableCell>
                                    <TableCell>Potential Savings</TableCell>
                                    <TableCell>Avg Duration Per Invocation</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Link to={`/report/${row.reportID}`}>{row.reportID}</Link>
                                        </TableCell>
                                        <TableCell>{row.allDurationInSeconds}</TableCell>
                                        <TableCell>{row.avgProvisionedMemoryMB}</TableCell>
                                        <TableCell>{row.MemoryCost}</TableCell>
                                        <TableCell>{row.InvocationCost}</TableCell>
                                        <TableCell>{row.totalCost}</TableCell>
                                        <TableCell>{row.avgCostPerInvocation}</TableCell>
                                        <TableCell>{row.avgMaxMemoryUsedMB}</TableCell>
                                        <TableCell>{row.avgOverProvisionedMB}</TableCell>
                                        <TableCell>{row.optimalTotalCost}</TableCell>
                                        <TableCell>{row.potentialSavings}</TableCell>
                                        <TableCell>{row.avgDurationPerInvocation}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            )}
        </div>
    );
};

export default AnalysisTable;




