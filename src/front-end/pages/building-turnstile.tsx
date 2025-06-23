import { useNavigate, useParams } from "react-router-dom";
import { listBuildingsId } from "../../back-end/services/list/list-building-id";
import { useState } from "react";
import Modal from "../../utils/components/modal";
import { renderEquipment } from "../../back-end/services/render/render-equipment";
import RenderConfirm from "../../back-end/services/render/render-confirm";
import { addTurnstile } from "../../back-end/services/create/add-turnstile";

export default function BuildingTurnstile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const buildingData = listBuildingsId(id);
  const [modalBrokenOpen, setModalBrokenOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
  const [building, setBuilding] = useState(buildingData);
  const [modalAddTurnstileOpen, setModalAddTurnstileOpen] = useState(false);

  const [visibleTurnstileCount, setVisibleTurnstileCount] = useState(3);
  const [visibleMaintenanceCount, setVisibleMaintenanceCount] = useState(3);
  const [visibleBrokenCount, setVisibleBrokenCount] = useState(3);

  const toggleList = (
    current: number,
    total: number,
    set: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const isExpanded = current >= total;
    set(isExpanded ? 3 : Math.min(current + 10, total));
  };

  return (
    <div>
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

      <div>
        <h2>Informações Gerais:</h2>
        <p>
          <b>Quantidade de catracas: </b>
          {building.qtdCatracas}
        </p>
        <button
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

      <div>
        <h2>Tráfego de Pessoas por Catraca:</h2>
        <table>
          {buildingData.entradasESaidas.length > 0 ? (
            buildingData.entradasESaidas
              .slice(0, visibleTurnstileCount)
              .map((turnslite) => (
                <tbody>
                  <tr>
                    <th style={{ border: "1px solid black" }}>Id Catraca</th>
                    <td style={{ border: "1px solid black" }}>
                      {turnslite.idCatraca}
                    </td>
                  </tr>
                  <tr>
                    <th style={{ border: "1px solid black" }}>Foto</th>
                    <th style={{ border: "1px solid black" }}>Nome</th>
                    <th style={{ border: "1px solid black" }}>Entrou</th>
                    <th style={{ border: "1px solid black" }}>Saiu</th>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black" }}>
                      {turnslite.foto}
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {turnslite.nome}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        backgroundColor:
                          turnslite.entrou === true ? "green" : "",
                      }}
                    >
                      entrou
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        backgroundColor:
                          turnslite.entrou === false ? "green" : "",
                      }}
                    >
                      saiu
                    </td>
                  </tr>
                </tbody>
              ))
          ) : (
            <tr>
              <td>Nenhum registro encontrado</td>
            </tr>
          )}
        </table>
        {buildingData.entradasESaidas.length > 3 && (
          <button
            onClick={() =>
              toggleList(
                visibleTurnstileCount,
                buildingData.entradasESaidas.length,
                setVisibleTurnstileCount
              )
            }
          >
            {visibleTurnstileCount >= buildingData.entradasESaidas.length
              ? "Mostrar menos"
              : "Expandir lista"}
          </button>
        )}
      </div>

      <div>
        <h2>Equipamentos Quebrados:</h2>
        <table>
          <tbody>
            <tr>
              <th style={{ border: "1px solid black" }}>Id Catraca</th>
              <th style={{ border: "1px solid black" }}>Status</th>
              <th style={{ border: "1px solid black" }}>Custo</th>
            </tr>
            {buildingData.equipamentosQuebrados.length > 0 ? (
              buildingData.equipamentosQuebrados
                .filter((equipments) => equipments.tipo === "Catraca")
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
                      {equipment.custo}
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
              {renderEquipment(selectedEquipment)}
            </Modal>
          </tbody>
        </table>
        {buildingData.equipamentosQuebrados.length > 3 && (
          <button
            onClick={() =>
              toggleList(
                visibleBrokenCount,
                buildingData.equipamentosQuebrados.length,
                setVisibleBrokenCount
              )
            }
          >
            {visibleBrokenCount >= buildingData.equipamentosQuebrados.length
              ? "Mostrar menos"
              : "Expandir lista"}
          </button>
        )}
      </div>

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
            {buildingData.equipamentosManutencao.length > 0 ? (
              buildingData.equipamentosManutencao
                .filter((equipment) => equipment.tipo === "Catraca")
                .slice(0, visibleMaintenanceCount)
                .map((equipment) => (
                  <tr key={equipment.id}>
                    <td style={{ border: "1px solid black" }}>
                      {equipment.id}
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {equipment.dataInicio}
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {equipment.dataPrevista}
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
        {buildingData.equipamentosManutencao.length > 3 && (
          <button
            onClick={() =>
              toggleList(
                visibleMaintenanceCount,
                buildingData.equipamentosManutencao.length,
                setVisibleMaintenanceCount
              )
            }
          >
            {visibleMaintenanceCount >=
            buildingData.equipamentosManutencao.length
              ? "Mostrar menos"
              : "Expandir lista"}
          </button>
        )}
      </div>
    </div>
  );
}
