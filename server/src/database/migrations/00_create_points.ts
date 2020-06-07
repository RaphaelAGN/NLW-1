import Knex from 'knex';

//function para realizar alteração
export async function up(knex: Knex) {
    //DO
    return knex.schema.createTable('points', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    })
}

//function para desfazer alteração
export async function down(knex: Knex) {
    //UNDO
    return knex.schema.dropTable('points');
}