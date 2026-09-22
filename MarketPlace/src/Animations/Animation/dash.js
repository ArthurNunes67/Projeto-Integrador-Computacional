/* =========================================================
   AVANÇO — pose do golpe logo após o teleporte curto do "Passo
   Relâmpago": chega esticado, com o impulso do deslocamento
   ainda visível no corpo, e mantém a extensão em vez de recuar
   (o teleporte já fez a parte de "ir", isso aqui é só o golpe
   na chegada).
   ========================================================= */

export function dash(tempo = 0, fase = 0.5) {
  const t = Math.max(0, Math.min(1, fase));
  const e = t < 0.4 ? t / 0.4 : 1;

  return {
    body: 26 * e,
    head: -10 * e,
    armFront: -120 * e,
    armBack: 40 * e,
    legFront: -30 * e,
    legBack: 34 * e,
    y: 0,
    x: e * 4,
    lean: 30 * e,
  };
}
