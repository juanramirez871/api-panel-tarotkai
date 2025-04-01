import { z } from 'zod';

export const createRole = z.object({
  name: z
    .string()
    .nonempty('El nombre es obligatorio')
    .regex(/^[a-zA-Z\s]+$/, 'El nombre solo puede contener letras y espacios'),
});