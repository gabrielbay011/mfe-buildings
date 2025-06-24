import { useNavigate, useParams } from "react-router-dom";
import { listBuildingsId } from "../../back-end/services/list/list-building-id";
import { useState } from "react";
import Modal from "../../utils/components/modal";
import { renderEquipment } from "../../back-end/services/render/render-equipment";

export default function BuildingCamera() {
  const navigate = useNavigate();

  //States realacionados aos dados que serão exibidos
  const { id } = useParams();
  const buildingData = listBuildingsId(id);

  //State relacioando a abertura da modal
  const [modalBrokenOpen, setModalBrokenOpen] = useState(false);

  //State que armazena equipamento selecionado
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);

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

      {/* Exibe as informações gerais da câmeras */}
      <div>
        <h2>Informações Gerais:</h2>

        <table>
          <tbody>
            <tr>
              <th style={{ border: "1px solid black" }}>
                Quantidade de câmeras
              </th>
              <td style={{ border: "1px solid black" }}>
                {buildingData.qtdCameras || "--"}
              </td>
            </tr>
            <tr>
              <th style={{ border: "1px solid black" }}>
                Qtd de Capturas Hora
              </th>
              <td style={{ border: "1px solid black" }}>
                {buildingData.totalCapturaHora || "--"}
              </td>
            </tr>
            <tr>
              <th style={{ border: "1px solid black" }}>
                Qtd de Capturas Hoje
              </th>
              <td style={{ border: "1px solid black" }}>
                {buildingData.totalCapturaHoje || "--"}
              </td>
            </tr>
            <tr>
              <th style={{ border: "1px solid black" }}>Qtd de Capturas Mês</th>
              <td style={{ border: "1px solid black" }}>
                {buildingData.totalCapturaMes || "--"}
              </td>
            </tr>
            <tr>
              <th style={{ border: "1px solid black" }}>Total de Capturas</th>
              <td style={{ border: "1px solid black" }}>
                {buildingData.totalCaptura || "--"}
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
                    {camera.qtdCapturaHora}
                  </td>
                </tr>
                <tr>
                  <th style={{ border: "1px solid black" }}>
                    Qtd de Capturas Hoje
                  </th>
                  <td style={{ border: "1px solid black" }}>
                    {camera.qtdCapturaHoje}
                  </td>
                </tr>
                <tr>
                  <th style={{ border: "1px solid black" }}>
                    Qtd de Capturas Mês
                  </th>
                  <td style={{ border: "1px solid black" }}>
                    {camera.qtdCapturaMes}
                  </td>
                </tr>
                <tr>
                  <th style={{ border: "1px solid black" }}>
                    Total de Capturas
                  </th>
                  <td style={{ border: "1px solid black" }}>
                    {camera.totalCapturas}
                  </td>
                </tr>
                <tr>
                  <th style={{ border: "1px solid black" }}>Horário Captura</th>
                  <td style={{ border: "1px solid black" }}>
                    {camera.horarioCaptura}
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
            {buildingData.equipamentosQuebrados.length > 0 ? (
              buildingData.equipamentosQuebrados
                .filter((equipments) => equipments.tipo === "Câmera")
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
            {buildingData.equipamentosManutencao.length > 0 ? (
              buildingData.equipamentosManutencao
                .filter((equipment) => equipment.tipo === "Câmera")
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
