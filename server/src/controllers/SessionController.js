const User = require('../models/User')

/* Métodos dentro de um controller */

// index, show, store, update, destroy

/* Quando criarmos o método index dentro do controller isso quer dizer que estamos criando uma listagem de sessões */
/* Quando criarmos o método show dentro do controller é quando queremos listar uma única sessão passando o seu ID */
/* Quando criarmos o método store dentro do controller é para criar uma sessão */
/* Quando criarmos o método store dentro do controller é para alterar uma sessão */
/* Quando criarmos o método store dentro do controller é para remover deletar uma sessão */

module.exports = {

    async store(req, res) {
        const { email } = req.body

        let user = await User.findOne({ email });

        if(!user) {
            user = await User.create({ email })
        }

        return res.json(user)
    }

}