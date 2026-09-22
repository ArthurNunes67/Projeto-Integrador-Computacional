import { special as especial } from "../Animation/special";
import { arma } from "../Pets/Battle/weapon";
import { dash as avanco } from "../Animation/dash";
import { voar } from "./voar";
import { combateVoando } from "./combate-voando";

/* =========================================================
   ANIMAÇÃO-VOANDO — tudo relacionado à fase de combate aéreo
   vive aqui, separado do animacao.js do chão. Quando os
   lutadores decolam (ver world.flying em Stikers.jsx), o
   animacao.js principal chama só a função daqui, obterPoseVoando,
   em vez de decidir ele mesmo entre andar/correr/atacar no chão.

   golpes de conjuração (beam/charge/summon) reaproveitam
   especial.js — mirar um feixe ou erguer os braços pra conjurar
   fica parecido no ar e no chão, não precisava duplicar. Só os
   golpes corpo-a-corpo (punch/heavyPunch/slash/rush/kick) trocam
   para combate-voando.js, porque sem perna de apoio no chão o
   golpe aéreo precisa jogar o corpo inteiro de um jeito diferente.
   ========================================================= */

const ATTACK_DURATION = 28;
const CAST_STYLES = new Set(["beam", "charge", "summon", "spin"]);

/* Mesmo truque do animacao.js: guarda desde quando cada lutador
   está no estado atual, pra golpe aéreo animar a partir do zero
   em vez de nascer no meio de uma fase aleatória do relógio. */
const tracked = {};

function faseLocal(variante, state, tempo) {
  const t =
    tracked[variante] || (tracked[variante] = { state: null, since: 0 });
  if (t.state !== state) {
    t.state = state;
    t.since = tempo;
  }
  return Math.max(0, tempo - t.since);
}

function clamp01(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

export function obterPoseVoando({
  state,
  tempo = 0,
  velocidade = 0,
  vy = 0,
  power = null,
  variante = "blue",
}) {
  if (state === "SPECIAL" || state === "ATTACK") {
    const local = faseLocal(variante, state, tempo);
    const anim = power?.animation;
    const fase = clamp01(local / ATTACK_DURATION, 0, 1);

    if (anim === "invocar") return especial(local, "summon");
    if (anim === "espada" || anim === "foice") return arma(local, fase, anim);
    if (anim === "avanco") return avanco(local, fase);
    if (CAST_STYLES.has(anim)) return especial(local, anim);

    const estilo =
      anim === "kick"
        ? "chute"
        : anim === "slash" || anim === "rush"
          ? "investida"
          : "soco";
    return combateVoando(local, fase, estilo);
  }

  return voar(
    tempo,
    clamp01(Math.hypot(velocidade, vy) / 3, 0.4, 1.6),
    variante,
  );
}
