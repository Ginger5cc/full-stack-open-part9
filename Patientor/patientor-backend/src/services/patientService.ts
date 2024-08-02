import { PatientsEntry, NonSensitivePatients, NewPatientEntry } from '../types';
import patientEntries from '../data/patients';
import { v1 as uuid } from 'uuid';

const getAllPatients = (): PatientsEntry[] => {
    return patientEntries;
  };

const getPatientById = ( id: string ): PatientsEntry | string=> {
  const patientById = patientEntries.find( n => n.id === id);
  if (patientById)
  return patientById;
  else return "no such id";
};

const getNonSensitivePatients = (): NonSensitivePatients[] => {
  return patientEntries.map( ({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};

const addPatient = ( entry: NewPatientEntry ): PatientsEntry => {
  const id : string = uuid();
  const newPatient = {
    id: id,
    ...entry
  };

  patientEntries.push(newPatient);
  return newPatient;
};
  
export default {
  getAllPatients,
  getNonSensitivePatients,
  addPatient,
  getPatientById
};