import { rest } from 'msw';
import { mockCardio } from './mock';

export const handlers = [
  rest.post('*api/cardio', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCardio));
  })
];
