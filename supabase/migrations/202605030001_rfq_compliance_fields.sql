alter table public.orders
    alter column street_address drop not null,
    alter column city drop not null,
    alter column province drop not null,
    alter column postal_code drop not null,
    alter column country drop not null,
    alter column payment_method drop not null;

alter table public.orders
    add column if not exists how_heard text,
    add column if not exists ruo_acknowledged_at timestamptz,
    add column if not exists qualified_acknowledged_at timestamptz,
    add column if not exists terms_accepted_at timestamptz,
    add column if not exists form_started_at timestamptz,
    add column if not exists client_ip inet,
    add column if not exists user_agent text;

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_customer_email_idx on public.orders (customer_email);
