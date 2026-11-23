import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-api-version",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

const scoring: Record<string, string> = {
  q01a: "Poufsouffle",
  q01b: "Serdaigle",
  q01c: "Gryffondor",
  q01d: "Serpentard",
  q02a: "Serpentard",
  q02b: "Poufsouffle",
  q02c: "Gryffondor",
  q02d: "Serdaigle",
  q03a: "Serdaigle",
  q03b: "Gryffondor",
  q03c: "Poufsouffle",
  q03d: "Serpentard",
  q04a: "Poufsouffle",
  q04b: "Serdaigle",
  q04c: "Gryffondor",
  q04d: "Serpentard",
  q05a: "Serdaigle",
  q05b: "Poufsouffle",
  q05c: "Serpentard",
  q05d: "Gryffondor",
  q06a: "Poufsouffle",
  q06b: "Serdaigle",
  q06c: "Gryffondor",
  q06d: "Serpentard",
  q07a: "Serdaigle",
  q07b: "Poufsouffle",
  q07c: "Gryffondor",
  q07d: "Serpentard",
  q08a: "Serdaigle",
  q08b: "Poufsouffle",
  q08c: "Gryffondor",
  q08d: "Serpentard",
  q09a: "Poufsouffle",
  q09b: "Serdaigle",
  q09c: "Gryffondor",
  q09d: "Serpentard",
  q10a: "Serdaigle",
  q10b: "Poufsouffle",
  q10c: "Gryffondor",
  q10d: "Serpentard",
  q11a: "Serdaigle",
  q11b: "Poufsouffle",
  q11c: "Gryffondor",
  q11d: "Serpentard",
  q12a: "Serdaigle",
  q12b: "Poufsouffle",
  q12c: "Gryffondor",
  q12d: "Serpentard",
  q13a: "Gryffondor",
  q13b: "Serdaigle",
  q13c: "Poufsouffle",
  q13d: "Serpentard",
  q14a: "Serdaigle",
  q14b: "Poufsouffle",
  q14c: "Gryffondor",
  q14d: "Serpentard",
  q15a: "Serpentard",
  q15b: "Poufsouffle",
  q15c: "Gryffondor",
  q15d: "Serdaigle",
  q16a: "Serdaigle",
  q16b: "Poufsouffle",
  q16c: "Gryffondor",
  q16d: "Serpentard",
  q17a: "Gryffondor",
  q17b: "Serdaigle",
  q17c: "Poufsouffle",
  q17d: "Serpentard",
  q18a: "Serpentard",
  q18b: "Gryffondor",
  q18c: "Serdaigle",
  q18d: "Poufsouffle",
  q19a: "Gryffondor",
  q19b: "Serdaigle",
  q19c: "Poufsouffle",
  q19d: "Serpentard",
  q20a: "Serdaigle",
  q20b: "Poufsouffle",
  q20c: "Gryffondor",
  q20d: "Serpentard",
  q21a: "Serdaigle",
  q21b: "Poufsouffle",
  q21c: "Gryffondor",
  q21d: "Serpentard",
  q22a: "Poufsouffle",
  q22b: "Serpentard",
  q22c: "Serdaigle",
  q22d: "Gryffondor",
  q23a: "Serpentard",
  q23b: "Gryffondor",
  q23c: "Poufsouffle",
  q23d: "Serdaigle",
  q24a: "Poufsouffle",
  q24b: "Serdaigle",
  q24c: "Gryffondor",
  q24d: "Serpentard",
  q25a: "Poufsouffle",
  q25b: "Serdaigle",
  q25c: "Gryffondor",
  q25d: "Serpentard",
  q26a: "Gryffondor",
  q26b: "Poufsouffle",
  q26c: "Serdaigle",
  q26d: "Serpentard",
  q27a: "Serdaigle",
  q27b: "Poufsouffle",
  q27c: "Gryffondor",
  q27d: "Serpentard",
  q28a: "Serpentard",
  q28b: "Poufsouffle",
  q28c: "Gryffondor",
  q28d: "Serdaigle",
  q29a: "Poufsouffle",
  q29b: "Gryffondor",
  q29c: "Serdaigle",
  q29d: "Serpentard",
  q30a: "Gryffondor",
  q30b: "Serdaigle",
  q30c: "Poufsouffle",
  q30d: "Serpentard",
  q31a: "Serdaigle",
  q31b: "Poufsouffle",
  q31c: "Gryffondor",
  q31d: "Serpentard",
  q32a: "Gryffondor",
  q32b: "Serdaigle",
  q32c: "Poufsouffle",
  q32d: "Serpentard",
  q33a: "Serdaigle",
  q33b: "Poufsouffle",
  q33c: "Gryffondor",
  q33d: "Serpentard",
  q34a: "Gryffondor",
  q34b: "Serdaigle",
  q34c: "Poufsouffle",
  q34d: "Serpentard",
  q35a: "Serdaigle",
  q35b: "Poufsouffle",
  q35c: "Gryffondor",
  q35d: "Serpentard",
  q36a: "Serdaigle",
  q36b: "Poufsouffle",
  q36c: "Gryffondor",
  q36d: "Serpentard",
  q37a: "Serdaigle",
  q37b: "Poufsouffle",
  q37c: "Gryffondor",
  q37d: "Serpentard",
  q38a: "Serpentard",
  q38b: "Poufsouffle",
  q38c: "Gryffondor",
  q38d: "Serdaigle",
  q39a: "Gryffondor",
  q39b: "Serdaigle",
  q39c: "Poufsouffle",
  q39d: "Serpentard",
  q40a: "Serdaigle",
  q40b: "Poufsouffle",
  q40c: "Gryffondor",
  q40d: "Serpentard",
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

    if (action === "admin" || action === "delete") {
      const adminDiscordId = Deno.env.get("ADMIN_DISCORD_ID");
      if (!adminDiscordId || discordId !== adminDiscordId) return json({ error: "Cet espace est réservé à l'administratrice." }, 403);

      if (action === "delete") {
        const resultId = typeof body.result_id === "string" ? body.result_id : "";
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(resultId)) {
          return json({ error: "Résultat à supprimer invalide." }, 400);
        }
        const { data, error } = await admin.from("sorting_results")
          .delete().eq("id", resultId).select("id").maybeSingle();
        if (error) throw error;
        if (!data) return json({ error: "Ce résultat n'existe plus." }, 404);
        return json({ deleted: true, id: data.id });
      }

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
      const validAnswers = Array.isArray(answers) && answers.length === 10 &&
        answers.every((answer) => typeof answer === "string" && Object.prototype.hasOwnProperty.call(scoring, answer)) &&
        new Set(answers.map((answer) => answer.slice(0, 3))).size === 10;
      if (!validAnswers) {
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
      const chosenHouse = typeof body.chosen_house === "string" ? body.chosen_house : "";
      if (finalists.length > 1 && !chosenHouse) {
        return json({ tie: true, finalists });
      }
      if (chosenHouse && !finalists.includes(chosenHouse)) {
        return json({ error: "La maison choisie ne fait pas partie des maisons à égalité." }, 400);
      }
      const house = chosenHouse || finalists[0];

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
