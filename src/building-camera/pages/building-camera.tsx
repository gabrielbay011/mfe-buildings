import { useNavigate, useParams } from "react-router-dom";
import { listBuildingsId } from "../../utils/services/list/list-building-id";
import { useState } from "react";
import Modal from "../../utils/components/modal";
import { renderEquipment } from "../../utils/services/render/render-equipment";

export default function BuildingCamera() {
  const navigate = useNavigate();

  //States realacionados aos dados que serão exibidos
  const { id } = useParams();
  const buildingData = listBuildingsId(id);
  const [brokenEquipments, setBrokenEquipments] = useState(
    buildingData.equipmentBroken
  );
  const [maintenanceEquipments, setMaintenanceEquipments] = useState(
    buildingData.equipmentMaintenance
  );

  //State relacionado a abertura da modal
  const [modalBrokenOpen, setModalBrokenOpen] = useState(false);

  //State que armazena equipamento selecionado
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  //States relacionados a quantidade de itens visíveis
  const [visibleCameraCount, setVisibleCameraCount] = useState(3);
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

        <h1>Câmeras</h1>
      </div>

      {/* Exibe as informações gerais das câmeras */}
      <div>
        <h2>Informações Gerais:</h2>

        <table>
          <tbody>
            <tr>
              <th style={{ border: "1px solid black" }}>
                Quantidade de câmeras
              </th>
              <td style={{ border: "1px solid black" }}>
                {buildingData.qtyCameras || "--"}
              </td>
            </tr>
            <tr>
              <th style={{ border: "1px solid black" }}>
                Qtd de Capturas Hora
              </th>
              <td style={{ border: "1px solid black" }}>
                {buildingData.totalCaptureTime || "--"}
              </td>
            </tr>
            <tr>
              <th style={{ border: "1px solid black" }}>
                Qtd de Capturas Hoje
              </th>
              <td style={{ border: "1px solid black" }}>
                {buildingData.totalCaptureToday || "--"}
              </td>
            </tr>
            <tr>
              <th style={{ border: "1px solid black" }}>Qtd de Capturas Mês</th>
              <td style={{ border: "1px solid black" }}>
                {buildingData.totalCaptureMonth || "--"}
              </td>
            </tr>
            <tr>
              <th style={{ border: "1px solid black" }}>Total de Capturas</th>
              <td style={{ border: "1px solid black" }}>
                {buildingData.totalCaptures || "--"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Exibe as informações de captura por câmera */}
      <div>
        <h2 style={{ margin: "0px", marginTop: "20px" }}>
          Capturas por Câmera
        </h2>

        <table>
          {buildingData.cameras.length > 0 ? (
            buildingData.cameras.slice(0, visibleCameraCount).map((camera) => (
              <tbody key={camera.id}>
                {visibleCameraCount > 0 && (
                  <tr>
                    <td colSpan={2} style={{ height: "20px" }}></td>
                  </tr>
                )}
                <tr>
                  <th style={{ border: "1px solid black" }}>Id Câmera</th>
                  <td style={{ border: "1px solid black" }}>{camera.id}</td>
                </tr>
                <tr>
                  <th style={{ border: "1px solid black" }}>
                    Qtd de Capturas Hora
                  </th>
                  <td style={{ border: "1px solid black" }}>
                    {camera.qtyCaptureTime}
                  </td>
                </tr>
                <tr>
                  <th style={{ border: "1px solid black" }}>
                    Qtd de Capturas Hoje
                  </th>
                  <td style={{ border: "1px solid black" }}>
                    {camera.qtyCaptureToday}
                  </td>
                </tr>
                <tr>
                  <th style={{ border: "1px solid black" }}>
                    Qtd de Capturas Mês
                  </th>
                  <td style={{ border: "1px solid black" }}>
                    {camera.qtyCaptureMonth}
                  </td>
                </tr>
                <tr>
                  <th style={{ border: "1px solid black" }}>
                    Total de Capturas
                  </th>
                  <td style={{ border: "1px solid black" }}>
                    {camera.totalCaptures}
                  </td>
                </tr>
                <tr>
                  <th style={{ border: "1px solid black" }}>Horário Captura</th>
                  <td style={{ border: "1px solid black" }}>
                    {camera.scheduledCapture}
                  </td>
                </tr>
              </tbody>
            ))
          ) : (
            <tr>
              <td>Nenhuma câmera encontrada</td>
            </tr>
          )}
        </table>

        {buildingData.cameras.length > 3 && (
          <button
            style={{ cursor: "pointer" }}
            onClick={() =>
              toggleList(
                visibleCameraCount,
                buildingData.cameras.length,
                setVisibleCameraCount
              )
            }
          >
            {visibleCameraCount >= buildingData.cameras.length
              ? "Mostrar menos"
              : "Expandir lista"}
          </button>
        )}
      </div>

      {/* Exibe os equipamentos quebrados e modal para arcar com o custo do equipamento */}
      <div>
        <h2>Equipamentos Quebrados:</h2>

        <table>
          <tbody>
            <tr>
              <th style={{ border: "1px solid black" }}>Id Câmera</th>
              <th style={{ border: "1px solid black" }}>Status</th>
              <th style={{ border: "1px solid black" }}>Custo</th>
            </tr>
            {brokenEquipments.length > 0 ? (
              brokenEquipments
                .filter((equipments) => equipments.type === "Câmera")
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
                <td colSpan={3}>Nenhum equipamento quebrado</td>
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

      {/*  */}
      <div>
        <h2>Equipamentos em Manutenção:</h2>

        <table>
          <tbody>
            <tr>
              <th style={{ border: "1px solid black" }}>Id Câmera</th>
              <th style={{ border: "1px solid black" }}>
                Data Inicial do Concerto
              </th>
              <th style={{ border: "1px solid black" }}>
                Data Prevista do Fim do Concerto
              </th>
            </tr>
            {maintenanceEquipments.length > 0 ? (
              maintenanceEquipments
                .filter((equipment) => equipment.type === "Câmera")
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
