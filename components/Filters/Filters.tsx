"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./Filters.module.css";

const FiltersSchema = Yup.object().shape({
  location: Yup.string(),
  form: Yup.string(),
  engine: Yup.string(),
  transmission: Yup.string(),
});

export default function Filters({ onApply }: { onApply: (filters: string) => void }) {
  return (
    <Formik
      initialValues={{ location: "", form: "", engine: "", transmission: "" }}
      validationSchema={FiltersSchema}
      onSubmit={(values) => {
        const filters = Object.entries(values)
          .filter(( [v]) => v)
          .map(([k, v]) => `${k}=${v}`)
          .join("&");
        onApply(filters);
      }}
    >
      {({ resetForm }) => (
        <Form className={styles.filters}>
          <h3 className={styles.formTitle}>Filters</h3>

          {/* Location */}
          <label className={styles.labelInput}>
            Location
            <Field name="location" placeholder="Kyiv" className={styles.input} />
          </label>

          {/* Camper form */}
          <label className={styles.label}>
            Camper form
            <div className={styles.radioGroup}>
              <label><Field type="radio" name="form" value="alcove" /> Alcove</label>
              <label><Field type="radio" name="form" value="panel_van" /> Panel Van</label>
              <label><Field type="radio" name="form" value="integrated" /> Integrated</label>
              <label><Field type="radio" name="form" value="semi_integrated" /> Semi Integrated</label>
            </div>
          </label>

          {/* Engine */}
          <label className={styles.label}>
            Engine
            <div className={styles.radioGroup}>
              <label><Field type="radio" name="engine" value="diesel" /> Diesel</label>
              <label><Field type="radio" name="engine" value="petrol" /> Petrol</label>
              <label><Field type="radio" name="engine" value="hybrid" /> Hybrid</label>
              <label><Field type="radio" name="engine" value="electric" /> Electric</label>
            </div>
          </label>

          {/* Transmission */}
          <label className={styles.label}>
            Transmission
            <div className={styles.radioGroup}>
              <label><Field type="radio" name="transmission" value="automatic" /> Automatic</label>
              <label><Field type="radio" name="transmission" value="manual" /> Manual</label>
            </div>
          </label>

          {/* Buttons */}
          <div className={styles.buttons}>
            <button type="submit" className={styles.searchBtn}>Search</button>
            <button type="button" onClick={() => resetForm()} className={styles.clearBtn}>Clear filters</button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
