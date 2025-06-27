import { useNavigate, useParams } from "react-router-dom";
import { listBuildingsId } from "../../back-end/services/list/list-building-id";
import { useMemo, useState } from "react";
import Modal from "../../utils/components/modal";
import { renderEquipment } from "../../back-end/services/render/render-equipment";
import RenderConfirm from "../../back-end/services/render/render-confirm";
import { addTurnstile } from "../../back-end/services/create/add-turnstile";
import { Building } from "../../back-end/types/building-type";

export default function BuildingTurnstile() {
  const navigate = useNavigate();

  //States realacionados aos dados que serão exibidos
  const { id } = useParams();
  const buildingData = listBuildingsId(id);
  const [building, setBuilding] = useState<Building>(buildingData);
  const [brokenEquipments, setBrokenEquipments] = useState(
    buildingData.equipmentBroken
  );
  const [maintenanceEquipments, setMaintenanceEquipments] = useState(
    buildingData.equipmentMaintenance
  );
  const groupedEntries = buildingData.inputsAndOutput.reduce((acc, entry) => {
    if (!acc[entry.idTurnstile]) acc[entry.idTurnstile] = [];
    acc[entry.idTurnstile].push(entry);
    return acc;
  }, {} as Record<string, typeof buildingData.inputsAndOutput>);

  //State que armazena o equipamento selecionado
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);

  //States relacioandos a abertura da modal
  const [modalBrokenOpen, setModalBrokenOpen] = useState(false);
  const [modalAddTurnstileOpen, setModalAddTurnstileOpen] = useState(false);

  //States relacionados a quantidade de itens visíveis
  const [visibleTurnstileCounts, setVisibleTurnstileCounts] = useState<
    Record<string, number>
  >({});
  const [visibleMaintenanceCount, setVisibleMaintenanceCount] = useState(3);
  const [visibleBrokenCount, setVisibleBrokenCount] = useState(3);

  //Função que alterna entre expandir e recolher a lista de itens
  const toggleList = (
    current: number,
    total: number,
    set: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const isExpanded = current >= total;
    set(isExpanded ? 3 : Math.min(current + 10, total));
  };

  const toggleGroupedList = (catracaId: string, total: number) => {
    setVisibleTurnstileCounts((prev) => {
      const current = prev[catracaId] ?? 3;
      const isExpanded = current >= total;
      return {
        ...prev,
        [catracaId]: isExpanded ? 3 : Math.min(current + 10, total),
      };
    });
  };

  return (
    <div>
      {/* Botão para voltar ao perfil e título */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          style={{
            height: "30px",
            width: "30px",
            marginTop: "25px",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/profile/${buildingData.id}`)}
        >
          &lt;-
        </button>

        <h1>Catracas</h1>
      </div>

      {/* Exibe quantidade de catracas e botão para adicionar uma nova catraca */}
      <div>
        <h2>Informações Gerais:</h2>

        <p>
          <b>Quantidade de catracas: </b>
          {building.qtyTurnstiles}
        </p>

        <button
          style={{ cursor: "pointer" }}
          onClick={() => {
            setModalAddTurnstileOpen(true);
          }}
        >
          Adicionar catraca por 10
        </button>

        <Modal
          isOpen={modalAddTurnstileOpen}
          onClose={() => setModalAddTurnstileOpen(false)}
        >
          <h2>Confirmar Instalação</h2>
          <RenderConfirm
            cost={10}
            onConfirm={() => setBuilding((prev) => addTurnstile(prev))}
            onClose={() => setModalAddTurnstileOpen(false)}
          />
        </Modal>
      </div>

      {/* Exibe o fluxo de pessos por catraca */}
      <div>
        <h2>Tráfego de Pessoas por Catraca:</h2>

        <table>
          {Object.entries(groupedEntries).map(([catracaId, entries]) => {
            const visibleCount = visibleTurnstileCounts[catracaId] ?? 3;

            return (
              <tbody key={catracaId}>
                <tr>
                  <th style={{ border: "1px solid black" }}>Id Catraca</th>
                  <td style={{ border: "1px solid black" }}>{catracaId}</td>
                </tr>
                <tr>
                  <th style={{ border: "1px solid black" }}>Foto</th>
                  <th style={{ border: "1px solid black" }}>Nome</th>
                  <th style={{ border: "1px solid black" }}>Entrou</th>
                  <th style={{ border: "1px solid black" }}>Saiu</th>
                </tr>
                {entries.slice(0, visibleCount).map((entry, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid black" }}>{entry.photo}</td>
                    <td style={{ border: "1px solid black" }}>{entry.name}</td>
                    <td
                      style={{
                        border: "1px solid black",
                        backgroundColor: entry.entered ? "green" : "",
                      }}
                    >
                      entrou
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        backgroundColor: !entry.entered ? "green" : "",
                      }}
                    >
                      saiu
                    </td>
                  </tr>
                ))}
                {entries.length > 3 && (
                  <tr>
                    <td>
                      <button
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          toggleGroupedList(catracaId, entries.length)
                        }
                      >
                        {visibleCount >= entries.length
                          ? "Mostrar menos"
                          : "Expandir lista"}
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            );
          })}
        </table>
      </div>

      {/* Exibe os equipamentos quebrados e modal para arcar com o custo do equipamento */}
      <div>
        <h2>Equipamentos Quebrados:</h2>

        <table>
          <tbody>
            <tr>
              <th style={{ border: "1px solid black" }}>Id Catraca</th>
              <th style={{ border: "1px solid black" }}>Status</th>
              <th style={{ border: "1px solid black" }}>Custo</th>
            </tr>
            {brokenEquipments.length > 0 ? (
              brokenEquipments
                .filter((equipments) => equipments.type === "Catraca")
                .slice(0, visibleBrokenCount)
                .map((equipment) => (
                  <tr
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedEquipment(equipment);
                      setModalBrokenOpen(true);
                    }}
                    key={equipment.id}
                  >
                    <td style={{ border: "1px solid black" }}>
                      {equipment.id}
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {equipment.status}
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {equipment.cost}
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td>Nenhum equipamento quebrado</td>
              </tr>
            )}

            <Modal
              isOpen={modalBrokenOpen}
              onClose={() => setModalBrokenOpen(false)}
            >
              <h2>Arcar com custo</h2>
              {renderEquipment(
                selectedEquipment,
                brokenEquipments,
                setBrokenEquipments,
                maintenanceEquipments,
                setMaintenanceEquipments,
                () => setModalBrokenOpen(false)
              )}
            </Modal>
          </tbody>
        </table>

        {brokenEquipments.length > 3 && (
          <button
            style={{ cursor: "pointer" }}
            onClick={() =>
              toggleList(
                visibleBrokenCount,
                brokenEquipments.length,
                setVisibleBrokenCount
              )
            }
          >
            {visibleBrokenCount >= brokenEquipments.length
              ? "Mostrar menos"
              : "Expandir lista"}
          </button>
        )}
      </div>

      {/* Exibe as catracas que estão em manutenção */}
      <div>
        <h2>Equipamentos em Manutenção:</h2>

        <table>
          <tbody>
            <tr>
              <th style={{ border: "1px solid black" }}>Id Catraca</th>
              <th style={{ border: "1px solid black" }}>
                Data Inicial do Concerto
              </th>
              <th style={{ border: "1px solid black" }}>
                Data Prevista do Fim do Concerto
              </th>
            </tr>
            {maintenanceEquipments.length > 0 ? (
              maintenanceEquipments
                .filter((equipment) => equipment.type === "Catraca")
                .slice(0, visibleMaintenanceCount)
                .map((equipment) => (
                  <tr key={equipment.id}>
                    <td style={{ border: "1px solid black" }}>
                      {equipment.id}
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {equipment.dateStart}
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {equipment.scheduledDate}
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={3}>Nenhum equipamento em manutenção</td>
              </tr>
            )}
          </tbody>
        </table>

        {maintenanceEquipments.length > 3 && (
          <button
            style={{ cursor: "pointer" }}
            onClick={() =>
              toggleList(
                visibleMaintenanceCount,
                maintenanceEquipments.length,
                setVisibleMaintenanceCount
              )
            }
          >
            {visibleMaintenanceCount >= maintenanceEquipments.length
              ? "Mostrar menos"
              : "Expandir lista"}
          </button>
        )}
      </div>
    </div>
  );
}
