import React from 'react';
import { styled } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemIcon from '@mui/material/ListItemIcon';

const PREFIX = 'MultiSelect';

const classes = {
    root: `${PREFIX}-root`,
    formControl: `${PREFIX}-formControl`,
    selectedAll: `${PREFIX}-selectedAll`,
    indeterminateColor: `${PREFIX}-indeterminateColor`,
    selectAllText: `${PREFIX}-selectAllText`
};

const Root = styled('div')(({ theme }) => ({
    [`&.${classes.root}`]: {
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    [`& .${classes.formControl}`]: {
        margin: theme.spacing(1),
        width: '100%'
    }
}));

const MultiSelect = ({ options, selectedOptions, onChange, label }) => {
    const isAllSelected = () => {
        return options.length === selectedOptions.length
    }
    const handleChange = (event) => {
        if (event.target.value.includes('all') && selectedOptions.length !== options.length) {
            onChange(options.map((option) => option));
        } else if (event.target.value.includes('all')) {
            onChange([]);
        } else {
            onChange(event.target.value);
        }
    };


    return (
        <Root className={classes.root}>
            <FormControl variant="outlined" size="small" style={{marginRight: '10px'}}>
                <InputLabel id={{label}}>{label}</InputLabel>
                <Select
                    labelId={label}
                    id={label}
                    multiple
                    value={selectedOptions}
                    onChange={handleChange}
                    displayEmpty={true}
                    renderValue={() => label}
                    label={label}
                >
                    <MenuItem
                        value="all"
                        className={isAllSelected() ? classes.selectedAll : ''}

                    >
                        <ListItemIcon>
                            <Checkbox
                                className={classes.indeterminateColor}
                                checked={isAllSelected()}
                                indeterminate={
                                    selectedOptions.length > 0 && selectedOptions.length < options.length
                                }
                            />
                        </ListItemIcon>
                        <ListItemText
                            classes={{primary: classes.selectAllText}}
                            primary="Select All"
                        />
                    </MenuItem>
                    {options.map((item) => (
                        <MenuItem key={item} value={item}>
                            <Checkbox checked={selectedOptions.indexOf(item) > -1}/>
                            <ListItemText primary={item}/>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Root>
    );
};

export default MultiSelect;
