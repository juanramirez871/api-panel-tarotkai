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
    .number({ message: "El tiempo es requerido" })
    .min(0, 'La tiempo debe ser un numero positivo'),
});