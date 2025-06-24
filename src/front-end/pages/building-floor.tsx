import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../utils/components/modal";
import { listBuildingsId } from "../../back-end/services/list/list-building-id";
import RenderConfirm from "../../back-end/services/render/render-confirm";
import { createEnterprise } from "../../back-end/services/create/create-enterprise";
import { Andar } from "../../back-end/types/building-type";
import { createFloor } from "../../back-end/services/create/create-floor";
import { addAttendant } from "../../back-end/services/create/add-attendant";
import { AddCamera } from "../../back-end/services/create/add-camera";

export default function BuildingFloor() {
  const navigate = useNavigate();

  //States realacionados aos dados que serão exibidos
  const { id } = useParams();
  const buildingData = listBuildingsId(id);
  const [floors, setFloors] = useState<Andar[]>(buildingData.andares);

  //State que armazena o andar selecionado
  const [selectedFloorIndex, setSelectedFloorIndex] = useState<number | null>(
    null
  );

  //States relacioandos a abertura da modal
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

      {/* Exibe as infomaçoes dos andares(empresas, número de câmeras e recepção) */}
      {floors.map((floor, index) => (
        <div
          key={`${index}-${floor.nome}`}
          style={{
            border: "1px solid black",
            width: "400px",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h2>{index + 1}º Andar:</h2>

          {index === 0 ? (
            <>
              <h3>Recepção</h3>
              <p>
                <b>Quantidade de atendentes:</b> {floor.atendentes}
              </p>
              <button
                onClick={() => {
                  setSelectedFloorIndex(index);
                  setModalAttendantOpen(true);
                }}
              >
                Adicionar atendente por 20
              </button>
            </>
          ) : (
            <>
              <p>
                <b>Empresas:</b>
              </p>
              {floor.empresas && floor.empresas.length > 0 ? (
                <>
                  {floor.empresas.map((enterprise) => (
                    <div key={enterprise.nome}>
                      <h3>{enterprise.nome}</h3>
                      <p>Tráfego de pessoas: {enterprise.trafego}</p>
                    </div>
                  ))}
                  {floor.empresas.length < 2 && (
                    <button onClick={() => createEnterprise(floor)}>
                      Adicionar empresa
                    </button>
                  )}
                </>
              ) : (
                <button onClick={() => createEnterprise(floor)}>
                  Adicionar empresa
                </button>
              )}
            </>
          )}

          <p>
            <b>Quantidade de câmeras:</b> {floor.cameras}
          </p>
          <button
            onClick={() => {
              setSelectedFloorIndex(index);
              setModalCameraOpen(true);
            }}
          >
            Adicionar câmera por 5
          </button>
        </div>
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
            setFloors((prev) => AddCamera(prev, selectedFloorIndex))
          }
          onClose={() => setModalCameraOpen(false)}
        />
      </Modal>

      <button onClick={() => createFloor(floors, setFloors)}>
        Adicionar Andar
      </button>
    </div>
  );
}
