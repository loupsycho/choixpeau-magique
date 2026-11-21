import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-api-version",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

const scoring: Record<string, string> = {
  q01a: "Serdaigle",
  q01b: "Gryffondor",
  q01c: "Poufsouffle",
  q01d: "Serpentard",
  q02a: "Gryffondor",
  q02b: "Serdaigle",
  q02c: "Serpentard",
  q02d: "Poufsouffle",
  q03a: "Serdaigle",
  q03b: "Serpentard",
  q03c: "Gryffondor",
  q03d: "Poufsouffle",
  q04a: "Serpentard",
  q04b: "Gryffondor",
  q04c: "Poufsouffle",
  q04d: "Serdaigle",
  q05a: "Poufsouffle",
  q05b: "Serpentard",
  q05c: "Serdaigle",
  q05d: "Gryffondor",
  q06a: "Serdaigle",
  q06b: "Serpentard",
  q06c: "Gryffondor",
  q06d: "Poufsouffle",
  q07a: "Gryffondor",
  q07b: "Serdaigle",
  q07c: "Poufsouffle",
  q07d: "Serpentard",
  q08a: "Poufsouffle",
  q08b: "Gryffondor",
  q08c: "Serdaigle",
  q08d: "Serpentard",
  q09a: "Serdaigle",
  q09b: "Gryffondor",
  q09c: "Serpentard",
  q09d: "Poufsouffle",
  q10a: "Serdaigle",
  q10b: "Gryffondor",
  q10c: "Poufsouffle",
  q10d: "Serpentard",
  q11a: "Poufsouffle",
  q11b: "Serdaigle",
  q11c: "Gryffondor",
  q11d: "Serpentard",
  q12a: "Poufsouffle",
  q12b: "Serdaigle",
  q12c: "Gryffondor",
  q12d: "Serpentard",
  q13a: "Poufsouffle",
  q13b: "Serdaigle",
  q13c: "Gryffondor",
  q13d: "Serpentard",
  q14a: "Serdaigle",
  q14b: "Gryffondor",
  q14c: "Serpentard",
  q14d: "Poufsouffle",
  q15a: "Poufsouffle",
  q15b: "Serdaigle",
  q15c: "Serpentard",
  q15d: "Gryffondor",
  q16a: "Gryffondor",
  q16b: "Serdaigle",
  q16c: "Poufsouffle",
  q16d: "Serpentard",
  q17a: "Serdaigle",
  q17b: "Serpentard",
  q17c: "Gryffondor",
  q17d: "Poufsouffle",
  q18a: "Gryffondor",
  q18b: "Serpentard",
  q18c: "Serdaigle",
  q18d: "Poufsouffle",
  q19a: "Gryffondor",
  q19b: "Serpentard",
  q19c: "Serdaigle",
  q19d: "Poufsouffle",
  q20a: "Serdaigle",
  q20b: "Serpentard",
  q20c: "Gryffondor",
  q20d: "Poufsouffle",
  q21a: "Serdaigle",
  q21b: "Serpentard",
  q21c: "Poufsouffle",
  q21d: "Gryffondor",
  q22a: "Poufsouffle",
  q22b: "Gryffondor",
  q22c: "Serdaigle",
  q22d: "Serpentard",
  q23a: "Serdaigle",
  q23b: "Serpentard",
  q23c: "Poufsouffle",
  q23d: "Gryffondor",
  q24a: "Gryffondor",
  q24b: "Poufsouffle",
  q24c: "Serdaigle",
  q24d: "Serpentard",
  q25a: "Gryffondor",
  q25b: "Serdaigle",
  q25c: "Poufsouffle",
  q25d: "Serpentard",
  q26a: "Gryffondor",
  q26b: "Serdaigle",
  q26c: "Serpentard",
  q26d: "Poufsouffle",
  q27a: "Gryffondor",
  q27b: "Poufsouffle",
  q27c: "Serdaigle",
  q27d: "Serpentard",
  q28a: "Serdaigle",
  q28b: "Serpentard",
  q28c: "Gryffondor",
  q28d: "Poufsouffle",
  q29a: "Gryffondor",
  q29b: "Serdaigle",
  q29c: "Poufsouffle",
  q29d: "Serpentard",
  q30a: "Serdaigle",
  q30b: "Serpentard",
  q30c: "Gryffondor",
  q30d: "Poufsouffle",
  q31a: "Gryffondor",
  q31b: "Serdaigle",
  q31c: "Serpentard",
  q31d: "Poufsouffle",
  q32a: "Gryffondor",
  q32b: "Serdaigle",
  q32c: "Poufsouffle",
  q32d: "Serpentard",
  q33a: "Serdaigle",
  q33b: "Poufsouffle",
  q33c: "Gryffondor",
  q33d: "Serpentard",
  q34a: "Poufsouffle",
  q34b: "Serpentard",
  q34c: "Gryffondor",
  q34d: "Serdaigle",
  q35a: "Serdaigle",
  q35b: "Gryffondor",
  q35c: "Serpentard",
  q35d: "Poufsouffle",
  q36a: "Gryffondor",
  q36b: "Serpentard",
  q36c: "Serdaigle",
  q36d: "Poufsouffle",
  q37a: "Poufsouffle",
  q37b: "Serdaigle",
  q37c: "Gryffondor",
  q37d: "Serpentard",
  q38a: "Serpentard",
  q38b: "Gryffondor",
  q38c: "Serdaigle",
  q38d: "Poufsouffle",
  q39a: "Serdaigle",
  q39b: "Serpentard",
  q39c: "Poufsouffle",
  q39d: "Gryffondor",
  q40a: "Gryffondor",
  q40b: "Serdaigle",
  q40c: "Poufsouffle",
  q40d: "Serpentard",
  q41a: "Serdaigle",
  q41b: "Gryffondor",
  q41c: "Poufsouffle",
  q41d: "Serpentard",
  q42a: "Serdaigle",
  q42b: "Gryffondor",
  q42c: "Poufsouffle",
  q42d: "Serpentard",
  q43a: "Gryffondor",
  q43b: "Serdaigle",
  q43c: "Poufsouffle",
  q43d: "Serpentard",
  q44a: "Gryffondor",
  q44b: "Serdaigle",
  q44c: "Poufsouffle",
  q44d: "Serpentard",
  q45a: "Poufsouffle",
  q45b: "Serdaigle",
  q45c: "Gryffondor",
  q45d: "Serpentard",
  q46a: "Gryffondor",
  q46b: "Serdaigle",
  q46c: "Poufsouffle",
  q46d: "Serpentard",
  q47a: "Serpentard",
  q47b: "Gryffondor",
  q47c: "Serdaigle",
  q47d: "Poufsouffle",
  q48a: "Serdaigle",
  q48b: "Serpentard",
  q48c: "Poufsouffle",
  q48d: "Gryffondor",
  q49a: "Gryffondor",
  q49b: "Serdaigle",
  q49c: "Poufsouffle",
  q49d: "Serpentard",
  q50a: "Gryffondor",
  q50b: "Serdaigle",
  q50c: "Poufsouffle",
  q50d: "Serpentard"
};

const legacyScoring: Record<string, string> = {
  q1a: "Serdaigle",
  q1b: "Gryffondor",
  q1c: "Serpentard",
  q1d: "Poufsouffle",
  q2a: "Serdaigle",
  q2b: "Gryffondor",
  q2c: "Poufsouffle",
  q2d: "Serpentard",
  q3a: "Serdaigle",
  q3b: "Serpentard",
  q3c: "Poufsouffle",
  q3d: "Gryffondor",
  q4a: "Poufsouffle",
  q4b: "Serdaigle",
  q4c: "Serpentard",
  q4d: "Gryffondor",
  q5a: "Serdaigle",
  q5b: "Serpentard",
  q5c: "Poufsouffle",
  q5d: "Gryffondor",
  q6a: "Serdaigle",
  q6b: "Gryffondor",
  q6c: "Poufsouffle",
  q6d: "Serpentard",
  q7a: "Serdaigle",
  q7b: "Gryffondor",
  q7c: "Serpentard",
  q7d: "Poufsouffle",
  q8a: "Serdaigle",
  q8b: "Serpentard",
  q8c: "Gryffondor",
  q8d: "Poufsouffle",
  q9a: "Gryffondor",
  q9b: "Serdaigle",
  q9c: "Serpentard",
  q9d: "Poufsouffle",
  q10a: "Gryffondor",
  q10b: "Serdaigle",
  q10c: "Serpentard",
  q10d: "Poufsouffle"
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
      const legacyFormat = Array.isArray(answers) && answers.length === 10 &&
        answers.every((answer, i) => typeof answer === "string" &&
          Object.prototype.hasOwnProperty.call(legacyScoring, answer) &&
          answer.startsWith("q" + (i + 1)));
      const randomizedFormat = Array.isArray(answers) && answers.length === 10 &&
        answers.every((answer) => typeof answer === "string" && Object.prototype.hasOwnProperty.call(scoring, answer)) &&
        new Set(answers.map((answer) => answer.slice(0, 3))).size === 10;
      if (!legacyFormat && !randomizedFormat) {
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
      for (const answer of answers) totals[(legacyFormat ? legacyScoring : scoring)[answer]]++;
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
