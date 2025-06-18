import { mockBalances } from "../../utils/mock-users";
import { Balances } from "../types/balance-types";

export function listBalances(userId: string) {
  return mockBalances.filter((balance) => balance.id === userId);
}

export function renderBalances(balances: Balances[]) {
  if (mockBalances.length == 0) {
    return <p>Você ainda não tem nenhuma movimentação no saldo</p>;
  }
  return (
    <table style={{ border: "1px solid black", marginTop: 20 }}>
      {balances.map((balance, index) => (
        <tbody key={index}>
          <tr>
            <th style={{ border: "1px solid black" }} colSpan={2}>
              {balance.tipo.toLowerCase() === "manutenção" ? (
                <p>Saída</p>
              ) : (
                <p>Entrada</p>
              )}
            </th>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>{balance.tipo}</td>
            <td style={{ border: "1px solid black" }}>{balance.data}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>{balance.valor}</td>
            <td style={{ border: "1px solid black" }}>{balance.hora}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }} colSpan={2}>
              {balance.saldoAtual}
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
}
