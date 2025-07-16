import { useNavigate, useParams } from "react-router-dom";
import { listBuildingsId } from "../../utils/services/list/list-building-id";
import { useState } from "react";
import Modal from "../../utils/components/modal";
import { renderEquipment } from "../../utils/services/render/render-equipment";
import { BrokenEquipment } from "../../utils/types/broken-equipment";
import { MaintenanceEquipment } from "../../utils/types/maintenance-equipment";

export default function BuildingCamera() {
  const navigate = useNavigate();

  //States realacionados aos dados que serão exibidos
  const { id } = useParams();
  const buildingData = listBuildingsId(id);
  const [brokenEquipments, setBrokenEquipments] = useState<BrokenEquipment[]>(
    buildingData.equipmentBroken as BrokenEquipment[]
  );
  const [maintenanceEquipments, setMaintenanceEquipments] = useState<
    MaintenanceEquipment[]
  >(buildingData.equipmentMaintenance as MaintenanceEquipment[]);
  const brokenCameras = brokenEquipments.filter(
    (equipment) => equipment.type === "Câmera"
  );

  //State relacionado a abertura da modal
  const [modalBrokenOpen, setModalBrokenOpen] = useState(false);

  //State que armazena equipamento selecionado
  const [selectedEquipment, setSelectedEquipment] =
    useState<BrokenEquipment | null>(null);

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
    <div className="p-3">
      {/* Botão para voltar ao perfil e título */}
      <div className="flex gap-2 pb-5">
        <button
          className="bg-gray-200 border border-gray-700 px-2 cursor-pointer rounded-sm hover:bg-gray-300"
          onClick={() => navigate(`/profile/${buildingData.id}`)}
        >
          &lt;-
        </button>

        <h1 className="text-2xl font-bold">Câmeras</h1>
      </div>

      {/* Exibe as informações gerais das câmeras */}
      <div>
        <h2 className="font-bold text-lg">Informações Gerais:</h2>

        <table style={{ border: "1px solid black" }}>
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
      <div className="pt-5">
        <h2 className="font-bold text-lg">Capturas por Câmera:</h2>

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
            className="bg-gray-200 border border-gray-700 p-1 cursor-pointer rounded-sm hover:bg-gray-300"
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
      <div className="pt-5">
        <h2 className="font-bold text-lg">Equipamentos Quebrados:</h2>

        <table style={{ border: "1px solid black" }}>
          <tbody>
            <tr>
              <th style={{ border: "1px solid black" }}>Id Câmera</th>
              <th style={{ border: "1px solid black" }}>Status</th>
              <th style={{ border: "1px solid black" }}>Custo</th>
            </tr>
            {brokenCameras.length > 0 ? (
              brokenCameras.slice(0, visibleBrokenCount).map((equipment) => (
                <tr
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedEquipment(equipment);
                    setModalBrokenOpen(true);
                  }}
                  key={equipment.id}
                >
                  <td style={{ border: "1px solid black" }}>{equipment.id}</td>
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

            <Modal isOpen={modalBrokenOpen}>
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Arcar com custo</h2>
                <button
                  className="bg-gray-200 border border-gray-700 px-2 cursor-pointer rounded-sm hover:bg-gray-300"
                  onClick={() => setModalBrokenOpen(false)}
                >
                  X
                </button>
              </div>
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
            className="bg-gray-200 border border-gray-700 p-1 cursor-pointer rounded-sm hover:bg-gray-300"
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
      <div className="pt-5">
        <h2 className="font-bold text-lg">Equipamentos em Manutenção:</h2>

        <table style={{ border: "1px solid black" }}>
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
            className="bg-gray-200 border border-gray-700 p-1 cursor-pointer rounded-sm hover:bg-gray-300"
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
