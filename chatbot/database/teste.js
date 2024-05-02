const connection = require('./connection')
const getMenus = async () => {
    const [menus] = await connection.execute('SELECT * FROM menus ORDER BY valor_da_opcao');
    return menus;
}

async function formattedMenus(){
    const menus = await getMenus();
    let text = 'Olá, como vai? \n\nEu sou o *Assistente virtual do ISPLB*. \nEm que posso te ajudar? 🙋‍♂️ \n *Escolha uma opção de 1 a 10* \n';
    menus.forEach(element => {
        text += element['valor_da_opcao'] + '. '+ element.descricao + '\n';
    });
    text+='\n';
    return text;
}
module.exports = formattedMenus;
