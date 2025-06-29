import { useNavigate, useParams } from "react-router-dom";
import { listBuildingsId } from "../../utils/services/list/list-building-id";
import { useState } from "react";
import Modal from "../../utils/components/modal";
import { RenderFlowHistory } from "../services/render/render-flow-history";
import { renderPerson } from "../services/render/render-person";
import { renderEquipment } from "../../utils/services/render/render-equipment";
import { useForm } from "react-hook-form";
import { Person } from "../types/person-type";
import { MaintenanceEquipment } from "../../utils/types/maintenance-equipment";
import { BrokenEquipment } from "../../utils/types/broken-equipment";

export default function BuildingProfile() {
  const navigate = useNavigate();

  //States realacionados aos dados que serão exibidos
  const { id } = useParams();
  const mockData = listBuildingsId(id);
  const [brokenEquipments, setBrokenEquipments] = useState<BrokenEquipment[]>(
    mockData.equipmentBroken as BrokenEquipment[]
  );
  const [maintenanceEquipments, setMaintenanceEquipments] = useState<
    MaintenanceEquipment[]
  >(mockData.equipmentMaintenance as MaintenanceEquipment[]);

  //States relacionados a abertura da modal
  const [modalFlowOpen, setModalFlowOpen] = useState(false);
  const [modalBrokenOpen, setModalBrokenOpen] = useState(false);
  const [modalPersonOpen, setModalPersonOpen] = useState(false);
  const [modalNameOpen, setModalNameOpen] = useState(false);
  const [modalPhotoOpen, setModalPhotoOpen] = useState(false);

  //States que armazenam o equipamento selecionado e a pessoa selecionada
  const [selectedPerson, setSelectedPerson] = useState<Person>(null);
  const [selectedEquipment, setSelectedEquipment] =
    useState<BrokenEquipment | null>(null);
  const [name, setName] = useState<any>(mockData.name);
  const [photo, setPhoto] = useState<any>(mockData.photo);

  //States relacionados a quantidade de itens visíveis
  const [visibleEntriesCount, setVisibleEntriesCount] = useState(3);
  const [visibleMaintenanceCount, setVisibleMaintenanceCount] = useState(3);
  const [visibleBrokenCount, setVisibleBrokenCount] = useState(3);

  //Inicialização do formulário de alterar nome da empresa
  const {
    register: registerName,
    handleSubmit: handleSubmitName,
    formState: { errors: nameErrors },
  } = useForm();

  //Inicialização do formulário de alterar foto da empresa
  const {
    register: registerPhoto,
    handleSubmit: handleSubmitPhoto,
    formState: { errors: photoErrors },
  } = useForm();

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
              <th
                style={{ border: "1px solid black", cursor: "pointer" }}
                onClick={() => {
                  setModalPhotoOpen(true);
                }}
              >
                {photo || "--"}
              </th>
              <th
                style={{ border: "1px solid black", cursor: "pointer" }}
                onClick={() => {
                  setModalNameOpen(true);
                }}
              >
                {name || "--"}
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
                {mockData.qtyFloors || "--"}
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
                {mockData.qtyTurnstiles || "--"}
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
                {mockData.qtyCameras || "--"}
              </td>
            </tr>
            <tr>
              <th style={{ border: "1px solid black" }}>Elevadores</th>
              <td style={{ border: "1px solid black" }}>
                {mockData.qtyElevators || "--"}
              </td>
            </tr>
          </tbody>
        </table>

        <Modal isOpen={modalPhotoOpen} onClose={() => setModalPhotoOpen(false)}>
          <h2>Alterar foto do edifício</h2>

          <form
            onSubmit={handleSubmitPhoto((data) => {
              setPhoto(data.photo);
              setModalPhotoOpen(false);
            })}
          >
            <label htmlFor="photo">Foto:</label>
            <br />
            <input
              type="text"
              id="photo"
              {...registerPhoto("photo", {
                required: "O campo foto é obrigatório",
              })}
            />
            <br />
            <button style={{ cursor: "pointer" }} type="submit">
              Alterar
            </button>
            {typeof photoErrors.photo?.message === "string" && (
              <p style={{ color: "red" }}>{photoErrors.photo.message}</p>
            )}
          </form>
        </Modal>

        <Modal isOpen={modalNameOpen} onClose={() => setModalNameOpen(false)}>
          <h2>Alterar nome do edifício</h2>

          <form
            onSubmit={handleSubmitName((data) => {
              setName(data.name);
              setModalNameOpen(false);
            })}
          >
            <label htmlFor="name">Nome:</label>
            <br />
            <input
              type="text"
              id="name"
              {...registerName("name", {
                required: "O campo nome é obrigatório",
              })}
            />
            <br />
            <button style={{ cursor: "pointer" }} type="submit">
              Alterar
            </button>
            {typeof nameErrors.name?.message === "string" && (
              <p style={{ color: "red" }}>{nameErrors.name.message}</p>
            )}
          </form>
        </Modal>
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
                {mockData.flowPeople.time || "--"}
              </td>
              <td style={{ border: "1px solid black" }}>
                {mockData.flowPeople.day || "--"}
              </td>
              <td style={{ border: "1px solid black" }}>
                {mockData.flowPeople.week || "--"}
              </td>
              <td style={{ border: "1px solid black" }}>
                {mockData.flowPeople.month || "--"}
              </td>
            </tr>
          </tbody>
        </table>

        <button
          style={{ cursor: "pointer" }}
          onClick={() => setModalFlowOpen(true)}
        >
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
            {mockData.inputsAndOutput?.length > 0 ? (
              mockData.inputsAndOutput
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
                      {person.photo || "--"}
                    </td>
                    <td
                      style={{ border: "1px solid black", cursor: "pointer" }}
                      onClick={() => {
                        setSelectedPerson(person);
                        setModalPersonOpen(true);
                      }}
                    >
                      {person.name || "--"}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        backgroundColor: person.entered === true ? "green" : "",
                      }}
                    >
                      entrou
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        backgroundColor: person.exit === true ? "green" : "",
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

        {mockData.inputsAndOutput.length > 3 && (
          <button
            style={{ cursor: "pointer" }}
            onClick={() =>
              toggleList(
                visibleEntriesCount,
                mockData.inputsAndOutput.length,
                setVisibleEntriesCount
              )
            }
          >
            {visibleEntriesCount >= mockData.inputsAndOutput.length
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
            {brokenEquipments.length > 0 ? (
              brokenEquipments
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
                        equipment.type === "Câmera"
                          ? "Andar: " + equipment.floor
                          : undefined
                      }
                    >
                      {equipment.type}
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
            {maintenanceEquipments.length > 0 ? (
              maintenanceEquipments
                .slice(0, visibleMaintenanceCount)
                .map((equipment, index) => (
                  <tr key={index}>
                    <td
                      style={{ border: "1px solid black" }}
                      title={
                        equipment.type === "Câmera"
                          ? "Andar: " + equipment.floor
                          : undefined
                      }
                    >
                      {equipment.type}
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
