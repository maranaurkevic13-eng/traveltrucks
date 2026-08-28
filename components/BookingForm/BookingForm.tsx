"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { bookCamper } from "@/lib/api";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdErrorOutline } from "react-icons/md";

import styles from "./BookingForm.module.css";

const BookingSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-zА-Яа-яІіЇїЄє\s]+$/, "Please enter your name.")
    .required("Please enter your name."),
  email: Yup.string()
    .email("Please enter a valid email.")
    .required("Please enter your email."),
});

export default function BookingForm({ camperId }: { camperId: string }) {
  const [loading, setLoading] = useState(false);
console.log("BookingForm camperId:", camperId);
  return (
    <div className={styles.formWrapper}>
      <h3 className={styles.formTitle}>Book your campervan</h3>
      <p className={styles.formdesc}>Stay connected! We are always ready to help you.</p>
      <Formik
        initialValues={{ name: "", email: "" }}
        validationSchema={BookingSchema}
        onSubmit={async (values, { resetForm }) => {
  setLoading(true);
  try {
    const res = await bookCamper(camperId, values);

    if (res.success) {
      toast.success("✅ Booking successful!");
    } else {
      toast.error("❌ Booking failed. Camper not found.");
    }

  } catch {
    toast.error("❌ Error while booking. Please try again.");
  } finally {
    resetForm({
  values: { name: "", email: "" },
  touched: {},
  errors: {}
});      // ← форма очищається завжди
    setLoading(false);
  }
        }}
        
      >
        
        {({ isSubmitting, errors, touched }) => (
          <Form className={styles.form}>
<label className={styles.label}>
            {errors.name && touched.name && (
                <span className={styles.inputTitle}>Name*</span>
            )}

  <div className={styles.inputWrapper}>
    <Field
      type="text"
      name="name"
      placeholder="Name*"
      className={`${styles.input} ${
        errors.name && touched.name ? styles.inputError : ""
      }`}
    />

    {errors.name && touched.name && (
      <MdErrorOutline className={styles.inputErrorIcon} />
    )}
  </div>
  <ErrorMessage name="name" component="div" className={styles.error} />
</label>

<label className={styles.label}>
              {errors.email && touched.email && (
                  <span className={styles.inputTitle}>Email*</span>
              )}

 <div className={styles.inputWrapper}>
    <Field
      type="email"
      name="email"
      placeholder="Email*"
      className={`${styles.input} ${
        errors.email && touched.email ? styles.inputError : ""
      }`}
    />

    {errors.email && touched.email && (
      <MdErrorOutline className={styles.inputErrorIcon} />
    )}
  </div>
  <ErrorMessage name="email" component="div" className={styles.error} />
</label>


            <button
              type="submit"
              disabled={isSubmitting || loading}
              className={styles.button}
            >
              {loading ? "Booking..." : "Send"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
