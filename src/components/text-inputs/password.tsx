import { TextInputPasswordProps } from "@/types/auth-props";

const TextInputPassword = ({
  label = "Password",
  name,
  value,
  onChange,
  onBlur,
  fill = "currentColor",
  placeHolder = "Masukkan Password",
  classNameInput = "placeholder:text-slate-400 text-slate-800 text-sm w-full bg-transparent focus:outline-none",
  pattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$",
  title = "Password minimal 8 karakter, mengandung minimal 1 angka, 1 huruf kecil, dan 1 huruf besar",
  classNameLegend = "fieldset-legend text-slate-700 text-sm font-medium mt-3 lg:mt-4",
  classNameLabel = "input validator lg:w-120 h-10 lg:h-13 bg-gray-50 backdrop-blur-sm border-2 border-slate-300 focus-within:border-indigo-600 focus-within:bg-indigo-50/50 focus-within:shadow-sm hover:border-indigo-600 transition-all duration-200 rounded-lg",

  classNameSVG = "h-5 w-5 text-slate-400",
}: TextInputPasswordProps) => {
  return (
    <>
      <legend className={classNameLegend}>{label}</legend>
      <label className={classNameLabel}>
        <svg
          className={classNameSVG}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill={"white"}
            stroke="currentColor"
          >
            <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
          </g>
        </svg>
        <input
          type="password"
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required
          placeholder={placeHolder}
          className={classNameInput}
          pattern={pattern}
          title={title}
        />
      </label>
    </>
  );
};

export default TextInputPassword;
