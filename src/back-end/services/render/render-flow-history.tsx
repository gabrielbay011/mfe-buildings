import { useState } from "react";
import { Building } from "../../types/building-type";

type Props = {
  building?: Building;
};

export function RenderFlowHistory({ building }: Props) {
  const [visibleCount, setVisibleCount] = useState(3);

  if (!building?.fluxoCompleto || building.fluxoCompleto.length === 0) {
    return <p>Você ainda não tem dados de fluxo mensal</p>;
  }

  const total = building.fluxoCompleto.length;
  const isExpanded = visibleCount >= total;

  const toggleList = () => {
    setVisibleCount(isExpanded ? 3 : Math.min(visibleCount + 10, total));
  };

  return (
    <>
      <table style={{ border: "1px solid black", marginTop: 20 }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black" }}>Mês</th>
            <th style={{ border: "1px solid black" }}>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {building.fluxoCompleto.slice(0, visibleCount).map((fluxo, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid black" }}>{fluxo.mes}</td>
              <td style={{ border: "1px solid black" }}>{fluxo.quantidade}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {total > 3 && (
        <button onClick={toggleList}>
          {isExpanded ? "Mostrar menos" : "Expandir lista"}
        </button>
      )}
    </>
  );
}
