$(function () {
    const inputs = $(".input__field");
  
    $.each(inputs, function (index, input) {
      $(input).blur(function () {
        valida(input);
      });
    });
  });
  
  function valida(input) {
    const tipoDeInput = $(input).data().tipo;
  
    let div = $(input).parent().get(0);
    if (input.checkValidity()) {
      $(div).removeClass("input__invalid");
      $($(div).children(".input__error").get(0)).text("");
    } else {
      $(div).addClass("input__invalid");
  
      $($(div).children(".input__error").get(0)).text(
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
    nome: {
      valueMissing: "O campo de nome não pode estar vazio.",
    },
    email: {
      valueMissing: "O campo de email não pode estar vazio.",
      typeMismatch: "O email digitado não é válido.",
    },
    senha: {
      valueMissing: "O campo de senha não pode estar vazio.",
      patternMismatch:
        "A senha deve conter entre 8 a 12 caracteres, deve conter pelo menos uma letra maiúscula, um número e não deve conter símbolos.",
    },
  };