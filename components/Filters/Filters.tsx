"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./Filters.module.css";

interface FiltersProps {
  onApply: (filters: string) => void;
}

const FiltersSchema = Yup.object().shape({
  location: Yup.string(),
  form: Yup.string(),
  engine: Yup.string(),
  transmission: Yup.string(),
});

export default function Filters({ onApply }: FiltersProps) {
  return (
    <Formik
      initialValues={{ location: "", form: "", engine: "", transmission: "" }}
      validationSchema={FiltersSchema}
      onSubmit={(values) => {
        const filters = Object.entries(values)
          .filter(([, value]) => Boolean(value))
          .map(([key, value]) => `${key}=${value}`)
          .join("&");
        onApply(filters);
      }}
    >
      {({ resetForm }) => (
        <Form className={styles.filters}>
          {/* Location */}
          <label className={styles.labelInput}>
            Location
            <Field
              name="location"
              placeholder="Kyiv"
              className={styles.input}
            />
          </label>

          <h3 className={styles.formTitle}>Filters</h3>

          {/* Camper form */}
          
            <p className={styles.radioTitle}>Camper form</p>
            <div className={styles.radioGroup}>
              <label className={styles.radioOption}>
                <Field
                  type="radio"
                  name="form"
                  value="alcove"
                  className={styles.radioInput}
                />
                <span>Alcove</span>
              </label>

              <label className={styles.radioOption}>
                <Field
                  type="radio"
                  name="form"
                  value="panel_van"
                  className={styles.radioInput}
                />
                <span>Panel Van</span>
              </label>

              <label className={styles.radioOption}>
                <Field
                  type="radio"
                  name="form"
                  value="integrated"
                  className={styles.radioInput}
                />
                <span>Integrated</span>
              </label>

              <label className={styles.radioOption}>
                <Field
                  type="radio"
                  name="form"
                  value="semi_integrated"
                  className={styles.radioInput}
                />
                <span>Semi Integrated</span>
              </label>
            </div> 

          {/* Engine */}

            <p className={styles.radioTitle}>Engine</p>
            <div className={styles.radioGroup}>
              <label className={styles.radioOption}>
                <Field
                  type="radio"
                  name="engine"
                  value="diesel"
                  className={styles.radioInput}
                />
                <span>Diesel</span>
              </label>

              <label className={styles.radioOption}>
                <Field
                  type="radio"
                  name="engine"
                  value="petrol"
                  className={styles.radioInput}
                />
                <span>Petrol</span>
              </label>

              <label className={styles.radioOption}>
                <Field
                  type="radio"
                  name="engine"
                  value="hybrid"
                  className={styles.radioInput}
                />
                <span>Hybrid</span>
              </label>

              <label className={styles.radioOption}>
                <Field
                  type="radio"
                  name="engine"
                  value="electric"
                  className={styles.radioInput}
                />
                <span>Electric</span>
              </label>
            </div>   

          {/* Transmission */}
          
            <p className={styles.radioTitle}>Transmission</p>
            <div className={styles.radioGroup}>
              <label className={styles.radioOption}>
                <Field
                  type="radio"
                  name="transmission"
                  value="automatic"
                  className={styles.radioInput}
                />
                <span>Automatic</span>
              </label>

              <label className={styles.radioOption}>
                <Field
                  type="radio"
                  name="transmission"
                  value="manual"
                  className={styles.radioInput}
                />
                <span>Manual</span>
              </label>
            </div>   

          {/* Кнопки */}
          <div className={styles.buttons}>
            <button type="submit" className={styles.searchBtn}>
              Search
            </button>
            <button
              type="button"
              onClick={() => {
                resetForm();
                onApply("");
              }}
              className={styles.clearBtn}
            >
              Clear filters
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
} 