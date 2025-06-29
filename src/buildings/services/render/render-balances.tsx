import React from "react";
import { Balance } from "../../types/balance-type";

//Função para rendererizar o hitórico de saldo
export function renderBalances(balances: Balance[]) {
  if (balances.length == 0) {
    return <p>Você ainda não tem nenhuma movimentação no saldo</p>;
  }

  return (
    <table style={{ border: "1px solid black", marginTop: 20 }}>
      <tbody>
        {balances.map((balance, index) => (
          <React.Fragment key={index}>
            <tr>
              <th style={{ border: "1px solid black" }} colSpan={2}>
                {balance.type.toLowerCase() === "manutenção"
                  ? "Saída"
                  : "Entrada"}
              </th>
            </tr>
            <tr>
              <td style={{ border: "1px solid black" }}>{balance.type}</td>
              <td style={{ border: "1px solid black" }}>{balance.date}</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid black" }}>{balance.value}</td>
              <td style={{ border: "1px solid black" }}>{balance.time}</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid black" }} colSpan={2}>
                {balance.currentBalance}
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
