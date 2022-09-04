import React, {
    InputHTMLAttributes,
    LabelHTMLAttributes,
} from 'react';
import './Field.scss';
import { FormikErrors } from 'formik';

type Props =
    InputHTMLAttributes<unknown>
    & LabelHTMLAttributes<unknown>
    & {
    label?: string
    error?: string | false | Array<string> | FormikErrors<any> | Array<FormikErrors<any>>
    readMode?: boolean
    classNameLabel?: string
    classNameValue?: string
};

export const Field: React.FC<Props> = React.memo((
    {
        label,
        error,
        readMode,
        classNameLabel,
        classNameValue,
        ...restProps
    },
) => (
    <div className='field'>
        <input
            {...restProps as InputHTMLAttributes<unknown>}
            className={classNameValue
            || `field__input ${error ? 'invalid' : ''}`}
            disabled={readMode ? true : false}
        />
        <label
            {...restProps as LabelHTMLAttributes<unknown>}
            className={classNameLabel || readMode ? 'text-row__label'
                : 'field__title'}
        >
            {label}
        </label>
        {
            error
            && (
                <span className='error-message'>
                    {error as string}
                </span>
            )
        }
    </div>
));
