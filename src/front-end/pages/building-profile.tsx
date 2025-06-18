import { useNavigate, useParams } from "react-router-dom";
import { listBuildingsId } from "../../back-end/services/list-building-id";
import { useState } from "react";
import Modal from "../../utils/components/modal";
import {
  listFlowHistory,
  renderFlowHistory,
} from "../../back-end/services/render-flow-history";
import { renderPerson } from "../../back-end/services/render-person";

export default function BuildingProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const mockData = listBuildingsId(id);
  const [modalFlowOpen, setModalFlowOpen] = useState(false);
  const [modalPersonOpen, setModalPersonOpen] = useState(false);
  const building = listFlowHistory(id);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);

  if (!mockData) {
    return <p>Prédio não encontrado.</p>;
  }

  return (
    <div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          style={{ height: "30px", width: "30px", marginTop: "25px" }}
          onClick={() => navigate("/")}
        >
          &lt;-
        </button>
        <h1>Perfil de Edifício</h1>
      </div>
      <div>
        <h2>Dados Gerais:</h2>
        <table style={{ border: "1px solid black" }}>
          <tbody>
            <tr>
              <td style={{ border: "1px solid black" }}>
                {mockData.foto || "--"}
              </td>
              <td style={{ border: "1px solid black" }}>
                {mockData.nome || "--"}
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid black" }}>andares</td>
              <td style={{ border: "1px solid black" }}>
                {mockData.qtdAndares || "--"}
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid black" }}>catracas</td>
              <td style={{ border: "1px solid black" }}>
                {mockData.qtdCatracas || "--"}
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid black" }}>câmeras</td>
              <td style={{ border: "1px solid black" }}>
                {mockData.qtdCameras || "--"}
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid black" }}>elevadores</td>
              <td style={{ border: "1px solid black" }}>
                {mockData.qtdElevadores || "--"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h2>Fluxo de Pessoas:</h2>
        <table style={{ border: "1px solid black" }}>
          <tbody>
            <tr>
              <td style={{ border: "1px solid black" }}>hora</td>
              <td style={{ border: "1px solid black" }}>dia</td>
              <td style={{ border: "1px solid black" }}>semana</td>
              <td style={{ border: "1px solid black" }}>mês</td>
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
          {renderFlowHistory(building)}
        </Modal>
      </div>
      <div>
        <h2>Entradas e Saídas:</h2>
        <table style={{ border: "1px solid black" }}>
          <tbody>
            <tr>
              <td style={{ border: "1px solid black" }}>foto</td>
              <td style={{ border: "1px solid black" }}>nome</td>
              <td style={{ border: "1px solid black" }}>entrou</td>
              <td style={{ border: "1px solid black" }}>saiu</td>
            </tr>
            {mockData.entradasESaidas?.length > 0 ? (
              mockData.entradasESaidas.map((pessoa, index) => (
                <tr key={index}>
                  <td
                    style={{ border: "1px solid black", cursor: "pointer" }}
                    onClick={() => {
                      setSelectedPerson(pessoa);
                      setModalPersonOpen(true);
                    }}
                  >
                    {pessoa.foto || "--"}
                  </td>
                  <td
                    style={{ border: "1px solid black", cursor: "pointer" }}
                    onClick={() => {
                      setSelectedPerson(pessoa);
                      setModalPersonOpen(true);
                    }}
                  >
                    {pessoa.nome || "--"}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      backgroundColor: pessoa.entrou === true ? "green" : "",
                    }}
                  >
                    entrou
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      backgroundColor: pessoa.saiu === true ? "green" : "",
                    }}
                  >
                    saiu
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>Nenhuma movimentação</td>
              </tr>
            )}
          </tbody>
        </table>
        <Modal
          isOpen={modalPersonOpen}
          onClose={() => setModalPersonOpen(false)}
        >
          <h2>Dados Cadastrais</h2>
          {renderPerson(selectedPerson)}
        </Modal>
        <button>Expandir lista</button>
      </div>
      <div>
        <h2>Equipamentos Quebrados:</h2>
        <table style={{ border: "1px solid black" }}>
          <tbody>
            <tr>
              <td style={{ border: "1px solid black" }}>tipo</td>
              <td style={{ border: "1px solid black" }}>status</td>
              <td style={{ border: "1px solid black" }}>custo</td>
            </tr>
            {mockData.equipamentosQuebrados.length > 0 ? (
              mockData.equipamentosQuebrados.map((equipamento, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid black" }}>
                    {equipamento.tipo}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {equipamento.status}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {equipamento.custo}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>Nenhum equipamento quebrado</td>
              </tr>
            )}
          </tbody>
        </table>
        <button>Expandir lista</button>
      </div>
      <div>
        <h2>Equipamentos em manutenção:</h2>
        <table style={{ border: "1px solid black" }}>
          <tbody>
            <tr>
              <td style={{ border: "1px solid black" }}>tipo</td>
              <td style={{ border: "1px solid black" }}>data inicial</td>
              <td style={{ border: "1px solid black" }}>data prevista</td>
            </tr>
            {mockData.equipamentosManutencao.length > 0 ? (
              mockData.equipamentosManutencao.map((equipamento, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid black" }}>
                    {equipamento.tipo}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {equipamento.dataInicio}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {equipamento.dataPrevista}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>Nenhum equipamento em manutenção</td>
              </tr>
            )}
          </tbody>
        </table>
        <button>Expandir lista</button>
      </div>
    </div>
  );
}
