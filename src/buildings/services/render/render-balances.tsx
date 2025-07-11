import React from "react";
import { Balance } from "../../types/balance-type";

//Função para rendererizar o hitórico de saldo
export function renderBalances(balances: Balance[]) {
  if (balances.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Você ainda não tem nenhuma movimentação no saldo
      </p>
    );
  }

  return (
    <div className="flex flex-col">
      {balances.map((balance, index) => (
        <div
          key={index}
          className={`${
            index == 0 ? "border-t-2 border-b-2" : "border-b-2"
          }  border-grayPrimary px-4 py-2 flex flex-col gap-1`}
        >
          <span className="text-grayPrimary text-[12px] font-semibold">
            {["Manutenção", "Compra"].includes(balance.type)
              ? "SAÍDA"
              : "ENTRADA"}
          </span>

          <div className="flex justify-between text-[12px]">
            <span>{balance.date}</span>
            <div
              className={`px-2 py-[2px] rounded-[10px] text-center text-[12px] min-w-[80px] ${
                balance.type === "Pagamento"
                  ? "bg-greenLight text-greenMedium border border-greenMedium"
                  : balance.type === "Manutenção"
                  ? "bg-yellowLight text-yellowMedium border border-yellowMedium"
                  : balance.type === "Compra"
                  ? "bg-redLight text-redMedium border border-redMedium"
                  : ""
              }`}
            >
              {balance.type}
            </div>
            <div className="text-center">
              <span
                className={`${
                  ["Manutenção", "Compra"].includes(balance.type)
                    ? "text-redMedium"
                    : "text-greenMedium"
                }`}
              >
                {balance.value}
              </span>
            </div>
          </div>

          <div className="flex justify-between text-[12px]">
            <span>{balance.time}</span>
            <span className="text-grayPrimary">
              Saldo: {balance.currentBalance}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
