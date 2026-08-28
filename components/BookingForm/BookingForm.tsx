"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { bookCamper } from "@/lib/api";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
              resetForm();
            } else {
              toast.error("❌ Booking failed. Camper not found.");
            }
          } catch {
            toast.error("❌ Error while booking. Please try again.");
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <label className={styles.label}>
              
              <Field type="text" name="name" placeholder="Name*" className={styles.input} />
              <ErrorMessage name="name" component="div" className={styles.error} />
            </label>

            <label className={styles.label}>

              <Field type="email" name="email" placeholder="Email*" className={styles.input} />
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
