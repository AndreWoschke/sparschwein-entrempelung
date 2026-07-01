
-- Offers: restrict SELECT to owner or admin
DROP POLICY IF EXISTS "Authenticated can read all offers" ON public.offers;
CREATE POLICY "Owner or admin can read offers"
ON public.offers FOR SELECT
TO authenticated
USING ((auth.uid() = created_by) OR has_role(auth.uid(), 'admin'::app_role));

-- user_roles: restrict SELECT to own row or admin
DROP POLICY IF EXISTS "Authenticated can read roles" ON public.user_roles;
CREATE POLICY "Users read own role or admin reads all"
ON public.user_roles FOR SELECT
TO authenticated
USING ((auth.uid() = user_id) OR has_role(auth.uid(), 'admin'::app_role));
