const conexao = require('./connection');

async function getContacto() {
    const [contactos] = await conexao.execute('SELECT * FROM cursos');
    return contactos;
}
async function exibirContactos () {
    let numero = '';
    const contactos = await getCursos();
    contactos.forEach((contactos) => {
        numero += contactos['numero'] + '\n';
    })
    return numero;
}
module.exports = exibirContactos;