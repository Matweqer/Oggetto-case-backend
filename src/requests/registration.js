import * as yup from 'yup';

export const registration = yup.object().required().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  name: yup.string().required(),
  birthday: yup.string().required(),
  position: yup.string().required(),
  grade: yup.string().required(),
  workProject: yup.string().required(),
  phone: yup.string().required(),
  telegram: yup.string().required(),
  office: yup.string().required(),
});
