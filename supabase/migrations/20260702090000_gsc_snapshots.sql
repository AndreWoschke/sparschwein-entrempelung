-- Google Search Console: taegliche Snapshots, geschrieben vom Cron-Job (gsc-data Edge Function)

CREATE TABLE public.gsc_snapshots (
  id BIGSERIAL PRIMARY KEY,
  captured_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  clicks INTEGER NOT NULL DEFAULT 0,
  impressions INTEGER NOT NULL DEFAULT 0,
  ctr DOUBLE PRECISION NOT NULL DEFAULT 0,
  position DOUBLE PRECISION NOT NULL DEFAULT 0,
  top_queries JSONB NOT NULL DEFAULT '[]'::jsonb,
  top_pages JSONB NOT NULL DEFAULT '[]'::jsonb
);

CREATE INDEX idx_gsc_snapshots_captured ON public.gsc_snapshots (captured_at DESC);

GRANT SELECT ON public.gsc_snapshots TO authenticated;
GRANT ALL ON public.gsc_snapshots TO service_role;

ALTER TABLE public.gsc_snapshots ENABLE ROW LEVEL SECURITY;

-- Lesezugriff nur fuer Admins (konsistent mit performance_metrics etc.);
-- geschrieben wird ausschliesslich per service_role aus der Edge Function.
CREATE POLICY "Admins can read gsc snapshots"
  ON public.gsc_snapshots FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
