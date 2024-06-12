// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');
const formattedCursos = require('./database/teste');
const cursoNoTexto = require('./database/getCursos');
const exibirContactos = require('./database/getContactos');
require('dotenv').config();
venom
  .create({
    session: 'session-name' //name of session
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });
  
  //Inico da função
 function start(client) {
    
  client.onMessage((message) => {
    if (!message.isGroupMsg && (message.body.toLowerCase() === 'oi' || message.body.toLowerCase() === 'olá')) {
       // Enviar o menu de opções sempre que receber a mensagem "oi" de um contato individual
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
        
    }else if (!message.isGroupMsg) {
        // Switch statement para lidar com as diferentes opções do menu
        
        switch (message.body) {
            // Lógica para lidar com a escolha  cursos
            case "1":
                let textoPrincipal = '';
                cursoNoTexto().then((texto)=>{
                    textoPrincipal = texto;
                }).finally(()=>{
                    
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
                // Lógica para lidar com a escolha contacto secretaria
                let contactoPrincipal = '';
                exibirContactos().then((numero)=>{
                    contactoPrincipal = numero;
                    contactoPrincipal += '@c.us';
                }).finally(()=>{
                    
                    client.sendContactVcard(message.from, contactoPrincipal, '946138648@c.us', 'Secretária ISPLB')
                    .then((result) => {
                        console.log('Result: ', result); // Retorno de sucesso
                    })
                    .catch((error) => {
                        console.error('Erro ao enviar: ', error); // Retorno de erro
                    });
                });

                break;
            case "3":
                // Lógica para lidar com a escolha regulamento
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
                 // Lógica para lidar com a escolha consultar notas
                client
                 .sendLinkPreview( message.from,
                   '000000000000@c.us',
                   'https://www.youtube.com/watch?v=V1bFr2SWP1I',
                   'Kamakawiwo ole'
                 )
                 .then((result) => {
                   console.log('Result: ', result); //return object success
                 })
                 .catch((erro) => {
                   console.error('Error when sending: ', erro); //return object error
                 });
               
                break;
            case "5":
                 // Lógica para lidar com a escolha contas bancarias
                 let textoConta = '';
                 contasBanco().then((conta)=>{
                     textoConta = conta;
                 }).finally(()=>{
                     
                 client
                 .sendText(
                     message.from,
                     textoConta
                 )
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
                client
                let textoPropina = '';
                cursoPropina().then((propina)=>{
                    textoPropina = propina;
                }).finally(()=>{
                    
                client
                .sendText(
                    message.from,
                    textoPropina
                )
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
                 // Lógica para lidar com a escolha imagem ou actividades
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
                    .sendText(message.from, 'Opção inválida. Por favor, escolha uma opção válida. \n\n *De 1 a 10* \n-----------------------------------\n1. Cursos Lecionado no ISPLB\n2. Contacto da Secretária\n3. Conhecer os regulamentos do ISPLB\n4. Consultar notas\n5. Contas Bancárias para pagar a propina\n6. Valor da Propina\n7. Quer saber a nossa localização\n8. Emulamento ISPLB\n')
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

