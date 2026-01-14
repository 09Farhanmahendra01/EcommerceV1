import * as Yup from "yup";

// login schema validation
export const LoginvalidationSchema = Yup.object({
  email: Yup.string()
    .email("- Format email tidak valid")
    .max(100, "- Email maksimal 100 karakter")
    .required("- Email wajib diisi"),
  password: Yup.string()
    .min(8, "- Password minimal 8 karakter")
    .max(50, "- Password maksimal 50 karakter")
    .matches(/[0-9]/, "- Password harus mengandung minimal 1 angka")
    .matches(/[a-z]/, "- Password harus mengandung minimal 1 huruf kecil")
    .matches(/[A-Z]/, "- Password harus mengandung minimal 1 huruf besar")
    .required("- Password wajib diisi"),
});

// register schema validation
export const RegistervalidationSchema = Yup.object({
  email: Yup.string()
    .email("- Format email tidak valid")
    .max(100, "- Email maksimal 100 karakter")
    .required("- Email wajib diisi"),
  password: Yup.string()
    .min(8, "- Password minimal 8 karakter")
    .max(50, "- Password maksimal 50 karakter")
    .matches(/[0-9]/, "- Password harus mengandung minimal 1 angka")
    .matches(/[a-z]/, "- Password harus mengandung minimal 1 huruf kecil")
    .matches(/[A-Z]/, "- Password harus mengandung minimal 1 huruf besar")
    .required("- Password wajib diisi"),
  confirmationPassword: Yup.string()
    .oneOf([Yup.ref("password")], "- Password tidak cocok")
    .max(50, "- Konfirmasi password maksimal 50 karakter")
    .required("- Konfirmasi password wajib diisi"),
});
