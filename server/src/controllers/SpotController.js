const Spot = require('../models/Spot')
const User = require('../models/User')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {

    async index(req, res) {
        const { tech } = req.query;

        if(!tech) {
            return res.status(400).json({ error: 'Please put a technology that you want using query parameter' })
        }

        // O valor de tech é uma String, e vamos passar dentro do método find do Mongo
        // Assim ele vai procurar dentro do array de tecnologias de cada lugar
        // somente a tecnologia que foi passada

        const spots = await Spot.find({ techs: tech })

        return res.json(spots)

    },

    async store (req, res) {
        const { filename } = req.file;
        const { company, techs, price } = req.body;

        /* O Header ele serve pra gente definir o contexto da nossa requisição */
        /* Podemos enviar contexto sobre autenticação como por exemplo o token do JWT */    
        /* Por exemplo podemos enviar o idioma do usuário, e a resposta pode vir em português ou inglês */    
        /* Na autenticação ele sempre é utilizado */

        const { user_id } = req.headers;

        if(!ObjectId.isValid(user_id)) {
            return res.status(400).json({ error: 'The User ID is incorrect' })
        }

        const user = await User.findById(user_id);

        if(!user) {
            return res.status(400).json({ error: 'User does not exists' })
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()),
            price
        })

        return res.json(spot)
    }



}