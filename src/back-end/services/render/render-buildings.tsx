import { useNavigate } from "react-router-dom";
import { Building } from "../../types/building-type";

type Props = {
  building: Building[];
};

//Função para renderizar os edifícios
export function RenderBuildings({ building }: Props) {
  const navigate = useNavigate();

  if (building.length === 0) {
    return <p>Você ainda não tem nenhum edifício cadastrado</p>;
  }

  return (
    <table style={{ border: "1px solid black" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid black" }}>id</th>
          <th style={{ border: "1px solid black" }}>foto</th>
          <th style={{ border: "1px solid black" }}>nome</th>
        </tr>
      </thead>
      <tbody>
        {building.map((building) => (
          <tr key={building.id}>
            <td
              onClick={() => navigate(`/profile/${building.id}`)}
              style={{ border: "1px solid black", cursor: "pointer" }}
            >
              {building.id}
            </td>
            <td
              onClick={() => navigate(`/profile/${building.id}`)}
              style={{ border: "1px solid black", cursor: "pointer" }}
            >
              {building.photo}
            </td>
            <td
              onClick={() => navigate(`/profile/${building.id}`)}
              style={{ border: "1px solid black", cursor: "pointer" }}
            >
              {building.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
