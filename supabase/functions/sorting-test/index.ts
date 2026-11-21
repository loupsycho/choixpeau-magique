import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-api-version",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

const scoring: Record<string, string> = {
  q01a: "Gryffondor",
  q01b: "Serdaigle",
  q01c: "Poufsouffle",
  q01d: "Serpentard",
  q02a: "Serdaigle",
  q02b: "Poufsouffle",
  q02c: "Serpentard",
  q02d: "Gryffondor",
  q03a: "Poufsouffle",
  q03b: "Serpentard",
  q03c: "Gryffondor",
  q03d: "Serdaigle",
  q04a: "Serpentard",
  q04b: "Gryffondor",
  q04c: "Serdaigle",
  q04d: "Poufsouffle",
  q05a: "Gryffondor",
  q05b: "Serdaigle",
  q05c: "Poufsouffle",
  q05d: "Serpentard",
  q06a: "Serdaigle",
  q06b: "Poufsouffle",
  q06c: "Serpentard",
  q06d: "Gryffondor",
  q07a: "Poufsouffle",
  q07b: "Serpentard",
  q07c: "Gryffondor",
  q07d: "Serdaigle",
  q08a: "Serpentard",
  q08b: "Gryffondor",
  q08c: "Serdaigle",
  q08d: "Poufsouffle",
  q09a: "Gryffondor",
  q09b: "Serdaigle",
  q09c: "Poufsouffle",
  q09d: "Serpentard",
  q10a: "Serdaigle",
  q10b: "Poufsouffle",
  q10c: "Serpentard",
  q10d: "Gryffondor",
  q11a: "Poufsouffle",
  q11b: "Serpentard",
  q11c: "Gryffondor",
  q11d: "Serdaigle",
  q12a: "Serpentard",
  q12b: "Gryffondor",
  q12c: "Serdaigle",
  q12d: "Poufsouffle",
  q13a: "Gryffondor",
  q13b: "Serdaigle",
  q13c: "Poufsouffle",
  q13d: "Serpentard",
  q14a: "Serdaigle",
  q14b: "Poufsouffle",
  q14c: "Serpentard",
  q14d: "Gryffondor",
  q15a: "Poufsouffle",
  q15b: "Serpentard",
  q15c: "Gryffondor",
  q15d: "Serdaigle",
  q16a: "Serpentard",
  q16b: "Gryffondor",
  q16c: "Serdaigle",
  q16d: "Poufsouffle",
  q17a: "Gryffondor",
  q17b: "Serdaigle",
  q17c: "Poufsouffle",
  q17d: "Serpentard",
  q18a: "Serdaigle",
  q18b: "Poufsouffle",
  q18c: "Serpentard",
  q18d: "Gryffondor",
  q19a: "Poufsouffle",
  q19b: "Serpentard",
  q19c: "Gryffondor",
  q19d: "Serdaigle",
  q20a: "Serpentard",
  q20b: "Gryffondor",
  q20c: "Serdaigle",
  q20d: "Poufsouffle",
  q21a: "Gryffondor",
  q21b: "Serdaigle",
  q21c: "Poufsouffle",
  q21d: "Serpentard",
  q22a: "Serdaigle",
  q22b: "Poufsouffle",
  q22c: "Serpentard",
  q22d: "Gryffondor",
  q23a: "Poufsouffle",
  q23b: "Serpentard",
  q23c: "Gryffondor",
  q23d: "Serdaigle",
  q24a: "Serpentard",
  q24b: "Gryffondor",
  q24c: "Serdaigle",
  q24d: "Poufsouffle",
  q25a: "Gryffondor",
  q25b: "Serdaigle",
  q25c: "Poufsouffle",
  q25d: "Serpentard",
  q26a: "Serdaigle",
  q26b: "Poufsouffle",
  q26c: "Serpentard",
  q26d: "Gryffondor",
  q27a: "Poufsouffle",
  q27b: "Serpentard",
  q27c: "Gryffondor",
  q27d: "Serdaigle",
  q28a: "Serpentard",
  q28b: "Gryffondor",
  q28c: "Serdaigle",
  q28d: "Poufsouffle",
  q29a: "Gryffondor",
  q29b: "Serdaigle",
  q29c: "Poufsouffle",
  q29d: "Serpentard",
  q30a: "Serdaigle",
  q30b: "Poufsouffle",
  q30c: "Serpentard",
  q30d: "Gryffondor",
  q31a: "Poufsouffle",
  q31b: "Serpentard",
  q31c: "Gryffondor",
  q31d: "Serdaigle",
  q32a: "Serpentard",
  q32b: "Gryffondor",
  q32c: "Serdaigle",
  q32d: "Poufsouffle",
  q33a: "Gryffondor",
  q33b: "Serdaigle",
  q33c: "Poufsouffle",
  q33d: "Serpentard",
  q34a: "Serdaigle",
  q34b: "Poufsouffle",
  q34c: "Serpentard",
  q34d: "Gryffondor",
  q35a: "Poufsouffle",
  q35b: "Serpentard",
  q35c: "Gryffondor",
  q35d: "Serdaigle",
  q36a: "Serpentard",
  q36b: "Gryffondor",
  q36c: "Serdaigle",
  q36d: "Poufsouffle",
  q37a: "Gryffondor",
  q37b: "Serdaigle",
  q37c: "Poufsouffle",
  q37d: "Serpentard",
  q38a: "Serdaigle",
  q38b: "Poufsouffle",
  q38c: "Serpentard",
  q38d: "Gryffondor",
  q39a: "Poufsouffle",
  q39b: "Serpentard",
  q39c: "Gryffondor",
  q39d: "Serdaigle",
  q40a: "Serpentard",
  q40b: "Gryffondor",
  q40c: "Serdaigle",
  q40d: "Poufsouffle",
  q41a: "Gryffondor",
  q41b: "Serdaigle",
  q41c: "Poufsouffle",
  q41d: "Serpentard",
  q42a: "Serdaigle",
  q42b: "Poufsouffle",
  q42c: "Serpentard",
  q42d: "Gryffondor",
  q43a: "Poufsouffle",
  q43b: "Serpentard",
  q43c: "Gryffondor",
  q43d: "Serdaigle",
  q44a: "Serpentard",
  q44b: "Gryffondor",
  q44c: "Serdaigle",
  q44d: "Poufsouffle",
  q45a: "Gryffondor",
  q45b: "Serdaigle",
  q45c: "Poufsouffle",
  q45d: "Serpentard",
  q46a: "Serdaigle",
  q46b: "Poufsouffle",
  q46c: "Serpentard",
  q46d: "Gryffondor",
  q47a: "Poufsouffle",
  q47b: "Serpentard",
  q47c: "Gryffondor",
  q47d: "Serdaigle",
  q48a: "Serpentard",
  q48b: "Gryffondor",
  q48c: "Serdaigle",
  q48d: "Poufsouffle",
  q49a: "Gryffondor",
  q49b: "Serdaigle",
  q49c: "Poufsouffle",
  q49d: "Serpentard",
  q50a: "Serdaigle",
  q50b: "Poufsouffle",
  q50c: "Serpentard",
  q50d: "Gryffondor"
};

function normalize(value: string) {
  return value.normalize("NFKC").trim().toLocaleLowerCase("fr-FR").replace(/\s+/g, " ");
}
function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status, headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
async function discordUser(accessToken: string) {
  const response = await fetch("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) throw new Error("La connexion Discord a expiré. Reconnecte-toi.");
  return await response.json();
}
function publicResult(row: Record<string, unknown>) {
  return {
    id: row.id, discord_name: row.discord_name, character_name: row.character_name,
    house: row.house, created_at: row.created_at,
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Méthode non autorisée." }, 405);

  try {
    const publishableKeys = JSON.parse(Deno.env.get("SUPABASE_PUBLISHABLE_KEYS") ?? "{}");
    const publishableKey = publishableKeys.default;
    if (!publishableKey || req.headers.get("apikey") !== publishableKey) {
      return json({ error: "Accès refusé." }, 401);
    }

    const body = await req.json();
    const action = typeof body.action === "string" ? body.action : "";
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const secretKeys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") ?? "{}");
    const secretKey = secretKeys.default;
    if (!supabaseUrl || !secretKey) return json({ error: "Configuration serveur incomplète." }, 500);

    if (action === "exchange") {
      const code = typeof body.code === "string" ? body.code : "";
      const clientId = Deno.env.get("DISCORD_CLIENT_ID");
      const clientSecret = Deno.env.get("DISCORD_CLIENT_SECRET");
      if (!code || !clientId || !clientSecret) return json({ error: "Configuration Discord incomplète." }, 400);

      const form = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: "https://127.0.0.1",
      });
      const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: form,
      });
      const tokenData = await tokenResponse.json();
      if (!tokenResponse.ok || !tokenData.access_token) {
        console.error("Discord token exchange failed:", tokenData.error);
        return json({ error: "Discord n'a pas validé la connexion. Réessaie depuis Discord." }, 401);
      }
      const user = await discordUser(tokenData.access_token);
      return json({
        access_token: tokenData.access_token,
        user: {
          id: user.id,
          username: user.username,
          display_name: user.global_name || user.username,
          avatar: user.avatar,
        },
      });
    }

    const accessToken = typeof body.access_token === "string" ? body.access_token : "";
    if (!accessToken) return json({ error: "Connecte-toi avec Discord avant de continuer." }, 401);
    const user = await discordUser(accessToken);
    const discordId = String(user.id);
    const discordName = String(user.username || user.global_name || "Joueur Discord");
    const admin = createClient(supabaseUrl, secretKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    if (action === "mine") {
      const { data, error } = await admin.from("sorting_results")
        .select("id, discord_name, character_name, house, created_at, character_key")
        .eq("player_key", discordId).order("created_at", { ascending: false });
      if (error) throw error;
      return json({ results: (data || []).map(publicResult) });
    }

    if (action === "admin") {
      const adminDiscordId = Deno.env.get("ADMIN_DISCORD_ID");
      if (!adminDiscordId || discordId !== adminDiscordId) return json({ error: "Cet espace est réservé à l'administratrice." }, 403);
      const { data, error } = await admin.from("sorting_results")
        .select("id, discord_name, character_name, house, created_at, player_key")
        .order("created_at", { ascending: false });
      if (error) throw error;
      const groups = new Map<string, { discord_name: string; characters: Record<string, unknown>[] }>();
      for (const row of data || []) {
        const key = String(row.player_key);
        if (!groups.has(key)) groups.set(key, { discord_name: row.discord_name, characters: [] });
        groups.get(key)!.characters.push(publicResult(row));
      }
      return json({ groups: Array.from(groups.values()) });
    }

    if (action === "submit") {
      const firstName = typeof body.first_name === "string" ? body.first_name.trim() : "";
      const lastName = typeof body.last_name === "string" ? body.last_name.trim() : "";
      const answers = body.answers;
      if (!firstName || !lastName || firstName.length > 60 || lastName.length > 60) {
        return json({ error: "Renseigne le prénom et le nom du personnage." }, 400);
      }
      if (!Array.isArray(answers) || answers.length !== 10 ||
        answers.some((answer) => typeof answer !== "string" || !Object.prototype.hasOwnProperty.call(scoring, answer)) ||
        new Set(answers.map((answer) => answer.slice(0, 3))).size !== 10) {
        return json({ error: "Les réponses envoyées ne sont pas valides." }, 400);
      }
      const characterName = `${firstName} ${lastName}`.replace(/\s+/g, " ").trim();
      const characterKey = normalize(characterName);
      const { data: existing, error: lookupError } = await admin.from("sorting_results")
        .select("id, discord_name, character_name, house, created_at")
        .eq("player_key", discordId).eq("character_key", characterKey).maybeSingle();
      if (lookupError) throw lookupError;
      if (existing) return json({ ...publicResult(existing), already_sorted: true });

      const totals: Record<string, number> = {
        Gryffondor: 0, Serpentard: 0, Serdaigle: 0, Poufsouffle: 0,
      };
      for (const answer of answers) totals[scoring[answer]]++;
      const highest = Math.max(...Object.values(totals));
      const finalists = Object.keys(totals).filter((house) => totals[house] === highest);
      const random = new Uint32Array(1);
      crypto.getRandomValues(random);
      const house = finalists[random[0] % finalists.length];

      const { data: inserted, error: insertError } = await admin.from("sorting_results").insert({
        discord_name: discordName,
        character_name: characterName,
        player_key: discordId,
        character_key: characterKey,
        house,
      }).select("id, discord_name, character_name, house, created_at").single();

      if (insertError?.code === "23505") {
        const { data: duplicate } = await admin.from("sorting_results")
          .select("id, discord_name, character_name, house, created_at")
          .eq("player_key", discordId).eq("character_key", characterKey).maybeSingle();
        if (duplicate) return json({ ...publicResult(duplicate), already_sorted: true });
        return json({ error: "Ce personnage a déjà passé la cérémonie." }, 409);
      }
      if (insertError) throw insertError;
      return json({ ...publicResult(inserted), already_sorted: false });
    }

    return json({ error: "Action inconnue." }, 400);
  } catch (error) {
    console.error("sorting-test error:", error);
    return json({ error: error instanceof Error ? error.message : "Une erreur inattendue est survenue." }, 500);
  }
});
