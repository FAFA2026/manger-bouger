import { useState, useCallback } from "react";

// ─── COLOURS ──────────────────────────────────────────────────────────────────
const C = {
  green:"#2D6A4F", greenL:"#52B788", greenP:"#D8F3DC",
  orange:"#E76F51", cream:"#FEFAE0", creamD:"#F5EFD0",
  brown:"#6B4C2A", gray:"#6B7280", grayL:"#F3F4F6",
  white:"#FFFFFF", red:"#EF4444",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'DM Sans',sans-serif;background:${C.cream};color:${C.brown}}
  ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:${C.creamD}}::-webkit-scrollbar-thumb{background:${C.greenL};border-radius:3px}
  .app{max-width:430px;margin:0 auto;min-height:100vh;background:${C.cream}}
  .hdr{background:${C.green};padding:16px 18px 12px;padding-top:calc(16px + env(safe-area-inset-top));position:sticky;top:0;z-index:100}
  .hdr-t{font-family:'Playfair Display',serif;color:${C.cream};font-size:21px;font-weight:700}
  .hdr-s{color:${C.greenP};font-size:11px;opacity:.85}
  .nav{display:flex;background:${C.white};border-top:1px solid ${C.creamD};position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;z-index:100;box-shadow:0 -3px 14px rgba(0,0,0,.08);padding-bottom:env(safe-area-inset-bottom)}
  .nb{flex:1;padding:9px 4px 7px;border:none;background:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px;font-family:'DM Sans',sans-serif;font-size:10px;color:${C.gray};transition:color .2s}
  .nb.active{color:${C.green}}
  .ni{font-size:19px}
  .pg{padding:14px;padding-bottom:100px}
  .btn{border:none;border-radius:11px;cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:600;transition:all .2s}
  .bp{background:${C.green};color:white;padding:13px 20px;font-size:14px;width:100%}
  .bp:hover{background:#245a41}
  .bp:disabled{opacity:.5;cursor:not-allowed}
  .bsm{padding:7px 13px;font-size:12px}
  .bo{background:transparent;border:1.5px solid ${C.green};color:${C.green}}
  .bo:hover{background:${C.greenP}}
  .borg{background:${C.orange};color:white}
  .bgr{background:${C.grayL};color:${C.gray}}
  .card{background:${C.white};border-radius:15px;padding:15px;margin-bottom:11px;box-shadow:0 2px 8px rgba(0,0,0,.06)}
  .tag{display:inline-block;background:${C.greenP};color:${C.green};border-radius:20px;padding:2px 9px;font-size:11px;font-weight:600}
  .tago{background:#FFF0EB;color:${C.orange}}
  .tagg{background:${C.grayL};color:${C.gray}}
  .st{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:${C.brown};margin-bottom:11px}
  .dh{background:linear-gradient(135deg,${C.green},${C.greenL});color:white;border-radius:13px;padding:9px 15px;margin-bottom:7px;font-weight:700;font-size:14px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;user-select:none}
  .mr{background:${C.white};border-radius:11px;padding:11px 13px;margin-bottom:5px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:background .15s;border:1.5px solid transparent}
  .mr:hover{background:${C.greenP};border-color:${C.greenL}}
  .ml{font-size:10px;color:${C.gray};margin-bottom:1px}
  .mn{font-size:13px;font-weight:600;color:${C.brown}}
  .chip{display:inline-flex;align-items:center;padding:5px 13px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;border:1.5px solid;transition:all .2s;white-space:nowrap;user-select:none}
  .ca{background:${C.green};border-color:${C.green};color:white}
  .ci{background:white;border-color:#D1D5DB;color:${C.gray}}
  .cda{background:${C.orange};border-color:${C.orange};color:white}
  .cdi{background:white;border-color:#D1D5DB;color:${C.gray}}
  .fs{display:flex;gap:7px;overflow-x:auto;padding-bottom:7px;margin-bottom:10px}
  .fs::-webkit-scrollbar{height:0}
  .mo{position:fixed;inset:0;background:rgba(0,0,0,.52);z-index:200;display:flex;align-items:flex-end;justify-content:center}
  .md{background:${C.white};border-radius:22px 22px 0 0;width:100%;max-width:430px;max-height:90vh;overflow-y:auto;padding:22px 18px 38px}
  .mh{width:38px;height:4px;background:${C.creamD};border-radius:2px;margin:0 auto 18px}
  .ir{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid ${C.creamD};font-size:13px}
  .sr{display:flex;gap:11px;padding:9px 0;border-bottom:1px solid ${C.creamD}}
  .sn{background:${C.green};color:white;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0}
  .rc{background:${C.grayL};border-radius:13px;padding:13px;margin-bottom:9px;cursor:pointer;transition:all .2s;border:2px solid transparent}
  .rc:hover{border-color:${C.greenL};background:${C.greenP}}
  .rc.sel{border-color:${C.green};background:${C.greenP}}
  .si{display:flex;align-items:center;gap:9px;padding:9px 0;border-bottom:1px solid ${C.creamD};font-size:13px}
  .cb{width:20px;height:20px;border-radius:5px;border:2px solid ${C.greenL};cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:white}
  .cb.ck{background:${C.green};border-color:${C.green}}
  .ji{background:${C.grayL};border-radius:11px;padding:11px;margin-bottom:7px}
  .pb{height:7px;background:${C.creamD};border-radius:4px;overflow:hidden;margin:7px 0}
  .pf{height:100%;background:linear-gradient(90deg,${C.greenL},${C.green});border-radius:4px;transition:width .5s}
  .inp{width:100%;padding:11px 13px;border:1.5px solid ${C.creamD};border-radius:11px;font-family:'DM Sans',sans-serif;font-size:14px;color:${C.brown};background:white;outline:none;transition:border-color .2s}
  .inp:focus{border-color:${C.greenL}}
  .ta{min-height:85px;resize:vertical}
  select.inp{appearance:none;cursor:pointer}
  .err{background:#FEF2F2;border:1px solid #FECACA;color:${C.red};border-radius:11px;padding:11px 14px;font-size:13px;margin-bottom:11px}
  .ld{text-align:center;padding:38px 18px;color:${C.gray}}
  .sp{width:34px;height:34px;border:3px solid ${C.greenP};border-top-color:${C.green};border-radius:50%;animation:spin .8s linear infinite;margin:0 auto 11px}
  @keyframes spin{to{transform:rotate(360deg)}}
  .sf{display:flex;gap:6px;padding:5px 0 9px 14px;flex-wrap:wrap}
  .sc{padding:4px 10px;border-radius:13px;font-size:11px;font-weight:600;cursor:pointer;border:1.5px solid;transition:all .15s}
  .smc{background:${C.white};border-radius:13px;padding:13px;margin-bottom:9px;border-left:4px solid ${C.green};box-shadow:0 2px 7px rgba(0,0,0,.06)}
  .qty{font-size:11px;color:${C.gray};margin-left:5px;font-style:italic}
  .pdf-progress{background:${C.greenP};border:1.5px solid ${C.greenL};border-radius:11px;padding:13px 15px;margin-bottom:11px;font-size:13px;color:${C.green};font-weight:600}
  .pdf-progress .pb{margin:8px 0 4px}
  .pdf-progress .detail{font-size:11px;color:${C.gray};font-weight:400;margin-top:4px}
`;

// ─── API ──────────────────────────────────────────────────────────────────────
async function callClaude(prompt, maxTokens = 4000) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:maxTokens, messages:[{role:"user",content:prompt}] }),
  });
  const d = await r.json();
  return d.content[0].text;
}
function parseJSON(text) {
  const clean = text.replace(/```json|```/g,"").trim();
  const s = clean.indexOf("{"), e = clean.lastIndexOf("}");
  return JSON.parse(clean.slice(s, e+1));
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const DAYS      = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];
const DAYS_FULL = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
const MT  = ["petit_dejeuner","dejeuner","diner"];
const ML  = { petit_dejeuner:"🌅 Petit-déj.", dejeuner:"☀️ Déjeuner", diner:"🌙 Dîner" };
const MLP = { petit_dejeuner:"Petit-déjeuner", dejeuner:"Déjeuner", diner:"Dîner" };

// ─── PDF avec recettes IA générées ────────────────────────────────────────────
async function generateAndDownloadPDF(menu, customMeals, activeDays, activeMeals, persons, goal, onProgress) {
  // Collect all meals that need AI recipes
  const aiMeals = [];
  DAYS_FULL.forEach((day, di) => {
    if (!menu[day] || !activeDays[di]) return;
    MT.forEach(mt => {
      if (!activeMeals[di][mt]) return;
      const name = menu[day][mt];
      if (!name) return;
      const isCustom = !!customMeals[`${day}_${mt}`];
      if (!isCustom) aiMeals.push({ day, mt, name, key: `${day}_${mt}` });
    });
  });

  // Generate AI recipes in batches of 3
  const recipeCache = {};
  const total = aiMeals.length;
  let done = 0;

  onProgress({ step: "Génération des recettes…", done: 0, total });

  // Batch calls: 3 at a time
  for (let i = 0; i < aiMeals.length; i += 3) {
    const batch = aiMeals.slice(i, i + 3);
    await Promise.all(batch.map(async ({ key, name, mt }) => {
      try {
        const t = await callClaude(
          `Recette détaillée "${name}" (${MLP[mt]}, ${persons} personnes). JSON uniquement sans texte avant ou après:
{"name":"...","prepTime":"...","cookTime":"...","difficulty":"Facile|Moyen|Difficile","calories":"...","ingredients":[{"name":"...","quantity":"..."}],"steps":["..."],"tip":"..."}`, 1500
        );
        recipeCache[key] = parseJSON(t);
      } catch(e) {
        recipeCache[key] = null;
      }
      done++;
      onProgress({ step: `Recettes générées : ${done}/${total}`, done, total });
    }));
  }

  onProgress({ step: "Création du PDF…", done: total, total });

  // ── Build menu rows ────────────────────────────────────────────────────────
  let menuSection = "";
  DAYS_FULL.forEach((day, di) => {
    if (!menu[day] || !activeDays[di]) return;
    let rows = "";
    MT.forEach(mt => {
      if (!activeMeals[di][mt]) return;
      const name = menu[day][mt];
      if (!name) return;
      const isC = !!customMeals[`${day}_${mt}`];
      rows += `<tr>
        <td class="td-type">${MLP[mt]}</td>
        <td class="td-name">${name}${isC ? ' <span class="badge">✏️ perso</span>' : ""}</td>
      </tr>`;
    });
    if (!rows) return;
    menuSection += `
      <div class="day-block">
        <div class="day-hdr">${day}</div>
        <table><tbody>${rows}</tbody></table>
      </div>`;
  });

  // ── Build recipe section (AI + custom) ────────────────────────────────────
  let recipeSection = "";

  DAYS_FULL.forEach((day, di) => {
    if (!menu[day] || !activeDays[di]) return;
    MT.forEach(mt => {
      if (!activeMeals[di][mt]) return;
      const name = menu[day][mt];
      if (!name) return;
      const key = `${day}_${mt}`;
      const cust = customMeals[key];
      const aiRec = recipeCache[key];

      recipeSection += `<div class="recipe-entry">`;
      recipeSection += `<div class="recipe-title">${day} — ${MLP[mt]} : ${name}</div>`;

      if (cust) {
        // Custom recipe
        if (cust.ingredients) recipeSection += `<div class="recipe-meta">📝 Recette personnelle</div>`;
        if (cust.ingredients) {
          recipeSection += `<div class="recipe-section-title">Ingrédients</div>`;
          recipeSection += `<div class="recipe-body">${cust.ingredients.replace(/\n/g,"<br>")}</div>`;
        }
        if (cust.steps) {
          recipeSection += `<div class="recipe-section-title">Préparation</div>`;
          recipeSection += `<div class="recipe-body">${cust.steps.replace(/\n/g,"<br>")}</div>`;
        }
      } else if (aiRec) {
        // AI recipe
        recipeSection += `<div class="recipe-meta-row">`;
        recipeSection += `<span class="badge-info">⏱ Prép: ${aiRec.prepTime}</span>`;
        recipeSection += `<span class="badge-info">🔥 Cuisson: ${aiRec.cookTime}</span>`;
        recipeSection += `<span class="badge-info">📊 ${aiRec.difficulty}</span>`;
        recipeSection += `<span class="badge-info">🔥 ${aiRec.calories} kcal</span>`;
        recipeSection += `</div>`;

        if (aiRec.ingredients?.length) {
          recipeSection += `<div class="recipe-section-title">🛒 Ingrédients</div>`;
          recipeSection += `<table class="ing-table"><tbody>`;
          aiRec.ingredients.forEach(ing => {
            recipeSection += `<tr><td class="ing-name">${ing.name}</td><td class="ing-qty">${ing.quantity}</td></tr>`;
          });
          recipeSection += `</tbody></table>`;
        }

        if (aiRec.steps?.length) {
          recipeSection += `<div class="recipe-section-title">👨‍🍳 Préparation</div>`;
          aiRec.steps.forEach((step, i) => {
            recipeSection += `<div class="step-row"><div class="step-num">${i+1}</div><div class="step-text">${step}</div></div>`;
          });
        }

        if (aiRec.tip) {
          recipeSection += `<div class="tip-box">💡 <strong>Conseil :</strong> ${aiRec.tip}</div>`;
        }
      } else {
        recipeSection += `<div class="recipe-note">Recette non disponible.</div>`;
      }

      recipeSection += `</div>`;
    });
  });

  const date = new Date().toLocaleDateString("fr-FR");

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"/>
<title>Menu Manger·Bouger – ${date}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:Georgia,'Times New Roman',serif;color:#3a2a14;background:#fff;font-size:11pt;padding:18mm 16mm}
  h1{font-size:24pt;margin-bottom:4px;color:#fff;font-family:Georgia,serif}
  .cover{background:#2D6A4F;color:#fff;padding:16px 20px;border-radius:10px;margin-bottom:26px}
  .cover p{font-size:10pt;opacity:.9;margin-top:5px;font-family:Arial,sans-serif}
  .toc{background:#f9fbf9;border:1px solid #D8F3DC;border-radius:8px;padding:13px 16px;margin-bottom:22px}
  .toc-title{font-size:12pt;font-weight:bold;color:#2D6A4F;margin-bottom:8px}
  .toc-item{font-size:10pt;color:#555;padding:2px 0;font-family:Arial,sans-serif}
  .section-title{font-size:15pt;font-weight:bold;color:#2D6A4F;margin:28px 0 14px;border-bottom:2.5px solid #D8F3DC;padding-bottom:6px;font-family:Georgia,serif}
  .day-block{margin-bottom:18px;page-break-inside:avoid}
  .day-hdr{background:#52B788;color:#fff;padding:6px 13px;border-radius:6px;font-weight:bold;font-size:12pt;margin-bottom:6px;font-family:Georgia,serif}
  table{width:100%;border-collapse:collapse}
  .td-type{width:115px;font-size:9pt;color:#6B7280;font-weight:bold;padding:6px 7px;border-bottom:1px solid #F5EFD0;vertical-align:top;font-family:Arial,sans-serif}
  .td-name{font-size:11pt;font-weight:600;color:#3a2a14;padding:6px 7px;border-bottom:1px solid #F5EFD0}
  .badge{font-size:9pt;color:#E76F51;margin-left:6px}
  .recipe-entry{margin-bottom:22px;page-break-inside:avoid;padding:14px 16px;background:#FAFDF9;border:1px solid #e8f5e9;border-left:5px solid #52B788;border-radius:6px}
  .recipe-title{font-weight:bold;font-size:13pt;color:#2D6A4F;margin-bottom:8px;font-family:Georgia,serif}
  .recipe-meta{font-size:9pt;color:#888;font-style:italic;margin-bottom:8px;font-family:Arial,sans-serif}
  .recipe-meta-row{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}
  .badge-info{font-size:9pt;background:#D8F3DC;color:#2D6A4F;padding:2px 8px;border-radius:12px;font-family:Arial,sans-serif;font-weight:600}
  .recipe-section-title{font-size:10pt;font-weight:bold;color:#555;margin:10px 0 5px;text-transform:uppercase;letter-spacing:.5px;font-family:Arial,sans-serif}
  .recipe-body{font-size:10pt;color:#444;line-height:1.7;font-family:Arial,sans-serif}
  .ing-table{width:100%;border-collapse:collapse;margin-bottom:5px}
  .ing-name{font-size:10pt;padding:4px 6px;border-bottom:1px solid #f0f7f0;color:#333;font-family:Arial,sans-serif}
  .ing-qty{font-size:10pt;padding:4px 6px;border-bottom:1px solid #f0f7f0;color:#666;text-align:right;font-style:italic;font-family:Arial,sans-serif;width:120px}
  .step-row{display:flex;gap:10px;margin-bottom:7px;align-items:flex-start}
  .step-num{background:#2D6A4F;color:white;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9pt;font-weight:bold;flex-shrink:0;font-family:Arial,sans-serif}
  .step-text{font-size:10pt;color:#444;line-height:1.65;padding-top:2px;font-family:Arial,sans-serif}
  .tip-box{background:#D8F3DC;border-radius:6px;padding:9px 12px;margin-top:10px;font-size:10pt;color:#2D6A4F;font-family:Arial,sans-serif;line-height:1.6}
  .recipe-note{font-size:9pt;color:#999;font-style:italic;font-family:Arial,sans-serif}
  .footer{margin-top:30px;padding-top:9px;border-top:1px solid #ddd;font-size:9pt;color:#aaa;text-align:center;font-family:Arial,sans-serif}
  @media print{
    body{padding:10mm 12mm}
    .day-block,.recipe-entry{page-break-inside:avoid}
    .section-title{page-break-after:avoid}
  }
</style>
</head>
<body>
  <div class="cover">
    <h1>🌿 Manger · Bouger</h1>
    <p>Menu de la semaine &nbsp;·&nbsp; ${persons} personne(s) &nbsp;·&nbsp; Objectif : ${goal} &nbsp;·&nbsp; ${date}</p>
  </div>

  <div class="toc">
    <div class="toc-title">📋 Contenu</div>
    <div class="toc-item">1. Menu de la semaine</div>
    <div class="toc-item">2. Recettes détaillées avec ingrédients et préparation</div>
  </div>

  <div class="section-title">📅 Menu de la semaine</div>
  ${menuSection}

  <div class="section-title" style="page-break-before:always">📖 Recettes détaillées</div>
  ${recipeSection}

  <div class="footer">Généré par l'application Manger·Bouger &nbsp;·&nbsp; ${date}</div>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `menu-mangerbouger-${date.replace(/\//g,"-")}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);

  onProgress(null); // done
}

// ─── RECIPE MODAL ─────────────────────────────────────────────────────────────
function RecipeModal({ meal, mealType, persons, onClose, onSwap, isCustom, customData }) {
  const [view, setView] = useState(isCustom ? "custom" : "recipe");
  const [recipe, setRecipe] = useState(null);
  const [catalogue, setCatalogue] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selFull, setSelFull] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cName, setCName] = useState(isCustom ? meal : "");
  const [cIng,  setCIng]  = useState(customData?.ingredients || "");
  const [cSteps,setCSteps]= useState(customData?.steps || "");

  useState(() => { if (!isCustom) doLoadRecipe(); }, []);

  async function doLoadRecipe() {
    setLoading(true);
    try {
      const t = await callClaude(`Recette détaillée "${meal}" (${ML[mealType]}, ${persons} personnes). JSON uniquement sans texte avant ou après:
{"name":"...","prepTime":"...","cookTime":"...","difficulty":"Facile|Moyen|Difficile","calories":"...","ingredients":[{"name":"...","quantity":"..."}],"steps":["..."],"tip":"..."}`);
      setRecipe(parseJSON(t));
    } catch(e) { console.error(e); }
    setLoading(false);
  }

  async function doLoadCatalogue() {
    setLoading(true); setCatalogue([]); setSelected(null); setSelFull(null);
    try {
      const t = await callClaude(`6 recettes alternatives pour "${ML[mealType]}" inspirées manger-bouger.fr, différentes de "${meal}". JSON uniquement:
{"recipes":[{"name":"...","time":"...","difficulty":"...","calories":"...","tags":["..."]}]}`);
      setCatalogue(parseJSON(t).recipes || []);
    } catch(e) {}
    setLoading(false);
  }

  async function doLoadSel(name) {
    setLoading(true);
    try {
      const t = await callClaude(`Recette détaillée "${name}" (${ML[mealType]}, ${persons} pers). JSON uniquement:
{"name":"...","prepTime":"...","cookTime":"...","difficulty":"...","calories":"...","ingredients":[{"name":"...","quantity":"..."}],"steps":["..."],"tip":"..."}`);
      setSelFull(parseJSON(t));
    } catch(e) {}
    setLoading(false);
  }

  return (
    <div className="mo" onClick={onClose}>
      <div className="md" onClick={e=>e.stopPropagation()}>
        <div className="mh"/>
        <div style={{display:"flex",gap:7,marginBottom:14,flexWrap:"wrap"}}>
          {view==="recipe" && <>
            <button className="btn bsm bo" style={{flex:1}} onClick={()=>{setView("catalogue");doLoadCatalogue();}}>🔄 Changer</button>
            <button className="btn bsm bgr" style={{flex:1}} onClick={()=>setView("custom")}>✏️ Ma recette</button>
          </>}
          {view==="catalogue" && <button className="btn bsm bgr" onClick={()=>setView("recipe")}>← Retour</button>}
          {view==="custom" && !isCustom && <button className="btn bsm bgr" onClick={()=>setView("recipe")}>← Retour</button>}
        </div>

        {view==="recipe" && (
          loading
            ? <div className="ld"><div className="sp"/><p>Génération…</p></div>
            : recipe
              ? <>
                  <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:21,marginBottom:8}}>{recipe.name}</h2>
                  <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:14}}>
                    <span className="tag">⏱ {recipe.prepTime}</span>
                    <span className="tag">🔥 {recipe.cookTime}</span>
                    <span className="tag tago">{recipe.difficulty}</span>
                    <span className="tag tagg">{recipe.calories} kcal</span>
                  </div>
                  <h3 style={{fontWeight:700,marginBottom:7}}>🛒 Ingrédients</h3>
                  {recipe.ingredients?.map((ing,i)=>(
                    <div className="ir" key={i}><span>{ing.name}</span><span style={{color:C.gray}}>{ing.quantity}</span></div>
                  ))}
                  <h3 style={{fontWeight:700,margin:"14px 0 7px"}}>👨‍🍳 Préparation</h3>
                  {recipe.steps?.map((step,i)=>(
                    <div className="sr" key={i}><div className="sn">{i+1}</div><p style={{fontSize:13,lineHeight:1.6}}>{step}</p></div>
                  ))}
                  {recipe.tip && <div style={{background:C.greenP,borderRadius:11,padding:11,marginTop:14}}><strong>💡 Conseil :</strong> <span style={{fontSize:13}}>{recipe.tip}</span></div>}
                </>
              : <button className="btn bp" onClick={doLoadRecipe}>Charger la recette</button>
        )}

        {view==="catalogue" && (
          loading
            ? <div className="ld"><div className="sp"/><p>Recherche d'alternatives…</p></div>
            : <>
                <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:19,marginBottom:11}}>Choisir une recette</h2>
                {catalogue.map((r,i)=>(
                  <div key={i} className={`rc ${selected===i?"sel":""}`} onClick={()=>{setSelected(i);doLoadSel(r.name);}}>
                    <div style={{fontWeight:700,fontSize:13,marginBottom:5}}>{r.name}</div>
                    <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                      <span className="tag">⏱ {r.time}</span>
                      <span className="tag tago">{r.difficulty}</span>
                      <span className="tag tagg">{r.calories} kcal</span>
                      {r.tags?.map((t,j)=><span className="tag" key={j}>{t}</span>)}
                    </div>
                    {selected===i && selFull && (
                      <div style={{marginTop:10}}>
                        {selFull.ingredients?.slice(0,5).map((ing,j)=>(
                          <div style={{fontSize:12,color:C.gray,padding:"2px 0"}} key={j}>• {ing.name} — {ing.quantity}</div>
                        ))}
                        <button className="btn bp" style={{marginTop:10,padding:"9px 18px",fontSize:13}} onClick={()=>{onSwap({name:r.name});onClose();}}>✅ Choisir</button>
                      </div>
                    )}
                  </div>
                ))}
                <button className="btn bo" style={{width:"100%",padding:11,marginTop:7}} onClick={doLoadCatalogue}>🔄 Autres suggestions</button>
              </>
        )}

        {view==="custom" && <>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:19,marginBottom:14}}>✏️ Ma propre recette</h2>
          <div style={{marginBottom:11}}>
            <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Nom du plat *</label>
            <input className="inp" placeholder="Ex: Gratin maison" value={cName} onChange={e=>setCName(e.target.value)}/>
          </div>
          <div style={{marginBottom:11}}>
            <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Ingrédients avec quantités</label>
            <textarea className="inp ta" placeholder="Ex: 2 oeufs, 100g feta, 3 tomates, 200ml crème..." value={cIng} onChange={e=>setCIng(e.target.value)}/>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:5}}>Étapes de préparation</label>
            <textarea className="inp ta" placeholder="Décrivez les étapes..." value={cSteps} onChange={e=>setCSteps(e.target.value)}/>
          </div>
          <button className="btn bp" disabled={!cName.trim()}
            onClick={()=>{onSwap({name:cName,isCustom:true,ingredients:cIng,steps:cSteps});onClose();}}>
            ✅ Enregistrer
          </button>
        </>}
      </div>
    </div>
  );
}

// ─── MENU PAGE ────────────────────────────────────────────────────────────────
function MenuPage({
  menu, setMenu, customMeals, setCustomMeals,
  aDays, setADays, aMeals, setAMeals,
  setShoppingList, onSaveJournal,
  persons, setPersons, goal, setGoal,
}) {
  const [restrictions, setRestrictions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [listLoading, setListLoading] = useState(false);
  const [expandedDay, setExpandedDay] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const [saved, setSaved] = useState(false);
  const [pdfProgress, setPdfProgress] = useState(null); // null | {step, done, total}

  const hasMenu = menu && Object.keys(menu).length > 0;

  const buildShoppingList = useCallback(async (menuSnap, customsSnap, aDSnap, aMSnap, pers) => {
    setListLoading(true);
    try {
      const aiItems = [];
      const customIngs = [];
      DAYS_FULL.forEach((day, di) => {
        if (!aDSnap[di]) return;
        MT.forEach(mt => {
          if (!aMSnap[di][mt]) return;
          const key = `${day}_${mt}`;
          const cust = customsSnap[key];
          if (cust) {
            if (cust.ingredients?.trim()) {
              cust.ingredients.split(/[,;\n]+/).forEach(raw => {
                const item = raw.trim();
                if (item) customIngs.push(item);
              });
            }
          } else if (menuSnap[day]?.[mt]) {
            aiItems.push(menuSnap[day][mt]);
          }
        });
      });

      let result = { "Fruits & Légumes":[], "Viandes & Poissons":[], "Produits Laitiers":[], "Épicerie":[], "Boulangerie":[] };

      if (aiItems.length > 0) {
        const t = await callClaude(
          `Liste de courses AVEC QUANTITÉS PRÉCISES pour ${pers} personne(s) pour ces recettes: ${aiItems.join(", ")}.
Chaque item DOIT avoir la quantité après " — " : "Tomates — 500g", "Œufs — 6 pièces".
Réponds UNIQUEMENT en JSON:
{"Fruits & Légumes":["Tomates — 500g"],"Viandes & Poissons":["Poulet — 600g"],"Produits Laitiers":["Yaourt — 4 pots"],"Épicerie":["Riz — 400g"],"Boulangerie":["Pain complet — 1 baguette"]}`, 1800
        );
        const parsed = parseJSON(t);
        Object.keys(result).forEach(k => { if (!parsed[k]) parsed[k] = []; });
        Object.assign(result, parsed);
      }
      if (customIngs.length > 0) result["🏠 Mes recettes personnelles"] = customIngs;
      setShoppingList(result);
    } catch(e) { setShoppingList({}); }
    setListLoading(false);
  }, [setShoppingList]);

  async function genMenu() {
    setLoading(true); setError(""); setSaved(false);
    try {
      const t = await callClaude(
        `Tu es un nutritionniste inspiré de manger-bouger.fr. Menu hebdomadaire 7 jours pour ${persons} personne(s), objectif: ${goal}${restrictions?", restrictions: "+restrictions:""}.
Réponds UNIQUEMENT en JSON valide:
{"Lundi":{"petit_dejeuner":"...","dejeuner":"...","diner":"..."},"Mardi":{"petit_dejeuner":"...","dejeuner":"...","diner":"..."},"Mercredi":{"petit_dejeuner":"...","dejeuner":"...","diner":"..."},"Jeudi":{"petit_dejeuner":"...","dejeuner":"...","diner":"..."},"Vendredi":{"petit_dejeuner":"...","dejeuner":"...","diner":"..."},"Samedi":{"petit_dejeuner":"...","dejeuner":"...","diner":"..."},"Dimanche":{"petit_dejeuner":"...","dejeuner":"...","diner":"..."}}`, 2200
      );
      const m = parseJSON(t);
      const initD = DAYS.map(() => true);
      const initM = DAYS.map(() => ({ petit_dejeuner:true, dejeuner:true, diner:true }));
      setMenu(m); setCustomMeals({}); setADays(initD); setAMeals(initM);
      await buildShoppingList(m, {}, initD, initM, persons);
    } catch(e) { setError("Erreur lors de la génération. Réessayez."); }
    setLoading(false);
  }

  function toggleDay(i) {
    const nd = [...aDays]; nd[i] = !nd[i];
    if (!nd.some(Boolean)) return;
    setADays(nd);
    buildShoppingList(menu, customMeals, nd, aMeals, persons);
  }

  function toggleMeal(di, mt) {
    const nm = aMeals.map((d, i) => i===di ? {...d, [mt]:!d[mt]} : d);
    if (!Object.values(nm[di]).some(Boolean)) return;
    setAMeals(nm);
    buildShoppingList(menu, customMeals, aDays, nm, persons);
  }

  function handleSwap(di, mt, rec) {
    const day = DAYS_FULL[di];
    const key = `${day}_${mt}`;
    const newMenu = { ...menu, [day]: { ...menu[day], [mt]: rec.name } };
    const newCustoms = { ...customMeals };
    if (rec.isCustom) newCustoms[key] = { ingredients: rec.ingredients, steps: rec.steps };
    else delete newCustoms[key];
    setMenu(newMenu); setCustomMeals(newCustoms);
    buildShoppingList(newMenu, newCustoms, aDays, aMeals, persons);
  }

  async function handlePDF() {
    if (!hasMenu) return;
    setPdfProgress({ step: "Démarrage…", done: 0, total: 1 });
    try {
      await generateAndDownloadPDF(menu, customMeals, aDays, aMeals, persons, goal, (p) => {
        setPdfProgress(p);
      });
    } catch(e) {
      setPdfProgress(null);
      alert("Erreur lors de la génération du PDF.");
    }
  }

  function handleSave() {
    if (!hasMenu) return;
    onSaveJournal({ menu, customMeals, aDays:[...aDays], aMeals:aMeals.map(d=>({...d})), persons, goal, date: new Date().toLocaleDateString("fr-FR") });
    setSaved(true);
  }

  const visibleCount = DAYS_FULL.reduce((acc,_,i) =>
    acc + (aDays[i] ? MT.filter(mt => aMeals[i][mt]).length : 0), 0);

  return (
    <div className="pg">
      <div className="card">
        <p className="st">🌿 Menu de la semaine</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:9}}>
          <div>
            <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:4}}>Personnes</label>
            <select className="inp" value={persons} onChange={e=>setPersons(e.target.value)}>
              {[1,2,3,4,5,6].map(n=><option key={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:4}}>Objectif</label>
            <select className="inp" value={goal} onChange={e=>setGoal(e.target.value)}>
              {["équilibré","perte de poids","prise de masse","énergie","végétarien"].map(g=><option key={g}>{g}</option>)}
            </select>
          </div>
        </div>
        <input className="inp" placeholder="Restrictions (gluten, lactose…)" value={restrictions} onChange={e=>setRestrictions(e.target.value)} style={{marginBottom:11}}/>
        {error && <p className="err">{error}</p>}
        <button className="btn bp" onClick={genMenu} disabled={loading}>
          {loading ? "⏳ Génération en cours…" : "✨ Générer mon menu"}
        </button>
        {hasMenu && (
          <div style={{display:"flex",gap:7,marginTop:9}}>
            <button className="btn bsm bo" style={{flex:1}} onClick={handlePDF} disabled={!!pdfProgress}>
              {pdfProgress ? "⏳ PDF…" : "📄 Télécharger PDF"}
            </button>
            <button className={`btn bsm ${saved?"bgr":"borg"}`} style={{flex:1}} onClick={handleSave} disabled={saved}>
              {saved ? "✅ Sauvegardé" : "💾 Sauver au journal"}
            </button>
          </div>
        )}
      </div>

      {/* PDF progress */}
      {pdfProgress && (
        <div className="pdf-progress">
          <div>{pdfProgress.step}</div>
          <div className="pb"><div className="pf" style={{width:`${pdfProgress.total>0?(pdfProgress.done/pdfProgress.total*100):0}%`}}/></div>
          <div className="detail">Génération des recettes pour le PDF — cette opération peut prendre 30–60 secondes selon le nombre de repas.</div>
        </div>
      )}

      {hasMenu && <>
        <p style={{fontSize:11,fontWeight:700,color:C.gray,marginBottom:5}}>FILTRER LES JOURS</p>
        <div className="fs">
          {DAYS.map((d,i) => (
            <button key={d} className={`chip ${aDays[i]?"cda":"cdi"}`} onClick={()=>toggleDay(i)}>{d}</button>
          ))}
        </div>
        <div style={{background:C.white,borderRadius:11,padding:"7px 12px",marginBottom:11}}>
          <p style={{fontSize:11,color:C.gray}}>
            📊 {visibleCount} repas · {persons} pers.
            {listLoading && <span style={{color:C.orange}}> · 🔄 Mise à jour courses…</span>}
          </p>
        </div>
      </>}

      {DAYS_FULL.map((day, di) => {
        if (!menu?.[day] || !aDays[di]) return null;
        const isExp = expandedDay === di;
        return (
          <div key={day} style={{marginBottom:11}}>
            <div className="dh" onClick={()=>setExpandedDay(isExp?null:di)}>
              <span>{day}</span>
              <span style={{fontSize:12}}>{isExp?"▲":"▼"} filtres</span>
            </div>
            {isExp && (
              <div className="sf">
                {MT.map(mt=>(
                  <button key={mt} className={`sc ${aMeals[di][mt]?"ca":"ci"}`} onClick={()=>toggleMeal(di,mt)}>
                    {ML[mt]}
                  </button>
                ))}
              </div>
            )}
            {MT.map(mt => {
              if (!aMeals[di][mt]) return null;
              const name = menu[day][mt];
              const isC = !!customMeals[`${day}_${mt}`];
              return (
                <div key={mt} className="mr" onClick={()=>setOpenModal({di,mt})}>
                  <div>
                    <div className="ml">{ML[mt]}</div>
                    <div className="mn">{name}{isC && <span style={{fontSize:10,color:C.orange,marginLeft:6}}>✏️ perso</span>}</div>
                  </div>
                  <span style={{color:C.gray,fontSize:17}}>›</span>
                </div>
              );
            })}
          </div>
        );
      })}

      {openModal && menu && (
        <RecipeModal
          meal={menu[DAYS_FULL[openModal.di]][openModal.mt]}
          mealType={openModal.mt}
          persons={parseInt(persons)}
          onClose={()=>setOpenModal(null)}
          onSwap={r=>handleSwap(openModal.di, openModal.mt, r)}
          isCustom={!!customMeals[`${DAYS_FULL[openModal.di]}_${openModal.mt}`]}
          customData={customMeals[`${DAYS_FULL[openModal.di]}_${openModal.mt}`]}
        />
      )}
    </div>
  );
}

// ─── RECIPES PAGE ─────────────────────────────────────────────────────────────
function RecipesPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Tous");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selRec, setSelRec] = useState(null);
  const [recLoading, setRecLoading] = useState(false);
  const cats = ["Tous","Petit-déj.","Déjeuner","Dîner","Végétarien","Rapide"];

  async function search() {
    setLoading(true); setSelected(null); setSelRec(null);
    try {
      const t = await callClaude(`6 recettes équilibrées inspirées manger-bouger.fr${query?` autour de "${query}"`:""}${filter!=="Tous"?`, catégorie: ${filter}`:""}.
JSON uniquement: {"recipes":[{"name":"...","time":"...","difficulty":"...","calories":"...","category":"...","tags":["..."]}]}`);
      setRecipes(parseJSON(t).recipes || []);
    } catch(e) { setRecipes([]); }
    setLoading(false);
  }

  async function loadMore() {
    setLoading(true);
    try {
      const names = recipes.map(r=>r.name).join(", ");
      const t = await callClaude(`6 nouvelles recettes manger-bouger.fr${query?` autour de "${query}"`:""}${filter!=="Tous"?`, catégorie: ${filter}`:""}, différentes de: ${names}.
JSON uniquement: {"recipes":[{"name":"...","time":"...","difficulty":"...","calories":"...","category":"...","tags":["..."]}]}`);
      setRecipes(prev=>[...prev,...(parseJSON(t).recipes||[])]);
    } catch(e){}
    setLoading(false);
  }

  async function openRec(name) {
    setSelected(name); setRecLoading(true); setSelRec(null);
    try {
      const t = await callClaude(`Recette détaillée "${name}" (2 personnes). JSON uniquement:
{"name":"...","prepTime":"...","cookTime":"...","difficulty":"...","calories":"...","ingredients":[{"name":"...","quantity":"..."}],"steps":["..."],"tip":"..."}`);
      setSelRec(parseJSON(t));
    } catch(e){}
    setRecLoading(false);
  }

  return (
    <div className="pg">
      <p className="st">📖 Catalogue de recettes</p>
      <div style={{display:"flex",gap:7,marginBottom:9}}>
        <input className="inp" style={{flex:1}} placeholder="Poulet, salade, soupe…" value={query}
          onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&search()}/>
        <button className="btn bp" style={{width:"auto",padding:"0 16px",fontSize:18}} onClick={search}>›</button>
      </div>
      <div className="fs" style={{marginBottom:14}}>
        {cats.map(c=><button key={c} className={`chip ${filter===c?"ca":"ci"}`} onClick={()=>setFilter(c)}>{c}</button>)}
      </div>
      {!recipes.length && !loading && (
        <div style={{textAlign:"center",color:C.gray,padding:"38px 18px"}}>
          <div style={{fontSize:38,marginBottom:11}}>🥗</div>
          <p>Lancez une recherche pour découvrir des recettes !</p>
          <button className="btn bp" style={{marginTop:14}} onClick={search}>Voir des recettes</button>
        </div>
      )}
      {loading && <div className="ld"><div className="sp"/><p>Recherche…</p></div>}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
        {recipes.map((r,i)=>(
          <div key={i} className="card" style={{cursor:"pointer",padding:11,margin:0,border:`2px solid ${selected===r.name?C.green:"transparent"}`}}
            onClick={()=>openRec(r.name)}>
            <div style={{fontWeight:700,fontSize:13,marginBottom:5,lineHeight:1.3}}>{r.name}</div>
            <div style={{fontSize:11,color:C.gray,marginBottom:5}}>{r.category}</div>
            <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
              <span className="tag" style={{fontSize:10}}>⏱ {r.time}</span>
              <span className="tag tago" style={{fontSize:10}}>{r.difficulty}</span>
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <div className="mo" onClick={()=>setSelected(null)}>
          <div className="md" onClick={e=>e.stopPropagation()}>
            <div className="mh"/>
            {recLoading
              ? <div className="ld"><div className="sp"/><p>Chargement…</p></div>
              : selRec
                ? <>
                    <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:21,marginBottom:7}}>{selRec.name}</h2>
                    <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:14}}>
                      <span className="tag">⏱ {selRec.prepTime}</span>
                      <span className="tag">🔥 {selRec.cookTime}</span>
                      <span className="tag tago">{selRec.difficulty}</span>
                      <span className="tag tagg">{selRec.calories} kcal</span>
                    </div>
                    <h3 style={{fontWeight:700,marginBottom:7}}>🛒 Ingrédients</h3>
                    {selRec.ingredients?.map((ing,i)=>(
                      <div className="ir" key={i}><span>{ing.name}</span><span style={{color:C.gray}}>{ing.quantity}</span></div>
                    ))}
                    <h3 style={{fontWeight:700,margin:"14px 0 7px"}}>👨‍🍳 Préparation</h3>
                    {selRec.steps?.map((step,i)=>(
                      <div className="sr" key={i}><div className="sn">{i+1}</div><p style={{fontSize:13,lineHeight:1.6}}>{step}</p></div>
                    ))}
                    {selRec.tip && <div style={{background:C.greenP,borderRadius:11,padding:11,marginTop:14}}><strong>💡 Conseil :</strong> <span style={{fontSize:13}}>{selRec.tip}</span></div>}
                  </>
                : null}
          </div>
        </div>
      )}
      {recipes.length>0 && !loading && (
        <button className="btn bo" style={{width:"100%",marginTop:14,padding:11}} onClick={loadMore}>➕ Charger plus</button>
      )}
    </div>
  );
}

// ─── JOURNAL PAGE ─────────────────────────────────────────────────────────────
function JournalPage({ savedMenus, onDeleteMenu }) {
  const [jTab, setJTab] = useState("menus");
  const [entries, setEntries] = useState([
    {meal:"Porridge aux fruits rouges",type:"Petit-déjeuner",cal:320,time:"08:00"},
    {meal:"Salade niçoise",type:"Déjeuner",cal:450,time:"12:30"},
  ]);
  const [form, setForm] = useState({meal:"",type:"Déjeuner",cal:"",time:""});
  const [expMenu, setExpMenu] = useState(null);
  const goal = 2000;
  const total = entries.reduce((s,e)=>s+(e.cal||0),0);

  return (
    <div className="pg">
      <p className="st">📔 Journal</p>
      <div style={{display:"flex",gap:7,marginBottom:14}}>
        <button className={`btn bsm ${jTab==="menus"?"bp":"bgr"}`} style={{flex:1}} onClick={()=>setJTab("menus")}>🗓 Menus sauvegardés</button>
        <button className={`btn bsm ${jTab==="daily"?"bp":"bgr"}`} style={{flex:1}} onClick={()=>setJTab("daily")}>📝 Journal quotidien</button>
      </div>
      {jTab==="menus" && (
        savedMenus.length===0
          ? <div style={{textAlign:"center",padding:"38px 18px",color:C.gray}}>
              <div style={{fontSize:38,marginBottom:11}}>🗓</div>
              <p>Aucun menu sauvegardé.<br/>Générez un menu et cliquez sur "💾 Sauver au journal".</p>
            </div>
          : savedMenus.map((sv,idx)=>(
              <div key={idx} className="smc">
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:14}}>Menu du {sv.date}</div>
                    <div style={{fontSize:11,color:C.gray}}>{sv.persons} pers. · {sv.goal}</div>
                    {sv.aDays && <div style={{fontSize:10,color:C.orange,marginTop:2}}>Filtres : {DAYS.filter((_,i)=>sv.aDays[i]).join(", ")}</div>}
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    <button className="btn bsm bo" onClick={()=>setExpMenu(expMenu===idx?null:idx)}>{expMenu===idx?"▲":"▼"}</button>
                    <button className="btn bsm bgr" style={{color:C.red}} onClick={()=>onDeleteMenu(idx)}>✕</button>
                  </div>
                </div>
                {expMenu===idx && (
                  <div style={{borderTop:`1px solid ${C.creamD}`,paddingTop:9}}>
                    {DAYS_FULL.map((day,di)=>{
                      if (!sv.menu[day]) return null;
                      if (sv.aDays && !sv.aDays[di]) return null;
                      return (
                        <div key={day} style={{marginBottom:7}}>
                          <div style={{fontWeight:700,fontSize:12,color:C.green,marginBottom:3}}>{day}</div>
                          {MT.map(mt=>{
                            if (sv.aMeals && !sv.aMeals[di][mt]) return null;
                            const name = sv.menu[day][mt]; if(!name) return null;
                            const isC = !!sv.customMeals?.[`${day}_${mt}`];
                            return (
                              <div key={mt} style={{fontSize:12,padding:"2px 0",display:"flex",gap:6}}>
                                <span style={{color:C.gray,minWidth:85}}>{MLP[mt]}</span>
                                <span>{name}{isC&&" ✏️"}</span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))
      )}
      {jTab==="daily" && <>
        <div className="card">
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
            <span style={{fontWeight:700}}>Calories du jour</span>
            <span style={{fontWeight:700,color:C.green}}>{total} / {goal} kcal</span>
          </div>
          <div className="pb"><div className="pf" style={{width:`${Math.min(100,total/goal*100)}%`}}/></div>
          <p style={{fontSize:11,color:C.gray}}>{Math.max(0,goal-total)} kcal restantes</p>
        </div>
        <div className="card">
          <p style={{fontWeight:700,marginBottom:9}}>➕ Ajouter un repas</p>
          <input className="inp" placeholder="Nom du repas" value={form.meal} onChange={e=>setForm(p=>({...p,meal:e.target.value}))} style={{marginBottom:7}}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7,marginBottom:11}}>
            <select className="inp" value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))}>
              {["Petit-déjeuner","Déjeuner","Dîner","Collation"].map(t=><option key={t}>{t}</option>)}
            </select>
            <input className="inp" placeholder="kcal" type="number" value={form.cal} onChange={e=>setForm(p=>({...p,cal:e.target.value}))}/>
            <input className="inp" type="time" value={form.time} onChange={e=>setForm(p=>({...p,time:e.target.value}))}/>
          </div>
          <button className="btn bp" onClick={()=>{
            if(!form.meal) return;
            setEntries(p=>[...p,{...form,cal:parseInt(form.cal)||0}]);
            setForm({meal:"",type:"Déjeuner",cal:"",time:""});
          }}>Ajouter</button>
        </div>
        {entries.map((e,i)=>(
          <div className="ji" key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontWeight:600,fontSize:13}}>{e.meal}</div>
              <div style={{fontSize:11,color:C.gray}}>{e.type} · {e.time}</div>
            </div>
            <div style={{display:"flex",gap:7,alignItems:"center"}}>
              <span className="tag tago">{e.cal} kcal</span>
              <button onClick={()=>setEntries(p=>p.filter((_,j)=>j!==i))} style={{background:"none",border:"none",cursor:"pointer",color:C.gray,fontSize:15}}>✕</button>
            </div>
          </div>
        ))}
      </>}
    </div>
  );
}

// ─── SHOPPING PAGE ────────────────────────────────────────────────────────────
function ShoppingPage({ shoppingList }) {
  const [checked, setChecked] = useState({});
  const toggle = (cat,item) => { const k=`${cat}:${item}`; setChecked(p=>({...p,[k]:!p[k]})); };
  const allItems = Object.values(shoppingList).flat().length;
  const doneCount = Object.values(checked).filter(Boolean).length;

  if (!allItems) return (
    <div className="pg" style={{textAlign:"center",paddingTop:55}}>
      <div style={{fontSize:44,marginBottom:14}}>🛒</div>
      <p className="st">Liste de courses</p>
      <p style={{color:C.gray}}>Générez d'abord votre menu pour obtenir la liste de courses avec quantités.</p>
    </div>
  );

  return (
    <div className="pg">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <p className="st" style={{margin:0}}>🛒 Liste de courses</p>
        <span className="tag">{doneCount}/{allItems}</span>
      </div>
      {Object.entries(shoppingList).map(([cat,items]) =>
        items.length > 0 && (
          <div className="card" key={cat}>
            <p style={{fontWeight:700,fontSize:13,marginBottom:7,color:cat.includes("perso")?C.orange:C.brown}}>{cat}</p>
            {items.map((item,i) => {
              const k = `${cat}:${item}`;
              const done = !!checked[k];
              const sep = item.indexOf(" — ");
              const name = sep > 0 ? item.slice(0, sep) : item;
              const qty  = sep > 0 ? item.slice(sep+3) : null;
              return (
                <div className="si" key={i} onClick={()=>toggle(cat,item)}>
                  <div className={`cb ${done?"ck":""}`}>{done && <span style={{color:"white",fontSize:11}}>✓</span>}</div>
                  <div style={{flex:1,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{textDecoration:done?"line-through":"none",color:done?C.gray:C.brown}}>{name}</span>
                    {qty && <span className="qty">{qty}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("menu");
  const [menu,        setMenu]        = useState({});
  const [customMeals, setCustomMeals] = useState({});
  const [shoppingList,setShoppingList]= useState({});
  const [savedMenus,  setSavedMenus]  = useState([]);
  const [aDays, setADays] = useState(DAYS.map(()=>true));
  const [aMeals,setAMeals]= useState(DAYS.map(()=>({petit_dejeuner:true,dejeuner:true,diner:true})));
  const [persons, setPersons] = useState("2");
  const [goal,    setGoal]    = useState("équilibré");

  const tabs = [
    {id:"menu",    icon:"📅", label:"Menu"},
    {id:"recipes", icon:"📖", label:"Recettes"},
    {id:"journal", icon:"📔", label:"Journal"},
    {id:"shopping",icon:"🛒", label:"Courses"},
  ];

  return (
    <div className="app">
      <style>{css}</style>
      <div className="hdr">
        <div className="hdr-t">🌿 Manger·Bouger</div>
        <div className="hdr-s">Votre compagnon nutrition & bien-être</div>
      </div>
      {tab==="menu" && <MenuPage menu={menu} setMenu={setMenu} customMeals={customMeals} setCustomMeals={setCustomMeals} aDays={aDays} setADays={setADays} aMeals={aMeals} setAMeals={setAMeals} setShoppingList={setShoppingList} persons={persons} setPersons={setPersons} goal={goal} setGoal={setGoal} onSaveJournal={sv=>setSavedMenus(p=>[sv,...p])}/>}
      {tab==="recipes"  && <RecipesPage/>}
      {tab==="journal"  && <JournalPage savedMenus={savedMenus} onDeleteMenu={i=>setSavedMenus(p=>p.filter((_,j)=>j!==i))}/>}
      {tab==="shopping" && <ShoppingPage shoppingList={shoppingList}/>}
      <nav className="nav">
        {tabs.map(t=>(
          <button key={t.id} className={`nb ${tab===t.id?"active":""}`} onClick={()=>setTab(t.id)}>
            <span className="ni">{t.icon}</span>{t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
