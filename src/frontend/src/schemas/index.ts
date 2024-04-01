import * as z from 'zod'

export const LoginSchema = z.object({
	phone_number: z.string(),
	password: z.string(),
})

export const CreateOrderSchema = z.object({
	order_type: z.string().optional(),
	currency_from_value: z.number().optional(),
	bank_account_from: z.string().optional(),
	bank_account_to: z.string().optional(),
})

export const RegisterSchema = z.object({
	phone_number: z.string(),
	email: z.string().email(),
	password: z.string(),
	first_name: z.string(),
	last_name: z.string(),
	middle_name: z.string(),
	documents: z.object({
		registration_address: z.string(),
		passport_details: z.string(),
		passport_issued_at: z.string(),
		inn: z.string(),
		snils: z.string(),
		place_of_birth: z.string(),
		date_of_birth: z.string(),
	}),
})

export const TopUpSchema = z.object({
	account_number: z.string(),
	value: z.string(),
})

export const UpdateSchema = z.object({
	phone_number: z.string(),
	email: z.string().email(),
	first_name: z.string(),
	last_name: z.string(),
	middle_name: z.string(),
	documents: z.object({
		registration_address: z.string(),
		passport_details: z.string(),
		passport_issued_at: z.string(),
		inn: z.string(),
		snils: z.string(),
		place_of_birth: z.string(),
		date_of_birth: z.string(),
	}),
})

export const PlaceOrderSchema = z.object({
	userId: z.string(),
	orderType: z.string(),
	currency1: z.string(),
	currency1Value: z.string(),
	bankAccount1: z.string(),
	currency2: z.string(),
	bankAccount2: z.string(),
})

export const CreateAccountSchema = z.object({
	currency_code: z.string().optional(),
})
