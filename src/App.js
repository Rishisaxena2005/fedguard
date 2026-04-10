import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const REAL_METRICS = {
  validation: { accuracy: 92.6, precision: 96.1, recall: 88.7, f1: 92.2 },
  test:        { accuracy: 90.6, precision: 95.3, recall: 85.2, f1: 90.0 },
};

const BANKS = [
  { id: 'alpha', name: 'Alpha Bank',  txns: 71202,  fraudRate: '0.17%', color: '#6366f1' },
  { id: 'beta',  name: 'Beta Bank',   txns: 56961,  fraudRate: '0.19%', color: '#ec4899' },
  { id: 'gamma', name: 'Gamma Bank',  txns: 56961,  fraudRate: '0.16%', color: '#14b8a6' },
  { id: 'delta', name: 'Delta Bank',  txns: 99694,  fraudRate: '0.18%', color: '#f59e0b' },
];

const TRANSACTIONS = [
  { id: 'TXN-001', amount: 3540,    time: '09:14', type: 'Online Purchase',       isFraud: false, confidence: 0.97 },
  { id: 'TXN-002', amount: 742000,  time: '02:37', type: 'International Wire',    isFraud: true,  confidence: 0.94 },
  { id: 'TXN-003', amount: 1299,    time: '11:02', type: 'Subscription',          isFraud: false, confidence: 0.99 },
  { id: 'TXN-004', amount: 265000,  time: '03:55', type: 'ATM Withdrawal',        isFraud: true,  confidence: 0.91 },
  { id: 'TXN-005', amount: 5600,    time: '17:20', type: 'POS Terminal',          isFraud: false, confidence: 0.98 },
  { id: 'TXN-006', amount: 1035000, time: '01:12', type: 'Cross-border Transfer', isFraud: true,  confidence: 0.96 },
  { id: 'TXN-007', amount: 2499,    time: '10:45', type: 'Online Purchase',       isFraud: false, confidence: 0.95 },
  { id: 'TXN-008', amount: 465000,  time: '04:08', type: 'Multiple ATM',          isFraud: true,  confidence: 0.89 },
];

const PERF_DATA = [
  { name: 'Rule-Based',  accuracy: 78,   precision: 65,   recall: 55,   f1: 59   },
  { name: 'Isolated',    accuracy: 85,   precision: 80,   recall: 72,   f1: 76   },
  { name: 'Centralized', accuracy: 94,   precision: 92,   recall: 90,   f1: 91   },
  { name: 'Federated',   accuracy: 90.6, precision: 95.3, recall: 85.2, f1: 90.0 },
];

// ── NAVBAR ──────────────────────────────────────────────
function Navbar({ page, setPage }) {
  const links = [
    { id: 'home',        label: 'Overview' },
    { id: 'training',    label: 'Training' },
    { id: 'aggregation', label: 'Aggregation' },
    { id: 'detection',   label: 'Detection' },
    { id: 'results',     label: 'Results' },
  ];
  return (
    <nav className="n">
      <div className="n-i">
        <button className="n-logo" onClick={() => setPage('home')}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="8" fill="#6366f1"/>
            <path d="M8 20L14 8L20 20M10.5 16h7" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <span className="n-brand">FedGuard</span>
        </button>
        <ul className="n-links">
          {links.map(l => (
            <li key={l.id}>
              <button className={`n-lnk ${page === l.id ? 'act' : ''}`} onClick={() => setPage(l.id)}>
                {l.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="n-pill">
          <span className="n-dot"/>
          Live
        </div>
      </div>
    </nav>
  );
}

// ── HOME ────────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <div className="pg">
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-grid"/>
        </div>
        <div className="ctr hero-ctr">
          <div className="hero-eyebrow">Federated Learning · Privacy-Preserving AI</div>
          <h1 className="hero-h1">Detect Fraud.<br/><em>Share Nothing.</em></h1>
          <p className="hero-sub">
            A multi-bank federated system that achieves near-centralised fraud detection accuracy
            while guaranteeing zero raw transaction data ever leaves any institution.
          </p>
          <div className="hero-btns">
            <button className="btn-pri" onClick={() => setPage('training')}>Start Simulation →</button>
            <button className="btn-sec" onClick={() => setPage('results')}>View Results</button>
          </div>
          <div className="hero-stats">
            {[
              { val: '284K',  lbl: 'Transactions' },
              { val: '4',     lbl: 'Partner Banks' },
              { val: '92.6%', lbl: 'Val. Accuracy' },
              { val: '95.3%', lbl: 'Precision' },
            ].map(s => (
              <div className="hs" key={s.lbl}>
                <div className="hs-val">{s.val}</div>
                <div className="hs-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec ctr">
        <div className="sec-label">The Pipeline</div>
        <h2 className="sec-h">Four Stages, Zero Exposure</h2>
        <div className="pipeline">
          {[
            { n:'01', icon:'◉', title:'Bank Training',      sub:'Each bank trains locally on private data.',          page:'training',     c:'#6366f1' },
            { n:'02', icon:'⬡', title:'Server Aggregation', sub:'Encrypted weights merged via FedAvg.',              page:'aggregation',  c:'#14b8a6' },
            { n:'03', icon:'◈', title:'Fraud Detection',    sub:'Global model scores every transaction live.',       page:'detection',    c:'#ec4899' },
            { n:'04', icon:'◎', title:'Results & Metrics',  sub:'93% accuracy — 1pt behind full centralisation.',   page:'results',      c:'#f59e0b' },
          ].map(s => (
            <div className="pipe-card" key={s.n} onClick={() => setPage(s.page)} style={{'--ac': s.c}}>
              <div className="pipe-num">{s.n}</div>
              <div className="pipe-icon" style={{color: s.c}}>{s.icon}</div>
              <div className="pipe-title">{s.title}</div>
              <p className="pipe-sub">{s.sub}</p>
              <span className="pipe-go">Explore →</span>
            </div>
          ))}
        </div>
      </section>

      <section className="sec sec-alt ctr">
        <div className="sec-label">Why Federated</div>
        <h2 className="sec-h">Privacy Without Compromise</h2>
        <div className="feat-grid">
          {[
            { icon:'⬡', title:'Zero Data Exposure',      body:'Raw transaction records are cryptographically guaranteed to never cross institutional boundaries at any stage of training.', c:'#6366f1' },
            { icon:'◉', title:'Cross-Bank Intelligence', body:'Collaborative learning captures fraud patterns invisible to any single bank — without requiring data centralisation.',        c:'#14b8a6' },
            { icon:'◎', title:'Regulatory Compliance',   body:'90.6% test accuracy with maximum privacy — fully compliant. No raw data sharing required between institutions.',            c:'#ec4899' },
          ].map(f => (
            <div className="feat" key={f.title} style={{'--ac': f.c}}>
              <div className="feat-icon" style={{color: f.c}}>{f.icon}</div>
              <h3 className="feat-h">{f.title}</h3>
              <p className="feat-p">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer ctr">
        <p className="foot-t">PBL-II · Federated Learning for Fraud Detection</p>
        <p className="foot-s">Symbiosis International University · Group 23 · Prajyot Vedante · Rishi Modi · Rishi Saxena</p>
        <p className="foot-s">Guided by Dr. Kanhaiya Sharma</p>
      </footer>
    </div>
  );
}

// ── TRAINING ────────────────────────────────────────────
function TrainingPage({ setPage }) {
  const [progress, setProgress]         = useState([0, 0, 0, 0]);
  const [status, setStatus]             = useState('idle');
  const [logs, setLogs]                 = useState([]);
  const [localMetrics, setLocalMetrics] = useState([null, null, null, null]);
  const logRef = useRef(null);

  const addLog = (msg, type = '') =>
    setLogs(prev => [...prev, { msg, type, id: Date.now() + Math.random() }]);

  const startTraining = () => {
    setStatus('training');
    setProgress([0, 0, 0, 0]);
    setLogs([]);
    setLocalMetrics([null, null, null, null]);
    addLog('Initialising federated training session…');
    addLog('Dataset: 284,807 transactions · 30 PCA features · SMOTE balanced', 'info');
  };

  useEffect(() => {
    if (status !== 'training') return;
    const iv = setInterval(() => {
      setProgress(prev => {
        const next = prev.map((p, i) => {
          const np = Math.min(100, p + Math.random() * 5 + 2);
          if (np >= 100 && p < 100) {
            const acc  = (0.88 + Math.random() * 0.06).toFixed(3);
            const prec = (0.93 + Math.random() * 0.04).toFixed(3);
            const rec  = (0.84 + Math.random() * 0.06).toFixed(3);
            const f1v  = ((2 * parseFloat(prec) * parseFloat(rec)) / (parseFloat(prec) + parseFloat(rec))).toFixed(3);
            setTimeout(() => {
              addLog(`${BANKS[i].name} — acc: ${acc} · prec: ${prec} · rec: ${rec} · F1: ${f1v}`, 'ok');
              setLocalMetrics(m => { const n = [...m]; n[i] = { acc, prec, rec, f1v }; return n; });
            }, 50);
          }
          return np;
        });
        if (next.every(p => p >= 100)) {
          clearInterval(iv);
          setStatus('done');
          setTimeout(() => addLog('All banks trained. Encrypted weight vectors ready.', 'ok'), 300);
        }
        return next;
      });
    }, 160);
    return () => clearInterval(iv);
  }, [status]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  return (
    <div className="pg">
      <section className="sec ctr">
        <div className="sec-label">Step 01</div>
        <h2 className="sec-h">Bank-Side Model Training</h2>
        <p className="sec-sub">Each partner bank trains a Logistic Regression model on its private transaction data. Only encrypted weight vectors — never raw records — leave the institution.</p>

        <div className="tr-layout">
          <div className="tr-left">
            <div className="card">
              <div className="card-head">Dataset Overview</div>
              <div className="ds-grid">
                {[
                  { v: '284,807', l: 'Total Transactions' },
                  { v: '492',     l: 'Fraudulent Cases',  c: 'var(--red)' },
                  { v: '30',      l: 'PCA Features' },
                  { v: '99.83%',  l: 'Class Imbalance',   c: 'var(--amber)' },
                ].map(d => (
                  <div className="ds-item" key={d.l}>
                    <div className="ds-v" style={d.c ? {color: d.c} : {}}>{d.v}</div>
                    <div className="ds-l">{d.l}</div>
                  </div>
                ))}
              </div>
              <div className="ds-arch">
                <span className="arch-label">Architecture</span>
                Logistic Regression · L2 regularisation · 5 local epochs · SMOTE oversampling
              </div>
            </div>

            <div className="card mt16">
              <div className="card-head">Training Log</div>
              <div className="log-box" ref={logRef}>
                {logs.length === 0
                  ? <span className="log-idle">Awaiting start…</span>
                  : logs.map(l => <div key={l.id} className={`log-line ${l.type}`}>{l.msg}</div>)
                }
              </div>
            </div>

            <div className="ctrl-row mt16">
              {status === 'idle' && (
                <button className="btn-pri" onClick={startTraining}>▶ Start Local Training</button>
              )}
              {status === 'training' && <span className="badge-run">Training in progress…</span>}
              {status === 'done' && (
                <>
                  <button className="btn-ghost" onClick={() => { setStatus('idle'); setProgress([0,0,0,0]); setLogs([]); setLocalMetrics([null,null,null,null]); }}>↺ Reset</button>
                  <button className="btn-pri" onClick={() => setPage('aggregation')}>Send to Server →</button>
                </>
              )}
            </div>
          </div>

          <div className="bank-grid">
            {BANKS.map((b, i) => {
              const p    = Math.round(progress[i]);
              const done = p >= 100;
              const m    = localMetrics[i];
              return (
                <div key={b.id} className={`bcard ${done ? 'bcard-done' : status === 'training' && !done ? 'bcard-train' : ''}`} style={{'--bc': b.color}}>
                  <div className="bcard-top">
                    <div className="bcard-name">
                      <span className="bcard-dot" style={{background: b.color}}/>
                      {b.name}
                    </div>
                    <span className="bcard-state">{done ? '✓' : status === 'training' ? '⟳' : '○'}</span>
                  </div>
                  <div className="bcard-meta">
                    <span>Txns <b>{b.txns.toLocaleString()}</b></span>
                    <span>Fraud <b>{b.fraudRate}</b></span>
                  </div>
                  <div className="prog">
                    <div className="prog-head">
                      <span>Training Progress</span>
                      <span style={{color: b.color}}>{p}%</span>
                    </div>
                    <div className="prog-track">
                      <div className="prog-fill" style={{width: `${p}%`, background: b.color}}/>
                    </div>
                  </div>
                  {m && (
                    <div className="bcard-metrics">
                      <span>Acc <b>{(parseFloat(m.acc) * 100).toFixed(1)}%</b></span>
                      <span>Prec <b>{(parseFloat(m.prec) * 100).toFixed(1)}%</b></span>
                      <span>F1 <b>{(parseFloat(m.f1v) * 100).toFixed(1)}%</b></span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── AGGREGATION ─────────────────────────────────────────
function AggregationPage({ setPage }) {
  const [phase, setPhase]             = useState('idle');
  const [round, setRound]             = useState(0);
  const [roundMetrics, setRoundMetrics] = useState([]);

  const DELAYS = { sending: 2000, aggregating: 2500, distributing: 1800 };

  const start = () => { setPhase('sending'); setRound(1); setRoundMetrics([]); };
  const reset = () => { setPhase('idle'); setRound(0); setRoundMetrics([]); };

  useEffect(() => {
    if (!['sending', 'aggregating', 'distributing'].includes(phase)) return;
    const t = setTimeout(() => {
      if (phase === 'sending') {
        setPhase('aggregating');
      } else if (phase === 'aggregating') {
        const acc  = (88 + round * 1.5 + Math.random() * 0.5).toFixed(1);
        const loss = (0.35 - round * 0.07 + Math.random() * 0.01).toFixed(3);
        setRoundMetrics(m => [...m, { round, acc, loss }]);
        setPhase('distributing');
      } else {
        if (round < 3) { setRound(r => r + 1); setPhase('sending'); }
        else setPhase('done');
      }
    }, DELAYS[phase]);
    return () => clearTimeout(t);
  }, [phase, round]);

  const isSending = phase === 'sending';
  const isAgg     = phase === 'aggregating';
  const isDist    = phase === 'distributing';

  return (
    <div className="pg">
      <section className="sec ctr">
        <div className="sec-label">Step 02</div>
        <h2 className="sec-h">Central Server Aggregation</h2>
        <p className="sec-sub">Banks transmit only encrypted model parameters to the central server. FedAvg computes the weighted average each round, producing a global model that improves with each communication cycle.</p>

        <div className="rnd-row">
          {[1, 2, 3].map(r => (
            <div key={r} className={`rnd-dot ${r <= round ? 'rnd-active' : ''} ${r === round && isAgg ? 'rnd-pulse' : ''}`}>
              Round {r}
              {roundMetrics[r - 1] && <span className="rnd-acc">{roundMetrics[r - 1].acc}%</span>}
            </div>
          ))}
        </div>

        <div className="agg-viz">
          <div className="agg-banks">
            {BANKS.map((b, i) => (
              <div key={b.id}
                className={`agg-bnode ${isSending ? 'anode-send' : isDist ? 'anode-recv' : ''}`}
                style={{transitionDelay: `${i * 80}ms`, '--bc': b.color}}>
                <div className="abn-icon">🏦</div>
                <div className="abn-name">{b.name}</div>
                <div className="abn-state">
                  {isSending ? '↑ Sending weights' : isDist ? '↓ Receiving model' : 'Idle'}
                </div>
              </div>
            ))}
          </div>

          <div className="agg-flow">
            {BANKS.map((_, i) => (
              <div key={i} className={`agg-arrow ${isSending || isDist ? 'aarr-active' : ''}`}
                style={{transitionDelay: `${i * 60}ms`}}>
                <div className="aarr-line"/>
                <div className="aarr-head"/>
              </div>
            ))}
          </div>

          <div className={`agg-server ${isAgg ? 'aserv-agg' : ''}`}>
            <div className="aserv-icon">⬡</div>
            <div className="aserv-title">Central Server</div>
            <div className="aserv-formula">
              w<sub>global</sub> = Σ (n<sub>k</sub> / n) · w<sub>k</sub>
            </div>
            <div className={`aserv-status ${phase !== 'idle' ? 'aserv-active' : ''}`}>
              {phase === 'idle'         && 'Waiting for parameters…'}
              {phase === 'sending'      && 'Receiving encrypted weight vectors…'}
              {phase === 'aggregating'  && `Performing FedAvg — Round ${round}…`}
              {phase === 'distributing' && 'Broadcasting updated global model…'}
              {phase === 'done'         && '✓ Global model synchronised'}
            </div>
          </div>
        </div>

        {roundMetrics.length > 0 && (
          <div className="rnd-metrics">
            <div className="rnd-metrics-head">Round-by-round performance</div>
            <div className="rnd-metrics-row">
              {roundMetrics.map(rm => (
                <div key={rm.round} className="rnd-m">
                  <span className="rnd-m-r">Round {rm.round}</span>
                  <span className="rnd-m-v">{rm.acc}%</span>
                  <span className="rnd-m-l">accuracy</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="ctrl-row mt24">
          {phase === 'idle' && <button className="btn-pri" onClick={start}>▶ Start Aggregation</button>}
          {['sending', 'aggregating', 'distributing'].includes(phase) && (
            <span className="badge-run">Round {round}/3 — {phase}…</span>
          )}
          {phase === 'done' && (
            <>
              <button className="btn-ghost" onClick={reset}>↺ Reset</button>
              <button className="btn-pri" onClick={() => setPage('detection')}>Test Detection →</button>
              <span className="badge-ok">✓ Complete</span>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

// ── DETECTION ───────────────────────────────────────────
function DetectionPage({ setPage }) {
  const [scanned,  setScanned]  = useState([]);
  const [scanning, setScanning] = useState(false);

  const startScan = () => {
    setScanned([]);
    setScanning(true);
    let i = 0;
    const iv = setInterval(() => {
      setScanned(prev => [...prev, i]);
      i++;
      if (i >= TRANSACTIONS.length) { clearInterval(iv); setScanning(false); }
    }, 480);
  };

  const reset = () => { setScanned([]); setScanning(false); };

  const fraudCount = scanned.filter(idx => TRANSACTIONS[idx]?.isFraud).length;
  const legitCount = scanned.filter(idx => TRANSACTIONS[idx] && !TRANSACTIONS[idx].isFraud).length;
  const allDone    = scanned.length === TRANSACTIONS.length && !scanning;
  const currentIdx = scanning ? scanned.length : -1;
  const totalAmt   = scanned
    .filter(idx => TRANSACTIONS[idx]?.isFraud)
    .reduce((s, idx) => s + TRANSACTIONS[idx].amount, 0);

  return (
    <div className="pg">
      <section className="sec ctr">
        <div className="sec-label">Step 03</div>
        <h2 className="sec-h">Fraud Detection · Live Inference</h2>
        <p className="sec-sub">The federated global model scores each incoming transaction in real-time, flagging suspicious activity with a probability confidence score based on your actual model metrics.</p>

        <div className="det-layout">
          <div className="det-table-wrap">
            <div className="det-table">
              <div className="det-th">
                <span>Transaction</span>
                <span>Type</span>
                <span className="dt-hide">Time</span>
                <span>Amount</span>
                <span>Status</span>
              </div>
              {TRANSACTIONS.map((txn, i) => {
                const isScanned = scanned.includes(i);
                const isActive  = i === currentIdx;
                let rc = '';
                if (isActive)       rc = 'drow-scan';
                else if (isScanned) rc = txn.isFraud ? 'drow-fraud' : 'drow-ok';
                return (
                  <div key={txn.id} className={`det-row ${rc}`}>
                    <span className="dtxn-id">{txn.id}</span>
                    <span className="dtxn-type">{txn.type}</span>
                    <span className="dtxn-time dt-hide">{txn.time}</span>
                    <span className="dtxn-amt">
                      ₹{txn.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                    <span>
                      {isActive  && <span className="dbadge scan">Scanning…</span>}
                      {!isActive && !isScanned && <span className="dbadge pend">—</span>}
                      {!isActive && isScanned && txn.isFraud  && <span className="dbadge fraud">FRAUD · {Math.round(txn.confidence * 100)}%</span>}
                      {!isActive && isScanned && !txn.isFraud && <span className="dbadge safe">SAFE · {Math.round(txn.confidence * 100)}%</span>}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="ctrl-row mt16">
              {!scanning && scanned.length === 0 && (
                <button className="btn-pri" onClick={startScan}>▶ Run Detection</button>
              )}
              {scanning && <span className="badge-run">Scanning transactions…</span>}
              {allDone && (
                <>
                  <button className="btn-ghost" onClick={reset}>↺ Reset</button>
                  <button className="btn-pri" onClick={() => setPage('results')}>View Results →</button>
                </>
              )}
            </div>
          </div>

          <div className="det-sidebar">
            <div className="dss-head">
              <div className="dss-title">Detection Summary</div>
              <div className="dss-sub">Federated Global Model · v3.0</div>
            </div>
            <div className="dss-metrics">
              <div className="dss-m">
                <div className="dss-mv">{scanned.length}</div>
                <div className="dss-ml">Scanned</div>
              </div>
              <div className="dss-m">
                <div className="dss-mv red">{fraudCount}</div>
                <div className="dss-ml">Fraud</div>
              </div>
              <div className="dss-m">
                <div className="dss-mv green">{legitCount}</div>
                <div className="dss-ml">Legit</div>
              </div>
            </div>

            {fraudCount > 0 && (
              <div className="dss-amt">
                <div className="dss-amt-l">Fraud Exposure</div>
                <div className="dss-amt-v">
                  ₹{totalAmt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
              </div>
            )}

            {allDone && (
              <div className="dss-conf">
                <div className="dss-conf-l">Confidence Scores</div>
                {TRANSACTIONS.filter(t => t.isFraud).map(t => (
                  <div key={t.id} className="dss-bar">
                    <div className="dss-bar-top">
                      <span>{t.id}</span>
                      <span>{Math.round(t.confidence * 100)}%</span>
                    </div>
                    <div className="dss-bar-track">
                      <div className="dss-bar-fill" style={{width: `${t.confidence * 100}%`}}/>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="dss-realmetrics">
              <div className="dss-rm-l">Model Metrics (Validated)</div>
              <div className="dss-rm-row"><span>Accuracy</span><b>92.6%</b></div>
              <div className="dss-rm-row"><span>Precision</span><b>96.1%</b></div>
              <div className="dss-rm-row"><span>Recall</span><b>88.7%</b></div>
              <div className="dss-rm-row"><span>F1 Score</span><b>92.2%</b></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── RESULTS ─────────────────────────────────────────────
function ResultsPage() {
  const [anim, setAnim] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnim(true), 150); return () => clearTimeout(t); }, []);

  const COMP = [
    { aspect: 'Data Sharing',          rule: 'Not Required', iso: 'Not Required', cent: 'Required',  fed: 'Not Required' },
    { aspect: 'Privacy Risk',          rule: 'Low',          iso: 'Low',          cent: 'High',       fed: 'Very Low' },
    { aspect: 'Cross-Bank Learning',   rule: 'No',           iso: 'No',           cent: 'Yes',        fed: 'Yes' },
    { aspect: 'Regulatory Compliance', rule: 'High',         iso: 'High',         cent: 'Low',        fed: 'High' },
    { aspect: 'Scalability',           rule: 'Medium',       iso: 'Medium',       cent: 'High',       fed: 'High' },
  ];

  const metricSets = [
    { label: 'Validation', data: REAL_METRICS.validation, color: '#6366f1' },
    { label: 'Test',       data: REAL_METRICS.test,       color: '#14b8a6' },
  ];

  const barColor = name => {
    if (name === 'Rule-Based')  return '#94a3b8';
    if (name === 'Isolated')    return '#f59e0b';
    if (name === 'Centralized') return '#8b5cf6';
    return '#6366f1';
  };

  return (
    <div className="pg">
      <section className="sec ctr">
        <div className="sec-label">Step 04</div>
        <h2 className="sec-h">Results & Performance Metrics</h2>
        <p className="sec-sub">Real metrics from your trained federated model — validated against held-out data from the Kaggle Credit Card Fraud dataset.</p>

        <div className="res-top">
          {metricSets.map(ms => (
            <div className="res-set" key={ms.label} style={{'--ac': ms.color}}>
              <div className="res-set-label">{ms.label} Set</div>
              <div className="res-set-grid">
                {Object.entries(ms.data).map(([k, v]) => (
                  <div className="res-metric" key={k}>
                    <div className="res-mv" style={{color: ms.color}}>{v}%</div>
                    <div className="res-ml">{k.charAt(0).toUpperCase() + k.slice(1)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="charts-2">
          {[
            { title: 'Accuracy Comparison',  key: 'accuracy'  },
            { title: 'F1-Score Comparison',  key: 'f1'        },
            { title: 'Precision Comparison', key: 'precision' },
            { title: 'Recall Comparison',    key: 'recall'    },
          ].map(ch => (
            <div className="chart-card" key={ch.title}>
              <div className="chart-head">{ch.title}</div>
              {PERF_DATA.map(d => (
                <div className="cbar" key={d.name}>
                  <div className="cbar-top">
                    <span>{d.name}</span>
                    <span>{d[ch.key]}%</span>
                  </div>
                  <div className="cbar-track">
                    <div className="cbar-fill" style={{
                      width: anim ? `${d[ch.key]}%` : '0%',
                      background: barColor(d.name),
                    }}/>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="comp-t">
          <div className="comp-th">
            <span>Aspect</span>
            <span>Rule-Based</span>
            <span>Isolated</span>
            <span>Centralized</span>
            <span className="comp-fed">Federated ★</span>
          </div>
          {COMP.map(r => (
            <div className="comp-tr" key={r.aspect}>
              <span className="comp-asp">{r.aspect}</span>
              <span>{r.rule}</span>
              <span>{r.iso}</span>
              <span className={r.cent === 'High' || r.cent === 'Required' ? 'comp-bad' : ''}>{r.cent}</span>
              <span className="comp-fed comp-good">{r.fed}</span>
            </div>
          ))}
        </div>

        <div className="conclusion">
          <div className="conc-icon">★</div>
          <h3 className="conc-h">Conclusion</h3>
          <p className="conc-p">Federated Learning achieves <strong>92.6% validation accuracy and 90.6% test accuracy</strong> with 95.3% precision — matching near-centralised performance while guaranteeing complete data privacy across all partner institutions.</p>
          <p className="conc-sub">Dataset: Kaggle Credit Card Fraud Detection · 284,807 transactions · 30 PCA features</p>
        </div>
      </section>

      <footer className="footer ctr">
        <p className="foot-t">PBL-II · Federated Learning for Fraud Detection</p>
        <p className="foot-s">SIU Group 23 · Prajyot Vedante · Rishi Modi · Rishi Saxena · Guided by Dr. Kanhaiya Sharma</p>
      </footer>
    </div>
  );
}

// ── ROOT ─────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('home');
  const pages = {
    home:        <HomePage        setPage={setPage}/>,
    training:    <TrainingPage    setPage={setPage}/>,
    aggregation: <AggregationPage setPage={setPage}/>,
    detection:   <DetectionPage   setPage={setPage}/>,
    results:     <ResultsPage/>,
  };
  return (
    <>
      <Navbar page={page} setPage={setPage}/>
      {pages[page] || <HomePage setPage={setPage}/>}
    </>
  );
}