import os from 'os';

export const emailValidator = (value) =>{
    if (value.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )){
        return true;
    }
    return 'Enter a valid Email';
};

export const passwordValidator = (value) =>{
    if (/\w/.test(value) && /\d/.test(value)){
        return true;
    }
    return 'Password need to have at least a letter and a number';
};

export const homedir = os.homedir();
export const dataPath = `${homedir}/userData.json`;