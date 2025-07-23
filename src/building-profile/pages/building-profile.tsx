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
import { SlashIcon } from "lucide-react";
import iconHome from "../../../public/images/icon-home.svg";
import iconStair from "../../../public/images/icon-stair.svg";
import iconCamera from "../../../public/images/icon-camera.svg";
import iconTurnstile from "../../../public/images/icon-turnstile.svg";
import iconElevator from "../../../public/images/icon-elevator.svg";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import Button from "../../../src/utils/components/button";
import CardEquipment from "../components/card-equipment";
import Input from "../../../src/utils/components/input";

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

  //Inicialização do formulário de fluxo de pessoas
  const {
    register: registerFlow,
    handleSubmit: handleSubmitFlow,
    formState: { errors: flowErrors },
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

  function handleFlowPeople() {}

  return (
    <div className="p-5 py-12 md:px-15 md:py-10">
      {/* Componente do breadcrumb */}
      <div className="mb-5 md:mb-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/buildings">
                <img src={iconHome} alt="Icone Home" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon className="text-grayMedium" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/buildings/profile/${mockData.id}`}
                className="font-semibold text-grayMedium text-2xl hover:text-grayDark"
              >
                Perfil do Edifício
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="relative w-72 [280px] h-96 [380px]">
            <img
              src={photo}
              alt="Imagem Edifício"
              className="rounded-[10px] object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-[1px]">
              <div className="w-full mx-15">
                <Button
                  type="button"
                  styleType="button"
                  onClick={() => {
                    setModalPhotoOpen(true);
                  }}
                >
                  Alterar imagem
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[280px] text-left">
            <p className="mb-1 text-grayDark">Nome do edifício:</p>
            <Button
              type="button"
              styleType="button"
              onClick={() => {
                setModalNameOpen(true);
              }}
            >
              {name}
            </Button>
          </div>

          {/* Modal para alterar o a foto do edifício */}
          <Modal isOpen={modalPhotoOpen}>
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg">Alterar Foto do Edifício</h2>
              <button
                className="bg-gray-200 border border-gray-700 px-2 cursor-pointer rounded-sm hover:bg-gray-300"
                onClick={() => setModalPhotoOpen(false)}
              >
                X
              </button>
            </div>

            <form
              onSubmit={handleSubmitPhoto((data) => {
                setPhoto(data.photo);
                setModalPhotoOpen(false);
              })}
            >
              <label htmlFor="photo">Foto:</label>
              <br />
              <input
                className="border border-black p-1 rounded-sm"
                type="text"
                id="photo"
                {...registerPhoto("photo", {
                  required: "O campo foto é obrigatório",
                })}
              />
              <br />
              <button
                className="bg-gray-200 border border-gray-700 p-1 cursor-pointer rounded-sm hover:bg-gray-300"
                type="submit"
              >
                Alterar
              </button>
              {typeof photoErrors.photo?.message === "string" && (
                <p style={{ color: "red" }}>{photoErrors.photo.message}</p>
              )}
            </form>
          </Modal>

          {/* Modal para alterar o nome do edifício */}
          <Modal isOpen={modalNameOpen}>
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg">Alterar Nome do Edifício</h2>
              <button
                className="bg-gray-200 border border-gray-700 px-2 cursor-pointer rounded-sm hover:bg-gray-300"
                onClick={() => setModalNameOpen(false)}
              >
                X
              </button>
            </div>

            <form
              onSubmit={handleSubmitName((data) => {
                setName(data.name);
                setModalNameOpen(false);
              })}
            >
              <label htmlFor="name">Nome:</label>
              <br />
              <input
                className="border border-black p-1 rounded-sm"
                type="text"
                id="name"
                {...registerName("name", {
                  required: "O campo nome é obrigatório",
                })}
              />
              <br />
              <button
                className="bg-gray-200 border border-gray-700 p-1 cursor-pointer rounded-sm hover:bg-gray-300"
                type="submit"
              >
                Alterar
              </button>
              {typeof nameErrors.name?.message === "string" && (
                <p style={{ color: "red" }}>{nameErrors.name.message}</p>
              )}
            </form>
          </Modal>
        </div>

        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:ml-10">
          <CardEquipment
            label="Andares"
            qtyEquipment={mockData.qtyFloors}
            image={iconStair}
            onClick={() => navigate(`/floor/${mockData.id}`)}
          />

          <CardEquipment
            label="Câmeras"
            qtyEquipment={mockData.qtyCameras}
            image={iconCamera}
            onClick={() => navigate(`/camera/${mockData.id}`)}
          />

          <CardEquipment
            label="Catracas"
            qtyEquipment={mockData.qtyTurnstiles}
            image={iconTurnstile}
            onClick={() => navigate(`/turnstile/${mockData.id}`)}
          />

          <CardEquipment
            label="Elevadores"
            qtyEquipment={mockData.qtyElevators}
            image={iconElevator}
          />

          <div className="bg-white rounded-[20px] shadow-lg flex flex-col p-5 justify-center items-center">
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-[20px] text-grayMedium">Fluxo de Pessoas</p>
              <p className="text-2xl text-purpleMedium font-semibold">20</p>
              <button
                className="text-purpleDark hover:text-purpleMedium font-semibold"
                onClick={() => setModalFlowOpen(true)}
              >
                Ver histórico completo
              </button>
            </div>
            <div className="w-full mt-5">
              <form
                autoComplete="off"
                onSubmit={handleSubmitFlow(handleFlowPeople)}
              >
                <Input
                  label="Data:"
                  type="date"
                  id="date"
                  register={registerFlow("date")}
                  error={
                    typeof flowErrors.date?.message === "string"
                      ? flowErrors.date.message
                      : ""
                  }
                />
                <Input
                  label="Hora:"
                  type="time"
                  id="hour"
                  register={registerFlow("hour")}
                  error={
                    typeof flowErrors.hour?.message === "string"
                      ? flowErrors.hour.message
                      : ""
                  }
                />
                <div className="flex mt-5">
                  <div className="mr-2 w-full">
                    <Button type="submit" styleType="buttonClick">
                      7 dias
                    </Button>
                  </div>
                  <div className="ml-2 w-full">
                    <Button type="submit" styleType="buttonClick">
                      30 dias
                    </Button>
                  </div>
                </div>
              </form>
            </div>

            <Modal isOpen={modalFlowOpen}>
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Fluxo por Mês</h2>
                <button
                  className="bg-gray-200 border border-gray-700 px-2 cursor-pointer rounded-sm hover:bg-gray-300"
                  onClick={() => setModalFlowOpen(false)}
                >
                  X
                </button>
              </div>
              <RenderFlowHistory building={mockData} />
            </Modal>
          </div>

          <div className="bg-white rounded-[20px] shadow-lg p-5">
            <p className="text-grayMedium text-[20px] mb-5">
              Equipamentos Quebrados
            </p>

            <table className="w-full table-fixed border-separate border-spacing-y-5">
              <tbody>
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
                        className="cursor-pointer mb-10"
                      >
                        <td
                          className="text-grayDark w-1/3 text-left"
                          title={
                            equipment.type === "Câmera"
                              ? "Andar: " + equipment.floor
                              : undefined
                          }
                        >
                          {equipment.type}
                        </td>
                        <td className="w-1/3 text-center">
                          <div
                            className={`inline-block w-auto h-auto py-1 px-3 rounded-[20px] text-center text-[12px] ${
                              equipment.status === "Moderado"
                                ? "bg-orangePrimary text-orangeMedium"
                                : equipment.status === "Baixo"
                                ? "bg-bluePrimary text-blueMedium"
                                : equipment.status === "Crítico"
                                ? "bg-redLight text-redMedium"
                                : ""
                            }`}
                          >
                            {equipment.status}
                          </div>
                        </td>
                        <td className="text-grayDark w-1/3 text-right">
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

            <Modal isOpen={modalBrokenOpen}>
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Arcar com Custo</h2>
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
          </div>

          <div className="bg-white rounded-[20px] shadow-lg p-5">
            <p className="text-[20px] text-grayMedium">Entradas e Saídas</p>

            <table className="w-full table-fixed border-separate border-spacing-y-5">
              <tbody>
                {mockData.inputsAndOutput?.length > 0 ? (
                  mockData.inputsAndOutput
                    .slice(0, visibleEntriesCount)
                    .map((person, index) => (
                      <tr key={index} className="cursor-pointer">
                        <td
                          onClick={() => {
                            setSelectedPerson(person);
                            setModalPersonOpen(true);
                          }}
                          className="w-1/4"
                        >
                          <img src={person.photo} alt="Foto Perfil" />
                        </td>
                        <td
                          onClick={() => {
                            setSelectedPerson(person);
                            setModalPersonOpen(true);
                          }}
                          className="w-1/4 text-grayDark"
                        >
                          {person.name || "--"}
                        </td>
                        <td className="w-1/4">
                          <div
                            className={`inline-block w-auto h-auto py-1 px-3 rounded-[20px] text-center text-[12px] font-semibold ${
                              person.entered === true
                                ? "bg-greenLight text-greenMedium"
                                : "bg-grayLight text-grayMedium"
                            }`}
                          >
                            Entrou
                          </div>
                        </td>
                        <td className="w-1/4">
                          <div
                            className={`inline-block w-auto h-auto py-1 px-3 rounded-[20px] text-center text-[12px] font-semibold ${
                              person.exit === true
                                ? "bg-greenLight text-greenMedium"
                                : "bg-grayLight text-grayMedium"
                            }`}
                          >
                            Saiu
                          </div>
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
                className="bg-gray-200 border border-gray-700 p-1 cursor-pointer rounded-sm hover:bg-gray-300"
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

            <Modal isOpen={modalPersonOpen}>
              <div className="flex justify-between items-center">
                <h2 className="font-bold">Dados Cadastrais</h2>
                <button
                  className="bg-gray-200 border border-gray-700 px-2 cursor-pointer rounded-sm hover:bg-gray-300"
                  onClick={() => setModalPersonOpen(false)}
                >
                  X
                </button>
              </div>
              {renderPerson(selectedPerson)}
            </Modal>
          </div>

          <div className="bg-white rounded-[20px] shadow-lg p-5">
            <p className="text-grayMedium text-[20px]">
              Equipamentos em Manuntenção
            </p>

            <table className="w-full table-fixed border-separate border-spacing-y-5">
              <tbody>
                <tr>
                  <th className="w-1/3 text-grayDark">Tipo de Equipamento</th>
                  <th className="w-1/3 text-grayDark">Data Inicial</th>
                  <th className="w-1/3 text-grayDark">Data Final</th>
                </tr>
                {maintenanceEquipments.length > 0 ? (
                  maintenanceEquipments
                    .slice(0, visibleMaintenanceCount)
                    .map((equipment, index) => (
                      <tr key={index}>
                        <td
                          className="w-1/3 text-grayDark"
                          title={
                            equipment.type === "Câmera"
                              ? "Andar: " + equipment.floor
                              : undefined
                          }
                        >
                          {equipment.type}
                        </td>
                        <td className="w-1/3 text-grayDark">
                          {equipment.dateStart}
                        </td>
                        <td className="w-1/3 text-grayDark">
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
      </div>
    </div>
  );
}
