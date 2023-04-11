import * as yup from 'yup';

export const progress = yup.object().required().shape({
  progress: yup.string().required(),
});
