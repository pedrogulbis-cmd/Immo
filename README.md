# Rendement

Rentabilité d'un investissement locatif à partir d'une annonce Leboncoin ou SeLoger :
rendement brut et net (frais de notaire compris), net-net d'impôt, cash-flow avec crédit,
offre maximale pour atteindre l'objectif (10 % par défaut) et score sur 100.
Même esprit que CashFlow et Baby Name : une seule page, aucune dépendance, tout reste sur l'appareil.

## Mettre en ligne sur GitHub Pages

```
index.html
sw.js
.nojekyll
icons/        (tout le dossier)
```

1. Créer un dépôt (ex. `Rendement`), y déposer ces fichiers à la racine.
2. Settings → Pages → Source : « Deploy from a branch », branche `main`, dossier `/ (root)`.
3. L'app est en ligne à `https://pedrogulbis-cmd.github.io/Rendement/`.

Sur téléphone, « Ajouter à l'écran d'accueil » l'installe ; `sw.js` la garde disponible
hors ligne. À chaque nouvelle version : `VERSION` + `JOURNAL` dans `index.html`, `CACHE` dans `sw.js`.

## Importer une annonce

Leboncoin et SeLoger bloquent la lecture de leurs pages depuis un autre site (CORS + anti-robot),
donc l'appli ne peut pas aller chercher seule le contenu d'un lien. Trois entrées possibles :

- **Favori « → Rendement »** (Réglages → Import) : sur la page de l'annonce, il lit les données
  structurées (Leboncoin `__NEXT_DATA__`, JSON-LD) et le texte, puis ouvre l'appli avec la fiche remplie.
  Le favori contient l'adresse de l'appli : le recréer si l'appli change d'adresse.
- **Texte collé** : tout sélectionner sur l'annonce → copier → coller dans l'onglet Biens.
- **Partage Android / lien seul** : « Partager → Rendement » depuis l'appli Leboncoin (appli installée). Le titre donne type, surface, pièces ; une carte en haut demande le reste (prix, ville…).

Réimporter la même annonce met la fiche à jour et garde l'ancien prix (historique de baisse).

## Essayer en local

```bash
py -3 -m http.server 8765
```
