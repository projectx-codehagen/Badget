import Image from "next/image";

// @ts-ignore
export default function PropertyPicture({ src, alt }) {
  // If you want to have a default image, you can set it here
  const defaultImage = "default_image_path.jpg";

  return (
    <div className="flex items-center justify-center overflow-hidden rounded-lg bg-gray-200">
      <Image
        src={src || defaultImage}
        alt={alt || "Property"}
        width={600} // Default width
        height={300} // Default height
        className="object-cover"
      />
    </div>
  );
}

PropertyPicture.defaultProps = {
  src: "https://images.finncdn.no/dynamic/1600w/2023/11/vertical-2/10/2/318/430/822_1071303782.jpg", // Default src as empty string or any default image path
  alt: "Property Image", // Default alt text
  width: 500, // Example default width
  height: 300, // Example default height
};
