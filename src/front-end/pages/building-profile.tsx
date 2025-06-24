import { useNavigate, useParams } from "react-router-dom";
import { listBuildingsId } from "../../back-end/services/list/list-building-id";
import { useState } from "react";
import Modal from "../../utils/components/modal";
import { RenderFlowHistory } from "../../back-end/services/render/render-flow-history";
import { renderPerson } from "../../back-end/services/render/render-person";
import { renderEquipment } from "../../back-end/services/render/render-equipment";

export default function BuildingProfile() {
  const navigate = useNavigate();

  //States realacionados aos dados que serão exibidos
  const { id } = useParams();
  const mockData = listBuildingsId(id);

  //States relacioandos a abertura da modal
  const [modalFlowOpen, setModalFlowOpen] = useState(false);
  const [modalBrokenOpen, setModalBrokenOpen] = useState(false);
  const [modalPersonOpen, setModalPersonOpen] = useState(false);

  //States que armazenam o equipamento selecionado e a pessoa selecioanda
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);

  //States relacionados a quantidade de itens visíveis
  const [visibleEntriesCount, setVisibleEntriesCount] = useState(3);
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

  if (!mockData) {
    return <p>Prédio não encontrado.</p>;
  }

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
          onClick={() => navigate("/")}
        >
          &lt;-
        </button>

        <h1>Perfil de Edifício</h1>
      </div>

      {/* Exibe os dados gerais do edifício */}
      <div>
        <h2>Dados Gerais:</h2>

        <table style={{ border: "1px solid black" }}>
          <tbody>
            <tr>
              <th style={{ border: "1px solid black" }}>
                {mockData.foto || "--"}
              </th>
              <th style={{ border: "1px solid black" }}>
                {mockData.nome || "--"}
              </th>
            </tr>
            <tr>
              <th
                style={{ border: "1px solid black", cursor: "pointer" }}
                onClick={() => navigate(`/floor/${mockData.id}`)}
              >
                Andares
              </th>
              <td style={{ border: "1px solid black" }}>
                {mockData.qtdAndares || "--"}
              </td>
            </tr>
            <tr>
              <th
                style={{ border: "1px solid black", cursor: "pointer" }}
                onClick={() => navigate(`/turnstile/${mockData.id}`)}
              >
                Catracas
              </th>
              <td style={{ border: "1px solid black" }}>
                {mockData.qtdCatracas || "--"}
              </td>
            </tr>
            <tr>
              <th
                style={{ border: "1px solid black", cursor: "pointer" }}
                onClick={() => navigate(`/camera/${mockData.id}`)}
              >
                Câmeras
              </th>
              <td style={{ border: "1px solid black" }}>
                {mockData.qtdCameras || "--"}
              </td>
            </tr>
            <tr>
              <th style={{ border: "1px solid black" }}>Elevadores</th>
              <td style={{ border: "1px solid black" }}>
                {mockData.qtdElevadores || "--"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Exibe o fluxo de pessoas e modal pra ver fluxo completo */}
      <div>
        <h2>Fluxo de Pessoas:</h2>

        <table style={{ border: "1px solid black" }}>
          <tbody>
            <tr>
              <th style={{ border: "1px solid black" }}>Hora</th>
              <th style={{ border: "1px solid black" }}>Dia</th>
              <th style={{ border: "1px solid black" }}>Semana</th>
              <th style={{ border: "1px solid black" }}>Mês</th>
            </tr>
            <tr>
              <td style={{ border: "1px solid black" }}>
                {mockData.fluxoPessoas.hora || "--"}
              </td>
              <td style={{ border: "1px solid black" }}>
                {mockData.fluxoPessoas.dia || "--"}
              </td>
              <td style={{ border: "1px solid black" }}>
                {mockData.fluxoPessoas.semana || "--"}
              </td>
              <td style={{ border: "1px solid black" }}>
                {mockData.fluxoPessoas.mes || "--"}
              </td>
            </tr>
          </tbody>
        </table>

        <button onClick={() => setModalFlowOpen(true)}>
          Ver histórico completo
        </button>

        <Modal isOpen={modalFlowOpen} onClose={() => setModalFlowOpen(false)}>
          <h2>Fluxo por Mês</h2>
          <RenderFlowHistory building={mockData} />
        </Modal>
      </div>

      {/* Exibe os registros de entrada e saída e modal para exibir as informações das pessoas */}
      <div>
        <h2>Entradas e Saídas:</h2>

        <table style={{ border: "1px solid black" }}>
          <tbody>
            <tr>
              <th style={{ border: "1px solid black" }}>Foto</th>
              <th style={{ border: "1px solid black" }}>Nome</th>
              <th style={{ border: "1px solid black" }}>Entrou</th>
              <th style={{ border: "1px solid black" }}>Saiu</th>
            </tr>
            {mockData.entradasESaidas?.length > 0 ? (
              mockData.entradasESaidas
                .slice(0, visibleEntriesCount)
                .map((person, index) => (
                  <tr key={index}>
                    <td
                      style={{ border: "1px solid black", cursor: "pointer" }}
                      onClick={() => {
                        setSelectedPerson(person);
                        setModalPersonOpen(true);
                      }}
                    >
                      {person.foto || "--"}
                    </td>
                    <td
                      style={{ border: "1px solid black", cursor: "pointer" }}
                      onClick={() => {
                        setSelectedPerson(person);
                        setModalPersonOpen(true);
                      }}
                    >
                      {person.nome || "--"}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        backgroundColor: person.entrou === true ? "green" : "",
                      }}
                    >
                      entrou
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        backgroundColor: person.saiu === true ? "green" : "",
                      }}
                    >
                      saiu
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={4}>Nenhuma movimentação</td>
              </tr>
            )}
          </tbody>
        </table>

        {mockData.entradasESaidas.length > 3 && (
          <button
            onClick={() =>
              toggleList(
                visibleEntriesCount,
                mockData.entradasESaidas.length,
                setVisibleEntriesCount
              )
            }
          >
            {visibleEntriesCount >= mockData.entradasESaidas.length
              ? "Mostrar menos"
              : "Expandir lista"}
          </button>
        )}

        <Modal
          isOpen={modalPersonOpen}
          onClose={() => setModalPersonOpen(false)}
        >
          <h2>Dados Cadastrais</h2>
          {renderPerson(selectedPerson)}
        </Modal>
      </div>

      {/* Exibe os equipamentos quebrados e modal para arcar com o custo do equipamento */}
      <div>
        <h2>Equipamentos Quebrados:</h2>

        <table style={{ border: "1px solid black" }}>
          <tbody>
            <tr>
              <th style={{ border: "1px solid black" }}>Tipo</th>
              <th style={{ border: "1px solid black" }}>Status</th>
              <th style={{ border: "1px solid black" }}>Custo</th>
            </tr>
            {mockData.equipamentosQuebrados.length > 0 ? (
              mockData.equipamentosQuebrados
                .slice(0, visibleBrokenCount)
                .map((equipment, index) => (
                  <tr
                    key={index}
                    onClick={() => {
                      setSelectedEquipment(equipment);
                      setModalBrokenOpen(true);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <td
                      style={{ border: "1px solid black" }}
                      title={
                        equipment.tipo === "Câmera"
                          ? "Andar: " + equipment.andar
                          : undefined
                      }
                    >
                      {equipment.tipo}
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
                <td colSpan={3}>Nenhum equipamento quebrado</td>
              </tr>
            )}
          </tbody>
        </table>

        {mockData.equipamentosQuebrados.length > 3 && (
          <button
            onClick={() =>
              toggleList(
                visibleBrokenCount,
                mockData.equipamentosQuebrados.length,
                setVisibleBrokenCount
              )
            }
          >
            {visibleBrokenCount >= mockData.equipamentosQuebrados.length
              ? "Mostrar menos"
              : "Expandir lista"}
          </button>
        )}

        <Modal
          isOpen={modalBrokenOpen}
          onClose={() => setModalBrokenOpen(false)}
        >
          <h2>Arcar com custo</h2>
          {renderEquipment(selectedEquipment)}
        </Modal>
      </div>

      {/* Exibe os equipamento em manutenção */}
      <div>
        <h2>Equipamentos em manutenção:</h2>

        <table style={{ border: "1px solid black" }}>
          <tbody>
            <tr>
              <th style={{ border: "1px solid black" }}>Tipo</th>
              <th style={{ border: "1px solid black" }}>
                Data Inicial do Conserto
              </th>
              <th style={{ border: "1px solid black" }}>
                Data Prevista do Fim do Conserto
              </th>
            </tr>
            {mockData.equipamentosManutencao.length > 0 ? (
              mockData.equipamentosManutencao
                .slice(0, visibleMaintenanceCount)
                .map((equipment, index) => (
                  <tr key={index}>
                    <td
                      style={{ border: "1px solid black" }}
                      title={
                        equipment.tipo === "Câmera"
                          ? "Andar: " + equipment.andar
                          : undefined
                      }
                    >
                      {equipment.tipo}
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

        {mockData.equipamentosManutencao.length > 3 && (
          <button
            onClick={() =>
              toggleList(
                visibleMaintenanceCount,
                mockData.equipamentosManutencao.length,
                setVisibleMaintenanceCount
              )
            }
          >
            {visibleMaintenanceCount >= mockData.equipamentosManutencao.length
              ? "Mostrar menos"
              : "Expandir lista"}
          </button>
        )}
      </div>
    </div>
  );
}
