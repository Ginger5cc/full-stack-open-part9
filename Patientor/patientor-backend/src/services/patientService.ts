import { PatientsEntry, NonSensitivePatients } from '../types';
import patientEntries from '../data/patients';

const getAllPatients = (): PatientsEntry[] => {
    return patientEntries;
  };

const getNonSensitivePatients = (): NonSensitivePatients[] => {
  return patientEntries.map( ({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};

  const addPatient = () => {
    return null;
  };
  
  export default {
    getAllPatients,
    getNonSensitivePatients,
    addPatient
  };