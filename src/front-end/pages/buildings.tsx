import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { mockBuildings, mockUsers } from "../../utils/mock-data";
import { Search } from "../../back-end/types/search-type";
import Modal from "../../utils/components/modal";
import { RenderBuildings } from "../../back-end/services/render/render-buildings";
import { listBuildings } from "../../back-end/services/list/list-building";
import {
  Building,
  CreateBuildingType,
} from "../../back-end/types/building-type";
import { filterBuildings } from "../../back-end/services/order/filter-buildings";
import { createBuilding } from "../../back-end/services/create/create-building";
import { createBuildingSchema } from "../../back-end/schemas/create-building-schema";
import { sortBuildings } from "../../back-end/services/order/sort-buildings";
import { renderBalances } from "../../back-end/services/render/render-balances";
import { listBalances } from "../../back-end/services/list/list-balance";
import { Balances } from "../../back-end/types/balance-types";

//Página de edifícios
export default function Buildings() {
  const navigate = useNavigate();

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

  //States relacionados ao edifício
  const [modalBuildingOpen, setModalBuildingOpen] = useState(false);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [filteredBuildings, setFilteredBuildings] =
    useState<Building[]>(mockBuildings);

  //States relaciondados ao saldo
  const [modalBalanceOpen, setModalBalanceOpen] = useState(false);
  const [balances, setBalances] = useState<Balances[]>([]);
  const [sortOption, setSortOption] = useState("");

  //Função que filtra os edifícios com base no que o usuário pesquisou
  const handleSearch = (data: Search) => {
    const filtered = filterBuildings(buildings, data.search);
    setFilteredBuildings(filtered);
  };

  //Função executada no envio do formulário e retorna sucesso ou erro ao tentar criar uma empresa
  async function handleCreateBuilding(data: Building) {
    try {
      await createBuilding(data);
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
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Ordenar por</option>
          <option value="name-asc">Ordem nome (A-Z)</option>
          <option value="name-desc">Ordem nome (Z-A)</option>
          <option value="date-asc">Ordem data (Mais recente)</option>
          <option value="date-desc">Ordem data (Mais antigo)</option>
        </select>

        <div>
          <button onClick={() => setModalBalanceOpen(true)}>Saldo</button>

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
        <form onSubmit={handleSubmitSearch(handleSearch)}>
          <input type="text" {...registerSearch("search")} />

          <button type="submit">Buscar</button>
        </form>
      </div>

      {/* Botão e modal para criar novos edifícios */}
      <div>
        <button onClick={() => setModalBuildingOpen(true)}>
          Criar Edifício
        </button>

        <Modal
          isOpen={modalBuildingOpen}
          onClose={() => setModalBuildingOpen(false)}
        >
          <h2>Criar Edifício</h2>
          <form onSubmit={handleSubmitCreate(handleCreateBuilding)}>
            <label htmlFor="buildingName">Nome</label>
            <input type="text" {...registerCreate("nome")} />
            {createErrors.nome && (
              <p style={{ color: "red" }}>{createErrors.nome.message}</p>
            )}
            <br />

            <button type="submit">Salvar</button>
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
        <button onClick={() => navigate("/")}>Edifícios</button>
        <button>Dashboards</button>
      </div>
    </div>
  );
}
