import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../utils/components/modal";
import { listBuildingsId } from "../../utils/services/list/list-building-id";
import RenderConfirm from "../../utils/services/render/render-confirm";
import { createEnterprise } from "../services/create/create-enterprise";
import { Floor } from "../../utils/types/floor-type";
import { createFloor } from "../services/create/create-floor";
import { addAttendant } from "../services/create/add-attendant";
import { addCamera } from "../services/create/add-camera";
import { deleteEnterprise } from "../services/delete/delete-enterprise";

export default function BuildingFloor() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<{
    floorIndex: number;
    entIndex: number;
  } | null>(null);

  //States realacionados aos dados que serão exibidos
  const { id } = useParams();
  const buildingData = listBuildingsId(id);
  const [floors, setFloors] = useState<Floor[]>(buildingData.floors);

  //State que armazena o andar selecionado
  const [selectedFloorIndex, setSelectedFloorIndex] = useState<number | null>(
    null
  );

  //States relacionados a abertura da modal
  const [modalAttendantOpen, setModalAttendantOpen] = useState(false);
  const [modalCameraOpen, setModalCameraOpen] = useState(false);

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

        <h1>Andares</h1>
      </div>

      {floors.map((floor, index) => (
        <table
          key={`${index}-${floor.name}`}
          style={{
            border: "1px solid black",
            width: "400px",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <thead>
            <tr>
              <th>
                <b>{index + 1}º Andar:</b>
              </th>
            </tr>
          </thead>

          <tbody>
            {index === 0 ? (
              <>
                <tr>
                  <td>
                    <b>Recepção</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Quantidade de atendentes:</b> {floor.attendants}
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedFloorIndex(index);
                        setModalAttendantOpen(true);
                      }}
                    >
                      Adicionar atendente por 20
                    </button>
                  </td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <td>
                    <b>Empresas:</b>
                  </td>
                </tr>

                {floor.enterprises && floor.enterprises.length > 0 ? (
                  <>
                    {floor.enterprises.map((enterprise, entIndex) => (
                      <React.Fragment key={enterprise.name}>
                        <tr>
                          <td
                            onMouseEnter={() =>
                              setHovered({ floorIndex: index, entIndex })
                            }
                            onMouseLeave={() => setHovered(null)}
                          >
                            <b style={{ cursor: "pointer" }}>
                              {enterprise.name}
                            </b>
                            {hovered &&
                              hovered.floorIndex === index &&
                              hovered.entIndex === entIndex && (
                                <button
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    deleteEnterprise(
                                      enterprise.id,
                                      index,
                                      setFloors
                                    )
                                  }
                                >
                                  Deletar
                                </button>
                              )}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Tráfego de pessoas: </b>
                            {enterprise.traffic}
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}

                    {floor.enterprises.length < 2 && (
                      <tr>
                        <td>
                          <button
                            style={{ cursor: "pointer" }}
                            onClick={() => createEnterprise(index, setFloors)}
                          >
                            Adicionar empresa
                          </button>
                        </td>
                      </tr>
                    )}
                  </>
                ) : (
                  <tr>
                    <td>
                      <button
                        style={{ cursor: "pointer" }}
                        onClick={() => createEnterprise(index, setFloors)}
                      >
                        Adicionar empresa
                      </button>
                    </td>
                  </tr>
                )}
              </>
            )}

            <tr>
              <td>
                <b>Quantidade de câmeras:</b> {floor.cameras}
              </td>
            </tr>
            <tr>
              <td>
                <button
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedFloorIndex(index);
                    setModalCameraOpen(true);
                  }}
                >
                  Adicionar câmera por 5
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      ))}

      {/* Modal para adicionar um novo atendente */}
      <Modal
        isOpen={modalAttendantOpen}
        onClose={() => setModalAttendantOpen(false)}
      >
        <h2>Confirmar Contratação</h2>
        <RenderConfirm
          cost={20}
          onConfirm={() =>
            selectedFloorIndex !== null &&
            setFloors((prev) => addAttendant(prev, selectedFloorIndex))
          }
          onClose={() => setModalAttendantOpen(false)}
        />
      </Modal>

      {/* Modal para adicionar uma nova câmera */}
      <Modal isOpen={modalCameraOpen} onClose={() => setModalCameraOpen(false)}>
        <h2>Confirmar Instalação</h2>
        <RenderConfirm
          cost={5}
          onConfirm={() =>
            selectedFloorIndex !== null &&
            setFloors((prev) => addCamera(prev, selectedFloorIndex))
          }
          onClose={() => setModalCameraOpen(false)}
        />
      </Modal>

      <button
        style={{ cursor: "pointer" }}
        onClick={() => createFloor(floors, setFloors)}
      >
        Adicionar Andar
      </button>
    </div>
  );
}
