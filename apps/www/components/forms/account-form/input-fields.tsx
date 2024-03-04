import { useFormContext } from "react-hook-form";

import { CommonAccountFields } from "./common-account-fields";

export const InputFormFields = () => {
  const { control } = useFormContext();
  return (
    <>
      <CommonAccountFields />
    </>
  );
};
