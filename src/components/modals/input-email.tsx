import { useEffect, useRef } from "react";
import { ModalInputEmailProps } from "@/types/auth-props";
import TextInputEmail from "../text-inputs/email";
import { Formik } from "formik";
import { LoginvalidationSchema } from "@/lib/validations";
import ModalEmailOTP from "./email-otp";

const ModalInputEmail = ({ modalId, onClose }: ModalInputEmailProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, []);

  return (
    <dialog
      ref={dialogRef}
      id={modalId}
      onCancel={onClose}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box bg-white">
        {/* Title */}
        <h3 className="font-bold text-lg text-gray-800">Lupa Password</h3>

        {/* Description */}
        <p className="py-2 text-sm text-gray-600">
          Masukkan email yang terdaftar. Kami akan mengirimkan kode OTP ke email
          tersebut.
        </p>

        {/* Email Input */}
        <Formik
          initialValues={{ email: "", isopenOTPModal: false }}
          validationSchema={LoginvalidationSchema.pick(["email"])}
          onSubmit={(values, { setFieldValue }) => {
            setFieldValue("isopenOTPModal", true);
          }}
        >
          {({ values, errors, handleBlur, setFieldValue, handleSubmit }) => (
            <div>
              <TextInputEmail
                name="email"
                value={values.email}
                onChange={(e) => setFieldValue("email", e.target.value)}
                onBlur={handleBlur}
                classNameLegend="fieldset-legend text-gray-400 text-sm"
                clasNameLabel="input validator w-115 h-10 bg-gray-300"
              />
              {errors.email && (
                <p className={"text-sm text-red-400 mt-1"}>{errors.email}</p>
              )}
              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-outline btn-error"
                  onClick={onClose}
                >
                  Batal
                </button>

                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => handleSubmit()}
                >
                  Kirim OTP
                </button>
              </div>

              {/* Modal OTP */}
              {values.isopenOTPModal && (
                <ModalEmailOTP
                  modalId="modal-otp"
                  emailAddress={values.email}
                  onClose={() => setFieldValue("isopenOTPModal", false)}
                />
              )}
            </div>
          )}
        </Formik>
      </div>
    </dialog>
  );
};

export default ModalInputEmail;
