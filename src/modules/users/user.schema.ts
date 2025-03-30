import { z } from 'zod';

export const createUser = z.object({
  name: z
    .string()
    .nonempty('El nombre es obligatorio')
    .regex(/^[a-zA-Z\s]+$/, 'El nombre solo puede contener letras y espacios'),
  rolId: z
    .string()
    .nonempty('El rol es obligatorio'),
  extent: z
    .string()
    .nonempty('La extensión es obligatoria')
    .regex(/^\d+$/, 'La extensión debe ser numérica')
    .min(3, 'La extensión debe tener al menos 3 caracteres'),
  email: z
    .string()
    .nonempty('El correo es obligatorio')
    .email('El correo debe tener un formato válido'),
  password: z
    .string()
    .nonempty('La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .regex(/[A-Z]/, 'La contraseña debe tener al menos una letra mayúscula')
    .regex(/[a-z]/, 'La contraseña debe tener al menos una letra minúscula')
    .regex(/\d/, 'La contraseña debe tener al menos un número')
});