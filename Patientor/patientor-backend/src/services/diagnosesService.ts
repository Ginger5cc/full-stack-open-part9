import diagnosesEntries from '../data/diagnoses';

import { DiagnosesEntry } from '../types';

const getDiagnoses = (): DiagnosesEntry[] => {
  return diagnosesEntries;
};

const addDiagnoses = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnoses
};
