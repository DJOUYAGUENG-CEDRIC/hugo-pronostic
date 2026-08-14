import { sql, ensureTables } from '@/lib/db';
import { checkAuth } from '@/lib/auth';

const SOURCE = 'hugo_pronostique';

export async function GET(request) {
  if (!checkAuth(request)) return Response.json({ error: 'Non autorisé.' }, { status: 401 });
  try {
    await ensureTables();
    const [totalSessions] = await sql`SELECT COUNT(*) AS count FROM sessions WHERE source = ${SOURCE}`;
    const [totalMessages] = await sql`
      SELECT COUNT(*) AS count FROM messages m
      JOIN sessions s ON s.id = m.session_id WHERE s.source = ${SOURCE}
    `;
    const [todaySessions] = await sql`
      SELECT COUNT(*) AS count FROM sessions
      WHERE source = ${SOURCE} AND created_at >= NOW() - INTERVAL '24 hours'
    `;
    const [todayMessages] = await sql`
      SELECT COUNT(*) AS count FROM messages m
      JOIN sessions s ON s.id = m.session_id
      WHERE s.source = ${SOURCE} AND m.created_at >= NOW() - INTERVAL '24 hours'
    `;
    return Response.json({
      totalSessions: Number(totalSessions.count),
      totalMessages: Number(totalMessages.count),
      todaySessions: Number(todaySessions.count),
      todayMessages: Number(todayMessages.count),
    });
  } catch (err) {
    console.error('[admin/stats]', err);
    return Response.json({ error: err.message ?? 'Erreur base de données.' }, { status: 500 });
  }
}
