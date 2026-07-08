import { useNavigate } from "react-router-dom";
import Button from "../../../ui/Button";
import { FaEye } from "react-icons/fa6";
function MemberViewDetails({ id }) {
  const navigate = useNavigate();

  function handleNavigate(id) {
    navigate(`/members/${id}`);
  }

  return (
    <Button size={"small"} design="secondary" onClick={() => handleNavigate(id)}>
      <FaEye className="mx-auto text-slate-700" />
    </Button>
  );
}

export default MemberViewDetails;
