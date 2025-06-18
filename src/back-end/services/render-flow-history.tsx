import { mockBuildings } from "../../utils/mock-users";
import { Building } from "../types/building-type";

export function listFlowHistory(buildingId: string) {
  return mockBuildings.find((building) => building.id === buildingId);
}

export function renderFlowHistory(building?: Building) {
  if (!building?.fluxoCompleto || building.fluxoCompleto.length === 0) {
    return <p>Você ainda não tem dados de fluxo mensal</p>;
  }

  return (
    <table style={{ border: "1px solid black", marginTop: 20 }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid black" }}>Mês</th>
          <th style={{ border: "1px solid black" }}>Quantidade</th>
        </tr>
      </thead>
      <tbody>
        {building.fluxoCompleto.map((fluxo, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid black" }}>{fluxo.mes}</td>
            <td style={{ border: "1px solid black" }}>{fluxo.quantidade}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
