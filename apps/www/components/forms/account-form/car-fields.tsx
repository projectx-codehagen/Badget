import { useFormContext } from "react-hook-form";

import { CommonAccountFields } from "./common-account-fields";

export const CarFormFields = () => {
  const { control } = useFormContext();
  return (
    <>
      <CommonAccountFields />
    </>
  );
};
