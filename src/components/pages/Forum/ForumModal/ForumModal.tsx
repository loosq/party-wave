import React, {useCallback} from 'react';
import bemCn from 'libs/bemCn';
import {CreateNewTopicParams} from 'types';
import {useAppDispatch} from 'store';
import {Modal} from 'components/complex/Modal/Modal';
import {createTopic, getTopics} from 'slices/forum';
import {
    Field, FieldProps, Form, Formik,
} from 'formik';
import {createTopicSchema} from './schema';

import './ForumModal.scss';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const bemBlock = bemCn('forum-modal');

const TextArea = (field: FieldProps['field']) => (
    <textarea
        className={bemBlock('text-area')}
        placeholder='Текст сообщения'
        rows={5}
        wrap='hard'
        {...field}
    />
);

export const ForumModal = ({isOpen, onClose}: Props) => {
    const dispatch = useAppDispatch();

    const onSubmit = useCallback((values: CreateNewTopicParams) => {
        dispatch(createTopic(values)).unwrap().then(() => {
            dispatch(getTopics());
            onClose?.();
        });
    }, []);

    return (
        <Modal className={bemBlock()} isOpen={isOpen} onClose={onClose}>
            <div className={bemBlock('container')}>
                <p className={bemBlock('title')}>Создать тему</p>
                <Formik
                    initialValues={{
                        text: '',
                        title: '',
                    }}
                    validationSchema={createTopicSchema}
                    onSubmit={onSubmit}
                >
                    {({
                        errors,
                        touched,
                    }) => (
                        <Form className={bemBlock('form')}>
                            <div className={bemBlock('input-container')}>
                                <Field
                                    className={bemBlock('text-input')}
                                    placeholder='Название темы'
                                    name='title'
                                    type='text'
                                />
                                {errors.title && touched.title && (
                                    <p className={bemBlock('error')}>{errors.title}</p>
                                )}
                            </div>
                            <div className={bemBlock('text-area-container')}>
                                <Field
                                    name='text'
                                    as={TextArea}
                                />
                                {errors.text && touched.text && (
                                    <p className={bemBlock('error')}>{errors.text}</p>
                                )}
                            </div>
                            <button
                                className={bemBlock('submit-button')}
                                type='submit'
                            >
                                Создать
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
};
