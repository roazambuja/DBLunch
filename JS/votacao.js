import { restaurantes } from "./restaurantes.js";

$(function () {
  var myRadio = $("input[name=restaurante]");
  myRadio.filter(":checked").val(null);
  gerarLista();
});

function gerarLista() {
  console.log(restaurantes);
  restaurantes.map((restaurante) => {
    var dadosRestaurante = $("<div class='formulario__restaurante'/>");
    var nome = $("<h2 class='formulario__restaurante--titulo'/>");
    var endereco = $("<p class='formulario__restaurante--endereco'/>");
    var descricao = $("<p class='formulario__restaurante--descricao'/>");
    var linha = $("<div  class='formulario__linha'/>");

    $(nome).text(restaurante.nome);
    $(descricao).text(restaurante.descricao);
    $(endereco).text(
      `${restaurante.endereco.logradouro}, n° ${restaurante.endereco.numero}`
    );

    if (restaurante.site) {
      var icone = $(
        "<a target='_blank' href='" +
          restaurante.site +
          "' <i class='fa fa-link'></i></a>"
      );
      $(nome).append(icone);
    }
    $(dadosRestaurante).append(nome);
    $(dadosRestaurante).append(descricao);
    $(dadosRestaurante).append(endereco);

    $(linha)
      .append(
        $("<input required>").attr({
          type: "radio",
          name: "restaurante",
          id: `${restaurante.id}`,
          value: `${restaurante.id}`,
          class: "formulario__input",
        })
      )
      .append(
        $("<label></label>")
          .attr({
            for: `${restaurante.id}`,
          })
          .html(dadosRestaurante)
      );

    $(".formulario").prepend(linha);
  });
}

$(".formulario__submit").click(function (event) {
  var myRadio = $("input[name=restaurante]");
  if (myRadio.filter(":checked").val() == null) {
    $(".erro").text("Você deve selecionar uma opção antes de enviar!");
    event.preventDefault();
  } else {
    restaurantes[myRadio.filter(":checked").val()].votos++;
  }
});
