import React from "react";

// Login auth
export interface TextInputEmailProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  title?: string;
  pattern?: string;
  classNameLegend?: string;
  classNameLabel?: string;
  classNameInput?: string;
}

// Register auth
export interface TextInputPasswordProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fill?: string;
  placeHolder?: string;
  classNameInput?: string;
  pattern?: string;
  title?: string;
  classNameLegend?: string;
  classNameLabel?: string;
  classNameSVG?: string;
}

// Email OTP auth
export interface ModalEmailOTPProps {
  modalId: string;
  emailAddress: string;
  onClose: () => void;
}

// Input Email auth
export interface ModalInputEmailProps {
  modalId: string;
  onClose: () => void;
}
