const conexao = require('./connection');

async function getContas() {
    const [propinas] = await conexao.execute('SELECT * FROM propinas');
    return propinas;
}
async function cursoPropina () {
    let propina = '*As propinas no ISPLB se baseam nos seguintes moldes*\n';
    const propinas = await getContas();
    propinas.forEach((propinas) => {
        propina += propinas['ano'] + ' - ' + propinas.preco + '\n';
    })
    return propina;
}
module.exports = cursoPropina;