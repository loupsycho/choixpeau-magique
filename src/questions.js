// Les maisons associées aux réponses restent exclusivement côté serveur.
const rawQuestions = [
  [
    "Lorsqu'une personne semble aller mal devant toi, comment réagis-tu ?",
    [
      "Je vais spontanément prendre de ses nouvelles.",
      "J'observe d'abord pour comprendre ce qui se passe.",
      "J'interviens directement si je pense qu'elle a besoin d'aide.",
      "Je prends la situation en main si cela me permet de garder le contrôle et de décider de la suite."
    ]
  ],
  [
    "Comment tes amis te décriraient-ils ?",
    [
      "Comme quelqu'un de déterminé qui sait ce qu'il veut.",
      "Comme une personne attentive et toujours présente.",
      "Comme quelqu'un de spontané et qui n'a pas froid aux yeux.",
      "Comme une personne réfléchie et observatrice."
    ]
  ],
  [
    "Dans un groupe, quelle place prends-tu naturellement ?",
    [
      "Je préfère écouter et comprendre les personnalités de chacun.",
      "Je prends facilement les devants lorsque personne ne le fait.",
      "Je veille à ce que personne ne soit mis de côté.",
      "Je cherche à avoir une influence sur les décisions du groupe."
    ]
  ],
  [
    "Comment réagis-tu lorsqu’une personne te confie un secret ?",
    [
      "Je le garde pour moi, car la confiance est importante.",
      "Je prends le temps de comprendre pourquoi elle me le confie.",
      "Je le protège, même si cela peut me mettre dans une situation compliquée.",
      "Je garde cette information en tête. Elle pourrait m’être utile un jour."
    ]
  ],
  [
    "Qu’est-ce qui te dérange le plus chez les autres ?",
    [
      "Le manque de réflexion et les jugements trop rapides.",
      "La déloyauté et les promesses non tenues.",
      "Le manque d’ambition et le fait de renoncer trop facilement.",
      "La lâcheté et le refus d’assumer ses actes."
    ]
  ],
  [
    "Une personne que tu connais peu te demande de l’aide. Que fais-tu ?",
    [
      "Je l’aide si je peux, sans forcément attendre quelque chose en retour.",
      "Je cherche à comprendre précisément son problème avant d’agir.",
      "Je lui apporte mon aide sans hésiter si la situation le nécessite.",
      "Je vérifie d’abord ce que j’ai à y gagner avant de m’impliquer."
    ]
  ],
  [
    "Lorsqu’un ami traverse une période difficile, tu as tendance à…",
    [
      "Lui proposer des solutions concrètes pour s’en sortir.",
      "Rester à ses côtés aussi longtemps qu’il en a besoin.",
      "Faire face au problème avec lui, même si cela implique des risques.",
      "L’aider à reprendre le contrôle de la situation."
    ]
  ],
  [
    "Comment te comportes-tu avec une personne que tu n’apprécies pas ?",
    [
      "Je garde mes distances et évite les conflits inutiles.",
      "Je reste correct, même si je n’ai aucune affection pour elle.",
      "Je reste poli, mais je ne lui accorde pas facilement ma confiance.",
      "Je lui fais comprendre franchement ce que je pense."
    ]
  ],
  [
    "Quelle importance accordes-tu aux sentiments des autres ?",
    [
      "Ils comptent beaucoup et influencent souvent mes décisions.",
      "Je les prends en considération, mais j’essaie de garder du recul.",
      "Je peux mettre mes propres intérêts de côté pour protéger quelqu’un.",
      "Je comprends les émotions des autres, mais je ne les laisse pas diriger mes choix."
    ]
  ],
  [
    "Si quelqu’un te blesse involontairement, comment réagis-tu ?",
    [
      "J’essaie de comprendre son intention avant de réagir.",
      "Je peux pardonner assez facilement si je sens que la personne est sincère.",
      "Je lui dis directement ce que j’ai ressenti.",
      "Je n’oublie pas facilement et je peux chercher à lui rendre la pareille."
    ]
  ],
  [
    "Comment réagis-tu lorsque les choses ne se passent pas comme prévu ?",
    [
      "Je cherche rapidement une autre solution.",
      "Je garde mon calme et prends le temps de m’adapter.",
      "Je fonce et tente de reprendre la situation en main.",
      "Je réorganise mes plans pour garder l’avantage."
    ]
  ],
  [
    "Quelle phrase te correspond le mieux ?",
    [
      "« Je préfère réfléchir avant de parler. »",
      "« Je n’abandonne pas facilement ceux qui comptent pour moi. »",
      "« Je préfère agir plutôt que rester spectateur. »",
      "« Je sais ce que je veux et je fais tout pour l’obtenir. »"
    ]
  ],
  [
    "Lorsque tu es en colère, tu as tendance à…",
    [
      "Contrôler ton expression et attendre le bon moment pour réagir.",
      "Garder tes émotions pour toi et prendre du recul.",
      "Être blessé longtemps, même si tu ne le montres pas.",
      "Réagir vivement et exprimer ce que tu ressens."
    ]
  ],
  [
    "Comment fais-tu face à une situation stressante ?",
    [
      "Je prends le temps de réfléchir à ce que je peux contrôler.",
      "Je m’accroche et avance étape par étape.",
      "Je réagis immédiatement pour ne pas me laisser dépasser.",
      "Je prépare mes prochaines actions pour ne pas perdre la maîtrise."
    ]
  ],
  [
    "Quelle est ta plus grande force de caractère ?",
    [
      "Ma persévérance et ma capacité à atteindre mes objectifs.",
      "Ma patience et ma capacité à comprendre les autres.",
      "Mon courage et ma franchise.",
      "Ma curiosité et mon esprit d’analyse."
    ]
  ],
  [
    "Comment réagis-tu face à une critique ?",
    [
      "Je cherche à savoir si elle est justifiée.",
      "Je peux être touché, mais j’essaie de ne pas en vouloir à la personne.",
      "Je défends mon point de vue si je ne suis pas d’accord.",
      "Je ne prends pas la peine de me justifier : l’opinion des autres ne m’intéresse pas."
    ]
  ],
  [
    "Dans la vie quotidienne, tu es plutôt…",
    [
      "Quelqu’un de spontané qui aime suivre ses envies.",
      "Quelqu’un de discret qui observe beaucoup.",
      "Quelqu’un de régulier qui apprécie ses habitudes.",
      "Quelqu’un d’organisé qui aime avoir des objectifs précis."
    ]
  ],
  [
    "Qu’est-ce qui te fait perdre patience ?",
    [
      "Le fait de ne pas pouvoir avancer ou atteindre un objectif.",
      "Les injustices et les comportements irrespectueux.",
      "Les personnes qui refusent d’écouter ou de comprendre.",
      "Les disputes inutiles et les tensions entre proches."
    ]
  ],
  [
    "Comment te sens-tu lorsque tu rencontres de nouvelles personnes ?",
    [
      "Je suis à l’aise et je n’hésite pas à engager la conversation.",
      "Je préfère observer avant de me dévoiler.",
      "Je cherche naturellement à mettre les autres à l’aise.",
      "Je choisis soigneusement les personnes auxquelles je m’intéresse."
    ]
  ],
  [
    "Quel environnement te correspond le mieux ?",
    [
      "Un endroit calme où je peux réfléchir tranquillement.",
      "Un lieu chaleureux entouré de personnes en qui j’ai confiance.",
      "Un environnement vivant où il se passe toujours quelque chose.",
      "Un cadre stimulant où je peux évoluer et me dépasser."
    ]
  ],
  [
    "Lorsque tu as du temps libre, tu préfères…",
    [
      "Découvrir quelque chose de nouveau ou approfondir un sujet.",
      "Passer du temps avec les personnes qui comptent pour moi.",
      "Vivre une expérience nouvelle, même imprévue.",
      "Avancer sur un projet personnel ou une ambition."
    ]
  ],
  [
    "Quelle place accordes-tu à ta vie privée ?",
    [
      "J’aime partager ma vie avec les personnes proches de moi.",
      "Je garde une certaine distance et ne révèle pas tout facilement.",
      "Je préfère préserver mon indépendance et mon espace personnel.",
      "Je parle librement de moi sans trop me poser de questions."
    ]
  ],
  [
    "Comment décrirais-tu ta façon de communiquer ?",
    [
      "Je suis direct et je dis ce que je pense.",
      "Je choisis mes mots et j’aime les conversations intéressantes.",
      "Je fais attention à ne pas blesser inutilement les autres.",
      "Je sais adapter mes paroles selon les personnes et les circonstances."
    ]
  ],
  [
    "Dans tes relations, qu’est-ce qui est le plus important pour toi ?",
    [
      "La confiance et la fidélité.",
      "Le respect de l’indépendance de chacun.",
      "La sincérité et la capacité à se défendre mutuellement.",
      "La confiance réciproque et le respect des ambitions de chacun."
    ]
  ],
  [
    "Quelle valeur te représente le mieux ?",
    [
      "La loyauté.",
      "La liberté de penser.",
      "Le courage.",
      "La détermination."
    ]
  ],
  [
    "Si tu devais choisir entre dire la vérité ou préserver une relation, que ferais-tu ?",
    [
      "Je dis la vérité, même si elle risque de provoquer une dispute.",
      "Je réfléchis à la manière de dire les choses pour éviter de blesser.",
      "Je cherche à comprendre toutes les conséquences avant de parler.",
      "Je choisis soigneusement ce que je révèle et à quel moment."
    ]
  ],
  [
    "Qu’est-ce qui te semble le plus difficile à accepter ?",
    [
      "Être privé de liberté ou ne pas pouvoir faire tes propres choix.",
      "Être trahi par quelqu’un en qui tu avais confiance.",
      "Ne pas pouvoir défendre ce qui te semble juste.",
      "Échouer alors que tu avais tout donné pour réussir."
    ]
  ],
  [
    "Jusqu’où serais-tu prêt à aller pour atteindre un objectif important ?",
    [
      "Je travaillerais autant qu’il le faut, sans abandonner.",
      "Je ferais de mon mieux sans sacrifier mes valeurs ni mes proches.",
      "Je prendrais des risques si je crois réellement en cet objectif.",
      "J’étudierais toutes les possibilités pour trouver la meilleure voie."
    ]
  ],
  [
    "Quelle attitude admires-tu le plus chez une personne ?",
    [
      "Sa capacité à rester fidèle à ses proches.",
      "Son audace et sa capacité à défendre ses convictions.",
      "Son intelligence et sa curiosité.",
      "Sa détermination et sa capacité à réussir."
    ]
  ],
  [
    "Quelle serait ta plus grande déception ?",
    [
      "Ne jamais avoir osé faire ce qui me tenait à cœur.",
      "Ne jamais avoir pu satisfaire ma curiosité ou développer mes connaissances.",
      "Avoir déçu ou abandonné les personnes qui comptaient sur moi.",
      "Avoir laissé quelqu’un d’autre prendre la place que je convoitais."
    ]
  ],
  [
    "Lorsqu’une personne te trahit, comment réagis-tu ?",
    [
      "J’essaie de comprendre ce qui l’a poussée à agir ainsi.",
      "Je suis profondément blessé et j’ai du mal à oublier.",
      "Je confronte directement cette personne.",
      "Je lui rends son geste, puis je coupe définitivement les liens."
    ]
  ],
  [
    "Comment gères-tu tes propres émotions ?",
    [
      "Je les exprime assez facilement, même lorsqu’elles sont intenses.",
      "Je préfère les analyser et comprendre leur origine.",
      "Je les partage surtout avec les personnes dont je suis proche.",
      "Je préfère les maîtriser et ne pas laisser les autres les voir."
    ]
  ],
  [
    "Lorsque tu as un problème personnel, que fais-tu ?",
    [
      "Je cherche seul une solution avant de demander de l’aide.",
      "Je me tourne vers une personne de confiance.",
      "Je préfère affronter le problème directement.",
      "Je garde cela pour moi et réfléchis à la meilleure manière de m’en sortir."
    ]
  ],
  [
    "Comment réagis-tu lorsque tu ressens de la jalousie ?",
    [
      "Je préfère en parler franchement plutôt que faire semblant.",
      "J’essaie de comprendre ce qui provoque ce sentiment.",
      "Je peux être blessé, mais j’ai besoin d’être rassuré.",
      "Je ne montre pas facilement ma jalousie et garde mes pensées pour moi."
    ]
  ],
  [
    "Quelle description correspond le mieux à ton rapport à la solitude ?",
    [
      "J’apprécie d’être seul pour réfléchir et me retrouver.",
      "Je préfère être entouré des personnes que j’aime.",
      "Je peux être seul sans problème, mais j’aime vivre de nouvelles expériences avec les autres.",
      "La solitude me permet de me concentrer sur mes propres objectifs."
    ]
  ],
  [
    "Qu’est-ce qui te motive le plus dans la vie ?",
    [
      "Découvrir, apprendre et comprendre le monde.",
      "Construire des relations sincères et durables.",
      "Vivre pleinement et ne pas regretter de ne pas avoir essayé.",
      "Réussir et devenir la personne que je souhaite être."
    ]
  ],
  [
    "Comment réagis-tu face à une personne qui réussit mieux que toi ?",
    [
      "Je cherche à comprendre ce qu’elle a fait pour réussir.",
      "Je peux l’admirer et être sincèrement heureux pour elle.",
      "Cela me donne envie de me dépasser et de relever le défi.",
      "Je prends sa réussite comme une motivation pour atteindre mes propres objectifs."
    ]
  ],
  [
    "Quelle place accordes-tu à la réussite personnelle ?",
    [
      "Elle est importante, car j’aime prouver ce dont je suis capable.",
      "Elle compte, mais elle n’a de valeur que si je reste fidèle à moi-même et aux autres.",
      "Je préfère essayer de grandes choses plutôt que me contenter de peu.",
      "Pour moi, réussir signifie aussi apprendre et développer mes capacités."
    ]
  ],
  [
    "Comment aimerais-tu que les autres se souviennent de toi ?",
    [
      "Comme une personne qui a toujours su défendre ses convictions.",
      "Comme quelqu’un qui avait une façon unique de penser et de voir le monde.",
      "Comme une personne sur qui l’on pouvait toujours compter.",
      "Comme quelqu’un qui a su accomplir de grandes choses."
    ]
  ],
  [
    "Si tu devais choisir une qualité qui te définit profondément, laquelle serait-ce ?",
    [
      "Ma capacité à comprendre et à analyser les choses.",
      "Ma fidélité envers les personnes qui comptent pour moi.",
      "Ma volonté de faire face aux difficultés.",
      "Ma détermination à aller jusqu’au bout de mes projets."
    ]
  ]
];

export const questions = rawQuestions.map(([text, labels], index) => ({
  id: index + 1,
  text,
  answers: labels.map((label, answerIndex) => ({
    id: `q${String(index + 1).padStart(2, "0")}${String.fromCharCode(97 + answerIndex)}`,
    label,
  })),
}));

export function drawQuestions(source = questions) {
  const pool = [...source];
  for (let i = pool.length - 1; i > 0; i--) {
    const random = new Uint32Array(1);
    crypto.getRandomValues(random);
    const j = random[0] % (i + 1);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 10);
}
