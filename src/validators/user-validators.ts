import { z } from 'zod';

export const userSchema = z.object({
    name: z
    .string()
    .trim()
    .min(2, "O nome deve ter pelo menos 2 caracteres."),

    email: z
    .string()
    .trim()
    .email("O email informado não é válido."),
});

export const userIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});