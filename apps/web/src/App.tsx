import { Activity, ArrowUpRight, BatteryCharging, Building2, Leaf, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

type Health = {
  status: string;
  service: string;
  dependencies: { mongodb: string };
};

const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api/v1';

function App() {
  const [health, setHealth] = useState<Health | null>(null);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiUrl}/health`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('API unavailable');
        const payload = await response.json();
        setHealth(payload.data as Health);
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name !== 'AbortError') setApiError(true);
      });
    return () => controller.abort();
  }, []);

  return (
    <main className="shell">
      <nav className="topbar">
        <a className="brand" href="/" aria-label="VoltSphere home">
          <span className="brand-mark"><Zap size={20} fill="currentColor" /></span>
          <span>volt<span>sphere</span></span>
        </a>
        <span className="environment"><span className="pulse" /> PLATFORM FOUNDATION</span>
      </nav>

      <section className="hero">
        <div className="eyebrow"><span /> ENERGY INTELLIGENCE, CONNECTED</div>
        <h1>Make every<br /><span>watt count.</span></h1>
        <p className="intro">
          A unified command platform for understanding energy consumption, improving
          operational efficiency, and accelerating a more sustainable future.
        </p>
        <div className="hero-actions">
          <a className="primary-action" href="#platform">Explore the platform <ArrowUpRight size={17} /></a>
          <span className="build-label">MILESTONE 01 · FOUNDATION</span>
        </div>
      </section>

      <section className="metrics" id="platform">
        <article className="metric-card">
          <span className="metric-icon"><Building2 size={19} /></span>
          <span className="metric-label">MULTI-FACILITY</span>
          <strong>One view</strong>
          <p>Bring distributed operations into a single workspace.</p>
        </article>
        <article className="metric-card">
          <span className="metric-icon"><Activity size={19} /></span>
          <span className="metric-label">ENERGY INTELLIGENCE</span>
          <strong>Actionable data</strong>
          <p>Turn meter readings into operational insight.</p>
        </article>
        <article className="metric-card">
          <span className="metric-icon"><BatteryCharging size={19} /></span>
          <span className="metric-label">OPTIMIZATION</span>
          <strong>Smarter decisions</strong>
          <p>Understand demand, costs, and opportunities.</p>
        </article>
        <article className="metric-card">
          <span className="metric-icon"><Leaf size={19} /></span>
          <span className="metric-label">SUSTAINABILITY</span>
          <strong>Measurable impact</strong>
          <p>Connect energy performance with carbon outcomes.</p>
        </article>
      </section>

      <footer className="statusbar">
        <div>
          <span className={health ? 'status-dot online' : 'status-dot'} />
          <span>{health ? 'API connected' : apiError ? 'API unavailable' : 'Connecting to API'}</span>
          {health && <span className="status-detail">· MongoDB {health.dependencies.mongodb}</span>}
        </div>
        <span>VOLTSPhERE · ENTERPRISE ENERGY PLATFORM</span>
      </footer>
    </main>
  );
}

export default App;
