export function addTurnstile(building) {
  return {
    ...building,
    qtdCatracas: (parseInt(building.qtdCatracas) + 1).toString(),
  };
}
