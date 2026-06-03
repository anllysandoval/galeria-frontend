import { z } from 'zod';

// Algoritmo de Luhn para validar número de tarjeta
export const validateCard = (numero) => {
    const cleanNum = numero.replace(/\D/g, '');
    let sum = 0;
    let isEven = false;
    for (let i = cleanNum.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanNum.charAt(i), 10);
        if (isEven) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        isEven = !isEven;
    }
    return sum % 10 === 0;
};

const pickupSchema = z.object({
    paymentMethod: z.literal('pickup'),
    userName: z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre es demasiado largo'),
});

const cardSchema = z.object({
    paymentMethod: z.literal('card'),
    cardName: z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre es demasiado largo')
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras y espacios'),
    cardNumber: z.string()
        .min(1, 'El número de tarjeta es requerido')
        .transform(val => val.replace(/\s/g, ''))
        .refine(val => /^\d+$/.test(val), 'Solo se permiten números')
        .refine(val => val.length >= 13 && val.length <= 19, 'Longitud inválida')
        .refine(val => validateCard(val), 'Número de tarjeta inválido'),
    expirationDate: z.string()
        .min(1, 'La fecha de expiración es requerida')
        .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Formato inválido (MM/YY)')
        .refine((date) => {
            const [month, year] = date.split('/');
            const currentYear = new Date().getFullYear() % 100;
            const currentMonth = new Date().getMonth() + 1;
            const expMonth = parseInt(month, 10);
            const expYear = parseInt(year, 10);
            if (expYear < currentYear) return false;
            if (expYear === currentYear && expMonth < currentMonth) return false;
            return true;
        }, 'La tarjeta está expirada o la fecha es inválida'),
    ccv: z.string()
        .min(1, 'El CCV es requerido')
        .regex(/^\d+$/, 'Solo se permiten números')
        .refine(val => val.length === 3, 'El CCV debe tener 3 dígitos'),
});

export const paymentSchema = z.discriminatedUnion('paymentMethod', [
    pickupSchema,
    cardSchema,
]);