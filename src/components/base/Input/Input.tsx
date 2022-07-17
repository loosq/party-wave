import React, {InputHTMLAttributes, LabelHTMLAttributes} from 'react';
import './Input.scss';

type InputPropsType =
    InputHTMLAttributes<unknown>
    & LabelHTMLAttributes<unknown>
    & {
    label?: string
    error?: any
    classNameLabel?: string
    classNameInput?: string
};

export const Input: React.FC<InputPropsType> = React.memo((
    {
        label,
        error,
        classNameLabel,
        classNameInput,
        ...restProps
    },
) => (
    <div className='field'>
        <label
            {...restProps as LabelHTMLAttributes<unknown>}
            className={classNameLabel || 'field__title'}
        >
            {label}
        </label>
        <input
            {...restProps as InputHTMLAttributes<unknown>}
            className={classNameInput || `field__input ${error ? 'invalid' : ''}`}
        />
        {
            error && <span className='error-message'>{error}</span>
        }
    </div>
));

export type InputType = InputPropsType;
