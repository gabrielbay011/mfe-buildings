import { useNavigate, useParams } from "react-router-dom";
import { listBuildingsId } from "../../back-end/services/list/list-building-id";

export default function BuildingTurnstile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const buildingData = listBuildingsId(id);

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
          <b>Quantidade de catracas: </b>2
        </p>
        <button>Adicionar catraca por 10</button>
      </div>

      <div>
        <h2>Tráfego de Pessoas por Catraca:</h2>
        <table>
          <tbody>
            <tr>
              <th style={{ border: "1px solid black" }}>Id Catraca: </th>
              <th style={{ border: "1px solid black" }}>2</th>
            </tr>
            <tr>
              <th style={{ border: "1px solid black" }}>Foto</th>
              <th style={{ border: "1px solid black" }}>Nome</th>
              <th style={{ border: "1px solid black" }}>Entrou</th>
              <th style={{ border: "1px solid black" }}>Saiu</th>
            </tr>
            <tr>
              <td style={{ border: "1px solid black" }}>FotoPessoa1</td>
              <td style={{ border: "1px solid black" }}>João</td>
              <td style={{ border: "1px solid black" }}>entrou</td>
              <td style={{ border: "1px solid black" }}>saiu</td>
            </tr>
            <button>Expandir lista</button>
          </tbody>
        </table>
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
            <tr>
              <td style={{ border: "1px solid black" }}>1</td>
              <td style={{ border: "1px solid black" }}>Baixo</td>
              <td style={{ border: "1px solid black" }}>400</td>
            </tr>
            <button>Expandir lista</button>
          </tbody>
        </table>
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
            <tr>
              <td style={{ border: "1px solid black" }}>2</td>
              <td style={{ border: "1px solid black" }}>2024-04-2</td>
              <td style={{ border: "1px solid black" }}>2024-04-30</td>
            </tr>
            <button>Expandir lista</button>
          </tbody>
        </table>
      </div>
    </div>
  );
}
