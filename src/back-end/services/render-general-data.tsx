import { useNavigate } from "react-router-dom";
import { mockBuildings } from "../../utils/mock-users";
import { Building } from "../types/building-type";

export function renderBuildings(building: Building[]) {
  if (mockBuildings.length == 0) {
    return <p>Você ainda não tem nenhum edifício cadastrado</p>;
  }
  const navigate = useNavigate();
  return building.map((building) => (
    <div
      key={building.id}
      style={{
        display: "flex",
        gap: "10px",
        border: "1px solid black",
      }}
    >
      <p onClick={() => navigate(`/profile/${building.id}`)}>{building.id}</p>
      <p onClick={() => navigate(`/profile/${building.id}`)}>{building.foto}</p>
      <p onClick={() => navigate(`/profile/${building.id}`)}>{building.nome}</p>
    </div>
  ));
}
