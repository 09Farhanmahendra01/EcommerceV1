import { TextInputEmailProps } from "@/types/auth-props";

const TextInputEmail = ({
  name,
  value,
  onChange,
  onBlur,
  pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
  title = "Format email tidak valid. Contoh: user@example.com",
  placeHolder = "Masukkan Email",
  classNameLegend = "fieldset-legend text-slate-700 text-sm font-medium",
  classNameLabel = "input validator lg:w-120 h-10 lg:h-13 bg-gray-50 backdrop-blur-sm border-2 border-slate-300 focus-within:border-indigo-600 focus-within:bg-indigo-50/50 focus-within:shadow-sm hover:border-indigo-600 transition-all duration-200 rounded-lg",
  classNameInput = "placeholder:text-slate-400 text-slate-800 text-sm w-full bg-transparent focus:outline-none",
}: TextInputEmailProps) => {
  return (
    <>
      <legend className={classNameLegend}>Email</legend>
      <label className={classNameLabel}>
        <input
          type="email"
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          title={title}
          pattern={pattern}
          required
          className={classNameInput}
          placeholder={placeHolder}
        />
      </label>
    </>
  );
};

export default TextInputEmail;
