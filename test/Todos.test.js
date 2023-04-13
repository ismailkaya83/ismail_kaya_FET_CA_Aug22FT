const app = require('../app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env.test' });

let token;

describe('Todos API', () => {
    // Logging in with a valid account and saving the JWT token
    test('should login and return a JWT token', async () => {
        const res = await request(app)
            .post('/login')
            .send({ email: process.env.TEST_EMAIL, password: process.env.TEST_PASSWORD });

        expect(res.statusCode).toEqual(200);
        //expect(res.body).toHaveProperty("token");

        //print response
        console.log(res.body);
        token = res.body.token;
    });

// Using tokens to get all Todos
    test('should get all Todos with a valid JWT token', async () => {
        const res = await request(app)
            .get('/todo')
            .set('Authorization', 'Bearer ' + token);

        //print request
        console.log(res.request);

        //print response
        console.log(res.body);

        expect(res.statusCode).toEqual(200);
    });
/*
    // Adding td items to the database
    test('should add a Todo item', async () => {
        const res = await request(app)
            .post('/todo')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Test Todo', CategoryId: 1 });

        expect(res.statusCode).toEqual(200);
    });

    // Deleting td items from the database
    test('should delete a Todo item', async () => {
        const todoRes = await request(app)
            .post('/todo')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Test Todo to Delete', CategoryId: 1 });

        const res = await request(app)
            .delete(`/todo/${todoRes.body.todo.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
    });

    // Trying to get Todos without sending JWT token in the header
    test('should fail to get Todos without a JWT token', async () => {
        const res = await request(app).get('/todo');

        expect(res.statusCode).toEqual(401);
    });

    // Trying to get Todos by sending an invalid JWT token
    test('should fail to get Todos with an invalid JWT token', async () => {
        const invalidToken = jwt.sign({ sub: '123' }, 'invalid-secret', { expiresIn: '1h' });
        const res = await request(app)
            .get('/todo')
            .set('Authorization', `Bearer ${invalidToken}`);

        expect(res.statusCode).toEqual(401);
    });*/
});
