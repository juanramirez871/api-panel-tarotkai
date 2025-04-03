import { z } from 'zod';

export const createOrEditTypeCall = z.object({
  name: z
    .string()
    .nonempty('nombre es obligatorio')
    .regex(/^[a-zA-Z\s]+$/, 'nombre solo puede contener letras y espacios'),
  description: z
    .string({ message: "descripcion es obligatorio" })
    .nonempty("descripcion es obligatorio"),
  free_time: z
    .union([z.string(), z.number()])
    .refine(value => value !== "", { message: "tiempo gratis es obligatorio" })
    .transform(value => Number(value))
    .refine(value => !isNaN(value), { message: "tiempo gratis debe ser un número" })
    .refine(value => value > 0, { message: "tiempo gratis debe ser mayor que 0" }),
});