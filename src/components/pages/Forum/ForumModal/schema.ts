import * as yup from 'yup';

export const createTopicSchema = yup.object().shape({
    title: yup.string()
        .min(3, 'Не меньше 3 символов!')
        .max(100, 'Не больше 100 символов!')
        .required('Поле должно быть заполнено!'),
    text: yup.string()
        .min(10, 'Не меньше 10 символов!')
        .max(500, 'Не больше 500 символов!')
        .required('Поле должно быть заполнено!'),
});
