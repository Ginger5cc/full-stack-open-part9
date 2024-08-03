import { useState, SyntheticEvent } from "react";

import {  TextField, Container, Grid, Button } from '@mui/material';
import type { EntryWithoutId, Diagnosis } from "../../types";
import { Divider, Alert } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface Props {
  patientId: string
  submitNewEntry : (id: string, value: EntryWithoutId) => void
  error? : string
  setShowTab: React.Dispatch<React.SetStateAction<boolean>>
}

const AddHealthCheckForm = ( {patientId, submitNewEntry, error, setShowTab }: Props ) => {
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState('');
    const [description, setDescription] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setHealthCheckRating(event.target.value);
    };
    
    const addHealthCheckEntry = (event: SyntheticEvent) => {
      
      event.preventDefault();
      let diagnosisArray : Array<Diagnosis['code']> = [];
      if (diagnosisCodes.indexOf(',')) {
        diagnosisArray = diagnosisCodes.split(',');
      } else if (diagnosisCodes !== '') {
        diagnosisArray.push(diagnosisCodes);
      }
      const newEntry:EntryWithoutId = {
        type: "HealthCheck",
        date,
        specialist,
        diagnosisCodes: diagnosisArray,
        description,
        healthCheckRating: Number(healthCheckRating)
      };
      console.log(newEntry);
      submitNewEntry(patientId, newEntry);
    };

    return (
        <Container maxWidth="xs">
            <br/>
            <div><b>New Health Check Entry</b></div>
            <Divider/>
            {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={ addHealthCheckEntry}>
          <TextField
              label="Description"
              margin="normal"
              fullWidth
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
            <TextField
              label='Date'
              type="date"
              margin="normal"
              fullWidth 
              value={date}
              InputLabelProps={{ shrink: true }} 
              onChange={({ target }) => setDate(target.value)}
            />
            <TextField
              label="Specialist"
              margin="normal"
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
            <TextField
              label="Diagnosis Code"
              margin="normal"
              fullWidth
              value={diagnosisCodes}
              onChange={({ target }) => setDiagnosisCodes(target.value)}
            />
            
            <InputLabel id="healthCheckRating">Health Check Rating</InputLabel>
            <Select
              fullWidth
              labelId="healthCheckRating"
              id="healthCheckRating"
              value={healthCheckRating}
              label="Health Check Rating"
              onChange={handleChange}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
  
            <Grid>
                <Grid item>
                    <Button
                    color="secondary"
                    variant="contained"
                    style={{ float: "left" }}
                    type="button"
                    onClick={ () => setShowTab(false)}
                    >
                    Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                    style={{
                        float: "right",
                    }}
                    type="submit"
                    variant="contained"
                    >
                    Add
                    </Button>
                </Grid>
            </Grid>
          </form>
        </Container>
      );
};
export default AddHealthCheckForm;