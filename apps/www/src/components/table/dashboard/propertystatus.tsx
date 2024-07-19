import {
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  PersonIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const propertyStatuses = [
  {
    value: "NOT_STARTED",
    label: "Not Started",
    icon: QuestionMarkCircledIcon, // Replace with your chosen icon
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
    icon: StopwatchIcon, // Replace with your chosen icon
  },
  {
    value: "DONE",
    label: "Done",
    icon: CheckCircledIcon, // Replace with your chosen icon
  },
  {
    value: "CANCELED",
    label: "Canceled",
    icon: CrossCircledIcon, // Replace with your chosen icon
  },
];

// export const propertyLabels = {
//   APARTMENT: { label: "Apartment" /* icon or other attributes */ },
//   HOUSE: { label: "House" /* icon or other attributes */ },
//   CABIN: { label: "Cabin" /* icon or other attributes */ },
//   PROPERTY: { label: "Awaiting Details" /* icon or other attributes */ },
// };

export const propertyLabels = [
  {
    label: "Apartment",
    value: "APARTMENT",
    // icon: ApartmentIcon, // Optional, if you have an icon to represent this label
  },
  {
    label: "House",
    value: "HOUSE",
    // icon: HouseIcon, // Optional
  },
  {
    label: "Cabin",
    value: "CABIN",
    // icon: CabinIcon, // Optional
  },
  {
    label: "Awaiting Details",
    value: "PROPERTY",
    // icon: PropertyIcon, // Optional
  },
  // ... other labels if you have more
];
