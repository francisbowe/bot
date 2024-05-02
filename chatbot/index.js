// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');
const formattedCursos = require('./database/teste');
const cursoNoTexto = require('./database/getCursos');
require('dotenv').config();
venom
  .create({
    session: 'session-name' //name of session
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });
  
 function start(client) {
    
  client.onMessage((message) => {
    if (!message.isGroupMsg && (message.body.toLowerCase() === 'oi' || message.body.toLowerCase() === 'olá')) {
        let menus= '';
        formattedCursos().then((response)=>{
            menus = response;
        }).finally(()=>{
            client
            .sendText(message.from, (menus))
            .then((result) => {
                console.log('Result: ', result); // Retorno de sucesso
            })
            .catch((error) => {
                console.error('Erro ao enviar: ', error); // Retorno de erro
            });
        });
        // Enviar o menu de opções sempre que receber a mensagem "oi" de um contato individual
    
    }else if (!message.isGroupMsg) {
        // Switch statement para lidar com as diferentes opções do menu
        switch (message.body) {
            case "1":
                let textoPrincipal = '';
                cursoNoTexto().then((texto)=>{
                    textoPrincipal = texto;
                }).finally(()=>{
                    // Lógica para lidar com a escolha  
                client
                .sendText(
                    message.from,
                    textoPrincipal
                )
                .then((result) => {
                    console.log("Result: ", result); // Retorno de sucesso
                })
                .catch((error) => {
                    console.error("Erro ao enviar mensagem: ", error); // Retorno de erro
                });
                });
                
                break;
            case "2":
                // Lógica para lidar com a escolha 
                client.sendContactVcard(message.from, '925954469@c.us', '946138648@c.us', 'Secretária ISPLB')
                    .then((result) => {
                        console.log('Result: ', result); // Retorno de sucesso
                    })
                    .catch((error) => {
                        console.error('Erro ao enviar: ', error); // Retorno de erro
                    });
                break;
            case "3":
                client.sendFile(
                    message.from,
                    './regulamento.pdf',
                    'regulamento.pdf',
                    'Aqui está o artigo do regulamento acadêmico em PDF, dá uma olhada!'
                )
                    .then((result) => {
                        console.log('Result: ', result); // Retorno de sucesso
                    })
                    .catch((error) => {
                        console.error('Erro ao enviar: ', error); // Retorno de erro
                    });
                break;
            case "4":
                client
                    .sendText(
                        message.from,
                        "Infelizmente, a opção para consultar notas não está disponível no momento."
                    )
                    .then((result) => {
                        console.log("Result: ", result); // Retorno de sucesso
                    })
                    .catch((error) => {
                        console.error("Erro ao enviar mensagem: ", error); // Retorno de erro
                    });
                break;
            case "5":
                client
                    .sendText(
                        message.from,
                        "No ISPLB a propina está estipulada nos seguintes moldes \nPara os Alunos do 1º ano  \nPara os Alunos do 2º, 3º, 4º, 5º ano propina de 42.000kz "
                    )
                    .then((result) => {
                        console.log("Result: ", result); // Retorno de sucesso
                    })
                    .catch((error) => {
                        console.error("Erro ao enviar mensagem: ", error); // Retorno de erro
                    });
                break;
            case "6":
                client
                    .sendText(
                        message.from,
                        "Infelizmente, a opção para consultar o valor da propina não está disponível no momento."
                    )
                    .then((result) => {
                        console.log("Result: ", result); // Retorno de sucesso
                    })
                    .catch((error) => {
                        console.error("Erro ao enviar mensagem: ", error); // Retorno de erro
                    });
                break;
            case "7":
                client
                    .sendLocation(
                        message.from,
                        '-12.34986',
                        '-13.54709',
                        'Rua 1º de Dezembro, Lobito, Angola'
                    )
                    .then((result) => {
                        console.log('Result: ', result); // Retorno de sucesso
                    })
                    .catch((error) => {
                        console.error('Erro ao enviar: ', error); // Retorno de erro
                    });
                break;
            case "8":
                client
                    .sendImage(
                        message.from,
                        'path/to/img.jpg',
                        'image.jpg',
                        'Legenda da imagem'
                    )
                    .then((result) => {
                        console.log('Result: ', result); // Retorno de sucesso
                    })
                    .catch((error) => {
                        console.error('Erro ao enviar: ', error); // Retorno de erro
                    });
                break;
            default:
                // Opção inválida
                client
                    .sendText(message.from, 'Opção inválida. Por favor, escolha uma opção válida. \n\n *De 1 a 10* \n-----------------------------------\n1. Cursos Lecionado no ISPLB\n2. Contacto da Secretária\n3. Conhecer os regulamentos do ISPLB\n4. Consultar notas\n5. Contas Bancárias para pagar a propina\n6. Valor da Propina\n7. Quer saber a nossa localização\n8. Imagem do Edifício ISLPB\n')
                    .then((result) => {
                        console.log('Result: ', result); // Retorno de sucesso
                    })
                    .catch((error) => {
                        console.error('Erro ao enviar: ', error); // Retorno de erro
                    });
                break;
        }
    }
  });
}