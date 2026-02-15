const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid request body' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate input
    if (typeof body !== 'object' || body === null) {
      return new Response(JSON.stringify({ error: 'Invalid input' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { name, email, subject, message } = body as Record<string, unknown>;

    // Validate required fields and types
    if (
      typeof name !== 'string' || name.trim().length < 2 || name.length > 100 ||
      typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255 ||
      typeof subject !== 'string' || subject.trim().length < 2 || subject.length > 200 ||
      typeof message !== 'string' || message.trim().length < 5 || message.length > 5000
    ) {
      return new Response(JSON.stringify({ error: 'Invalid input: check field formats and lengths' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Sanitize inputs
    const sanitized = {
      name: name.trim().substring(0, 100),
      email: email.trim().substring(0, 255),
      subject: subject.trim().substring(0, 200),
      message: message.trim().substring(0, 5000),
    };

    const apiKey = Deno.env.get('TRELLO_API_KEY') || '';
    const apiToken = Deno.env.get('TRELLO_API_TOKEN') || '';

    // Get the first list on the board
    const boardId = 'Q1YIV2qk';
    const listsRes = await fetch(
      `https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${apiToken}`
    );
    if (!listsRes.ok) {
      console.error('Trello lists error:', listsRes.status);
      return new Response(JSON.stringify({ error: 'Failed to connect to project management service' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const lists = await listsRes.json();
    const listId = lists[0]?.id;

    if (!listId) {
      return new Response(JSON.stringify({ error: 'Service configuration error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create card
    const cardRes = await fetch(
      `https://api.trello.com/1/cards?key=${apiKey}&token=${apiToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idList: listId,
          name: `${sanitized.subject} — ${sanitized.name}`,
          desc: `**Name:** ${sanitized.name}\n**Email:** ${sanitized.email}\n**Subject:** ${sanitized.subject}\n\n${sanitized.message}`,
        }),
      }
    );

    if (!cardRes.ok) {
      console.error('Trello card error:', cardRes.status);
      return new Response(JSON.stringify({ error: 'Failed to submit enquiry' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const card = await cardRes.json();

    return new Response(JSON.stringify({ success: true, cardId: card.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
