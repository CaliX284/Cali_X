import { useCaptains } from "./useCaptains";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import CaptainBox from "./CaptainBox";

function CaptainsArea() {
  const { captains, isPending, error, captainsCount } = useCaptains();

  if (isPending) return <Spinner />;

  console.log(captainsCount);

  if (error) return <Error />;
  return (
    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {captains.map((captain) => (
        <CaptainBox key={captain.id} captain={captain} />
      ))}
    </div>
  );
}

export default CaptainsArea;
