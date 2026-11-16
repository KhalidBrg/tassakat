# Site Tassakat – guide rapide

**Lancer en local** : ouvrir `index.html` dans un navigateur (aucune installation).
**Héberger** : envoyer tout le dossier (index.html, style.css, script.js, assets/) à la racine d’un hébergement web classique (FTP, cPanel), ou le glisser sur Netlify / Cloudflare Pages / GitHub Pages.

## Remplacer le logo et les photos
- Logo : déposer `assets/logo/logo.png` (carré, fond transparent). Favicon : `assets/logo/favicon.png`.
- Photos : déposer dans `assets/images/` un fichier portant **exactement** le nom prévu (le « [PHOTO À AJOUTER] » disparaît automatiquement) :
  `hero-douar.jpg`, `communaute.jpg`, `territoire.jpg`, `realisation-eau.jpg`, `realisation-solaire.jpg`, `realisation-moussalla.jpg`, `realisation-cimetiere.jpg`, `piste-1.jpg`, `piste-trace.jpg`, `piste-docs.jpg`.
- Conseil : JPG ou WebP, 1600 px de large max, moins de 300 Ko. Le même nom sert aussi pour l’aperçu de partage (hero-douar.jpg).

## Modifier les coordonnées (début de `script.js`, bloc CONFIG)
`whatsapp` (ex. "212600000000"), `email`, `socials`, `stats` (habitants/foyers), `optional` (indicateurs par réalisation), messages WhatsApp.

## À compléter avant publication
Numéro WhatsApp · e-mail · logo officiel · photos authentiques (accord des personnes visibles) · indicateurs [XX] · budget de la piste · documents/devis · réseaux sociaux éventuels · personne chargée de répondre aux messages.

## Arabe / multilingue (préparé, non développé)
Le code utilise des propriétés CSS logiques, `lang`/`dir` pilotés par `CONFIG.lang` et une police arabe prévue dans `style.css`. Ajouter une langue = dupliquer le texte dans une version traduite, sans refaire l’interface.

## Langues (FR / EN / AR)
Textes dans `lang/fr.js`, `lang/en.js`, `lang/ar.js` (mêmes clés t1, t2…). Pour corriger un texte : modifier la ligne de la clé dans le fichier de la langue ; clé absente = texte français affiché. Langue par défaut : `CONFIG.lang` dans `script.js` ; on peut aussi ouvrir `index.html?lang=ar` ou `?lang=en`.
