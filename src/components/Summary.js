import React, { useState } from 'react'
import DataTable from './DataTable'
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Box, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    margin: {
        marginBottom: 10
    }
})
function disablePrevDates(startDate) {
    const startSeconds = Date.parse(startDate);
    return (date) => {
      return Date.parse(date) < startSeconds;
    }
}
const Summary = () => {
    const [startDate, setStartDate] = useState(null);
    const [ endDate, setEndDate] = useState(null)
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };
    const handleEndDateChange = (date) => {
        setEndDate(date);
    };
    const classes = useStyles()
    return(
        <div>
            <Grid className={classes.margin} container justify='center' alignItems='center' spacing={2}>
                <Grid item xs={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            autoOk={true}
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Start Date"
                            value={startDate}
                            maxDate = {new Date()}
                            onChange={handleStartDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            autoOk={true}
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="End Date"
                            value={endDate}
                            onChange={handleEndDateChange}
                            shouldDisableDate={disablePrevDates(startDate)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={4}>
                    <Box mt={3}>
                        <Button  variant='outlined' color='primary' >Filter</Button>
                    </Box>
                </Grid>
            </Grid>
            <DataTable/>
        </div>
    )
}

export default Summary
