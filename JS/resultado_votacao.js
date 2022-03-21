import { restaurantes } from "./restaurantes.js";

$(function () {
  let maisVotado = 0;
  let vencedor;
  restaurantes.map((restaurante) => {
    if (restaurante.votos > maisVotado) {
      maisVotado = restaurante.votos;
      vencedor = restaurante;
    }
  });
  console.log(maisVotado);
  console.log(vencedor.nome);
  var mostraVencedor = $("<a class='ganhadorVotacao'/>");
  $(mostraVencedor).text(vencedor.nome);
  if (vencedor.site) {
    $(mostraVencedor).attr("href", vencedor.site);
    $(mostraVencedor).attr("target", "_blank");
  }
  $(".vencedorVotacao").append(mostraVencedor);
});
