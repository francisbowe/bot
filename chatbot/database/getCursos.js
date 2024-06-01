const conexao = require('./connection');

async function getCursos() {
    const [cursos] = await conexao.execute('SELECT * FROM cursos');
    return cursos;
}
async function cursoNoTexto () {
    let texto = '*Este são os cursos lecionados no ISPLB*\n';
    const cursos = await getCursos();
    cursos.forEach((curso) => {
        texto += curso['nome_curso'] + ' - ' + curso.duracao + '\n';
    })
    return texto;
}
module.exports = cursoNoTexto;