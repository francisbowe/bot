const conexao = require('./connection');

async function getContas() {
    const [contas] = await conexao.execute('SELECT * FROM contas');
    return contas;
}
async function contasBanco () {
    let conta = '*Estas são as contas bancarias do ISPLB*\n';
    const contas = await getContas();
    contas.forEach((contas) => {
        conta += contas['banco'] + ' - ' + contas.iban + '\n';
    })
    return conta;
}
module.exports = contasBanco;