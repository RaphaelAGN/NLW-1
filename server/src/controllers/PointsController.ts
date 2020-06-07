import {Request, Response} from 'express';
import knex from '../database/connection';
class PointsController {
    
    async create(request: Request, response: Response) {
        const { //equivalente a const name = request.body.name ... 
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        //método transaction para que caso haja falha em alguma query, nenhuma outra seja executada
        const trx = await knex.transaction();

        const point = {
            //milha extra
            image: request.file.filename,
            name, //como nome da variável é igual ao nome da propriedade do objeto, não é necessário name: name
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }
    
        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];

        //Aula extra
        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
                return {
                    item_id,
                    point_id: point_id,
                };
            })

        await trx('point_items').insert(pointItems);
        //realiza os inserts na base de dados (usado sempre que há transaction)
        await trx.commit();

        return response.json({
            id: point_id,
            ...point,
        });
    
    }

    async index(request: Request, response: Response) {
        const {city, uf, items} = request.query;
        
        //converter items de string para array
        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));
        
        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems) //todos os pontos que tem pelo menos um item_id = id corrente
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        //milha extra
        const serializedPoints = points.map(point => {
            return { 
                ...point,
                image_url: `http://192.168.0.6:3333/uploads/${point.image}`,
            }
        })

        return response.json(serializedPoints);
    }

    async show(request: Request, response: Response) {
        const {id} = request.params;
        //first para retornar apenas um único registro
        const point = await knex('points').where('id', id).first();
        if(!point) {
            return response.status(400).json({message: 'Point not found'});
        }

        //milha extra
        const serializedPoint = {
            ...point,
            image_url: `http://192.168.0.6:3333/uploads/${point.image}`,
        };

        /**
         * SELECT * FROM items
         *      JOIN point_items ON items.id = point_items.item_id
         *      WHERE point_items.point_id = {id}
         */
        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        //milha extra
        return response.json({point: serializedPoint, items});
    }
};

export default PointsController;