import { Patient, NonSensitivePatients, NewPatientEntry, EntryWithoutId, type Entry } from '../types';
import patients from '../data/patients';
import { v1 as uuid } from 'uuid';

const getAllPatients = (): Patient[] => {
    return patients;
  };

const getPatientById = ( id: string ): Patient | string=> {
  const patientById = patients.find( n => n.id === id);
  if (patientById)
  return patientById;
  else return "no such id";
};

const getNonSensitivePatients = (): NonSensitivePatients[] => {
  return patients.map( ({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const id : string = uuid();
  const newPatient = {
    id: id,
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = ( id: string, entry: EntryWithoutId ): Entry => {
    const entryId : string = uuid();
    const newEntry = {
      id: entryId,
      ...entry
    };
    const patient = patients.find( n => n.id === id );
    patient?.entries.push(newEntry);
  return newEntry;
};
  
export default {
  getAllPatients,
  getNonSensitivePatients,
  addPatient,
  getPatientById,
  addEntry
};