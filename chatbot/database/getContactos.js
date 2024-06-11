const conexao = require('./connection');

async function getContactos() {
    const [contactos] = await conexao.execute('SELECT numero FROM contactos');
    return contactos;
}
async function exibirContactos () {
    let numero = '';
    const contactos = await getContactos();
    contactos.forEach((contacto) => {
        numero += contacto.numero;
    })
    return numero;
}
module.exports = exibirContactos;