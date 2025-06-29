import { Person } from "../../types/person-type";

//Função para renderizar as informações das pessoas
export function renderPerson(person?: Person) {
  if (!person) {
    return <p>Dados da pessoa não encontrados</p>;
  }

  return (
    <table style={{ border: "1px solid black", marginTop: 20 }}>
      <tbody>
        <tr>
          <th style={{ border: "1px solid black" }}>Campo</th>
          <th style={{ border: "1px solid black" }}>Valor</th>
        </tr>
        <tr>
          <td style={{ border: "1px solid black" }}>CPF</td>
          <td style={{ border: "1px solid black" }}>{person.cpf || "--"}</td>
        </tr>
        <tr>
          <td style={{ border: "1px solid black" }}>RG</td>
          <td style={{ border: "1px solid black" }}>{person.rg || "--"}</td>
        </tr>
        <tr>
          <td style={{ border: "1px solid black" }}>Nome</td>
          <td style={{ border: "1px solid black" }}>{person.name || "--"}</td>
        </tr>
        <tr>
          <td style={{ border: "1px solid black" }}>Sobrenome</td>
          <td style={{ border: "1px solid black" }}>
            {person.surname || "--"}
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid black" }}>Telefone</td>
          <td style={{ border: "1px solid black" }}>
            {person.telphone || "--"}
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid black" }}>CEP</td>
          <td style={{ border: "1px solid black" }}>{person.cep || "--"}</td>
        </tr>
        <tr>
          <td style={{ border: "1px solid black" }}>Estado</td>
          <td style={{ border: "1px solid black" }}>{person.state || "--"}</td>
        </tr>
        <tr>
          <td style={{ border: "1px solid black" }}>Cidade</td>
          <td style={{ border: "1px solid black" }}>{person.city || "--"}</td>
        </tr>
        <tr>
          <td style={{ border: "1px solid black" }}>Bairro</td>
          <td style={{ border: "1px solid black" }}>
            {person.district || "--"}
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid black" }}>Rua</td>
          <td style={{ border: "1px solid black" }}>{person.road || "--"}</td>
        </tr>
        <tr>
          <td style={{ border: "1px solid black" }}>Número</td>
          <td style={{ border: "1px solid black" }}>{person.number || "--"}</td>
        </tr>
        <tr>
          <td style={{ border: "1px solid black" }}>QR Code</td>
          <td style={{ border: "1px solid black" }}>{person.qrCode || "--"}</td>
        </tr>
        <tr>
          <td style={{ border: "1px solid black" }}>Data de Cadastro</td>
          <td style={{ border: "1px solid black" }}>
            {person.dateRegistration || "--"}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
