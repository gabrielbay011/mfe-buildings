import { useNavigate, useParams } from "react-router-dom";
import { listBuildingsId } from "../../back-end/services/list/list-building-id";

export default function BuildingCamera() {
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
        <h1>Câmeras</h1>
      </div>

      <div>
        <h2>Informações Gerais:</h2>
        <table>
          <tbody>
            <tr>
              <th style={{ border: "1px solid black" }}>
                Quantidade de câmeras
              </th>
              <td style={{ border: "1px solid black" }}>10</td>
            </tr>
            <tr>
              <th style={{ border: "1px solid black" }}>
                Qtd de Capturas Hora
              </th>
              <td style={{ border: "1px solid black" }}>50</td>
            </tr>
            <tr>
              <th style={{ border: "1px solid black" }}>
                Qtd de Capturas Hoje
              </th>
              <td style={{ border: "1px solid black" }}>50</td>
            </tr>
            <tr>
              <th style={{ border: "1px solid black" }}>Qtd de Capturas Mês</th>
              <td style={{ border: "1px solid black" }}>50</td>
            </tr>
            <tr>
              <th style={{ border: "1px solid black" }}>Total de Capturas</th>
              <td style={{ border: "1px solid black" }}>50</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h2>Capturas por Câmera</h2>
        <table>
          <tbody>
            <tr>
              <th style={{ border: "1px solid black" }}>Id Câmera</th>
              <td style={{ border: "1px solid black" }}>10</td>
            </tr>
            <tr>
              <th style={{ border: "1px solid black" }}>
                Qtd de Capturas Hora
              </th>
              <td style={{ border: "1px solid black" }}>50</td>
            </tr>
            <tr>
              <th style={{ border: "1px solid black" }}>
                Qtd de Capturas Hoje
              </th>
              <td style={{ border: "1px solid black" }}>50</td>
            </tr>
            <tr>
              <th style={{ border: "1px solid black" }}>Qtd de Capturas Mês</th>
              <td style={{ border: "1px solid black" }}>50</td>
            </tr>
            <tr>
              <th style={{ border: "1px solid black" }}>Total de Capturas</th>
              <td style={{ border: "1px solid black" }}>50</td>
            </tr>
            <tr>
              <th style={{ border: "1px solid black" }}>Horário Captura</th>
              <td style={{ border: "1px solid black" }}>50</td>
            </tr>
            <button>Expandir Lista</button>
          </tbody>
        </table>
      </div>

      <div>
        <h2>Equipamentos Quebrados:</h2>
        <table>
          <tbody>
            <tr>
              <th style={{ border: "1px solid black" }}>Id Câmera</th>
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
              <th style={{ border: "1px solid black" }}>Id Câmera</th>
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
