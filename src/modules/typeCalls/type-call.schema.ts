import { z } from 'zod';

export const createOrEditTypeCall = z.object({
  name: z
    .string()
    .nonempty('El nombre es obligatorio')
    .regex(/^[a-zA-Z\s]+$/, 'El nombre solo puede contener letras y espacios'),
  description: z
    .string({ message: "La descripcion es obligatorio" })
    .nonempty("La descripcion es obligatorio"),
  free_time: z
    .union([z.string(), z.number()])
    .refine(value => value !== "", { message: "El tiempo gratis es obligatorio" })
    .transform(value => Number(value))
    .refine(value => !isNaN(value), { message: "El tiempo gratis debe ser un número" })
    .refine(value => value > 0, { message: "El tiempo gratis debe ser mayor que 0" }),
});