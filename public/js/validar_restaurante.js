$(function () {
  const inputs = $(".input__campo");

  $.each(inputs, function (index, input) {
    $(input).blur(function () {
      valida(input);
    });
  });
});

function valida(input) {
  const tipoDeInput = $(input).data().tipo;

  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  let div = $(input).parent().get(0);
  if (input.checkValidity()) {
    $(div).removeClass("input__invalido");
    $($(div).children(".input__erro").get(0)).text("");
  } else {
    $(div).addClass("input__invalido");

    $($(div).children(".input__erro").get(0)).text(
      mostraMensagemDeErro(tipoDeInput, input)
    );
  }
}

function mostraMensagemDeErro(tipoDeInput, input) {
  let mensagem = "";

  $.each(tiposDeErro, function (index, erro) {
    if (input.validity[erro]) {
      mensagem = mensagensDeErro[tipoDeInput][erro];
    }
  });
  return mensagem;
}

const tiposDeErro = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensagensDeErro = {
  nomeRestaurante: {
    valueMissing: "O campo nome não pode estar vazio",
  },
  site: {
    patternMismatch: "O endereço digitado não é um site válido",
  },
  descricao: {
    valueMissing: "O campo de descrição não pode estar vazio",
  },
  cep: {
    valueMissing: "O campo de CEP não pode estar vazio",
    patternMismatch: "O CEP digitado não é válido",
    customError: "Não foi possível buscar o CEP",
  },
  bairro: {
    valueMissing: "O campo de bairro não pode estar vazio",
  },
  logradouro: {
    valueMissing: "O campo de logradouro não pode estar vazio",
  },
  cidade: {
    valueMissing: "O campo de cidade não pode estar vazio",
  },
  numero: {
    valueMissing: "O campo de numero não pode estar vazio",
    patternMismatch: "Você deve digitar apenas números",
  },
};

const validadores = {
  cep: (input) => validarCEP(input),
};

async function validarCEP(input) {
  const cep = $(input).val().replace(/\D/g, "");
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8",
    },
  };

  if (!input.validity.patternMismatch && !input.validity.valueMissing) {
    await fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.erro === true) {
          input.setCustomValidity("Não foi possível buscar o CEP.");
          return;
        } else {
          input.setCustomValidity("");
        }

        // preencheCamposComCEP(data);
        return;
      })
      .catch((error) => {
        input.setCustomValidity("Não foi possível buscar o CEP.");
      });

    let div = $(input).parent().get(0);
    $($(div).children(".input__erro").get(0)).text(
      mostraMensagemDeErro("cep", input)
    );
  }
}

// function preencheCamposComCEP(data) {
//   const logradouro = document.querySelector('[data-tipo="logradouro"]');
//   const cidade = document.querySelector('[data-tipo="cidade"]');
//   const estado = document.querySelector('[data-tipo="estado"]');

//   logradouro.value = data.logradouro;
//   cidade.value = data.localidade;

//   estado.value = data.uf;
// }
