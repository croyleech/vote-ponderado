-- Crear tabla de votaciones
CREATE TABLE public.polls (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  options JSONB NOT NULL,
  total_votes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Crear tabla de votos
CREATE TABLE public.votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id TEXT NOT NULL REFERENCES public.polls(id) ON DELETE CASCADE,
  vote_order JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  FOREIGN KEY (poll_id) REFERENCES public.polls(id)
);

-- Crear índices para mejor rendimiento
CREATE INDEX idx_votes_poll_id ON public.votes(poll_id);
CREATE INDEX idx_polls_created_at ON public.polls(created_at DESC);

-- Habilitar Row Level Security (RLS) - Las votaciones son públicas
ALTER TABLE public.polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- Política de lectura para todos
CREATE POLICY "Polls are public" ON public.polls FOR SELECT USING (true);
CREATE POLICY "Votes are public" ON public.votes FOR SELECT USING (true);

-- Política de inserción para votaciones (cualquiera puede crear)
CREATE POLICY "Anyone can create polls" ON public.polls FOR INSERT WITH CHECK (true);

-- Política de inserción para votos (cualquiera puede votar)
CREATE POLICY "Anyone can vote" ON public.votes FOR INSERT WITH CHECK (true);
