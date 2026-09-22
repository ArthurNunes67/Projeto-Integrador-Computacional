/* =========================================================
   REPERTÓRIO — monta a lista de golpes "especiais" disponíveis
   pra um lutador neste instante: as habilidades nomeadas de
   sempre, mais o passo relâmpago, mais (se já estiver com a arma
   empunhada) os golpes de arma — ou, se ainda não invocou, a
   própria invocação como opção.

   Fica num arquivo à parte pra Stikers.jsx não precisar conhecer
   os detalhes de armas.js/mobilidade.js — só chama
   montarRepertorio() e pronto.
   ========================================================= */

import { PASSO_RELAMPAGO } from "../../Animation/mobility";
import {
  INVOCAR_BLUE,
  INVOCAR_RED,
  GOLPES_ESPADA,
  GOLPES_FOICE,
} from "../../Animation/weapons";

export function montarRepertorio(fighter, especiais) {
  const isBlue = fighter.color === "blue";
  const golpesArma = isBlue ? GOLPES_ESPADA : GOLPES_FOICE;
  const invocar = isBlue ? INVOCAR_BLUE : INVOCAR_RED;

  return fighter.armado
    ? [...especiais, ...golpesArma, PASSO_RELAMPAGO]
    : [...especiais, invocar, PASSO_RELAMPAGO];
}
