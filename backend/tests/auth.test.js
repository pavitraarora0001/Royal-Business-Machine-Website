import request from 'supertest';
import app from '../server.js';

describe('Authentication API Tests', () => {
    describe('POST /api/auth/register', () => {
        it('should register a new user successfully', async () => {
            const userData = {
                name: 'Test User',
                email: `test${Date.now()}@example.com`,
                password: 'Test@123',
                phone: '9876543210'
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body.message).toContain('OTP sent');
        });

        it('should fail with invalid email', async () => {
            const userData = {
                name: 'Test User',
                email: 'invalid-email',
                password: 'Test@123',
                phone: '9876543210'
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(400);

            expect(response.body.success).toBe(false);
        });

        it('should fail with weak password', async () => {
            const userData = {
                name: 'Test User',
                email: 'test@example.com',
                password: '123',
                phone: '9876543210'
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(400);

            expect(response.body.success).toBe(false);
        });
    });

    describe('POST /api/auth/login', () => {
        it('should fail with invalid credentials', async () => {
            const credentials = {
                email: 'nonexistent@example.com',
                password: 'WrongPassword123'
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(credentials)
                .expect(401);

            expect(response.body.success).toBe(false);
        });
    });

    describe('GET /health', () => {
        it('should return health status', async () => {
            const response = await request(app)
                .get('/health')
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.message).toContain('running');
        });
    });
});
