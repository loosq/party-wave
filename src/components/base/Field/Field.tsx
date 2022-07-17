import React, {
    HTMLAttributes,
    InputHTMLAttributes,
    LabelHTMLAttributes,
} from 'react';
import './Field.scss';
import {FormikErrors} from 'formik';

type Props =
    InputHTMLAttributes<unknown>
    & LabelHTMLAttributes<unknown>
    & {
    label?: string
    value?: string
    error?: string | false | Array<string> | FormikErrors<any> | Array<FormikErrors<any>>
    readMode?: boolean
    classNameLabel?: string
    classNameValue?: string
};

export const Field: React.FC<Props> = React.memo((
    {
        label,
        value,
        error,
        readMode,
        classNameLabel,
        classNameValue,
        ...restProps
    },
) => (
    <div className='field'>
        <label
            {...restProps as LabelHTMLAttributes<unknown>}
            className={classNameLabel || readMode ? 'text-row__label' : 'field__title'}
        >
            {label}
        </label>
        {
            readMode
                ? (
                    <span
                        {...restProps as HTMLAttributes<unknown>}
                        className={classNameValue || 'text-row__value'}
                    >
                        {value}
                    </span>
                )
                : (
                    <>
                        <input
                            {...restProps as InputHTMLAttributes<unknown>}
                            className={classNameValue || `field__input ${error ? 'invalid' : ''}`}
                        />
                        {
                            error
                            && <span className='error-message'>{error as string}</span>
                        }
                    </>
                )
        }

    </div>
));
