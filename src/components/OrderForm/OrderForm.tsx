import { useId } from 'react'
import css from './OrderForm.module.css'
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  type FormikHelpers,
} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'

type Delivery = 'pickup' | 'courier' | 'drone' | ''
interface OrderFormValues {
  username: string
  email: string
  delivery: Delivery
  restrictions: ('vegan' | 'gluten-free' | 'nut-free')[] | null
  deliveryTime: 'morning' | 'afternoon' | 'evening' | ''
  message: string
}

const defaultFormValues: OrderFormValues = {
  username: '',
  email: '',
  delivery: '',
  restrictions: null,
  deliveryTime: '',
  message: 'default message',
}

const defaultFormValuesSchema = Yup.object({
  username: Yup.string().min(3, 'Min 3').max(5, 'Max 5').required('Is Required'),
  email: Yup.string().email().required(),
  delivery: Yup.string().oneOf(['pickup', 'courier', 'drone']).required(),
  restrictions: Yup.array(Yup.string().oneOf(['vegan', 'gluten-free', 'nut-free']))
    .min(1)
    .nullable(),
  deliveryTime: Yup.string().oneOf(['morning', 'afternoon', 'evening', '']),
  message: Yup.string(),
})

export default function OrderForm() {
  const fieldId = useId()

  const handleSubmit = (values: OrderFormValues, formikHelpers: FormikHelpers<OrderFormValues>) => {
    console.log('values', values)
    formikHelpers.resetForm()
  }

  return (
    <Formik
      initialValues={defaultFormValues}
      onSubmit={handleSubmit}
      validationSchema={defaultFormValuesSchema}
    >
      {({ errors, isValid }) => (
        <Form className={css.form}>
          <fieldset className={css.fieldset}>
            <legend className={css.legend}>Client Info</legend>
            <label
              htmlFor={`${fieldId}-username`}
              className={clsx(css.label, errors.username && css.error)}
            >
              Name
            </label>
            <Field
              type='text'
              name='username'
              id={`${fieldId}-username`}
              className={clsx(css.input, errors.username && css.errorField)}
            />
            <ErrorMessage name='username' component='span' className={css.error} />

            <label htmlFor={`${fieldId}-email`} className={css.label}>
              Email
            </label>
            <Field type='email' name='email' id={`${fieldId}-email`} className={css.input} />
            <ErrorMessage name='email' component='span' className={css.error} />
          </fieldset>

          <fieldset className={css.fieldset}>
            <legend className={css.legend}>Delivery method</legend>
            <label className={css.option}>
              <Field type='radio' name='delivery' value='pickup' />
              Pickup
            </label>
            <label className={css.option}>
              <Field type='radio' name='delivery' value='courier' />
              Courier
            </label>
            <label className={css.option}>
              <Field type='radio' name='delivery' value='drone' />
              Drone delivery
            </label>
            <ErrorMessage name='delivery' component='span' className={css.error} />
          </fieldset>

          <fieldset className={css.fieldset}>
            <legend className={css.legend}>Dietary restrictions</legend>
            <label className={css.option}>
              <Field type='checkbox' name='restrictions' value='vegan' />
              Vegan
            </label>
            <label className={css.option}>
              <Field type='checkbox' name='restrictions' value='gluten-free' />
              Gluten-free
            </label>
            <label className={css.option}>
              <Field type='checkbox' name='restrictions' value='nut-free' />
              Nut-free
            </label>
            <ErrorMessage name='restrictions' component='span' className={css.error} />
          </fieldset>

          <fieldset className={css.fieldset}>
            <legend className={css.legend}>Delivery time</legend>
            <label htmlFor={`${fieldId}-deliveryTime`} className={css.label}>
              Preferred delivery time
            </label>
            <Field
              as='select'
              name='deliveryTime'
              id={`${fieldId}-deliveryTime`}
              className={css.input}
            >
              <option value=''>-- Choose delivery time --</option>
              <option value='morning'>Morning (8:00-12:00)</option>
              <option value='afternoon'>Afternoon (12:00-16:00)</option>
              <option value='evening'>Evening (16:00-20:00)</option>
            </Field>
            <ErrorMessage name='deliveryTime' component='span' className={css.error} />
          </fieldset>

          <fieldset className={css.fieldset}>
            <legend className={css.legend}>Message</legend>
            <label htmlFor={`${fieldId}-message`} className={css.label}>
              Additional message
            </label>
            <Field
              as='textarea'
              name='message'
              rows={4}
              id={`${fieldId}-message`}
              className={css.textarea}
            />
            <ErrorMessage name='message' component='span' className={css.error} />
          </fieldset>

          <br />
          <button type='submit' className={css.button} disabled={!isValid}>
            Place order
          </button>
        </Form>
      )}
    </Formik>
  )
}