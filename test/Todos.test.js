const app = require('../app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env.test' });

let token;

describe('Todos API', () => {
    beforeEach(async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: process.env.TEST_EMAIL,
                password: process.env.TEST_PASSWORD,
            });

        token = response.body.data.token;
    });

    test('Get all Todos', async () => {
        const response = await request(app)
            .get('/todos')
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200);
    });

    test('Add Todo item', async () => {
        const response = await request(app)
            .post('/todos')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Test Todo', CategoryId: 1 });

        expect(response.statusCode).toBe(200);
        expect(response.body.data.todo.name).toBe('Test Todo');
    });

    test('Delete Todo item', async () => {
        const todoResponse = await request(app)
            .post('/todos')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Test Todo', CategoryId: 1 });

        const response = await request(app)
            .delete(`/todos/${todoResponse.body.data.todo.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });

    test('Get all Todos without JWT token', async () => {
        const response = await request(app).get('/todos');

        expect(response.statusCode).toBe(401);
    });

    test('Get all Todos with invalid JWT token', async () => {
        const response = await request(app)
            .get('/todos')
            .set('Authorization', `Bearer invalid_token`);

        expect(response.statusCode).toBe(401);
    });
});
