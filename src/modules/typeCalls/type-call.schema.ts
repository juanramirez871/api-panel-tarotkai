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
    .string()
    .nonempty("tiempo gratis es obligatorio")
    .refine(value => !isNaN(Number(value)), {
      message: "tiempo gratis debe ser un número",
    })
    .transform(value => Number(value))
});