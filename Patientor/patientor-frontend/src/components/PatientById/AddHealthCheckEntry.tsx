import { useState, SyntheticEvent } from "react";

import {  TextField, Container, Grid, Button } from '@mui/material';
import type { EntryWithoutId, Diagnosis } from "../../types";
import { Divider, Alert } from '@mui/material';

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
    
    const addHospitalEntry = (event: SyntheticEvent) => {
      
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
          <form onSubmit={addHospitalEntry}>
          <TextField
              label="Description"
              margin="normal"
              fullWidth
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
            <TextField
              label="Date"
              placeholder="YYYY-MM-DD"
              margin="normal"
              fullWidth 
              value={date}
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
            
            <TextField
              label="Health Check Rating"
              placeholder="0 or 1 or 2 or 3"
              margin="normal"
              fullWidth
              value={healthCheckRating}
              onChange={({ target }) => setHealthCheckRating(target.value)}
            />
            
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