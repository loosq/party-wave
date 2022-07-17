import React, {
    ButtonHTMLAttributes,
    FormHTMLAttributes,
    LinkHTMLAttributes,
} from 'react';
import {
    AltUrl, Button, Input, InputType,
} from 'components/base';
import './Form.scss';
import {FormikProps} from 'formik';

type FormPropsType = FormHTMLAttributes<unknown> & {
    fields: Array<InputType>
    formik?: FormikProps<any>
    buttonProps?: ButtonHTMLAttributes<unknown>
    altUrlProps?: LinkHTMLAttributes<unknown>
};

export const Form: React.FC<FormPropsType> = React.memo((
    {
        fields,
        formik,
        buttonProps,
        altUrlProps,
        ...restFormProps
    },
) => (
    <form {...restFormProps} onSubmit={formik?.handleSubmit}>
        <div className='fields__container'>
            {
                fields.map((field) => <Input
                    {...field}
                    {...formik?.getFieldProps(field.name)}
                    error={
                        formik?.touched[field.name as string]
                        && formik?.errors[field.name as string]
                    }
                />)
            }
        </div>
        <div className='form-buttons__container'>
            <div className="form-buttons">
                <Button {...buttonProps}/>
                <AltUrl {...altUrlProps}/>
            </div>
        </div>
    </form>
));
