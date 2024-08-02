import {
    useParams
  } from 'react-router-dom';
import patientService from "../../services/patients";
import { Patient } from '../../types';
import { useState } from 'react';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

  
  const PatientById = () => {
    const [patient, setPatient] = useState<Patient>();
    const id = useParams().id;
    const getPatient = async(id:string) => {
        const newpatient = await patientService.getPatientById(id);
        return setPatient(newpatient);
    };
    if (id) {
      getPatient(id);
    }
    
    if (!patient)
      return null;

    const showGender = (gender: string) => {
      switch (true) {
        case (gender === 'female') :
          return <FemaleIcon />;
        case (gender === 'male') :
          return <MaleIcon />;
        case (gender === 'other') :
            return <div>Gender: Other</div>;
          default:
              break;
      }
    };
    
    return (
      <div>
        <h2>{patient.name}</h2>
        {showGender(patient.gender)}
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
      </div>
    );
  };

export default PatientById;