import { z } from 'zod';

export const createOrEditCustomer = z.object({
    name: z
        .string()
        .nonempty('nombre es obligatorio')
        .regex(/^[a-zA-Z\s]+$/, 'El nombre solo puede contener letras y espacios'),
    country: z
        .string()
        .nonempty('pais es obligatorio')
        .regex(/^[a-zA-Z\s]+$/, 'El pais solo puede contener letras y espacios'),
    city: z
        .string()
        .nonempty('ciudad es obligatorio')
        .regex(/^[a-zA-Z\s]+$/, 'La ciudad solo puede contener letras y espacios'),
});