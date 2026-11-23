-- Allow only the server-side service_role to delete sorting results.
-- anon and authenticated intentionally retain no DELETE privilege.
grant delete on table public.sorting_results to service_role;
