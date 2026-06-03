import { z } from 'zod';

export const addressSchema = z.object({
    name: z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no puede exceder 50 caracteres')
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
    address: z.string()
        .min(10, 'La dirección debe tener al menos 10 caracteres')
        .max(200, 'La dirección no puede exceder 200 caracteres')
        .regex(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\.,#\-]+$/, 'La dirección contiene caracteres no válidos'),
    phone: z.string()
        .min(10, 'El teléfono debe tener al menos 10 dígitos')
        .max(15, 'El teléfono no puede exceder 15 dígitos')
        .regex(/^[\d\s\+\-\(\)]+$/, 'Formato de teléfono inválido')
        .transform(val => val.replace(/\s+/g, ''))
        .refine(val => val.replace(/\D/g, '').length >= 10, 'El teléfono debe contener al menos 10 dígitos'),
});