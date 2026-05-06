// server.js - Backend fullstack con Express + Supabase (persistencia real)

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Inicializar Supabase
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

// ============ RUTAS API ============

// Crear votación
app.post('/api/polls', async (req, res) => {
    try {
        const { title, options, description } = req.body;
        
        if (!title || !options || options.length < 2) {
            return res.status(400).json({ error: 'Datos inválidos' });
        }

        const pollId = 'poll_' + Math.random().toString(36).substr(2, 9);
        
        const { data, error } = await supabase
            .from('polls')
            .insert([{
                id: pollId,
                title: title,
                description: description || '',
                options: JSON.stringify(options),
                created_at: new Date().toISOString(),
                total_votes: 0
            }])
            .select();

        if (error) throw error;

        res.json({
            id: pollId,
            url: `${process.env.BASE_URL || `http://localhost:${PORT}`}?poll=${pollId}`
        });
    } catch (error) {
        console.error('Error creando votación:', error);
        res.status(500).json({ error: 'Error al crear votación' });
    }
});

// Obtener votación con resultados
app.get('/api/polls/:pollId', async (req, res) => {
    try {
        const { data: pollData, error: pollError } = await supabase
            .from('polls')
            .select('*')
            .eq('id', req.params.pollId)
            .single();

        if (pollError || !pollData) {
            return res.status(404).json({ error: 'Votación no encontrada' });
        }

        const { data: votesData, error: votesError } = await supabase
            .from('votes')
            .select('vote_order')
            .eq('poll_id', req.params.pollId);

        if (votesError) throw votesError;

        const options = JSON.parse(pollData.options);
        const results = calculateResults(options, votesData || []);

        res.json({
            id: pollData.id,
            title: pollData.title,
            description: pollData.description,
            options: options,
            totalVotes: pollData.total_votes,
            results: results
        });
    } catch (error) {
        console.error('Error obteniendo votación:', error);
        res.status(500).json({ error: 'Error al obtener votación' });
    }
});

// Registrar voto
app.post('/api/polls/:pollId/vote', async (req, res) => {
    try {
        const { voteOrder } = req.body;
        const pollId = req.params.pollId;

        // Obtener votación
        const { data: pollData, error: pollError } = await supabase
            .from('polls')
            .select('*')
            .eq('id', pollId)
            .single();

        if (pollError || !pollData) {
            return res.status(404).json({ error: 'Votación no encontrada' });
        }

        const options = JSON.parse(pollData.options);

        // Validar voto
        if (!Array.isArray(voteOrder) || voteOrder.length !== options.length) {
            return res.status(400).json({ error: 'Voto inválido' });
        }

        // Registrar voto
        const { error: voteError } = await supabase
            .from('votes')
            .insert([{
                poll_id: pollId,
                vote_order: JSON.stringify(voteOrder),
                created_at: new Date().toISOString()
            }]);

        if (voteError) throw voteError;

        // Actualizar contador
        await supabase
            .from('polls')
            .update({ total_votes: pollData.total_votes + 1 })
            .eq('id', pollId);

        // Obtener votos actualizados
        const { data: votesData } = await supabase
            .from('votes')
            .select('vote_order')
            .eq('poll_id', pollId);

        const results = calculateResults(options, votesData || []);

        res.json({
            success: true,
            results: results,
            totalVotes: pollData.total_votes + 1
        });
    } catch (error) {
        console.error('Error registrando voto:', error);
        res.status(500).json({ error: 'Error al registrar voto' });
    }
});

// Función para calcular resultados ponderados
function calculateResults(options, votes) {
    const results = {};
    options.forEach(opt => {
        results[opt] = 0;
    });

    votes.forEach(vote => {
        const order = JSON.parse(vote.vote_order);
        order.forEach((optName, position) => {
            const points = options.length - position;
            results[optName] = (results[optName] || 0) + points;
        });
    });

    const totalPoints = Object.values(results).reduce((a, b) => a + b, 0);

    return options.map(opt => ({
        name: opt,
        points: results[opt],
        percentage: totalPoints > 0 ? Math.round((results[opt] / totalPoints) * 100) : 0
    })).sort((a, b) => b.points - a.points);
}

// Servir HTML estático
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
    console.log(`🗳️ Vote Ponderado corriendo en puerto ${PORT}`);
});
