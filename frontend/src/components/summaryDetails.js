import React from 'react';
import {Grid, Paper, Typography} from '@mui/material';
// TODO: Add Timeout and memory errors

const Summary = ({data}) => {
    const {
        allDurationInSeconds,
        avgProvisionedMemoryMB,
        MemoryCost,
        InvocationCost,
        totalCost,
        avgMaxMemoryUsedMB,
        avgOverProvisionedMB,
        // optimalTotalCost,
        potentialSavings,
        avgDurationPerInvocation,
        reportID
    } = data;

    return (
        <Grid container spacing={2}>

            <Grid item xs={12} md={6} lg={3}>
                <Paper elevation={3} style={{padding: 16}}>
                    <Typography variant="h6">Memory Cost</Typography>
                    <Typography variant="body1">${MemoryCost}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Paper elevation={3} style={{padding: 16}}>
                    <Typography variant="h6">Invocation Cost</Typography>
                    <Typography variant="body1">${InvocationCost}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Paper elevation={3} style={{padding: 16}}>
                    <Typography variant="h6">Total Cost</Typography>
                    <Typography variant="body1">${totalCost}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Paper elevation={3} style={{padding: 16}}>
                    <Typography variant="h6">Potential Savings</Typography>
                    <Typography variant="body1">${potentialSavings}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Paper elevation={3} style={{padding: 16}}>
                    <Typography variant="h6">Avg Max Memory Used</Typography>
                    <Typography variant="body1">{avgMaxMemoryUsedMB} MB</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Paper elevation={3} style={{padding: 16}}>
                    <Typography variant="h6">Avg Provisioned Memory</Typography>
                    <Typography variant="body1">{avgProvisionedMemoryMB} MB</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Paper elevation={3} style={{padding: 16}}>
                    <Typography variant="h6">Avg Over Provisioned Memory</Typography>
                    <Typography variant="body1">{avgOverProvisionedMB} MB</Typography>
                </Paper>
            </Grid>
            {/*<Grid item xs={12} md={6} lg={3}>*/}
            {/*    <Paper elevation={3} style={{padding: 16}}>*/}
            {/*        <Typography variant="h6">Optimal Total Cost</Typography>*/}
            {/*        <Typography variant="body1">${optimalTotalCost}</Typography>*/}
            {/*    </Paper>*/}
            {/*</Grid>*/}

            <Grid item xs={12} md={6} lg={3}>
                <Paper elevation={3} style={{padding: 16}}>
                    <Typography variant="h6">Avg Duration Per Invocation</Typography>
                    <Typography variant="body1">{avgDurationPerInvocation} seconds</Typography>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Paper elevation={3} style={{padding: 16}}>
                    <Typography variant="h6">Report ID</Typography>
                    <Typography variant="body1">{reportID}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Paper elevation={3} style={{padding: 16}}>
                    <Typography variant="h6">Total Duration</Typography>
                    <Typography variant="body1">{allDurationInSeconds} seconds</Typography>
                </Paper>
            </Grid>

        </Grid>
    );
};

export default Summary;
