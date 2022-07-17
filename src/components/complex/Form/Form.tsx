import React, {
    ButtonHTMLAttributes,
    FormHTMLAttributes,
    LinkHTMLAttributes,
} from 'react';
import {
    AltUrl, Button, Field, LinkType,
} from 'components/base';
import './Form.scss';
import {FormikType} from 'types';

type Props = FormHTMLAttributes<unknown> & {
    fields: Array<Record<string, unknown>>
    links?: Array<LinkType>
    readMode?: boolean
    formik?: FormikType
    buttonProps?: ButtonHTMLAttributes<unknown>
    altUrlProps?: LinkHTMLAttributes<unknown>
};

export const Form: React.FC<Props> = React.memo((
    {
        fields,
        links,
        readMode,
        formik,
        buttonProps,
        altUrlProps,
        ...restFormProps
    },
) => (
    <form {...restFormProps} onSubmit={formik?.handleSubmit}>
        <div className='fields__container'>
            {
                fields.map((field) => <Field
                    {...formik?.getFieldProps(field.name)}
                    {...field}
                    readMode={readMode}
                    error={
                        formik?.touched[field.name as string]
                        && formik?.errors[field.name as string]
                    }
                />)
            }
        </div>
        <div className='form-buttons__container'>
            {
                readMode && links
                    ? (
                        <div className='form-links'>
                            {
                                links.map((link) => <AltUrl {...link}/>)
                            }
                        </div>
                    )
                    : (
                        <div className="form-buttons">
                            <Button {...buttonProps}/>
                            <AltUrl {...altUrlProps}/>
                        </div>
                    )
            }
        </div>
    </form>
));
