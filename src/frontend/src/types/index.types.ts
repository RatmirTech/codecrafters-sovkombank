export type Notification = {
	id: string
	title: string
	description: string
	status: string
	user_id: string
	is_read: boolean
	datetime: string
}

export type PutMoneyRequest = {
	account_number: string
	value: number
}

export type JWTToken = {
	exp: number
	id: string
	iss: string
	phone_number: string
	sub: string
}

export type CreateOrderRequest = {
	order_type: string
	currency_from_value: number
	bank_account_from: string
	bank_account_to: string
}

export type Order = {
	order_date: Date
	order_type: string
	currency_from: string
	currency_from_value: number
	bank_account_from: string
	currency_to: string
	currency_to_value: number
	status: string
	currency_rate: number
	bank_account_to: string
}

export type GetOrdersResponse = {
	orderDate: Date
	orderType: string
	currencyFrom: string
	currencyFromValue: number
	bankAccountFrom: string
	currencyTo: string
	currencyToValue: number
	status: string
	currencyRate: number
	bankAccountTo: string
}

export type GetOrders = Array<Order>

export type BankCredentials = {
	currency: string
	balance: string
	bank_account_id: string
}

export type CurrencyTypes = 'rub' | 'aed' | 'cny'
export type CurrencyRequestTypes =
	| 'rub-aed'
	| 'aed-rub'
	| 'rub-cny'
	| 'cny-rub'
	| 'aed-cny'
	| 'cny-aed'

export type Currency = {
	date: string
	currency: CurrencyTypes
	rate: number
}

export type GetCurrencyRequest = {
	currency: CurrencyRequestTypes
	days?: number
}

export type GetCurrencyResponse = {
	ok: boolean
	items: Array<Currency>
}

export type Documents = {
	registration_address: string
	passport_details: string
	passport_issued_at: string
	inn: string
	snils: string
	place_of_birth: string
	date_of_birth: string
}

export type User = {
	phone_number: string
	email: string
	first_name: string
	last_name: string
	middle_name: string
	documents: Documents
}

export type RegisterRequest = {
	phone_number: string
	email: string
	password: string
	first_name: string
	last_name: string
	middle_name: string
	documents: Documents
}

export type LoginRequest = {
	phone_number: string
	password: string
}

export type AuthResponse = {
	message: string
	status: string
	token: string
}

export type CreateAccountRequest = {
	currency_code: string
}

export type AccountResponse = {
	balance: number
	currency: {
		name: string
		code: string
	}
	account_number: string
}

export type GetMyAccountRequest = {
	account_number: string
}

export type GetAccountResponse = AccountResponse[]

export type Option = {
	label: string
	value: CurrencyTypes
}
