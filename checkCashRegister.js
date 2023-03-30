const fortwo = (x) => Number.parseFloat(x).toFixed(2);
const tonumber = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    'ONE HUNDRED': 100,
  };
function checkCashRegister(price, cash, cid) {
  const state = {
    status: '',
    change: [],
  };
  let toback = cash - price;
  let cashbox = 0;
  cid.map(([, money]) => cashbox += money);
  if (cashbox > toback) state.status = 'OPEN';
  if (cashbox == toback) state.status = 'CLOSED';
  if (cashbox < toback) state.status = 'INSUFFICIENT_FUNDS';
  if (state.status == 'INSUFFICIENT_FUNDS') return state;
  cid.reverse().map(([key, value]) => {
    if (value != 0 && Math.floor(toback / tonumber[key]) >= 1) {
      const poskolo = Math.floor(toback / tonumber[key]); // 2
      let skokonado = tonumber[key] * poskolo; // 60
      if (value < skokonado) {
        while (value < skokonado) skokonado -= tonumber[key];
      }
      value -= skokonado;
      toback -= skokonado;
      toback = fortwo(toback);
      state.change.push([key, skokonado]);
    } else if (value === 0) state.change.push([key, 0]);
  });
  return state;
}