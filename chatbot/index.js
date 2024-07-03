// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require("venom-bot");
const formattedCursos = require("./database/teste");
const cursoNoTexto = require("./database/getCursos");
const contasBanco = require("./database/getConta");
const cursoPropina = require("./database/getPropina");
const exibirContactos = require("./database/getContactos");

require("dotenv").config();
venom
  .create({
    session: "session-name", //name of session
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

//Inico da função
function start(client) {
  let isAttendantActive = false;

  client.onMessage((message) => {
    if (!message.isGroupMsg) {
      if (message.body === "*") {
        isAttendantActive = false;
        client
          .sendText(message.from, "Você voltou ao chatbot. Envia Oi ou Olá para receber o menu de opções. ")
          .then((result) => {
            console.log("Result: ", result); // Retorno de sucesso
          })
          .catch((error) => {
            console.error("Erro ao enviar: ", error); // Retorno de erro
          });
        return;
      }
      
      if (isAttendantActive) {
        // Aqui, o atendente pode conversar com o cliente normalmente.
        // Para simular o atendimento do atendente, podemos apenas imprimir as mensagens
        console.log("Atendente ativo. Mensagem do cliente:", message.body);
        return;
      }

      if (
        message.body.toLowerCase() === "oi" ||
        message.body.toLowerCase() === "olá" ||
        message.body === "*"
      ) {
        // Enviar o menu de opções sempre que receber a mensagem "oi" de um contato individual
        let menus = "";
        formattedCursos()
          .then((response) => {
            menus = response;
          })
          .finally(() => {
            client
              .sendText(message.from, menus)
              .then((result) => {
                console.log("Result: ", result); // Retorno de sucesso
              })
              .catch((error) => {
                console.error("Erro ao enviar: ", error); // Retorno de erro
              });
          });
      } else {
        // Switch statement para lidar com as diferentes opções do menu
        switch (message.body) {
          // Lógica para lidar com a escolha cursos
          case "1":
            let textoPrincipal = "";
            cursoNoTexto()
              .then((texto) => {
                textoPrincipal = texto;
              })
              .finally(() => {
                client
                  .sendText(message.from, textoPrincipal)
                  .then((result) => {
                    console.log("Result: ", result); // Retorno de sucesso
                  })
                  .catch((error) => {
                    console.error("Erro ao enviar mensagem: ", error); // Retorno de erro
                  });
              });
            break;
          case "2":
            // Lógica para lidar com a escolha contacto secretaria
            let contactoPrincipal = "";
            exibirContactos()
              .then((numero) => {
                contactoPrincipal = numero;
                contactoPrincipal += "@c.us";
              })
              .finally(() => {
                client
                  .sendContactVcard(
                    message.from,
                    contactoPrincipal,
                    "946138648@c.us",
                    "Secretária ISPLB"
                  )
                  .then((result) => {
                    console.log("Result: ", result); // Retorno de sucesso
                  })
                  .catch((error) => {
                    console.error("Erro ao enviar: ", error); // Retorno de erro
                  });
              });
            break;
          case "3":
            // Lógica para lidar com a escolha regulamento
            client
              .sendFile(
                message.from,
                "./regulamento.pdf",
                "regulamento.pdf",
                "Aqui está o artigo do regulamento acadêmico em PDF, dá uma olhada!"
              )
              .then((result) => {
                console.log("Result: ", result); // Retorno de sucesso
              })
              .catch((error) => {
                console.error("Erro ao enviar: ", error); // Retorno de erro
              });
            break;
            case "4":
              // Lógica para lidar com a escolha consultar notas
              // Primeira mensagem explicando o link
              client
                .sendText(
                  message.from,
                  "Este link é para consulta de notas. Por favor, acesse o link abaixo para ver suas notas."
                )
                .then((result) => {
                  console.log("Primeira mensagem enviada: ", result); // Retorno de sucesso da primeira mensagem
                  // Segunda mensagem com o link
                  return client.sendText(
                    message.from,
                    "Clique no link para consultar suas notas: https://portal.ula.co.ao/login/index.php"
                  );
                })
                .then((result) => {
                  console.log("Segunda mensagem enviada: ", result); // Retorno de sucesso da segunda mensagem
                })
                .catch((error) => {
                  console.error("Erro ao enviar mensagens: ", error); // Retorno de erro
                });
              break;
             
          case "5":
            // Lógica para lidar com a escolha contas bancarias
            let textoConta = "";
            contasBanco()
              .then((conta) => {
                textoConta = conta;
              })
              .finally(() => {
                client
                  .sendText(message.from, textoConta)
                  .then((result) => {
                    console.log("Result: ", result); // Retorno de sucesso
                  })
                  .catch((error) => {
                    console.error("Erro ao enviar mensagem: ", error); // Retorno de erro
                  });
              });
            break;
          case "6":
            // Lógica para lidar com a escolha valor da propina
            let textoPropina = "";
            cursoPropina()
              .then((propina) => {
                textoPropina = propina;
              })
              .finally(() => {
                client
                  .sendText(message.from, textoPropina)
                  .then((result) => {
                    console.log("Result: ", result); // Retorno de sucesso
                  })
                  .catch((error) => {
                    console.error("Erro ao enviar mensagem: ", error); // Retorno de erro
                  });
              });
            break;
          case "7":
            // Lógica para lidar com a escolha localização
            client
              .sendLocation(
                message.from,
                "-12.34986",
                "-13.54709",
                "Rua 1º de Dezembro, Lobito, Angola"
              )
              .then((result) => {
                console.log("Result: ", result); // Retorno de sucesso
              })
              .catch((error) => {
                console.error("Erro ao enviar: ", error); // Retorno de erro
              });
            break;
          case "8":
            // Lógica para lidar com a escolha imagem ou actividades
            client
              .sendImage(
                message.from,
                "./isplb.jpg",
                "isplb.jpg",
                "Emulamento ISPLB onde poder obeter todos os dados para ingressar no ISPLB."
              )
              .then((result) => {
                console.log("Result: ", result); // Retorno de sucesso
              })
              .catch((error) => {
                console.error("Erro ao enviar: ", error); // Retorno de erro
              });
            break;
          case "9":
            // Lógica para lidar com a escolha falar com atendente
            isAttendantActive = true;
            client
              .sendText(
                message.from,
                "Agora está a falar com um atendente, deixe a sua questão em breve será atendida. Para voltar ao chatbot, envie *"
              )
              .then((result) => {
                console.log("Result: ", result); // Retorno de sucesso
              })
              .catch((error) => {
                console.error("Erro ao enviar: ", error); // Retorno de erro
              });
            break;
          default:
            // Opção inválida
            client
              .sendText(
                message.from,
                "Opção inválida. Por favor, escolha uma opção válida. \n\n *De 1 a 10* \n-----------------------------------\n1. Cursos Lecionados no ISPLB\n2. Contacto da Secretária\n3. Conhecer os regulamentos do ISPLB\n4. Consultar notas\n5. Contas Bancárias para pagar propina\n6. Valor da Propina\n7. Quer saber a nossa localização\n8. Emulamento ISPLB\n9. Falar com atendente (8h até 19h)"
              )
              .then((result) => {
                console.log("Result: ", result); // Retorno de sucesso
              })
              .catch((error) => {
                console.error("Erro ao enviar: ", error); // Retorno de erro
              });
            break;
        }
      }
    }
  });
}

