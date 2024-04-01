CREATE TABLE public.orders (
	id uuid NOT NULL,
	user_id uuid NOT NULL,
	orderdate timestamptz NOT NULL,
	ordertype text NOT NULL,
	currencyfrom text NOT NULL,
	currencyfromvalue numeric NOT NULL,
	bankaccountfrom text NOT NULL,
	currencyto text NOT NULL,
	currencytovalue numeric NOT NULL,
	status text NOT NULL,
	currencyrate numeric NOT NULL,
	bankaccountto text NOT NULL,
	CONSTRAINT "PK_orders" PRIMARY KEY (id)
);