import Knex from 'knex';

//function para realizar alteração
export async function up(knex: Knex) {
    //DO
    return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
    })
}

//function para desfazer alteração
export async function down(knex: Knex) {
    //UNDO
    return knex.schema.dropTable('items');
}