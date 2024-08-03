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

const AddHospitalForm = ( {patientId, submitNewEntry, error, setShowTab }: Props ) => {
    
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState('');
    const [description, setDescription] = useState('');
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    
    

    const addHospitalEntry = (event: SyntheticEvent) => {
      
      event.preventDefault();
      let diagnosisArray : Array<Diagnosis['code']> = [];
      if (diagnosisCodes.indexOf(',')) {
        diagnosisArray = diagnosisCodes.split(',');
      } else if (diagnosisCodes !== '') {
        diagnosisArray.push(diagnosisCodes);
      }
      const newEntry:EntryWithoutId = {
        type: "Hospital",
        date,
        specialist,
        diagnosisCodes: diagnosisArray,
        description,
        discharge : {date: dischargeDate,
        criteria: dischargeCriteria}
      };
      console.log(newEntry);
      submitNewEntry(patientId, newEntry);
    };

    return (
        <Container maxWidth="xs">
            <br/>
            <div><b>New Hospital Entry</b></div>
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
              label="Discharge Date"
              type='date'
              InputLabelProps={{ shrink: true }} 
              margin="normal"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge Criteria"
              margin="normal"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
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
export default AddHospitalForm;