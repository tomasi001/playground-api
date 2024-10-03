import { requestLogger } from '../../src/middlewares/requestLogger';
import { Request, Response, NextFunction } from 'express';

describe('requestLogger', () => {
    it('should log the request method and url', () => {
        const req = { method: 'GET', url: '/test' } as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;

        console.log = jest.fn();

        requestLogger(req, res, next);

        expect(console.log).toHaveBeenCalledWith('GET /test');
        expect(next).toHaveBeenCalled();
    });
});