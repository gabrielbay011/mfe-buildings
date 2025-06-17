import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { mockBuildings, mockUsers } from "../../utils/mock-users";
import { Search } from "../../back-end/types/search-type";
import Modal from "../../utils/components/modal";
import { renderBuildings } from "../../back-end/services/render-buildings";
import { listBuildings } from "../../back-end/services/list-building";
import {
  Building,
  CreateBuildingType,
} from "../../back-end/types/building-type";
import { filterBuildings } from "../../back-end/services/filter-buildings";
import { createBuilding } from "../../back-end/services/create-building";
import { createBuildingSchema } from "../../back-end/schemas/create-building-schema";
import { sortBuildings } from "../../back-end/services/sort-buildings";
import {
  listBalances,
  renderBalances,
} from "../../back-end/services/render-balances";
import { Balances } from "../../back-end/types/balance-types";

export default function Buildings() {
  const navigate = useNavigate();
  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    reset: resetCreate,
    formState: { errors: createErrors },
  } = useForm<CreateBuildingType>({
    resolver: zodResolver(createBuildingSchema),
  });
  const { register: registerSearch, handleSubmit: handleSubmitSearch } =
    useForm<Search>();
  const [modalBuildingOpen, setModalBuildingOpen] = useState(false);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [filteredBuildings, setFilteredBuildings] = useState(mockBuildings);
  const [modalBalanceOpen, setModalBalanceOpen] = useState(false);
  const [balances, setBalances] = useState<Balances[]>([]);
  const [sortOption, setSortOption] = useState("");

  const handleSearch = (data: Search) => {
    const filtered = filterBuildings(buildings, data.search);
    setFilteredBuildings(filtered);
  };

  async function handleCreateBuilding(data: Building) {
    try {
      await createBuilding(data);
      resetCreate();
    } catch (err: any) {
      alert("Erro: " + err.message);
    }
  }

  useEffect(() => {
    const allBuildings = listBuildings();
    setBuildings(allBuildings);
  }, []);

  useEffect(() => {
    const loggedUser = mockUsers[0];
    const userBalances = listBalances(loggedUser.id);
    setBalances(userBalances);
  }, []);

  useEffect(() => {
    const ordered = sortBuildings(filteredBuildings, sortOption);
    setFilteredBuildings(ordered);
  }, [sortOption]);

  return (
    <div>
      <h1>Edifícios</h1>
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
      <div>
        <form onSubmit={handleSubmitSearch(handleSearch)}>
          <input type="text" {...registerSearch("search")} />
          <button type="submit">Buscar</button>
        </form>
      </div>
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
      <div style={{ border: "1px solid black", padding: "10px" }}>
        {filteredBuildings.length == 0 ? (
          <p>Nenhum edifício encontrado</p>
        ) : (
          renderBuildings(filteredBuildings)
        )}
      </div>
      <div>
        <button onClick={() => navigate("/buildings")}>Edifícios</button>
        <button>Dashboards</button>
      </div>
    </div>
  );
}
