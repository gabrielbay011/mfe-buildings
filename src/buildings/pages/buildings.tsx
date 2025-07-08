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
import Input from "../../utils/components/input";
import Button from "../../utils/components/button";
import iconBalance from "../../public/images/icon-balance.svg";
import iconAdd from "../../public/images/icon-add.svg";
import iconOrder from "../../public/images/icon-order.svg";
import iconBalanceHover from "../../public/images/icon-balance-white.svg";
import iconAddHover from "../../public/images/icon-add-white.svg";
import iconOrderHover from "../../public/images/icon-order-white.svg";
import iconCheck from "../../public/images/icon-check-checkbox.svg";

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
      {/* Campo para pesquisar edifício */}

      <div className="m-10 md:mt-10 md:mb-10 md:ml-30 md:mr-30 lg:mt-20 lg:mb-15 lg:mr-40 lg:ml-40">
        <div className="mb-5 md:mb-10 flex justify-center lg:mb-15">
          <form
            onSubmit={handleSubmitSearch(handleSearchBuilding)}
            autoComplete="off"
            className=" w-full"
          >
            <Input
              type="search"
              placeholder="Pesquisar"
              register={registerSearch("search")}
              id="search"
            />
          </form>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="mb-3 md:mb-0 md:w-40 lg:w-50">
            <Button type="button" styleType="button">
              <img
                src={iconOrder}
                alt="Icone Ordenar"
                className="group-hover:hidden"
              />
              <img
                src={iconOrderHover}
                alt="Icone Ordenar"
                className="hidden group-hover:block"
              />
              Ordenar
            </Button>
            <div className="bg-white border border-purpleOutro rounded-b-[10px]">
              <div className="flex flex-col">
                <span className="text-[14px] text-grayMedium m-2 mb-0">
                  Ordem crescente
                </span>

                <div className="m-2">
                  <label className="inline-flex items-center cursor-pointer select-none font-medium">
                    <input
                      type="checkbox"
                      className="peer hidden"
                      name=""
                      id=""
                    />
                    <span className="w-6 h-6 rounded-[5px] border border-purpleMedium flex items-center justify-center peer-checked:bg-purpleMedium peer-checked:border-purpleMedium mr-2">
                      <img src={iconCheck} alt="Icone Check" />
                    </span>
                    Data
                  </label>
                </div>

                <hr className="border-purpleOutro" />

                <div className="m-2">
                  <label className="inline-flex items-center cursor-pointer select-none font-medium">
                    <input
                      type="checkbox"
                      className="peer hidden"
                      name=""
                      id=""
                    />
                    <span className="w-6 h-6 rounded-[5px] border border-purpleMedium flex items-center justify-center peer-checked:bg-purpleMedium peer-checked:border-purpleMedium mr-2">
                      <img src={iconCheck} alt="Icone Check" />
                    </span>
                    Nome
                  </label>
                </div>

                <hr className="border-purpleOutro" />
              </div>

              <div className="flex flex-col">
                <span className="text-[14px] text-grayMedium m-2 mb-0">
                  Ordem decrescente
                </span>

                <div className="m-2">
                  <label className="inline-flex items-center cursor-pointer select-none font-medium">
                    <input
                      type="checkbox"
                      className="peer hidden"
                      name=""
                      id=""
                    />
                    <span className="w-6 h-6 rounded-[5px] border border-purpleMedium flex items-center justify-center peer-checked:bg-purpleMedium peer-checked:border-purpleMedium mr-2">
                      <img src={iconCheck} alt="Icone Check" />
                    </span>
                    Data
                  </label>
                </div>

                <hr className="border-purpleOutro" />

                <div className="m-2">
                  <label className="inline-flex items-center cursor-pointer select-none font-medium">
                    <input
                      type="checkbox"
                      className="peer hidden"
                      name=""
                      id=""
                    />
                    <span className="w-6 h-6 rounded-[5px] border border-purpleMedium flex items-center justify-center peer-checked:bg-purpleMedium peer-checked:border-purpleMedium mr-2">
                      <img src={iconCheck} alt="Icone Check" />
                    </span>
                    Nome
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* <select
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
        </select> */}

          <div className="mb-3 md:mb-0 md:w-40 lg:w-50">
            <Button
              type="button"
              styleType="button"
              onClick={() => setModalBalanceOpen(true)}
            >
              <img
                src={iconBalance}
                alt="Icone Saldo"
                className="group-hover:hidden"
              />
              <img
                src={iconBalanceHover}
                alt=""
                className="hidden group-hover:block"
              />
              Saldo
            </Button>
            <Modal
              isOpen={modalBalanceOpen}
              onClose={() => setModalBalanceOpen(false)}
            >
              <h2>Histórico de Saldo</h2>
              {renderBalances(balances)}
            </Modal>
          </div>

          {/* Botão e modal para criar novos edifícios */}
          <div className="mb-3 md:mb-0 md:w-40 lg:w-50">
            <Button
              type="button"
              styleType="button"
              onClick={() => setModalBuildingOpen(true)}
            >
              <img
                src={iconAdd}
                alt="Icone Adicionar"
                className="group-hover:hidden"
              />
              <img
                src={iconAddHover}
                alt="Icone Adicionar"
                className="hidden group-hover:block"
              />
              Criar Edifício
            </Button>

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
        </div>
      </div>

      {/* Renderiza todos os edifícios */}
      <div className="flex justify-center border border-black">
        {filteredBuildings.length == 0 ? (
          <p>Nenhum edifício encontrado</p>
        ) : (
          <RenderBuildings building={filteredBuildings} />
        )}
      </div>
    </div>
  );
}
