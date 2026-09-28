/* ================================================================
   INV-FOLIO — App JavaScript (Prototype)
   ================================================================ */

// ----------------------------------------------------------------
//  Sample Data (mock — replaces real API calls in prototype)
// ----------------------------------------------------------------
const HOLDINGS = [
  { id: 'h1', symbol: 'RELIANCE',   name: 'Reliance Industries',     class: 'equity',      account: 'Zerodha', qty: 50,    avgCost: 2200, ltp: 2950, sector: 'Energy',      weight: 22.1 },
  { id: 'h2', symbol: 'INFY',       name: 'Infosys Ltd',             class: 'equity',      account: 'Zerodha', qty: 120,   avgCost: 1400, ltp: 1780, sector: 'Technology',   weight: 19.6 },
  { id: 'h3', symbol: 'HDFC MF',    name: 'HDFC Mid Cap Opport.',    class: 'mutual_fund', account: 'Upstox',  qty: 1800,  avgCost: 58,   ltp: 91,   sector: 'Diversified',  weight: 17.3 },
  { id: 'h4', symbol: 'NIFTYBEES',  name: 'Nippon India Nifty ETF',  class: 'etf',         account: 'Zerodha', qty: 400,   avgCost: 180,  ltp: 235,  sector: 'Index',        weight: 13.4 },
  { id: 'h5', symbol: 'BTC',        name: 'Bitcoin',                 class: 'crypto',      account: 'Manual',  qty: 0.12,  avgCost: 2800000, ltp: 5400000, sector: 'Crypto', weight: 9.2 },
  { id: 'h6', symbol: 'SGBMAR26',   name: 'Sovereign Gold Bond',     class: 'bond',        account: 'Manual',  qty: 10,    avgCost: 4800, ltp: 7200, sector: 'Gold',        weight: 8.4 },
  { id: 'h7', symbol: 'TCS',        name: 'Tata Consultancy Svc.',   class: 'equity',      account: 'Zerodha', qty: 30,    avgCost: 3300, ltp: 3750, sector: 'Technology',   weight: 7.4 },
  { id: 'h8', symbol: 'ASIANPAINT', name: 'Asian Paints Ltd',        class: 'equity',      account: 'Upstox',  qty: 25,    avgCost: 2900, ltp: 3100, sector: 'Consumer',     weight: 4.2 },
];

const TRANSACTIONS = [
  { date: '2026-09-20', type: 'buy',      asset: 'RELIANCE',  qty: 10,    price: 2910,     amount: 29100,    account: 'Zerodha', source: 'broker_sync' },
  { date: '2026-09-15', type: 'dividend', asset: 'INFY',      qty: null,  price: null,     amount: 4800,     account: 'Zerodha', source: 'broker_sync' },
  { date: '2026-09-10', type: 'sell',     asset: 'TCS',       qty: 5,     price: 3720,     amount: 18600,    account: 'Zerodha', source: 'broker_sync' },
  { date: '2026-09-05', type: 'buy',      asset: 'NIFTYBEES', qty: 100,   price: 232,      amount: 23200,    account: 'Zerodha', source: 'broker_sync' },
  { date: '2026-08-28', type: 'buy',      asset: 'BTC',       qty: 0.02,  price: 5200000,  amount: 104000,   account: 'Manual',  source: 'manual' },
  { date: '2026-08-20', type: 'dividend', asset: 'HDFC MF',   qty: null,  price: null,     amount: 3200,     account: 'Upstox',  source: 'broker_sync' },
  { date: '2026-08-12', type: 'buy',      asset: 'INFY',      qty: 20,    price: 1720,     amount: 34400,    account: 'Zerodha', source: 'broker_sync' },
  { date: '2026-07-30', type: 'sell',     asset: 'ASIANPAINT', qty: 10,   price: 3050,     amount: 30500,    account: 'Upstox',  source: 'broker_sync' },
];

const SECTORS = [
  { name: 'Technology',   pct: 27,  color: '#3b82f6' },
  { name: 'Energy',       pct: 22,  color: '#10b981' },
  { name: 'Diversified',  pct: 17,  color: '#8b5cf6' },
  { name: 'Index (ETF)',  pct: 13,  color: '#06b6d4' },
  { name: 'Crypto',       pct: 9,   color: '#f59e0b' },
  { name: 'Gold/Bond',    pct: 8,   color: '#fbbf24' },
  { name: 'Consumer',     pct: 4,   color: '#ec4899' },
];

const ALLOCATION = [
  { label: 'Equity',      pct: 53,  color: '#3b82f6' },
  { label: 'Mutual Fund', pct: 17,  color: '#8b5cf6' },
  { label: 'ETF',         pct: 13,  color: '#06b6d4' },
  { label: 'Crypto',      pct: 9,   color: '#f59e0b' },
  { label: 'Bond/Gold',   pct: 8,   color: '#10b981' },
];

const ACCOUNTS = [
  { provider: 'Zerodha',  emoji: '🟢', status: 'active', value: '₹12,40,800', lastSync: '2 min ago',  holdings: 5 },
  { provider: 'Upstox',   emoji: '🔵', status: 'active', value: '₹4,60,200',  lastSync: '5 min ago',  holdings: 2 },
  { provider: 'Manual',   emoji: '✏️',  status: 'active', value: '₹1,46,320',  lastSync: 'Manual',     holdings: 2 },
];

const ALERT_RULES = [
  { type: 'price_threshold', asset: 'RELIANCE',  desc: 'Price drops below ₹2,700',  channel: 'email',  active: true,  triggered: false },
  { type: 'percent_change',  asset: 'BTC',        desc: 'BTC changes by ±5% in 24h', channel: 'both',   active: true,  triggered: true  },
  { type: 'drift',           asset: null,          desc: 'Portfolio drift > 10%',     channel: 'email',  active: true,  triggered: false },
  { type: 'dividend',        asset: 'INFY',        desc: 'Dividend declared',         channel: 'push',   active: false, triggered: false },
];

const REBALANCE = [
  { asset: 'Equity', action: 'Reduce by ₹48,200 (overweight by 8%)', type: 'sell' },
  { asset: 'Mutual Fund', action: 'Increase by ₹32,000 (underweight by 5%)', type: 'buy' },
  { asset: 'Bond/Gold', action: 'Increase by ₹16,200 (underweight by 3%)', type: 'buy' },
];

const TARGET_ALLOC = [
  { label: 'Equity',      actual: 53, target: 45, color: '#3b82f6' },
  { label: 'Mutual Fund', actual: 17, target: 22, color: '#8b5cf6' },
  { label: 'ETF',         actual: 13, target: 15, color: '#06b6d4' },
  { label: 'Crypto',      actual: 9,  target: 8,  color: '#f59e0b' },
  { label: 'Bond/Gold',   actual: 8,  target: 10, color: '#10b981' },
];

const RISK_FLAGS = [
  { level: 'high',   icon: '⚠️', title: 'Concentration: Technology', desc: 'Technology sector is 27% of your portfolio (threshold: 20%)' },
  { level: 'medium', icon: '📊', title: 'Allocation Drift',           desc: 'Equity is 8pp above target allocation of 45%' },
  { level: 'low',    icon: '✅', title: 'Diversification: Good',      desc: 'You hold 8 assets across 5 asset classes' },
];

// ----------------------------------------------------------------
//  State
// ----------------------------------------------------------------
let charts = {};
let currentHoldings = [...HOLDINGS];

// ----------------------------------------------------------------
//  Page Navigation
// ----------------------------------------------------------------
function showPage(name, navEl) {
  // Deactivate all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  // Activate target
  const page = document.getElementById(`page-${name}`);
  if (page) page.classList.add('active');
  if (navEl) navEl.classList.add('active');

  // Update title
  const titles = {
    dashboard: 'Dashboard',
    holdings: 'Holdings',
    transactions: 'Transactions',
    analytics: 'Analytics',
    alerts: 'Alerts',
    accounts: 'Accounts',
  };
  document.getElementById('pageTitle').textContent = titles[name] || name;

  return false;
}

// ----------------------------------------------------------------
//  Chart.js Defaults
// ----------------------------------------------------------------
Chart.defaults.color = '#8a9bb5';
Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
Chart.defaults.font.size = 11;

// ----------------------------------------------------------------
//  Trend Chart (Dashboard)
// ----------------------------------------------------------------
function buildTrendData(tf) {
  const points = tf === '1D' ? 24 : tf === '1M' ? 30 : tf === '3M' ? 90 : tf === '1Y' ? 12 : 36;
  const labels = [];
  const values = [];
  let v = 1350000;
  const now = new Date();

  for (let i = points; i >= 0; i--) {
    const d = new Date(now);
    if (tf === '1D') { d.setHours(d.getHours() - i); labels.push(d.getHours() + ':00'); }
    else if (tf === '1M') { d.setDate(d.getDate() - i); labels.push(d.toLocaleDateString('en-IN', {day:'numeric',month:'short'})); }
    else if (tf === '3M') { d.setDate(d.getDate() - i * 3); labels.push(d.toLocaleDateString('en-IN', {day:'numeric',month:'short'})); }
    else if (tf === '1Y') { d.setMonth(d.getMonth() - i); labels.push(d.toLocaleDateString('en-IN', {month:'short',year:'2-digit'})); }
    else { d.setMonth(d.getMonth() - i * 3); labels.push(d.toLocaleDateString('en-IN', {month:'short',year:'2-digit'})); }
    v = v + (Math.random() - 0.38) * 28000;
    values.push(Math.max(v, 900000));
  }
  values[values.length - 1] = 1847320;
  return { labels, values };
}

function initTrendChart(tf = '1M') {
  const ctx = document.getElementById('trendChart');
  if (!ctx) return;
  const { labels, values } = buildTrendData(tf);
  if (charts.trend) charts.trend.destroy();

  charts.trend = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Portfolio Value',
        data: values,
        borderColor: '#10b981',
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 5,
        tension: 0.4,
        fill: true,
        backgroundColor: (ctx) => {
          const grad = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
          grad.addColorStop(0, 'rgba(16,185,129,0.25)');
          grad.addColorStop(1, 'rgba(16,185,129,0.00)');
          return grad;
        },
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#111b2e',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            label: (ctx) => ` ₹${ctx.raw.toLocaleString('en-IN')}`,
          },
        },
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
          ticks: { maxTicksLimit: 8, color: '#4a5a74' },
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
          ticks: {
            color: '#4a5a74',
            callback: v => '₹' + (v / 100000).toFixed(1) + 'L',
          },
        },
      },
    },
  });
}

function setTimeframe(tf, btn) {
  document.querySelectorAll('#page-dashboard .time-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  initTrendChart(tf);
}

// ----------------------------------------------------------------
//  Allocation Donut Chart
// ----------------------------------------------------------------
function initAllocationChart() {
  const ctx = document.getElementById('allocationChart');
  if (!ctx) return;
  if (charts.allocation) charts.allocation.destroy();

  charts.allocation = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ALLOCATION.map(a => a.label),
      datasets: [{
        data: ALLOCATION.map(a => a.pct),
        backgroundColor: ALLOCATION.map(a => a.color),
        borderColor: '#131e30',
        borderWidth: 3,
        hoverBorderWidth: 3,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '72%',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#111b2e',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw}%` },
        },
      },
    },
  });

  // Legend
  const legend = document.getElementById('allocationLegend');
  legend.innerHTML = ALLOCATION.map(a => `
    <div class="legend-item">
      <div class="legend-dot" style="background:${a.color}"></div>
      <span class="legend-label">${a.label}</span>
      <span class="legend-pct">${a.pct}%</span>
    </div>
  `).join('');
}

// ----------------------------------------------------------------
//  Benchmark Chart
// ----------------------------------------------------------------
function initBenchmarkChart(tf = '1Y') {
  const ctx = document.getElementById('benchmarkChart');
  if (!ctx) return;
  if (charts.benchmark) charts.benchmark.destroy();

  const pts = tf === '1Y' ? 12 : 36;
  const labels = [];
  const portfolio = [];
  const nifty = [];
  let pv = 100, nv = 100;
  const now = new Date();

  for (let i = pts; i >= 0; i--) {
    const d = new Date(now);
    d.setMonth(d.getMonth() - i);
    labels.push(d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }));
    pv = pv + (Math.random() * 3.5 - 0.8);
    nv = nv + (Math.random() * 2.5 - 0.7);
    portfolio.push(pv);
    nifty.push(nv);
  }
  portfolio[portfolio.length - 1] = 162;
  nifty[nifty.length - 1] = 123;

  charts.benchmark = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'My Portfolio',
          data: portfolio,
          borderColor: '#10b981',
          borderWidth: 2.5,
          pointRadius: 0,
          tension: 0.4,
        },
        {
          label: 'Nifty 50',
          data: nifty,
          borderColor: '#3b82f6',
          borderWidth: 2,
          borderDash: [6, 3],
          pointRadius: 0,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'end',
          labels: { color: '#8a9bb5', boxWidth: 12, font: { size: 11 } },
        },
        tooltip: {
          backgroundColor: '#111b2e',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.raw.toFixed(1)}` },
        },
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#4a5a74' } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#4a5a74', callback: v => v.toFixed(0) } },
      },
    },
  });
}

function setBenchmarkTf(tf, btn) {
  document.querySelectorAll('#page-analytics .time-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  initBenchmarkChart(tf);
}

// ----------------------------------------------------------------
//  Holdings Table (Dashboard — top 5)
// ----------------------------------------------------------------
function renderHoldingsTable() {
  const tbody = document.getElementById('holdingsBody');
  if (!tbody) return;
  tbody.innerHTML = HOLDINGS.slice(0, 5).map(h => {
    const pnl = (h.ltp - h.avgCost) * h.qty;
    const pnlPct = ((h.ltp - h.avgCost) / h.avgCost * 100).toFixed(1);
    const isPos = pnl >= 0;
    return `<tr>
      <td><span class="asset-name">${h.name}</span></td>
      <td><span class="class-chip chip-${h.class}">${h.class.replace('_', ' ')}</span></td>
      <td>${h.qty}</td>
      <td>₹${h.avgCost.toLocaleString('en-IN')}</td>
      <td>₹${h.ltp.toLocaleString('en-IN')}</td>
      <td class="${isPos ? 'positive' : 'negative'}">${isPos ? '+' : ''}₹${Math.abs(pnl).toLocaleString('en-IN', {maximumFractionDigits:0})} (${isPos ? '+' : ''}${pnlPct}%)</td>
      <td>${h.weight}%</td>
    </tr>`;
  }).join('');
}

// ----------------------------------------------------------------
//  Holdings Full Table (Holdings page)
// ----------------------------------------------------------------
function renderHoldingsTableFull(data = HOLDINGS) {
  const tbody = document.getElementById('holdingsBodyFull');
  if (!tbody) return;
  tbody.innerHTML = data.map(h => {
    const pnl = (h.ltp - h.avgCost) * h.qty;
    const pnlPct = ((h.ltp - h.avgCost) / h.avgCost * 100).toFixed(1);
    const curVal = h.ltp * h.qty;
    const isPos = pnl >= 0;
    return `<tr>
      <td><span class="asset-name">${h.name}</span></td>
      <td><code style="font-family:'JetBrains Mono',monospace;font-size:0.8rem;color:#8a9bb5">${h.symbol}</code></td>
      <td><span class="class-chip chip-${h.class}">${h.class.replace('_', ' ')}</span></td>
      <td>${h.account}</td>
      <td>${h.qty}</td>
      <td>₹${h.avgCost.toLocaleString('en-IN')}</td>
      <td>₹${h.ltp.toLocaleString('en-IN')}</td>
      <td>₹${curVal.toLocaleString('en-IN', {maximumFractionDigits:0})}</td>
      <td class="${isPos ? 'positive' : 'negative'}">${isPos ? '+' : ''}₹${Math.abs(pnl).toLocaleString('en-IN', {maximumFractionDigits:0})} (${isPos ? '+' : ''}${pnlPct}%)</td>
      <td>${h.weight}%</td>
      <td>
        <button class="btn-ghost btn-sm" onclick="deleteHolding('${h.id}')" title="Remove">🗑</button>
      </td>
    </tr>`;
  }).join('');
}

function filterHoldings() {
  const val = document.getElementById('holdingFilter').value;
  const filtered = val === 'all' ? HOLDINGS : HOLDINGS.filter(h => h.class === val);
  renderHoldingsTableFull(filtered);
}

function deleteHolding(id) {
  const idx = HOLDINGS.findIndex(h => h.id === id);
  if (idx !== -1) HOLDINGS.splice(idx, 1);
  renderHoldingsTableFull();
  showToast('Holding removed');
}

// ----------------------------------------------------------------
//  Transaction Table
// ----------------------------------------------------------------
function renderTransactions() {
  const tbody = document.getElementById('txnBody');
  if (!tbody) return;
  const typeColors = { buy: 'positive', sell: 'negative', dividend: 'blue', interest: 'blue', deposit: '', withdrawal: 'negative', fee: 'negative' };
  tbody.innerHTML = TRANSACTIONS.map(t => `<tr>
    <td>${t.date}</td>
    <td><span class="class-chip chip-${t.type === 'buy' ? 'equity' : t.type === 'sell' ? 'mutual_fund' : 'etf'}" style="text-transform:capitalize">${t.type}</span></td>
    <td class="asset-name">${t.asset}</td>
    <td>${t.qty ?? '—'}</td>
    <td>${t.price ? '₹' + t.price.toLocaleString('en-IN') : '—'}</td>
    <td class="${typeColors[t.type]}">${t.type === 'sell' || t.type === 'dividend' ? '+' : '-'}₹${t.amount.toLocaleString('en-IN')}</td>
    <td>${t.account}</td>
    <td><span class="class-chip chip-${t.source === 'manual' ? 'crypto' : 'etf'}" style="text-transform:capitalize">${t.source.replace('_', ' ')}</span></td>
  </tr>`).join('');
}

// ----------------------------------------------------------------
//  Sector List
// ----------------------------------------------------------------
function renderSectors() {
  const el = document.getElementById('sectorList');
  if (!el) return;
  const gradients = SECTORS.map(s => s.color);
  el.innerHTML = SECTORS.map((s, i) => `
    <div class="sector-item">
      <div class="sector-header">
        <span class="sector-name">${s.name}</span>
        <span class="sector-pct">${s.pct}%</span>
      </div>
      <div class="sector-bar">
        <div class="sector-fill" style="width:${s.pct}%;background:${s.color}"></div>
      </div>
    </div>
  `).join('');
}

// ----------------------------------------------------------------
//  Alert List (Dashboard)
// ----------------------------------------------------------------
function renderAlertList() {
  const el = document.getElementById('alertList');
  if (!el) return;
  const icons = { price_threshold: '💰', percent_change: '📈', drift: '⚖️', dividend: '💸' };
  el.innerHTML = ALERT_RULES.filter(a => a.active).slice(0, 3).map(a => `
    <div class="alert-item">
      <div class="alert-icon" style="background:${a.triggered ? 'rgba(245,158,11,0.1)' : 'rgba(16,185,129,0.1)'}">${icons[a.type]}</div>
      <div class="alert-body">
        <div class="alert-title">${a.asset || 'Portfolio'}</div>
        <div class="alert-sub">${a.desc}</div>
      </div>
      <span class="alert-status ${a.triggered ? 'triggered' : 'active'}">${a.triggered ? 'Triggered' : 'Watching'}</span>
    </div>
  `).join('');
}

// ----------------------------------------------------------------
//  Risk Flags
// ----------------------------------------------------------------
function renderRiskFlags() {
  const el = document.getElementById('riskList');
  if (!el) return;
  el.innerHTML = RISK_FLAGS.map(r => `
    <div class="risk-item ${r.level}">
      <div class="risk-icon">${r.icon}</div>
      <div class="risk-body">
        <div class="risk-title">${r.title}</div>
        <div class="risk-desc">${r.desc}</div>
      </div>
    </div>
  `).join('');
}

// ----------------------------------------------------------------
//  Analytics Page
// ----------------------------------------------------------------
function renderAllocationBars() {
  const el = document.getElementById('allocationBars');
  if (!el) return;
  el.innerHTML = TARGET_ALLOC.map(t => `
    <div class="alloc-row">
      <div class="alloc-header">
        <span class="alloc-name">${t.label}</span>
        <span class="alloc-pcts">Actual: <strong style="color:#e8f0fe">${t.actual}%</strong> &nbsp;Target: ${t.target}%</span>
      </div>
      <div class="alloc-track">
        <div class="alloc-actual" style="width:${t.actual}%;background:${t.color};opacity:0.85"></div>
        <div class="alloc-target-mark" style="left:${t.target}%"></div>
      </div>
    </div>
  `).join('');
}

function renderRebalance() {
  const el = document.getElementById('rebalanceList');
  if (!el) return;
  el.innerHTML = REBALANCE.map(r => `
    <div class="rebalance-item">
      <div>
        <div class="rebalance-asset">${r.asset}</div>
        <div class="rebalance-action">${r.action}</div>
      </div>
      <span class="rebalance-chip ${r.type}">${r.type.toUpperCase()}</span>
    </div>
  `).join('');
}

// ----------------------------------------------------------------
//  Alerts Page
// ----------------------------------------------------------------
function renderAlertRules() {
  const el = document.getElementById('alertRulesList');
  if (!el) return;
  const icons = { price_threshold: '💰', percent_change: '📈', drift: '⚖️', dividend: '💸' };
  el.innerHTML = ALERT_RULES.map((a, i) => `
    <div class="alert-rule-item">
      <div style="font-size:1.3rem;margin-right:0.25rem">${icons[a.type]}</div>
      <div class="alert-rule-info">
        <div class="alert-rule-title">${a.asset ? a.asset + ' — ' : 'Portfolio — '}${a.type.replace('_', ' ')}</div>
        <div class="alert-rule-desc">${a.desc} · via ${a.channel}</div>
      </div>
      ${a.triggered ? '<span class="alert-status triggered" style="margin-right:0.5rem">Triggered</span>' : ''}
      <label class="alert-toggle">
        <input type="checkbox" ${a.active ? 'checked' : ''} onchange="toggleAlert(${i}, this.checked)">
        <span class="toggle-slider"></span>
      </label>
      <button class="btn-ghost btn-sm" style="margin-left:0.5rem" onclick="deleteAlert(${i})">🗑</button>
    </div>
  `).join('');
}

function toggleAlert(idx, val) {
  ALERT_RULES[idx].active = val;
  renderAlertList();
  showToast(`Alert ${val ? 'enabled' : 'disabled'}`);
}

function deleteAlert(idx) {
  ALERT_RULES.splice(idx, 1);
  renderAlertRules();
  renderAlertList();
  showToast('Alert deleted');
}

// ----------------------------------------------------------------
//  Accounts Page
// ----------------------------------------------------------------
function renderAccounts() {
  const grid = document.getElementById('accountsGrid');
  if (!grid) return;
  grid.innerHTML = ACCOUNTS.map(a => `
    <div class="account-card">
      <div class="account-header">
        <div class="account-logo">${a.emoji}</div>
        <div>
          <div class="account-name">${a.provider}</div>
          <div class="account-meta">${a.holdings} holdings</div>
        </div>
        <span class="account-status ${a.status}">${a.status}</span>
      </div>
      <div class="account-value">${a.value}</div>
      <div class="account-sync">Last synced: ${a.lastSync}</div>
    </div>
  `).join('');

  const brokers = [
    { name: 'Zerodha', emoji: '🟢' },
    { name: 'Upstox', emoji: '🔵' },
    { name: 'Groww', emoji: '🟡' },
    { name: 'Angel One', emoji: '🔴' },
    { name: 'ICICI Direct', emoji: '🟠' },
    { name: 'Coin (Zerodha)', emoji: '💰' },
    { name: 'CSV Import', emoji: '📂' },
    { name: 'Manual Entry', emoji: '✏️' },
  ];
  document.getElementById('brokerGrid').innerHTML = brokers.map(b => `
    <button class="broker-btn" onclick="showToast('${b.name} integration coming soon!')">
      <span>${b.emoji}</span> ${b.name}
    </button>
  `).join('');
}

// ----------------------------------------------------------------
//  Modal Handlers
// ----------------------------------------------------------------
function openAddHoldingModal() {
  document.getElementById('addHoldingModal').classList.add('open');
  document.getElementById('holdingDate').value = new Date().toISOString().split('T')[0];
}
function closeAddHoldingModal() {
  document.getElementById('addHoldingModal').classList.remove('open');
  document.getElementById('addHoldingForm').reset();
}
function openAddAlertModal() {
  document.getElementById('addAlertModal').classList.add('open');
}
function closeAddAlertModal() {
  document.getElementById('addAlertModal').classList.remove('open');
  document.getElementById('addAlertForm').reset();
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    closeAddHoldingModal();
    closeAddAlertModal();
  }
});

// ----------------------------------------------------------------
//  Form Submissions
// ----------------------------------------------------------------
function submitHolding(e) {
  e.preventDefault();
  const symbol = document.getElementById('holdingSymbol').value.toUpperCase();
  const cls    = document.getElementById('holdingClass').value;
  const qty    = parseFloat(document.getElementById('holdingQty').value);
  const price  = parseFloat(document.getElementById('holdingPrice').value);
  const account = document.getElementById('holdingAccount').value;

  const newH = {
    id: 'h' + Date.now(),
    symbol,
    name: symbol,
    class: cls,
    account,
    qty,
    avgCost: price,
    ltp: price, // prototype: LTP = avg cost initially
    sector: 'Other',
    weight: 0,
  };
  HOLDINGS.push(newH);
  renderHoldingsTable();
  renderHoldingsTableFull();
  closeAddHoldingModal();
  showToast(`${symbol} added to holdings!`);
}

function submitAlert(e) {
  e.preventDefault();
  const type   = document.getElementById('alertType').value;
  const asset  = document.getElementById('alertAsset').value.toUpperCase() || null;
  const op     = document.getElementById('alertOperator').value;
  const val    = document.getElementById('alertValue').value;
  const email  = document.getElementById('alertEmail').checked;
  const push   = document.getElementById('alertPush').checked;
  const channel = email && push ? 'both' : push ? 'push' : 'email';

  ALERT_RULES.push({
    type,
    asset,
    desc: `${asset || 'Portfolio'}: ${op === 'gt' ? 'Above' : op === 'lt' ? 'Below' : 'Changes by'} ${val}`,
    channel,
    active: true,
    triggered: false,
  });
  renderAlertRules();
  renderAlertList();
  closeAddAlertModal();
  showToast('Alert rule created!');
  // Update badge count
  const active = ALERT_RULES.filter(a => a.active).length;
  document.querySelector('#nav-alerts .badge').textContent = active;
}

// ----------------------------------------------------------------
//  Refresh Simulation
// ----------------------------------------------------------------
function handleRefresh() {
  const btn = document.getElementById('refreshBtn');
  btn.disabled = true;
  btn.textContent = 'Syncing…';
  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg> Refresh`;
    showToast('Portfolio synced successfully!');
  }, 1800);
}

// ----------------------------------------------------------------
//  Toast
// ----------------------------------------------------------------
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ----------------------------------------------------------------
//  Search
// ----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('searchInput').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    if (!q) { renderHoldingsTableFull(); return; }
    const filtered = HOLDINGS.filter(h =>
      h.name.toLowerCase().includes(q) || h.symbol.toLowerCase().includes(q)
    );
    renderHoldingsTableFull(filtered);
    showPage('holdings', document.getElementById('nav-holdings'));
  });
});

// ----------------------------------------------------------------
//  Initialise All
// ----------------------------------------------------------------
function init() {
  // Charts
  initTrendChart('1M');
  initAllocationChart();
  initBenchmarkChart('1Y');

  // Tables & lists
  renderHoldingsTable();
  renderHoldingsTableFull();
  renderTransactions();
  renderSectors();
  renderAlertList();
  renderRiskFlags();
  renderAllocationBars();
  renderRebalance();
  renderAlertRules();
  renderAccounts();
}

document.addEventListener('DOMContentLoaded', init);
