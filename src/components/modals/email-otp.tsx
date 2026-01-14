import { useEffect, useRef, useState } from "react";
import { ModalEmailOTPProps } from "@/types/auth-props";

import OTPInput from "react-otp-input";
import Image from "next/image";

import GmailIcon from "../../../public/icons/gmail-icon.svg";

const ModalEmailOTP = ({
  modalId,
  emailAddress,
  onClose,
}: ModalEmailOTPProps) => {
  // VARIABLE AREA
  const [otp, setOtp] = useState<string>("");

  const MAX_COUNTDOWN = 60;
  const MIN_COUNTDOWN = 1;

  const MAX_OTP_LENGTH = 6;

  const [countDown, setCountDown] = useState(MAX_COUNTDOWN);

  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // HANDLER AREA

  const minute = Math.floor(countDown / MAX_COUNTDOWN);
  const second = countDown % MAX_COUNTDOWN;

  const handleChangeOTP = (OTPValue: string) => {
    setOtp(OTPValue);

    if (OTPValue.length === MAX_OTP_LENGTH) {
      console.log("finish");
    }
  };

  const startTimeOTP = () => {
    timeRef.current = setInterval(() => {
      setCountDown((value) => {
        if (value <= MIN_COUNTDOWN) {
          if (timeRef.current) clearInterval(timeRef.current);
          return 0;
        }
        return value - MIN_COUNTDOWN;
      });
    }, 1000);
  };

  const handleResendCode = () => {
    setCountDown(MAX_COUNTDOWN);
    setOtp("");
    startTimeOTP();
  };

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }

    startTimeOTP();

    return () => {
      if (timeRef.current) clearInterval(timeRef.current);
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      id={modalId}
      onCancel={onClose}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box bg-white">
        {/* header */}
        <div className="flex flex-col justify-center items-center ">
          {/* title  */}
          <div className="flex flex-col justify-center items-center">
            <Image src={GmailIcon} alt="gmail-icon" width={50} height={50} />
            <h3 className="font-bold font-sans textarea-xl text-gray-800">
              Verifikasi Email
            </h3>
          </div>

          {/* description */}
          <p className="text-center text-gray-600 text-sm mt-2">
            Masukkan kode OTP yang telah dikirim ke email{" "}
            <span className="font-extrabold">{emailAddress}</span>
          </p>
        </div>

        {/* input OTP */}

        <div className="flex justify-center mb-6 mt-4">
          <OTPInput
            value={otp}
            onChange={handleChangeOTP}
            numInputs={6}
            renderSeparator={<span></span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              width: "clamp(2rem, 11vw, 3.5rem)",
              height: "clamp(2rem, 11vw, 3.5rem)",
              margin: "0",
              fontSize: "clamp(1rem, 5vw, 1.5rem)",
              borderRadius: "8px",
              border: "2px solid #e5e7eb",
              backgroundColor: "#f9fafb",
              color: "#1f2937",
              fontWeight: "600",
              outline: "none",
              transition: "all 0.2s",
            }}
            containerStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "clamp(0.25rem, 1vw, 0.5rem)",
              padding: "0 1rem",
              maxWidth: "100%",
            }}
            inputType="tel"
          />
        </div>

        {/* Resend code */}
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-600 text-sm font-bold">
            Tidak menerima kode?
          </p>

          {countDown > 0 ? (
            <div className="flex flex-row justify-center items-center">
              <p className="text-sm text-purple-900 mr-2 font-bold">
                Harap tunggu dalam
              </p>
              <p className="text-sm text-purple-900 mr-2">-</p>
              <span className="countdown font-mono text-sm text-gray-950">
                <span
                  style={
                    { "--value": minute, "--digits": 2 } as React.CSSProperties
                  }
                  aria-live="polite"
                >
                  {String(minute).padStart(2, "0")}
                </span>
                :
                <span
                  style={
                    { "--value": second, "--digits": 2 } as React.CSSProperties
                  }
                  aria-live="polite"
                >
                  {String(second).padStart(2, "0")}
                </span>
              </span>
            </div>
          ) : (
            <button
              className="text-sm text-purple-700 hover:text-purple-800 font-extrabold underline underline-offset-1"
              onClick={handleResendCode}
            >
              Kirim Ulang Kode
            </button>
          )}
        </div>

        {/* button close */}
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ModalEmailOTP;
