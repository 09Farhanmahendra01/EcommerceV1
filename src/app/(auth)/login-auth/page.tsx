"use client";

import Image from "next/image";
import IconBrand from "../../../../public/icons/Brand.png";

import { Formik } from "formik";
import { LoginvalidationSchema } from "@/lib/validations";

import TextInputEmail from "@/components/text-inputs/email";
import TextInputPassword from "@/components/text-inputs/password";
import Link from "next/link";
import ModalInputEmail from "@/components/modals/input-email";

const LoginAuthPage = () => {
  return (
    <div className="mt-2">
      {/* brand */}
      <div className="flex justify-center items-center">
        <div className="relative w-24 h-15 sm:w-28 sm:h-28 md:w-32 md:h-32">
          <Image src={IconBrand} alt="Brand" fill className="object-contain" />
        </div>
      </div>

      {/* Welcome speech */}
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-xl lg:text-4xl text-black font-extrabold">
          Selamat Datang
        </h2>
        <p className="text-sm lg:text-l text-gray-400">
          Silahkan masuk ke akun Anda
        </p>
      </div>

      {/* Input */}
      <Formik
        initialValues={{
          email: "",
          password: "",
          isModalForgetPasswordActive: false,
        }}
        validationSchema={LoginvalidationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit, handleBlur, setFieldValue, values, errors }) => {
          return (
            <form onSubmit={handleSubmit}>
              {/* input area */}
              <div className="mt-3 lg:mt-7 relative">
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
                  onBlur={handleBlur}
                />
                {/* forget password */}
                <div className="absolute right-0 lg:mt-2 z-10">
                  <button
                    type="button"
                    onClick={() =>
                      setFieldValue("isModalForgetPasswordActive", true)
                    }
                    className="text-xs lg:text-sm text-gray-400 cursor-pointer hover:text-purple-600"
                  >
                    Lupa Password?
                  </button>
                </div>

                {/* error password */}
                {errors.password && (
                  <p className="validator-hint text-xs lg:text-sm">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* login button */}
              <div
                className={`flex justify-center  ${
                  errors.password ? "mt-9 lg:mt-10" : "mt-17 lg:mt-16"
                }`}
              >
                <button
                  type="submit"
                  className="btn btn-active btn-primary w-80 "
                >
                  Login
                </button>
              </div>

              {/*  */}
              {values.isModalForgetPasswordActive && (
                <ModalInputEmail
                  modalId="modal_input_email"
                  onClose={() =>
                    setFieldValue("isModalForgetPasswordActive", false)
                  }
                />
              )}
            </form>
          );
        }}
      </Formik>

      {/* registrasi account */}
      <div className="flex flex-row justify-center items-center mt-5 lg:mt-7">
        <p className="text-gray-400 text-xs lg:text-sm">
          Belum memiliki akun?{" "}
        </p>
        <Link
          href={"/register-auth"}
          className="text-purple-700 text-xs lg:text-sm font-extrabold ml-1"
        >
          Silahkan Daftar
        </Link>
      </div>
    </div>
  );
};

export default LoginAuthPage;

/*

*/
