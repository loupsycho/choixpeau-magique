import React, { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { DiscordSDK, patchUrlMappings } from "@discord/embedded-app-sdk";
import { questions, drawQuestions } from "./questions.js";

const SUPABASE_URL = "https://embokhuqnseawkftoqmn.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_GuW3T1VLxl6IqsSHrQNnyA_kuVhWQ5E";
const IS_DISCORD_ACTIVITY = new URLSearchParams(window.location.search).has("frame_id");

// Comme dans Sterling, les appels Supabase passent par le proxy réseau Discord.
// Ce patch doit impérativement être installé AVANT createClient().
if (IS_DISCORD_ACTIVITY) {
  patchUrlMappings([
    { prefix: "/supabase", target: "embokhuqnseawkftoqmn.supabase.co" },
  ]);
}

const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
const DISCORD_CLIENT_ID = "1573286160820740166";

const houses = {
  Gryffondor: { animal: "🦁", motto: "L'audace et le courage ont parfois le goût du risque.", color: "red" },
  Serpentard: { animal: "🐍", motto: "La détermination ouvre des chemins que d'autres n'osent pas voir.", color: "green" },
  Serdaigle: { animal: "🦅", motto: "L'esprit curieux trouve des réponses là où d'autres voient des mystères.", color: "blue" },
  Poufsouffle: { animal: "🦡", motto: "La loyauté et la constance donnent leur force aux plus grands liens.", color: "gold" }
};

function normalize(value) {
  return value.normalize("NFKC").trim().toLocaleLowerCase("fr-FR").replace(/\s+/g, " ");
}

function App() {
  const [screen, setScreen] = useState("home");
  const [discordUser, setDiscordUser] = useState(null);
  const [discordToken, setDiscordToken] = useState("");
  const [authStatus, setAuthStatus] = useState("loading");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [answers, setAnswers] = useState({});
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [myResults, setMyResults] = useState([]);
  const [adminGroups, setAdminGroups] = useState([]);
  const [adminSearch, setAdminSearch] = useState("");
  const [adminUser, setAdminUser] = useState(false);
  const sdkRef = useRef(null);
  const startedRef = useRef(false);

  const progress = useMemo(() => ((step + 1) / 10) * 100, [step]);
  const filteredGroups = useMemo(() => {
    const term = normalize(adminSearch);
    if (!term) return adminGroups;
    return adminGroups.filter(group =>
      normalize(group.discord_name || "").includes(term) ||
      group.characters.some(character => normalize(character.character_name || "").includes(term))
    );
  }, [adminGroups, adminSearch]);

  async function loadMine(token = discordToken) {
    if (!supabase || !token) return [];
    const data = await callAction("mine", {}, token);
    const rows = data.results || [];
    setMyResults(rows);
    return rows;
  }

  async function callAction(action, payload = {}, token = discordToken) {
    if (!supabase) throw new Error("La base de données n'est pas encore reliée à l'application.");
    const { data, error: fnError } = await supabase.functions.invoke("sorting-test", {
      body: { action, ...payload, access_token: token }
    });
    if (fnError) throw new Error("La communication avec le serveur a échoué. Réessaie dans un instant.");
    if (data?.error) throw new Error(data.error);
    return data;
  }

  async function connectDiscord() {
    if (!supabase) {
      setAuthStatus("error");
      setError("La base de données n'est pas encore reliée à l'application.");
      return;
    }
    setBusy(true);
    setError("");
    setAuthStatus("loading");
    try {
      if (!sdkRef.current) sdkRef.current = new DiscordSDK(DISCORD_CLIENT_ID);
      const sdk = sdkRef.current;
      await sdk.ready();
      const { code } = await sdk.commands.authorize({
        client_id: DISCORD_CLIENT_ID,
        response_type: "code",
        state: "",
        prompt: "none",
        scope: ["identify"]
      });
      const { data, error: exchangeError } = await supabase.functions.invoke("sorting-test", {
        body: { action: "exchange", code }
      });
      if (exchangeError) {
        let detail = exchangeError.message || "Erreur de communication avec le serveur.";
        const response = exchangeError.context;
        if (response && typeof response.clone === "function") {
          try {
            const serverError = await response.clone().json();
            if (serverError?.error) detail = serverError.error;
          } catch {
            // Keep the original communication error when the response is not JSON.
          }
        }
        throw new Error(`Erreur de connexion au serveur (${response?.status || "réseau"}) : ${detail}`);
      }
      if (data?.error) throw new Error(data.error);
      if (!data?.access_token) {
        throw new Error("Le serveur n'a pas renvoyé de jeton Discord. Réessaie depuis l'activité.");
      }
      const authenticated = await sdk.commands.authenticate({ access_token: data.access_token });
      const user = data.user || authenticated?.user;
      if (!user?.id) throw new Error("Discord n'a pas renvoyé les informations du compte.");
      const identity = {
        id: user.id,
        username: user.username || "",
        display_name: user.display_name || user.global_name || user.username || "Joueur Discord",
        avatar: user.avatar || null
      };
      setDiscordToken(data.access_token);
      setDiscordUser(identity);
      setAuthStatus("ready");
      await loadMine(data.access_token);
    } catch (e) {
      setAuthStatus("error");
      setError(e.message || "Ouvre le Choixpeau depuis Discord pour te connecter.");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    connectDiscord();
  }, []);

  async function begin() {
    setError("");
    if (!firstName.trim() || !lastName.trim()) {
      setError("Renseigne le prénom et le nom de ton personnage.");
      return;
    }
    if (!discordToken) {
      setError("Connecte-toi d'abord avec Discord.");
      return;
    }
    setBusy(true);
    try {
      const rows = await loadMine();
      const key = normalize(firstName.trim() + " " + lastName.trim());
      const existing = rows.find(row => normalize(row.character_name) === key);
      if (existing) {
        setResult({ ...existing, already_sorted: true });
        setScreen("result");
        return;
      }
      setAnswers({});
      setQuizQuestions(drawQuestions());
      setStep(0);
      setScreen("quiz");
    } catch (e) {
      setError(e.message || "Impossible de vérifier les anciennes répartitions.");
    } finally {
      setBusy(false);
    }
  }

  function choose(id) {
    setAnswers(prev => ({ ...prev, [step]: id }));
  }

  async function finish() {
    setBusy(true);
    setError("");
    try {
      const data = await callAction("submit", {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        answers: quizQuestions.map((question, index) => answers[index])
      });
      setResult(data);
      setFirstName(data.character_name.split(" ")[0] || firstName);
      setLastName(data.character_name.split(" ").slice(1).join(" ") || lastName);
      setScreen("result");
      await loadMine();
    } catch (e) {
      setError(e.message || "Une erreur est survenue. Réessaie dans un instant.");
    } finally {
      setBusy(false);
    }
  }

  async function openAdmin() {
    setScreen("admin");
    setError("");
    setBusy(true);
    try {
      const data = await callAction("admin");
      setAdminGroups(data.groups || []);
      setAdminUser(true);
    } catch (e) {
      setAdminUser(false);
      setError(e.message || "Accès administrateur refusé.");
    } finally {
      setBusy(false);
    }
  }

  async function refreshAdmin() {
    setBusy(true);
    setError("");
    try {
      const data = await callAction("admin");
      setAdminGroups(data.groups || []);
    } catch (e) {
      setError(e.message || "Impossible d'actualiser le registre.");
    } finally {
      setBusy(false);
    }
  }

  function showSavedResult(row) {
    setResult({ ...row, already_sorted: true });
    setFirstName(row.character_name.split(" ")[0] || "");
    setLastName(row.character_name.split(" ").slice(1).join(" "));
    setScreen("result");
  }

  function backHome() {
    setScreen("home");
    setError("");
    setResult(null);
    setAnswers({});
    setQuizQuestions([]);
    setStep(0);
    setFirstName("");
    setLastName("");
  }

  return (
    <main className="app-shell">
      <div className="stars stars-one" /><div className="stars stars-two" />
      <header className="topbar">
        <button className="brand" onClick={backHome}>
          <span className="brand-mark">✦</span><span>LE CHOIXPEAU <small>MAGIQUE</small></span>
        </button>
        <div className="topbar-right">
          {discordUser && <span className="discord-player">{discordUser.display_name}</span>}
          <button className="admin-link" onClick={openAdmin}>Espace administrateur</button>
        </div>
      </header>

      <section className="content">
        {screen === "home" && <div className="hero fade-in">
          <div className="eyebrow"><span /> ÉCOLE DE POUDLARD <span /></div>
          <div className="hat-wrap"><div className="hat-glow" /><div className="hat">🎩</div></div>
          <h1>À quelle maison<br/><em>appartiens-tu ?</em></h1>
          <p className="lead">Dix questions. Quelques vérités. Une maison qui saura reconnaître ce qui sommeille en toi.</p>
          <div className="ornament">✧ ━━━━━━━━━ ✧</div>
          {authStatus === "ready" ? (
            <>
              <button className="primary-button" onClick={() => { setError(""); setScreen("identify"); }}>Commencer la cérémonie <span>→</span></button>
              <p className="microcopy">Connecté avec Discord sous le nom de {discordUser?.display_name}.</p>
            </>
          ) : (
            <>
              <button className="primary-button" disabled={busy} onClick={connectDiscord}>
                {busy ? "Connexion à Discord…" : "Se connecter avec Discord"} <span>→</span>
              </button>
              <p className="microcopy">Le Choixpeau doit d'abord reconnaître ton compte Discord. Ouvre cette activité depuis ton serveur.</p>
            </>
          )}
          {error && <p className="error">{error}</p>}
          {myResults.length > 0 && <div className="my-results">
            <h3>Mes personnages répartis</h3>
            {myResults.map(row => <button className="saved-result" key={row.id} onClick={() => showSavedResult(row)}>
              <span>{houses[row.house]?.animal}</span><strong>{row.character_name}</strong><small>{row.house}</small><span className="saved-arrow">↗</span>
            </button>)}
          </div>}
        </div>}

        {screen === "identify" && <div className="panel fade-in">
          <div className="eyebrow">AVANT LA CÉRÉMONIE</div>
          <h2>Qui prend place sous le Choixpeau ?</h2>
          <p className="panel-copy">Tu es connecté(e) sous le nom de <strong>{discordUser?.display_name}</strong>. Chaque personnage passe sa propre cérémonie : un même joueur peut répartir plusieurs personnages.</p>
          <div className="rules-box">
            <p>✦ Une seule tentative par personnage.</p>
            <p>✦ Le test est réservé aux personnages originaux (OC).</p>
            <p>✦ Les personnages de la saga ont déjà leur maison : ils ne doivent pas passer le test.</p>
          </div>
          <label>Prénom du personnage<input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Prénom" autoComplete="off" /></label>
          <label>Nom du personnage<input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Nom" autoComplete="off" /></label>
          {error && <p className="error">{error}</p>}
          <button className="primary-button full" disabled={busy} onClick={begin}>{busy ? "Vérification…" : "Entrer dans la Grande Salle"} <span>→</span></button>
          <button className="text-button" onClick={() => { setError(""); setScreen("home"); }}>Retour</button>
        </div>}

        {screen === "quiz" && <div className="quiz-panel fade-in">
          <div className="quiz-meta"><span>LA CÉRÉMONIE</span><span>{String(step + 1).padStart(2, "0")} / 10</span></div>
          <div className="progress"><span style={{ width: progress + "%" }} /></div>
          <p className="question-kicker">LE CHOIXPEAU TE DEMANDE…</p>
          <h2>{quizQuestions[step]?.text}</h2>
          <div className="answers">{quizQuestions[step]?.answers.map(({ id, label }, index) =>
            <button key={id} className={"answer " + (answers[step] === id ? "selected" : "")} onClick={() => choose(id)}>
              <span className="answer-letter">{String.fromCharCode(65 + index)}</span><span>{label}</span><span className="answer-check">✦</span>
            </button>
          )}</div>
          {error && <p className="error">{error}</p>}
          <div className="quiz-actions">
            <button className="text-button" onClick={() => step === 0 ? setScreen("identify") : setStep(step - 1)}>← Précédent</button>
            <button className="primary-button" disabled={answers[step] == null || busy} onClick={() => step === 9 ? finish() : setStep(step + 1)}>
              {busy ? "Le Choixpeau réfléchit…" : step === 9 ? "Découvrir ma maison" : "Continuer"} <span>→</span>
            </button>
          </div>
        </div>}

        {screen === "result" && <div className={"result-panel result-card fade-in " + (houses[result?.house]?.color || "")}>
          <div className="eyebrow">LA DÉCISION EST PRISE</div>
          <div className="result-animal">{houses[result?.house]?.animal || "✦"}</div>
          <p className="question-kicker">LE CHOIXPEAU A CHOISI</p>
          <h1 className={"house-title " + (houses[result?.house]?.color || "")}>{result?.house || "Ta maison"}</h1>
          <p className="house-motto">{houses[result?.house]?.motto || "Ta nouvelle histoire commence ici."}</p>
          <div className="ornament">✧ ━━━━━━━━━ ✧</div>
          <p className="result-character">{result?.character_name || (firstName + " " + lastName).trim()}</p>
          <p className="acceptance-message">{result?.character_name || (firstName + " " + lastName).trim()}, tu es accepté(e) dans la maison {result?.house} !</p>
          {result?.already_sorted && <p className="saved-note">Voici le résultat déjà enregistré pour ce personnage. Aucune nouvelle tentative n'a été effectuée.</p>}
          <p className="microcopy">Tu peux conserver cette page en capture d'écran pour ta fiche personnage.</p>
          <button className="primary-button" onClick={backHome}>Terminer <span>✦</span></button>
        </div>}

        {screen === "admin" && <div className="panel admin-panel fade-in">
          <div className="eyebrow">ACCÈS RÉSERVÉ</div>
          <h2>Registre du Choixpeau</h2>
          {busy && <p className="panel-copy">Vérification de ton accès administrateur…</p>}
          {error && <p className="error">{error}</p>}
          {adminUser && <>
            <div className="admin-heading"><p>{adminGroups.reduce((total, group) => total + group.characters.length, 0)} personnage(s) réparti(s) · {adminGroups.length} joueur(s)</p><button className="text-button" disabled={busy} onClick={refreshAdmin}>Actualiser ↻</button></div>
            <label>Rechercher un joueur ou un personnage<input value={adminSearch} onChange={e => setAdminSearch(e.target.value)} placeholder="Nom Discord, prénom ou nom…" /></label>
            <div className="results-list">
              {filteredGroups.length ? filteredGroups.map((group, index) => <details className="player-group" key={group.discord_name + index}>
                <summary><span>♟</span><strong>{group.discord_name}</strong><small>{group.characters.length} personnage(s)</small></summary>
                <div className="player-characters">{group.characters.map(row => <div className="result-row" key={row.id}>
                  <span>{houses[row.house]?.animal}</span><div><strong>{row.character_name}</strong><small>{row.house}</small></div><time>{new Date(row.created_at).toLocaleDateString("fr-FR")}</time>
                </div>)}</div>
              </details>) : <p className="empty">Aucun résultat pour cette recherche.</p>}
            </div>
          </>}
          <button className="text-button" onClick={() => { setError(""); setAdminUser(false); setScreen("home"); }}>Retour à l'accueil</button>
        </div>}
      </section>
      <footer><span>✦</span> LA MAGIE EST DÉJÀ EN TOI <span>✦</span></footer>
    </main>
  );
}

export default App;
