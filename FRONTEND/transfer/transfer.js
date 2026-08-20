// transfer.js — client-side interactions and live BTC↔USD rates
(function(){
  const rateApi = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
  let btcUsdRate = 60000; // fallback

  async function fetchRate(){
    try{
      const res = await fetch(rateApi);
      const json = await res.json();
      btcUsdRate = json.bitcoin.usd;
    }catch(e){ console.warn('Rate fetch failed, using fallback', e); }
    updateAll();
  }

  function formatUsd(v){ return '$' + Number(v).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}); }
  function formatBtc(v){ return Number(v).toFixed(8) + ' BTC'; }

  // Send BTC form
  const btcAmount = document.getElementById('btc-amount');
  const btcUsd = document.getElementById('btc-usd');
  const btcFee = document.getElementById('btc-fee');
  const btcTotal = document.getElementById('btc-total');

  function updateBtcPreview(){
    const amt = parseFloat(btcAmount.value) || 0;
    const fee = 0.0001; // placeholder
    const total = amt + fee;
    btcUsd.textContent = formatUsd(amt * btcUsdRate);
    btcFee.textContent = fee + ' BTC';
    btcTotal.textContent = total + ' BTC';
  }

  if(btcAmount) btcAmount.addEventListener('input', updateBtcPreview);

  // Send USD form
  const localAmount = document.getElementById('local-amount');
  const localUsd = document.getElementById('local-usd');
  const usdFee = document.getElementById('usd-fee');
  const usdTotal = document.getElementById('usd-total');
  const country = document.getElementById('usd-country');

  function updateUsdPreview(){
    const amt = parseFloat(localAmount.value) || 0;
    // naive FX per country (placeholders)
    const fx = {NGN:0.0025,GHS:0.085,KES:0.0075,USD:1};
    const usd = amt * (fx[country.value] || 1);
    localUsd.textContent = formatUsd(usd);
    usdTotal.textContent = formatUsd(usd + 2.0);
  }

  if(localAmount) localAmount.addEventListener('input', updateUsdPreview);
  if(country) country.addEventListener('change', updateUsdPreview);

  // Convert flow
  const convertBtc = document.getElementById('convert-btc');
  const convertUsd = document.getElementById('convert-usd');
  const convertRate = document.getElementById('convert-rate');
  const convertSpread = document.getElementById('convert-spread');
  const convertFinal = document.getElementById('convert-final');
  const convertTimer = document.getElementById('convert-timer');
  const getQuote = document.getElementById('get-quote');
  let quoteExpiry = null;

  function updateConvertFromBtc(){
    const btc = parseFloat(convertBtc.value) || 0;
    convertUsd.value = (btc * btcUsdRate).toFixed(2);
  }
  function updateConvertFromUsd(){
    const usd = parseFloat(convertUsd.value) || 0;
    convertBtc.value = (usd / btcUsdRate).toFixed(8);
  }
  if(convertBtc) convertBtc.addEventListener('input', updateConvertFromBtc);
  if(convertUsd) convertUsd.addEventListener('input', updateConvertFromUsd);

  function startQuoteTimer(seconds){
    let s = seconds;
    convertTimer.textContent = s;
    if(quoteExpiry) clearInterval(quoteExpiry);
    quoteExpiry = setInterval(()=>{ s--; convertTimer.textContent = s; if(s<=0) clearInterval(quoteExpiry); }, 1000);
  }

  if(getQuote){ getQuote.addEventListener('click', function(){
    const btc = parseFloat(convertBtc.value) || 0;
    const spread = parseFloat(convertSpread.value) || 0.7;
    const rate = btcUsdRate;
    const usdBefore = btc * rate;
    const usdAfter = usdBefore * (1 - spread/100);
    convertRate.textContent = formatUsd(rate);
    convertFinal.textContent = formatUsd(usdAfter);
    startQuoteTimer(60);
  }); }

  // Tabs
  document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click', function(){
    document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
    this.classList.add('active');
    document.querySelectorAll('.view').forEach(v=>v.classList.add('hidden'));
    const id = this.getAttribute('data-view');
    document.getElementById(id).classList.remove('hidden');
  }));

  // Save beneficiaries
  const savedList = document.getElementById('saved-list');
  const addName = document.getElementById('add-name');
  const addAccount = document.getElementById('add-account');
  const addBtn = document.getElementById('add-recipient');

  function loadSaved(){
    const raw = localStorage.getItem('nixxa-saved') || '[]';
    const arr = JSON.parse(raw);
    if(savedList){ savedList.innerHTML = arr.map(r=>'<li>'+r.name+' — <small>'+r.account+'</small></li>').join(''); }
  }
  if(addBtn){ addBtn.addEventListener('click', function(){
    const name = addName.value.trim(); const account = addAccount.value.trim(); if(!name||!account) return alert('Enter name and account');
    const raw = localStorage.getItem('nixxa-saved') || '[]'; const arr = JSON.parse(raw); arr.unshift({name,account}); localStorage.setItem('nixxa-saved', JSON.stringify(arr)); addName.value=''; addAccount.value=''; loadSaved();
  }); }

  // Transfers list (mock)
  function loadTransfers(){
    const raw = localStorage.getItem('nixxa-transfers') || '[]';
    const arr = JSON.parse(raw);
    const list = document.getElementById('trans-list');
    if(list){ list.innerHTML = arr.map(t=>'<li>'+t.id+' — '+t.type+' — '+t.status+'</li>').join(''); }
  }

  function updateAll(){ updateBtcPreview(); updateUsdPreview(); loadSaved(); loadTransfers(); }
  fetchRate();
  updateAll();

})();
