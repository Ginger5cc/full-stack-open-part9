import { NewPatientEntry, Gender, EntryWithoutId, Diagnosis, HealthCheckRating, type Discharge, type Sickleave } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
      }
    return name;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing name');
      }
    return occupation;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

const parseDate = (date: unknown, dateType: string): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing ${dateType}:  ${date}`);
    }
    return date;
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(gender);
};

const parseGender = (gender: unknown) : Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const isSsn = (ssn: unknown) : ssn is string => {
    if (!isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    const ssnRegex: RegExp = /^(?:\d\D*){8,}$/;
    return ssnRegex.test(ssn);
};

const parseSsn = (ssn: unknown) : string => {
    if (!ssn || !isSsn(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }
    if ('name' in object && 'occupation' in object && 'dateOfBirth' in object && 'gender' in object && 'ssn' in object) {
        const newEntry: NewPatientEntry = {
            name : parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth, "Date Of Birth"),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries:[]
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};


export default toNewPatientEntry;






const parseField = (field: unknown, fieldname: string): string => {
    if (!field || !isString(field)) {
        throw new Error(`Incorrect or missing ${fieldname}: ${field}`);
        }
    return field;
    };


const isRating = (rating: number): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(rating);
};
    


const parseHealthCheckRating = ( rating: unknown ): HealthCheckRating => {
    const num_rating = Number(rating);
    if (!rating || isNaN (num_rating) || !isRating(num_rating)) {
        throw new Error('Incorrect or missing Health Check Rating: ' + rating);
    }
    return num_rating;
    };


export const toNewEntry = (object: unknown): EntryWithoutId => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      } 
    if ("type" in object) {
        switch (object.type) {
            case ("HealthCheck"):
                return checkHealthCheck(object);
            case ("Hospital"):
                return checkHospital(object);
            case ("OccupationalHealthcare"):
                return checkOccupationalHealthcare(object);
            default:
                throw new Error('Incorrect types: missing type or incorrect type');
        }
    }
    throw new Error('Incorrect data: some fields are missing');
    
}; 


const parseSickLeave = ( sickleave: unknown ):Sickleave => {
    if (!sickleave || typeof sickleave !== 'object' 
        || !("startDate" in sickleave) || !("endDate" in sickleave)) {
            throw new Error('Incorrect or missing data in Sick Leave');
        }
        const newSickLeave: Sickleave = {
            startDate: parseDate(sickleave.startDate, "Sick Leave Start Date"),
            endDate: parseDate(sickleave.endDate, "Sick Leave End Date")
        };
        return newSickLeave;
};

const parseDischarge = ( discharge: unknown ):Discharge => {
    if (!discharge || typeof discharge !== 'object' 
        || !("date" in discharge) || !("criteria" in discharge)) {
            throw new Error('Incorrect or missing data in Discharge');
        }
        const newDischarge: Discharge = {
            date: parseDate(discharge.date, "Discharge Date"),
            criteria: parseField(discharge.criteria, "Discharge Criteria")
        };
        return newDischarge;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnosis['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnosis['code']>;
  };

const checkHealthCheck = (object: object): EntryWithoutId => {
    if ("date" in object && "type" in object && "diagnosisCodes" in object && "description" in object && "specialist" in object && "healthCheckRating" in object) {
        
        const newEntry: EntryWithoutId = 
            {
                type: "HealthCheck",
                description: parseField(object.description, "description"),
                date: parseDate(object.date, "date"),
                diagnosisCodes: parseDiagnosisCodes(object),
                specialist: parseField(object.specialist, "specialist"),
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };

        return newEntry;
    }
   
    throw new Error('Incorrect data: some fields are missing');
};

const checkHospital = (object: object): EntryWithoutId => {
    if ("date" in object && "type" in object && "description" in object && "specialist" in object && "discharge" in object) {
        const newEntry: EntryWithoutId =
            {
                type: "Hospital",
                description: parseField(object.description, "description"),
                date: parseDate(object.date, "date"),
                diagnosisCodes: parseDiagnosisCodes(object),
                specialist: parseField(object.specialist, "specialist"),
                discharge : parseDischarge(object.discharge)
            };
        return newEntry;
    }
    console.log('why me');
    throw new Error('Incorrect data: some fields are missing');
};

const checkOccupationalHealthcare = (object: object): EntryWithoutId => {
    if ("date" in object && "type" in object && "description" in object && "specialist" in object && "employerName" in object ) {
        let newEntry: EntryWithoutId = 
            {
                type: "OccupationalHealthcare",
                description: parseField(object.description, "description"),
                date: parseDate(object.date, "date"),
                diagnosisCodes: parseDiagnosisCodes(object),
                specialist: parseField(object.specialist, "specialist"),
                employerName: parseField(object.employerName, "employerName"),

            };
        if ("sickLeave" in object) {
            newEntry = {
                ...newEntry,
                sickLeave: parseSickLeave(object.sickLeave)
            };
        }
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};

