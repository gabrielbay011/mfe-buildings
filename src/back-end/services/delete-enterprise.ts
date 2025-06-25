export function deleteEnterprise(enterpriseId: string) {
  const confirmed = window.confirm("Tem certeza que deseja deletar?");
  if (confirmed) {
    alert("Empresa deletada: " + enterpriseId);
  }
}
