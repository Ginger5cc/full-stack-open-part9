import {
    useParams
  } from 'react-router-dom';
import patientService from "../../services/patients";
import { Patient, type Diagnosis, type EntryWithoutId } from '../../types';
import { useState, useEffect } from 'react';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import ShowEntry from './Entry';
import { Button } from '@mui/material';

import axios from 'axios';
import TabPanel from './TabPanel';
interface Props {
  diagnoses: Diagnosis[]
  patients : Patient[]
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
}
  
  const PatientById = ({ setPatients, diagnoses, patients } : Props) => {
    const [patient, setPatient] = useState<Patient>();
    const [showTab, setShowTab] = useState(false);
    const [error, setError] = useState<string>();
    const id = useParams().id;

    useEffect ( () => {
      const fetchPatient = async (id:string) => {
        const newpatient = await patientService.getPatientById(id);
        return setPatient(newpatient);
      };
      if (id) {
        fetchPatient(id);
      }
    }, [id]);

    if (!patient)
      return null;

    const submitNewEntry = async (id: string, values: EntryWithoutId) => {
      try {
        const entry = await patientService.createEntry(id, values);
        patient.entries = patient.entries.concat(entry);
        const newPatients = patients.map( n => n.id === id? patient: n);
        setPatients(newPatients);
        setShowTab(false);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const message = e.response.data.replace('Something went wrong. Error: ', '');
            console.error(message);
            setError(message);
          } else {
            setError("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    };

    
    return (
      <div>
        <h2>{patient.name}</h2>
        {patient.gender ==='other'? <div>Gender: Other</div> : (patient.gender ==='female'? <FemaleIcon /> : <MaleIcon />)}
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
        <br/>
        <Button 
          size="small" 
          variant="contained" 
          color="primary"
          onClick={() => setShowTab(prev => !prev)}
        >
            Add New Entry
        </Button>
        {showTab && <TabPanel patientId={patient.id} submitNewEntry={submitNewEntry} error={error} setShowTab={setShowTab}/>}
        <br />
        <br />
        <h3>Entries</h3>
        {patient.entries.length != 0 ? patient.entries.map( n => <ShowEntry key={n.id} diagnoses={diagnoses} entry={n} />) : <div >No Entry yet</div>}
      </div>
    );
  };

export default PatientById;