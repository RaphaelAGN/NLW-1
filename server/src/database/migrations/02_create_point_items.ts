import Knex from 'knex';

//function para realizar alteração
export async function up(knex: Knex) {
    //DO
    return knex.schema.createTable('point_items', table => {
        table.increments('id').primary();
        table.integer('point_id')
            .notNullable()
            .references('id')
            .inTable('points');
        table.integer('item_id')
            .notNullable()
            .references('id')
            .inTable('items');
    })
}

//function para desfazer alteração
export async function down(knex: Knex) {
    //UNDO
    return knex.schema.dropTable('point_items');
}