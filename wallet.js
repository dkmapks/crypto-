// początkowe kursy:
let kurs = { dcoin: 1, branzo: 0.10, bbcoin: 0.01 };
let saldo = { pln: 0, dcoin: 0, branzo: 0, bbcoin: 0 };

// wczytaj (jeśli masz localStorage):
if (localStorage.kurs) kurs = JSON.parse(localStorage.kurs);
if (localStorage.saldo) saldo = JSON.parse(localStorage.saldo);

function updateWalletView() {
  document.getElementById('saldo-pln').textContent = saldo.pln.toFixed(2);
  document.getElementById('saldo-dcoin').textContent = saldo.dcoin;
  document.getElementById('val-dcoin').textContent = (saldo.dcoin * kurs.dcoin).toFixed(2);
  document.getElementById('saldo-branzo').textContent = saldo.branzo;
  document.getElementById('val-branzo').textContent = (saldo.branzo * kurs.branzo).toFixed(2);
  document.getElementById('saldo-bbcoin').textContent = saldo.bbcoin;
  document.getElementById('val-bbcoin').textContent = (saldo.bbcoin * kurs.bbcoin).toFixed(2);
  const total = saldo.pln +
    saldo.dcoin * kurs.dcoin +
    saldo.branzo * kurs.branzo +
    saldo.bbcoin * kurs.bbcoin;
  document.getElementById('total-value').textContent = total.toFixed(2);
}
updateWalletView();

// obsługa kodów promocyjnych:
const codes = {
  'Branzo': { coin: 'dcoin', amount: 100 },
  'BB': { coin: 'bbcoin', amount: 1000 },
  'AmAm': { coin: 'branzo', amount: 1000 }
};

document.getElementById('apply-code').addEventListener('click', () => {
  const code = document.getElementById('promo-code').value;
  const info = codes[code];
  if (info) {
    saldo[info.coin] += info.amount;
    document.getElementById('promo-msg').textContent = `Otrzymano ${info.amount} ${info.coin}`;
    saveState();
    updateWalletView();
  } else {
    document.getElementById('promo-msg').textContent = 'Nieznany kod';
  }
});

// dummy przelew:
document.getElementById('send-btn').addEventListener('click', () => {
  const coin = document.getElementById('send-coin').value;
  const qty = parseFloat(document.getElementById('send-amount').value);
  if (!isNaN(qty) && saldo[coin] >= qty) {
    saldo[coin] -= qty;
    document.getElementById('send-msg').textContent = `Wysłano ${qty} ${coin}`;
    saveState();
    updateWalletView();
  } else {
    document.getElementById('send-msg').textContent = 'Błąd – albo pusta ilość, albo za mało';
  }
});

function saveState(){
  localStorage.kurs = JSON.stringify(kurs);
  localStorage.saldo = JSON.stringify(saldo);
}
