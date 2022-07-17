import {FormikValues, useFormik} from 'formik';

export type Nullable<T> = T | null;
export type Constructable<T = any> = new (...args: any[]) => T;
export type FormikType = ReturnType<typeof useFormik<FormikValues>>;
