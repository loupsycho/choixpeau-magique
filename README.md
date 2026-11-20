# Le Choixpeau magique

Application indépendante pour la cérémonie de répartition des personnages dans les quatre maisons de Poudlard.

## Technologies
- React + Vite
- Supabase pour l'authentification et le stockage des résultats
- Vercel pour l'hébergement

## Développement
```bash
npm install
npm run dev
```

## Configuration
Créer un projet Supabase indépendant, puis renseigner les variables `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` dans les variables d'environnement Vercel.

Le calcul des maisons doit être effectué côté serveur via la fonction Supabase `sorting-test`. Les correspondances secrètes des réponses ne doivent pas être exposées dans le navigateur.

Ce dépôt est indépendant de Sterling Campus.