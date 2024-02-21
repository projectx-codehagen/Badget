// components/properties/PropertyImageWithOptions.js
import { SelectInputForm } from "../forms/select-input-form";
import PropertyPicture from "./PropertyPicture";

// @ts-ignore
const PropertyImageWithOptions = ({ image }) => {
  console.log(image);
  // Transform the image options into the correct format for SelectInputForm
  const options = [
    {
      key: "option1",
      label: "Option 1",
      description: image.option1,
      imageId: image.id,
      selectedOption: image.selectedOption,
    },
    {
      key: "option2",
      label: "Option 2",
      description: image.option2,
      imageId: image.id,
      selectedOption: image.selectedOption,
    },
    {
      key: "option3",
      label: "Option 3",
      description: image.option3,
      imageId: image.id,
      selectedOption: image.selectedOption,
    },
  ].filter((option) => option.description); // Filter out options without a description

  return (
    <div className="min-lg:flex-col justify-center gap-x-4 max-lg:space-y-4 lg:flex">
      <div className="lg:w-1/2">
        <PropertyPicture src={image.url} alt={image.description} />
      </div>
      <div className="lg:w-1/2">
        <SelectInputForm image={image} options={options} />
      </div>
    </div>
  );
};

export default PropertyImageWithOptions;
