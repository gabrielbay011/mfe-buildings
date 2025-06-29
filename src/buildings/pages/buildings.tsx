import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { mockBuildings, mockUsers } from "../../utils/mock-data";
import { Search } from "../types/search-type";
import Modal from "../../utils/components/modal";
import { RenderBuildings } from "../services/render/render-buildings";
import { listBuildings } from "../../utils/services/list/list-building";
import { Building } from "../../utils/types/building-type";
import { CreateBuildingType } from "../types/create-building-type";
import { filterBuildings } from "../services/order/filter-buildings";
import { createBuilding } from "../services/create/create-building";
import { createBuildingSchema } from "../schemas/create-building-schema";
import { sortBuildings } from "../services/order/sort-buildings";
import { renderBalances } from "../services/render/render-balances";
import { listBalances } from "../services/list/list-balance";
import { Balance } from "../types/balance-type";

//Página de edifícios
export default function Buildings() {
  const navigate = useNavigate();

  //States relacionados aos dados que serão exiidos
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [filteredBuildings, setFilteredBuildings] =
    useState<Building[]>(mockBuildings);
  const [balances, setBalances] = useState<Balance[]>([]);
  const [sortOption, setSortOption] = useState("");

  //Inicialização do formulário de criar edifiício
  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    reset: resetCreate,
    formState: { errors: createErrors },
  } = useForm<CreateBuildingType>({
    resolver: zodResolver(createBuildingSchema),
  });

  //Inicialização do formulário de buscar edifício
  const { register: registerSearch, handleSubmit: handleSubmitSearch } =
    useForm<Search>();

  //State relacionado a modal de edifício
  const [modalBuildingOpen, setModalBuildingOpen] = useState(false);

  //State relaciondado a modal de saldo
  const [modalBalanceOpen, setModalBalanceOpen] = useState(false);

  //Função que filtra os edifícios com base no que o usuário pesquisou
  const handleSearchBuilding = (data: Search) => {
    const filtered = filterBuildings(buildings, data.search);
    setFilteredBuildings(filtered);
  };

  //Função executada no envio do formulário e retorna sucesso ou erro ao tentar criar uma empresa
  function handleCreateBuilding(data: Building) {
    try {
      createBuilding(data);
      resetCreate();
    } catch (err: any) {
      alert("Erro: " + err.message);
    }
  }

  //Lista todos os edifícios ao iniciar o componente
  useEffect(() => {
    const allBuildings = listBuildings();
    setBuildings(allBuildings);
  }, []);

  //Carrega o histórico dos saldos do usuário ao iniciar o componente
  useEffect(() => {
    const loggedUser = mockUsers[0];
    const userBalances = listBalances(loggedUser.id);
    setBalances(userBalances);
  }, []);

  //Atualiza a lista de edifícios ordenados quando muda a opção de ordenação
  useEffect(() => {
    const ordered = sortBuildings(filteredBuildings, sortOption);
    setFilteredBuildings(ordered);
  }, [sortOption]);

  return (
    <div>
      <h1>Edifícios</h1>

      {/* Select para ordenar os edifícios e modal para exibir o histórico de saldo */}
      <div style={{ display: "flex", gap: "10px" }}>
        <select
          id="sort-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="" id="sort-default">
            Ordenar por
          </option>
          <option value="name-asc" id="name-asc">
            Ordem nome (A-Z)
          </option>
          <option value="name-desc" id="name-desc">
            Ordem nome (Z-A)
          </option>
          <option value="date-asc" id="date-asc">
            Ordem data (Mais recente)
          </option>
          <option value="date-desc" id="date-desc">
            Ordem data (Mais antigo)
          </option>
        </select>

        <div>
          <button
            style={{ cursor: "pointer" }}
            onClick={() => setModalBalanceOpen(true)}
          >
            Saldo
          </button>
          <Modal
            isOpen={modalBalanceOpen}
            onClose={() => setModalBalanceOpen(false)}
          >
            <h2>Histórico de Saldo</h2>
            {renderBalances(balances)}
          </Modal>
        </div>
      </div>

      {/* Campo para pesquisar edifício */}
      <div>
        <form
          onSubmit={handleSubmitSearch(handleSearchBuilding)}
          autoComplete="off"
        >
          <label htmlFor="search">Pesquisar edifiício:</label>
          <br />
          <input type="text" id="search" {...registerSearch("search")} />

          <button style={{ cursor: "pointer" }} type="submit">
            Buscar
          </button>
        </form>
      </div>

      {/* Botão e modal para criar novos edifícios */}
      <div>
        <button
          style={{ cursor: "pointer" }}
          onClick={() => setModalBuildingOpen(true)}
        >
          Criar Edifício
        </button>

        <Modal
          isOpen={modalBuildingOpen}
          onClose={() => setModalBuildingOpen(false)}
        >
          <h2>Criar Edifício</h2>
          <form
            onSubmit={handleSubmitCreate(handleCreateBuilding)}
            autoComplete="off"
          >
            <label htmlFor="name">Nome:</label>
            <br />
            <input type="text" id="name" {...registerCreate("name")} />
            {createErrors.name && (
              <p style={{ color: "red" }}>{createErrors.name.message}</p>
            )}
            <br />

            <button style={{ cursor: "pointer" }} type="submit">
              Salvar
            </button>
          </form>
        </Modal>
      </div>

      {/* Renderiza todos os edifícios */}
      <div
        style={{
          border: "1px solid black",
          height: "60px",
          width: "300px",
          overflowY: "auto",
        }}
      >
        {filteredBuildings.length == 0 ? (
          <p>Nenhum edifício encontrado</p>
        ) : (
          <RenderBuildings building={filteredBuildings} />
        )}
      </div>

      {/* Botões para navegar entra as telas de edifícios e dashboards */}
      <div>
        <button style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Edifícios
        </button>
        <button style={{ cursor: "pointer" }}>Dashboards</button>
      </div>
    </div>
  );
}
