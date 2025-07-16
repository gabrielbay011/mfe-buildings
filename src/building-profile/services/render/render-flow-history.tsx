import { useState } from "react";
import { Building } from "../../../utils/types/building-type";

type Props = {
  building?: Building;
};

//Função para renderizar o histórico de saldo do usuário
export function RenderFlowHistory({ building }: Props) {
  const [visibleCount, setVisibleCount] = useState(3);

  if (!building?.flowComplete || building.flowComplete.length === 0) {
    return <p>Você ainda não tem dados de fluxo mensal</p>;
  }

  const total = building.flowComplete.length;
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
          {building.flowComplete.slice(0, visibleCount).map((flow, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid black" }}>{flow.month}</td>
              <td style={{ border: "1px solid black" }}>{flow.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {total > 3 && (
        <button
          className="bg-gray-200 border border-gray-700 p-1 cursor-pointer rounded-sm hover:bg-gray-300"
          onClick={toggleList}
        >
          {isExpanded ? "Mostrar menos" : "Expandir lista"}
        </button>
      )}
    </>
  );
}
