import knex from '../database/connection';
import {Request, Response} from 'express';

class ItemsController {
    async index(request: Request, response: Response) {
        //equivalente a SELECT * FROM items
        const items = await knex('items').select('*');

        //transformação de dados para um novo formato mais acessível para quem requisitá-los
        const serializedItems = items.map(item => {
            return { 
                id: item.id,
                title: item.title,
                image_url: `http://192.168.0.6:3333/uploads/${item.image}`,
            }
        })
        return response.json(serializedItems);
    }
}

export default ItemsController;