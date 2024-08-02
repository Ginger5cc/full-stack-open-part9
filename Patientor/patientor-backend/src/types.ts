export interface DiagnosesEntry {
    code: string;
    name: string;
    latin?: string;
}

export interface PatientsEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export interface Entry {
}

export type NonSensitivePatients = Omit<PatientsEntry, 'ssn' | 'entries' >;

export type NewPatientEntry = Omit<PatientsEntry, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}