/* =========================================================
   ARMA — golpe com espada ou foice, mesma técnica de
   interpolação preparação -> impacto que atacar.js usa. Formas
   originais: um corte largo pra espada, um giro mais amplo pra
   foice (arma mais pesada, precisa de mais corpo no movimento).
   ========================================================= */

const P = {
  espada: {
    prep: { body: -14, head: -6, armFront: -70, armBack: 50, legFront: 16, legBack: -16, lean: 6 },
    hit: { body: 22, head: 10, armFront: 145, armBack: -60, legFront: -20, legBack: 26, lean: 28 },
  },
  foice: {
    prep: { body: -10, head: -8, armFront: -40, armBack: 112, legFront: 20, legBack: -14, lean: 10 },
    hit: { body: 20, head: 6, armFront: 132, armBack: -72, legFront: -24, legBack: 30, lean: 32 },
  },
};

const b = (a, c, t) => a + (c - a) * t;

export function arma(tempo = 0, fase = 0.5, estilo = "espada") {
  const x = P[estilo] || P.espada;
  const t = Math.max(0, Math.min(1, fase));
  const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  return {
    body: b(x.prep.body, x.hit.body, e),
    head: b(x.prep.head, x.hit.head, e),
    armFront: b(x.prep.armFront, x.hit.armFront, e),
    armBack: b(x.prep.armBack, x.hit.armBack, e),
    legFront: b(x.prep.legFront, x.hit.legFront, e),
    legBack: b(x.prep.legBack, x.hit.legBack, e),
    y: Math.sin(t * Math.PI) * -3,
    x: e * 2,
    lean: b(x.prep.lean, x.hit.lean, e),
  };
}
