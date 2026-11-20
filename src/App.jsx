import { useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

const questions = [
  {
    text: "Une lettre sans signature apparaît sur ton bureau au milieu de la nuit. Elle ne contient qu'une adresse que tu ne connais pas.",
    answers: [
      ["q1a", "Tu cherches d'abord qui a pu l'envoyer et pourquoi."],
      ["q1b", "Tu t'y rends. Certaines occasions ne se présentent qu'une fois."],
      ["q1c", "Tu gardes la lettre et observes si quelqu'un vient la réclamer."],
      ["q1d", "Tu en parles à une personne en qui tu as confiance."]
    ]
  },
  {
    text: "Au cours d'un travail de groupe, tu réalises que le résultat sera mauvais si personne ne change de méthode.",
    answers: [
      ["q2a", "Tu proposes une autre approche et expliques ton raisonnement."],
      ["q2b", "Tu prends les choses en main avant que tout échoue."],
      ["q2c", "Tu t'assures que personne ne soit laissé de côté."],
      ["q2d", "Tu trouves comment obtenir le meilleur résultat avec les moyens disponibles."]
    ]
  },
  {
    text: "Un portrait dans un couloir semble te reconnaître, alors que tu ne l'as jamais rencontré.",
    answers: [
      ["q3a", "Tu lui demandes ce qu'il sait et comment il te connaît."],
      ["q3b", "Tu lui réponds avec aplomb, sans montrer ta surprise."],
      ["q3c", "Tu te demandes si quelqu'un d'autre a vécu la même chose."],
      ["q3d", "Tu reviens le voir plus tard, quand le couloir sera tranquille."]
    ]
  },
  {
    text: "On te confie quelque chose de précieux sans t'expliquer pourquoi tu as été choisi.",
    answers: [
      ["q4a", "Tu acceptes et tu prends cette responsabilité au sérieux."],
      ["q4b", "Tu veux connaître les raisons avant de donner ta réponse."],
      ["q4c", "Tu acceptes : cette confiance pourrait ouvrir une porte inattendue."],
      ["q4d", "Tu vérifies que la personne n'a pas besoin d'aide supplémentaire."]
    ]
  },
  {
    text: "Tu peux obtenir une réponse à une seule question, mais tu devras renoncer à une certitude à laquelle tu tiens.",
    answers: [
      ["q5a", "Tu choisis la question qui pourrait tout remettre en perspective."],
      ["q5b", "Tu demandes ce qui te permettra d'aller plus loin."],
      ["q5c", "Tu préfères ne pas sacrifier ce qui te construit."],
      ["q5d", "Tu prends le risque : une vérité difficile vaut mieux qu'un regret."]
    ]
  },
  {
    text: "Dans une pièce inconnue, quatre objets attirent ton attention : une clé usée, une carte incomplète, une montre arrêtée et une enveloppe scellée.",
    answers: [
      ["q6a", "La carte : ses parties manquantes t'intriguent."],
      ["q6b", "La clé : tu veux savoir quelle porte elle peut ouvrir."],
      ["q6c", "L'enveloppe : tu te demandes à qui elle était destinée."],
      ["q6d", "La montre : tu aimerais comprendre pourquoi elle s'est arrêtée."]
    ]
  },
  {
    text: "Une rumeur injuste circule au sujet de quelqu'un que tu connais à peine.",
    answers: [
      ["q7a", "Tu cherches à savoir ce qui s'est réellement passé."],
      ["q7b", "Tu refuses de laisser la rumeur décider de son sort."],
      ["q7c", "Tu observes qui propage l'histoire et ce que chacun y gagne."],
      ["q7d", "Tu vas voir la personne pour lui proposer ton soutien."]
    ]
  },
  {
    text: "Tu retrouves un ancien carnet rempli de notes dont certaines pages ont été arrachées.",
    answers: [
      ["q8a", "Tu reconstitues les passages manquants à partir des indices."],
      ["q8b", "Tu cherches la personne qui l'a écrit."],
      ["q8c", "Tu conserves le carnet : il pourrait devenir utile."],
      ["q8d", "Tu le rapportes à l'endroit où quelqu'un pourrait le chercher."]
    ]
  },
  {
    text: "Une occasion importante se présente, mais personne ne peut te garantir qu'elle fonctionnera.",
    answers: [
      ["q9a", "Tu te lances : tu préfères tenter que te demander toute ta vie."],
      ["q9b", "Tu étudies les risques et prépares plusieurs scénarios."],
      ["q9c", "Tu réfléchis à la place que cette occasion pourrait prendre dans ton avenir."],
      ["q9d", "Tu demandes conseil à ceux qui seront concernés par ton choix."]
    ]
  },
  {
    text: "Lorsque tu repenses à tes décisions, qu'est-ce qui compte le plus pour toi ?",
    answers: [
      ["q10a", "Avoir agi en accord avec ce que tu crois juste."],
      ["q10b", "Avoir compris quelque chose que tu ignorais auparavant."],
      ["q10c", "Avoir construit quelque chose qui te survivra."],
      ["q10d", "Ne pas avoir abandonné les personnes qui comptaient sur toi."]
    ]
  }
];

const houses = {
  Gryffondor: { animal: "🦁", motto: "L'audace et le courage ont parfois le goût du risque.", color: "red" },
  Serpentard: { animal: "🐍", motto: "La détermination ouvre des chemins que d'autres n'osent pas voir.", color: "green" },
  Serdaigle: { animal: "🦅", motto: "L'esprit curieux trouve des réponses là où d'autres voient des mystères.", color: "blue" },
  Poufsouffle: { animal: "🦡", motto: "La loyauté et la constance donnent leur force aux plus grands liens.", color: "gold" }
};

function App() {
  const [screen, setScreen] = useState("home");
  const [player, setPlayer] = useState("");
  const [character, setCharacter] = useState("");
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminRows, setAdminRows] = useState([]);
  const [adminUser, setAdminUser] = useState(null);

  const progress = useMemo(() => ((step + 1) / questions.length) * 100, [step]);

  function begin() {
    setError("");
    if (!player.trim() || !character.trim()) {
      setError("Renseigne ton pseudo Discord et le nom de ton personnage.");
      return;
    }
    setScreen("quiz");
  }

  function choose(id) {
    setAnswers(prev => ({ ...prev, [step]: id }));
  }

  async function finish() {
    if (!supabase) {
      setError("Le site est en place, mais sa base de données doit encore être reliée. Reviens après la configuration.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const { data, error: fnError } = await supabase.functions.invoke("sorting-test", {
        body: {
          discord_name: player.trim(),
          character_name: character.trim(),
          answers: questions.map((_, index) => answers[index])
        }
      });
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);
      setResult(data);
      setScreen("result");
    } catch (e) {
      setError(e.message || "Une erreur est survenue. Réessaie dans un instant.");
    } finally {
      setBusy(false);
    }
  }

  async function adminLogin(e) {
    e.preventDefault();
    if (!supabase) {
      setError("La base de données administrateur sera activée à l'étape de configuration.");
      return;
    }
    setBusy(true);
    setError("");
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email: adminEmail, password: adminPassword });
    setBusy(false);
    if (authError) return setError("Identifiants incorrects ou accès non configuré.");
    setAdminUser(data.user);
    await loadResults();
  }

  async function loadResults() {
    if (!supabase) return;
    const { data, error: queryError } = await supabase
      .from("sorting_results")
      .select("id, discord_name, character_name, house, created_at")
      .order("created_at", { ascending: false });
    if (queryError) setError("Impossible de charger les résultats : " + queryError.message);
    else setAdminRows(data || []);
  }

  async function adminLogout() {
    if (supabase) await supabase.auth.signOut();
    setAdminUser(null);
    setAdminRows([]);
    setScreen("home");
  }

  return (
    <main className="app-shell">
      <div className="stars stars-one" /><div className="stars stars-two" />
      <header className="topbar">
        <button className="brand" onClick={() => { setScreen("home"); setError(""); }}>
          <span className="brand-mark">✦</span><span>LE CHOIXPEAU <small>MAGIQUE</small></span>
        </button>
        <button className="admin-link" onClick={() => { setError(""); setScreen("admin"); }}>Espace administrateur</button>
      </header>

      <section className="content">
        {screen === "home" && <div className="hero fade-in">
          <div className="eyebrow"><span /> ÉCOLE DE POUDLARD <span /></div>
          <div className="hat-wrap"><div className="hat-glow" /><div className="hat">🎩</div></div>
          <h1>À quelle maison<br/><em>appartiens-tu ?</em></h1>
          <p className="lead">Dix questions. Quelques vérités. Une maison qui saura reconnaître ce qui sommeille en toi.</p>
          <div className="ornament">✧ ━━━━━━━━━ ✧</div>
          <button className="primary-button" onClick={() => setScreen("identify")}>Commencer la cérémonie <span>→</span></button>
          <p className="microcopy">Installe-toi confortablement. Le Choixpeau est prêt à t'écouter.</p>
        </div>}

        {screen === "identify" && <div className="panel fade-in">
          <div className="eyebrow">AVANT LA CÉRÉMONIE</div>
          <h2>Qui prend place sous le Choixpeau ?</h2>
          <p className="panel-copy">Chaque personnage passe sa propre cérémonie. Un même joueur peut revenir pour ses autres personnages.</p>
          <label>Pseudo Discord<input value={player} onChange={e => setPlayer(e.target.value)} placeholder="Ex. : @pseudo" /></label>
          <label>Nom du personnage<input value={character} onChange={e => setCharacter(e.target.value)} placeholder="Prénom et nom" /></label>
          {error && <p className="error">{error}</p>}
          <button className="primary-button full" onClick={begin}>Entrer dans la Grande Salle <span>→</span></button>
          <button className="text-button" onClick={() => setScreen("home")}>Retour</button>
        </div>}

        {screen === "quiz" && <div className="quiz-panel fade-in">
          <div className="quiz-meta"><span>LA CÉRÉMONIE</span><span>{String(step + 1).padStart(2, "0")} / 10</span></div>
          <div className="progress"><span style={{ width: progress + "%" }} /></div>
          <p className="question-kicker">LE CHOIXPEAU TE DEMANDE…</p>
          <h2>{questions[step].text}</h2>
          <div className="answers">{questions[step].answers.map(([id, label], index) =>
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

        {screen === "result" && <div className="result-panel fade-in">
          <div className="eyebrow">LA DÉCISION EST PRISE</div>
          <div className="result-animal">{houses[result?.house]?.animal || "✦"}</div>
          <p className="question-kicker">LE CHOIXPEAU A CHOISI</p>
          <h1 className={"house-title " + (houses[result?.house]?.color || "")}>{result?.house || "Ta maison"}</h1>
          <p className="house-motto">{houses[result?.house]?.motto || "Ta nouvelle histoire commence ici."}</p>
          <div className="ornament">✧ ━━━━━━━━━ ✧</div>
          <p className="lead small-lead">{character}, ta place t'attend.</p>
          <button className="primary-button" onClick={() => { setScreen("home"); setPlayer(""); setCharacter(""); setAnswers({}); setStep(0); setResult(null); }}>Terminer <span>✦</span></button>
        </div>}

        {screen === "admin" && <div className="panel admin-panel fade-in">
          <div className="eyebrow">ACCÈS RÉSERVÉ</div>
          <h2>Registre du Choixpeau</h2>
          {!adminUser ? <form onSubmit={adminLogin}>
            <p className="panel-copy">Connecte-toi avec ton compte administrateur pour consulter les répartitions.</p>
            <label>Adresse e-mail<input type="email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} placeholder="administration@exemple.fr" required /></label>
            <label>Mot de passe<input type="password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} placeholder="Mot de passe" required /></label>
            {error && <p className="error">{error}</p>}
            <button className="primary-button full" disabled={busy}>{busy ? "Connexion…" : "Se connecter"} <span>→</span></button>
          </form> : <>
            <div className="admin-heading"><p>{adminRows.length} personnage(s) réparti(s)</p><button className="text-button" onClick={loadResults}>Actualiser ↻</button></div>
            <div className="results-list">{adminRows.length ? adminRows.map(row => <div className="result-row" key={row.id}><span>{houses[row.house]?.animal}</span><div><strong>{row.character_name}</strong><small>{row.discord_name} · {row.house}</small></div><time>{new Date(row.created_at).toLocaleDateString("fr-FR")}</time></div>) : <p className="empty">Aucune répartition enregistrée pour le moment.</p>}</div>
            <button className="text-button" onClick={adminLogout}>Se déconnecter</button>
          </>}
          <button className="text-button" onClick={() => { setError(""); setScreen("home"); }}>Retour à l'accueil</button>
        </div>}
      </section>
      <footer><span>✦</span> LA MAGIE EST DÉJÀ EN TOI <span>✦</span></footer>
    </main>
  );
}

export default App;