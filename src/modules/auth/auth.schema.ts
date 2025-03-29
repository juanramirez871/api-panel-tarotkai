import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().nonempty('El correo es obligatorio').min(1, 'Email is obligatorio'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});
