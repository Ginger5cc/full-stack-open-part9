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

const AddOccupationalForm = ( {patientId, submitNewEntry, error, setShowTab }: Props ) => {
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState('');
    const [description, setDescription] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    const addHospitalEntry = (event: SyntheticEvent) => {
      
      event.preventDefault();
      let diagnosisArray : Array<Diagnosis['code']> = [];
      if (diagnosisCodes.indexOf(',')) {
        diagnosisArray = diagnosisCodes.split(',');
      } else if (diagnosisCodes !== '') {
        diagnosisArray.push(diagnosisCodes);
      }
      let newEntry:EntryWithoutId = {
        type: "OccupationalHealthcare",
        date,
        specialist,
        diagnosisCodes: diagnosisArray,
        description,
        employerName,
      };
      if (startDate !== '' && endDate !== '') {
        newEntry = {
          ...newEntry,
          sickLeave : {startDate: startDate,
            endDate: endDate}
        };
      }
    
      submitNewEntry(patientId, newEntry);
    };

    return (
        <Container maxWidth="xs">
            <br/>
            <div><b>New Occupational Healthcare Entry</b></div>
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
              type='date'
              InputLabelProps={{ shrink: true }} 
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
              label="Employer Name"
              margin="normal"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
              label="Sick Leave Start Date"
              type='date'
              InputLabelProps={{ shrink: true }} 
              margin="normal"
              fullWidth
              value={startDate}
              onChange={({ target }) => setStartDate(target.value)}
            />
            <TextField
              label="Sick Leave End Date"
              type='date'
              InputLabelProps={{ shrink: true }} 
              margin="normal"
              fullWidth
              value={endDate}
              onChange={({ target }) => setEndDate(target.value)}
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
export default AddOccupationalForm;