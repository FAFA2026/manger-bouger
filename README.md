# 🌿 Manger·Bouger

Application nutrition & bien-être — PWA installable sur iPhone et accessible depuis n'importe quel navigateur.

## 🚀 Mise en ligne sur GitHub Pages (étape par étape)

### 1. Créer un compte GitHub
Rendez-vous sur [github.com](https://github.com) et créez un compte gratuit si vous n'en avez pas.

### 2. Créer un nouveau dépôt
1. Cliquez sur le bouton **"+"** en haut à droite → **"New repository"**
2. Nommez-le exactement : `manger-bouger`
3. Laissez-le **Public**
4. Ne cochez rien d'autre
5. Cliquez **"Create repository"**

### 3. Uploader les fichiers
**Option A — Interface web GitHub (plus simple) :**
1. Sur la page du dépôt vide, cliquez **"uploading an existing file"**
2. Glissez-déposez TOUS les fichiers et dossiers de ce projet
3. Cliquez **"Commit changes"**

**Option B — Git en ligne de commande :**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/manger-bouger.git
git push -u origin main
```

### 4. Activer GitHub Pages
1. Dans votre dépôt, cliquez sur **"Settings"** (onglet en haut)
2. Dans le menu gauche, cliquez **"Pages"**
3. Sous "Source", sélectionnez **"GitHub Actions"**
4. C'est tout ! Le déploiement démarre automatiquement.

### 5. Accéder à votre application
Après ~2 minutes, votre app est disponible à :
```
https://VOTRE_USERNAME.github.io/manger-bouger/
```

---

## 📱 Installer sur iPhone

1. Ouvrez l'URL ci-dessus dans **Safari** (obligatoire, pas Chrome)
2. Appuyez sur l'icône **Partager** (carré avec flèche vers le haut)
3. Faites défiler et appuyez sur **"Sur l'écran d'accueil"**
4. Donnez un nom → **"Ajouter"**
5. L'app apparaît sur votre écran d'accueil comme une vraie app !

---

## 💻 Développement local

```bash
npm install
npm run dev
```

Ouvre http://localhost:5173/manger-bouger/

---

## 🔑 Clé API

L'application utilise l'API Claude d'Anthropic.  
La clé API est injectée automatiquement par le proxy Claude.ai — aucune configuration nécessaire.

---

## ✨ Fonctionnalités

- 📅 **Menu hebdomadaire** généré par IA selon votre objectif nutritionnel
- 📖 **Catalogue de recettes** avec recherche et filtres
- 📔 **Journal** — menus sauvegardés + suivi calorique quotidien
- 🛒 **Liste de courses** avec quantités précises
- 📄 **Export PDF** avec recettes complètes générées par IA
- 📱 **PWA** — installable sur iPhone, fonctionne hors-ligne (navigation)
