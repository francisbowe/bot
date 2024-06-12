const conexao = require('./connection');

async function getContas() {
    const [contas] = await conexao.execute('SELECT * FROM contas');
    return contas;
}
async function contasBanco () {
    let texto = '*Estas são as contas bancarias do ISPLB*\n';
    const contas = await getContas();
    contas.forEach((contas) => {
        texto += contas['banco'] + ' - ' + contas.iban + '\n';
    })
    return texto;
}
module.exports = contasBanco;