import React from "react";
import { Field } from "formik";
import DatePicker from "react-datepicker";
import moment from 'moment-timezone';
moment.tz.setDefault("America/Los_Angeles");

const FormDatePicker = (props) => {
    return (
      <Field name={props.name} id={props.id} className={props.className} placeholder={props.placeholder}>
        {({ field, meta, form: { setFieldValue } }) => {
          return (
            <DatePicker className={props.className} placeholder={props.placeholder}
              {...field}
              selected={field.value || null}
              onChange={(val) => {
                setFieldValue(field.name, val);
              }}
              minDate={new Date()} //<-- here put as minDate the startDate so user cannot select a date less than startDate

              dateFormat="dd/MM/yyyy"
            />
          );
        }}
      </Field>
    );
  };
  export default FormDatePicker