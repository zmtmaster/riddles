// import { createSelector } from 'reselect';

export const getSelectedCurrentLevelSelector = (stores) => stores.game.qIndex;
export const getSelectedCurrentCoinsAmountSelector = (stores) =>
  stores.game.coins;
export const getBestTimeSelector = (stores) => stores.game.best;
