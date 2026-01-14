"use client";

import Image from "next/image";
import IconBrand from "../../../../public/icons/Brand.png";

import { Formik } from "formik";
import { RegistervalidationSchema } from "@/lib/validations";

import TextInputEmail from "@/components/text-inputs/email";
import TextInputPassword from "@/components/text-inputs/password";
import ModalEmailOTP from "@/components/modals/email-otp";
import Link from "next/link";

const LoginAuthRegister = () => {
  return (
    <div className="mt-5">
      {/* brand */}
      <div className="hidden lg:flex justify-center items-center">
        <div className="relative w-24 h-15 sm:w-28 sm:h-28 md:w-32 md:h-32">
          <Image src={IconBrand} alt="Brand" fill className="object-contain" />
        </div>
      </div>

      {/* Welcome speech */}
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-lg lg:text-4xl text-black font-extrabold">
          Buat Akun Baru Anda
        </h2>
        <p className="text-sm lg:text-l text-gray-400">
          Silakan lengkapi data di bawah ini untuk mendaftar
        </p>
      </div>

      {/* Input */}
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmationPassword: "",
          isopenOTPModal: false,
        }}
        validationSchema={RegistervalidationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={(values, { setFieldValue }) => {
          setFieldValue("isopenOTPModal", true);
        }}
      >
        {({ handleSubmit, handleBlur, setFieldValue, values, errors }) => {
          return (
            <form onSubmit={handleSubmit}>
              {/* input area */}
              <div className="mt-5 lg:mt-7">
                {/* email */}
                <TextInputEmail
                  name="email"
                  value={values.email}
                  onChange={(e) => setFieldValue("email", e.target.value)}
                  onBlur={handleBlur}
                />
                {/* error email */}
                {errors.email && (
                  <p className={"text-xs lg:text-sm text-red-400 mt-1"}>
                    {errors.email}
                  </p>
                )}
                {/* password */}
                <TextInputPassword
                  name="password"
                  value={values.password}
                  onChange={(e) => setFieldValue("password", e.target.value)}
                  classNameLegend="fieldset-legend text-gray-800 lg:mt-4 text-sm"
                  onBlur={handleBlur}
                />

                {/* error password */}
                {errors.password && (
                  <p className="validator-hint text-xs lg:text-sm">
                    {errors.password}
                  </p>
                )}

                {/* konfirm password */}
                <TextInputPassword
                  label="Konfirmasi Password"
                  name="confirmationPassword"
                  placeHolder="Masukkan Konfirmasi Password"
                  value={values.confirmationPassword}
                  onChange={(e) =>
                    setFieldValue("confirmationPassword", e.target.value)
                  }
                  onBlur={handleBlur}
                  classNameLegend="fieldset-legend text-gray-800 lg:mt-4 text-sm"
                />

                {/* error confirmation password */}
                {errors.confirmationPassword && (
                  <p className="validator-hint text-xs lg:text-sm">
                    {errors.confirmationPassword}
                  </p>
                )}
              </div>

              {/* signUp button */}
              <div
                className={`flex justify-center  ${
                  errors.password ? "mt-5" : "mt-10"
                }`}
              >
                <button
                  type="submit"
                  className="btn btn-active btn-primary w-80"
                >
                  Daftar
                </button>

                {/* Modal OTP */}
                {values.isopenOTPModal && (
                  <ModalEmailOTP
                    modalId="modal-otp"
                    emailAddress={values.email}
                    onClose={() => setFieldValue("isopenOTPModal", false)}
                  />
                )}
              </div>
            </form>
          );
        }}
      </Formik>

      {/* registrasi account */}
      <div className="flex flex-row justify-center items-center mt-5 lg:mt-7">
        <p className="text-gray-400 text-xs lg:text-sm">
          Sudah memiliki akun?{" "}
        </p>
        <Link
          href={"/login-auth"}
          className="text-purple-700 text-xs lg:text-sm font-black ml-1"
        >
          Silahkan Login
        </Link>
      </div>
    </div>
  );
};

export default LoginAuthRegister;
