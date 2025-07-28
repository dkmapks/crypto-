if (localStorage.kurs) {
  const k = JSON.parse(localStorage.kurs);
  document.getElementById('kurs-dcoin').value = k.dcoin;
  document.getElementById('kurs-branzo').value = k.branzo;
  document.getElementById('kurs-bbcoin').value = k.bbcoin;
}

const codes = JSON.parse(localStorage.codes || '{}');

document.getElementById('login-btn').addEventListener('click', () => {
  if (document.getElementById('admin-code').value === '7432') {
    document.getElementById('login').style.display = 'none';
    document.getElementById('control').style.display = 'block';
  } else {
    document.getElementById('login-msg').textContent = 'Błędny kod';
  }
});

document.getElementById('save-kurs').addEventListener('click', () => {
  const k = {
    dcoin: parseFloat(document.getElementById('kurs-dcoin').value),
    branzo: parseFloat(document.getElementById('kurs-branzo').value),
    bbcoin: parseFloat(document.getElementById('kurs-bbcoin').value)
  };
  localStorage.kurs = JSON.stringify(k);
  alert('Zapisano kursy');
});

document.getElementById('rand-kurs').addEventListener('click', () => {
  const k = {
    dcoin: +(0.5 + Math.random() * 2).toFixed(2),
    branzo: +(0.05 + Math.random() * 0.2).toFixed(3),
    bbcoin: +(0.005 + Math.random() * 0.02).toFixed(3)
  };
  localStorage.kurs = JSON.stringify(k);
  alert('Losowe kursy zapisane');
});

document.getElementById('add-code').addEventListener('click', () => {
  const name = document.getElementById('new-code').value.trim();
  const coin = document.getElementById('new-coin').value;
  const amt = parseInt(document.getElementById('new-amount').value,10);
  if (name && coin && amt>0) {
    codes[name] = { coin, amount: amt };
    localStorage.codes = JSON.stringify(codes);
    document.getElementById('code-msg').textContent = `Dodano kod ${name}`;
  } else {
    document.getElementById('code-msg').textContent = 'Błąd danych';
  }
});
