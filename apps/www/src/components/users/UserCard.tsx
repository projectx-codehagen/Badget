import UserCardsSection from "./UserCardsSection";
import { UserMainSection } from "./UserMainSection";

export default function UserCard({ customerDetails }) {
  return (
    <div>
      <UserCardsSection customerDetails={customerDetails} />
      <UserMainSection customerDetails={customerDetails} />
    </div>
  );
}
