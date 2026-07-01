
-- performance_metrics: raw events from RUM + synthetic PSI
CREATE TABLE public.performance_metrics (
  id BIGSERIAL PRIMARY KEY,
  source TEXT NOT NULL CHECK (source IN ('rum', 'psi')),
  device TEXT NOT NULL CHECK (device IN ('mobile', 'desktop')),
  route TEXT NOT NULL,
  metric TEXT NOT NULL CHECK (metric IN ('LCP','INP','CLS','FCP','TTFB')),
  value DOUBLE PRECISION NOT NULL,
  rating TEXT CHECK (rating IN ('good','needs-improvement','poor')),
  navigation_type TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_perf_metrics_created ON public.performance_metrics (created_at DESC);
CREATE INDEX idx_perf_metrics_lookup ON public.performance_metrics (metric, device, source, created_at DESC);

GRANT SELECT ON public.performance_metrics TO authenticated;
GRANT ALL ON public.performance_metrics TO service_role;

ALTER TABLE public.performance_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read metrics"
  ON public.performance_metrics FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- performance_budgets: configurable thresholds
CREATE TABLE public.performance_budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric TEXT NOT NULL CHECK (metric IN ('LCP','INP','CLS')),
  device TEXT NOT NULL CHECK (device IN ('mobile','desktop')),
  good_threshold DOUBLE PRECISION NOT NULL,
  poor_threshold DOUBLE PRECISION NOT NULL,
  alert_enabled BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (metric, device)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.performance_budgets TO authenticated;
GRANT ALL ON public.performance_budgets TO service_role;

ALTER TABLE public.performance_budgets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read budgets"
  ON public.performance_budgets FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can modify budgets"
  ON public.performance_budgets FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_perf_budgets_updated
  BEFORE UPDATE ON public.performance_budgets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- seed defaults (Google CWV thresholds)
INSERT INTO public.performance_budgets (metric, device, good_threshold, poor_threshold) VALUES
  ('LCP','mobile',2500,4000),
  ('LCP','desktop',2500,4000),
  ('INP','mobile',200,500),
  ('INP','desktop',200,500),
  ('CLS','mobile',0.1,0.25),
  ('CLS','desktop',0.1,0.25);

-- alert log to avoid spam
CREATE TABLE public.performance_alerts (
  id BIGSERIAL PRIMARY KEY,
  metric TEXT NOT NULL,
  device TEXT NOT NULL,
  value DOUBLE PRECISION NOT NULL,
  threshold DOUBLE PRECISION NOT NULL,
  source TEXT NOT NULL,
  emailed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_perf_alerts_created ON public.performance_alerts (created_at DESC);

GRANT SELECT ON public.performance_alerts TO authenticated;
GRANT ALL ON public.performance_alerts TO service_role;

ALTER TABLE public.performance_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read alerts"
  ON public.performance_alerts FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
