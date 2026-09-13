import { useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  CarFront,
  ChevronDown,
  CircleDollarSign,
  Coffee,
  CreditCard,
  Home,
  Landmark,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  PiggyBank,
  PieChart,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  Utensils,
  WalletCards,
  X,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const navigation = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Transactions", icon: CreditCard },
  { label: "Budgets", icon: PieChart },
  { label: "Investments", icon: Landmark },
  { label: "Accounts", icon: WalletCards },
  { label: "Settings", icon: Settings },
];

const spendHistory = {
  month: [
    { month: "May 1", spending: 62, income: 103 },
    { month: "May 5", spending: 88, income: 103 },
    { month: "May 9", spending: 71, income: 103 },
    { month: "May 13", spending: 112, income: 103 },
    { month: "May 17", spending: 96, income: 103 },
    { month: "May 21", spending: 134, income: 103 },
    { month: "May 25", spending: 119, income: 103 },
    { month: "May 31", spending: 148, income: 103 },
  ],
  quarter: [
    { month: "Mar", spending: 212, income: 318 },
    { month: "Apr", spending: 186, income: 318 },
    { month: "May", spending: 148, income: 318 },
  ],
  half: [
    { month: "Dec", spending: 202, income: 303 },
    { month: "Jan", spending: 224, income: 302 },
    { month: "Feb", spending: 177, income: 305 },
    { month: "Mar", spending: 212, income: 318 },
    { month: "Apr", spending: 186, income: 318 },
    { month: "May", spending: 148, income: 318 },
  ],
};

const categories = [
  { name: "Housing", amount: "$1,240", value: 39, color: "#0c397b", icon: Home },
  { name: "Food", amount: "$490", value: 15, color: "#05b7e8", icon: Utensils },
  { name: "Transport", amount: "$318", value: 10, color: "#77cde6", icon: CarFront },
  { name: "Shopping", amount: "$274", value: 9, color: "#f2b66d", icon: ShoppingBag },
  { name: "Entertainment", amount: "$206", value: 7, color: "#9db4ce", icon: Sparkles },
];

const transactions = [
  { merchant: "Whole Foods Market", category: "Food & dining", date: "May 28, 2024", amount: "-$86.42", icon: Utensils, tone: "teal" },
  { merchant: "Harbor Apartments", category: "Housing", date: "May 27, 2024", amount: "-$1,240.00", icon: Home, tone: "blue" },
  { merchant: "Northstar Studio", category: "Monthly income", date: "May 26, 2024", amount: "+$3,240.00", icon: ArrowDownLeft, tone: "gold", positive: true },
  { merchant: "Metro Transit", category: "Transport", date: "May 24, 2024", amount: "-$42.00", icon: CarFront, tone: "lavender" },
  { merchant: "Luna Coffee", category: "Food & dining", date: "May 23, 2024", amount: "-$6.80", icon: Coffee, tone: "peach" },
  { merchant: "Aster & Co.", category: "Shopping", date: "May 21, 2024", amount: "-$128.50", icon: ShoppingBag, tone: "cyan" },
];

const budgets = [
  { name: "Food", spent: 490, total: 650, color: "#05b7e8", icon: Utensils, note: "A little room for the weekend" },
  { name: "Shopping", spent: 274, total: 400, color: "#f2b66d", icon: ShoppingBag, note: "On track for this month" },
  { name: "Entertainment", spent: 206, total: 250, color: "#9db4ce", icon: Sparkles, note: "One more good night out" },
];

const money = (amount) => `$${amount.toLocaleString("en-US")}`;

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      <p><span className="tooltip-dot tooltip-dot-spending" /> Spending <strong>{money(payload[0].value)}k</strong></p>
      <p><span className="tooltip-dot tooltip-dot-income" /> Income <strong>{money(payload[1]?.value || 0)}k</strong></p>
    </div>
  );
}

function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <button aria-label="Close navigation" className="sidebar-backdrop" onClick={onClose} data-testid="button-close-sidebar" />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-symbol" aria-hidden="true"><CircleDollarSign size={21} strokeWidth={2.3} /></div>
          <span>ledgerly</span>
          <button className="mobile-close" onClick={onClose} aria-label="Close navigation" data-testid="button-mobile-close"><X size={19} /></button>
        </div>

        <div className="sidebar-intro">
          <p className="sidebar-kicker">PERSONAL FINANCE</p>
          <p className="sidebar-caption">A clearer view of your money.</p>
        </div>

        <nav aria-label="Primary navigation" className="sidebar-nav">
          <p className="nav-section-label">Workspace</p>
          {navigation.slice(0, 4).map(({ label, icon: Icon, active }) => (
            <button className={`nav-item ${active ? "nav-item-active" : ""}`} key={label} onClick={onClose} data-testid={`nav-${label.toLowerCase()}`}>
              <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
              <span>{label}</span>
              {active && <span className="nav-active-mark" aria-hidden="true" />}
            </button>
          ))}
          <p className="nav-section-label nav-section-secondary">Your space</p>
          {navigation.slice(4).map(({ label, icon: Icon }) => (
            <button className="nav-item" key={label} onClick={onClose} data-testid={`nav-${label.toLowerCase()}`}>
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-tip">
            <div className="tip-icon"><PiggyBank size={18} /></div>
            <div>
              <p className="tip-title">Small steps add up</p>
              <p className="tip-copy">You saved $420 more than last month.</p>
            </div>
          </div>
          <p className="sidebar-version">Ledgerly <span>v1.0</span></p>
        </div>
      </aside>
    </>
  );
}

function StatCard({ label, value, change, detail, icon: Icon, tone, testId }) {
  return (
    <article className={`stat-card stat-card-${tone}`} data-testid={testId}>
      <div className="stat-topline">
        <span className="stat-label">{label}</span>
        <span className="stat-icon"><Icon size={17} strokeWidth={1.9} /></span>
      </div>
      <p className="stat-value">{value}</p>
      <div className="stat-meta">
        <span className={`stat-change ${change?.startsWith("-") ? "stat-change-down" : ""}`}>{change}</span>
        <span className="stat-detail">{detail}</span>
      </div>
    </article>
  );
}

function App() {
  const [period, setPeriod] = useState("half");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const chartData = useMemo(() => spendHistory[period], [period]);
  const periodLabel = period === "month" ? "This month" : period === "quarter" ? "Last 3 months" : "Last 6 months";

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-greeting">
            <button className="mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Open navigation" data-testid="button-open-sidebar"><Menu size={21} /></button>
            <div>
              <p className="header-date">Tuesday, May 28, 2024</p>
              <h1>Good morning, Alex <Sparkles className="wave-mark" size={14} strokeWidth={2.2} aria-hidden="true" /></h1>
            </div>
          </div>
          <div className="topbar-actions">
            <div className="notification-wrap">
              <button className={`icon-button ${notificationsOpen ? "icon-button-active" : ""}`} aria-label="View notifications" onClick={() => setNotificationsOpen(!notificationsOpen)} data-testid="button-notifications">
                <Bell size={19} strokeWidth={1.8} /><span className="notification-dot" />
              </button>
              {notificationsOpen && <div className="popover notification-popover"><p className="popover-title">You are all caught up</p><p className="popover-copy">No new money moments today.</p></div>}
            </div>
            <div className="profile-wrap">
              <button className="profile-button" onClick={() => setProfileOpen(!profileOpen)} aria-expanded={profileOpen} data-testid="button-profile">
                <span className="avatar">AS</span>
                <span className="profile-copy"><strong>Alex Smith</strong><small>Personal account</small></span>
                <ChevronDown size={16} className={profileOpen ? "rotate-chevron" : ""} />
              </button>
              {profileOpen && <div className="popover profile-popover"><button data-testid="button-view-profile">View profile</button><button data-testid="button-preferences">Preferences</button></div>}
            </div>
          </div>
        </header>

        <div className="dashboard-body">
          <section className="welcome-row">
            <div>
              <p className="eyebrow">YOUR MONEY, IN FOCUS</p>
              <h2>Here&apos;s your financial picture.</h2>
              <p className="welcome-copy">A quiet moment to check in, make a plan, and keep moving forward.</p>
            </div>
            <button className="add-action" data-testid="button-add-transaction"><span>+</span> Add transaction</button>
          </section>

          <section className="stats-grid" aria-label="Financial summary">
            <StatCard label="Total balance" value="$24,680.42" change="+$1,420.00" detail="vs. last month" icon={WalletCards} tone="primary" testId="card-total-balance" />
            <StatCard label="Monthly income" value="$3,240.00" change="+8.4%" detail="vs. last month" icon={ArrowDownLeft} tone="income" testId="card-monthly-income" />
            <StatCard label="Monthly spending" value="$2,534.18" change="-4.2%" detail="vs. last month" icon={ArrowUpRight} tone="spending" testId="card-monthly-spending" />
            <StatCard label="Savings rate" value="21.8%" change="+2.6%" detail="vs. last month" icon={PiggyBank} tone="savings" testId="card-savings-rate" />
          </section>

          <section className="dashboard-grid dashboard-grid-primary">
            <article className="card spending-card" data-testid="card-spending-overview">
              <div className="card-header">
                <div><p className="card-overline">MONEY FLOW</p><h3>Spending overview</h3><p className="card-subtitle">Your outgoings compared with income</p></div>
                <div className="period-selector" role="group" aria-label="Spending period">
                  {[["month", "1M"], ["quarter", "3M"], ["half", "6M"]].map(([value, label]) => (
                    <button className={period === value ? "period-active" : ""} key={value} onClick={() => setPeriod(value)} aria-pressed={period === value} data-testid={`button-period-${value}`}>{label}</button>
                  ))}
                </div>
              </div>
              <div className="chart-summary"><div><span className="chart-current-label">{periodLabel}</span><strong>$2,534.18</strong></div><span className="chart-trend"><ArrowDownLeft size={14} /> 4.2% <small>less than before</small></span></div>
              <div className="area-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData} margin={{ top: 18, right: 5, left: -18, bottom: 0 }}><defs><linearGradient id="spendingFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#05b7e8" stopOpacity={0.24} /><stop offset="100%" stopColor="#05b7e8" stopOpacity={0} /></linearGradient><linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0c397b" stopOpacity={0.07} /><stop offset="100%" stopColor="#0c397b" stopOpacity={0} /></linearGradient></defs><CartesianGrid vertical={false} stroke="#e7eff5" strokeDasharray="4 4" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#8da0b0", fontSize: 11 }} dy={9} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "#8da0b0", fontSize: 11 }} tickFormatter={(value) => `$${value}k`} /><Tooltip content={<ChartTooltip />} cursor={{ stroke: "#b8d8e4", strokeDasharray: "4 4" }} /><Area type="monotone" dataKey="income" stroke="#0c397b" strokeWidth={2} strokeOpacity={0.35} fill="url(#incomeFill)" activeDot={{ r: 4, fill: "#0c397b", stroke: "#fff", strokeWidth: 2 }} /><Area type="monotone" dataKey="spending" stroke="#05b7e8" strokeWidth={2.5} fill="url(#spendingFill)" activeDot={{ r: 5, fill: "#05b7e8", stroke: "#fff", strokeWidth: 2 }} /></AreaChart></ResponsiveContainer></div>
              <div className="chart-legend"><span><i className="legend-line legend-line-teal" /> Spending</span><span><i className="legend-line legend-line-blue" /> Income</span><span className="chart-caption">Updated just now</span></div>
            </article>

            <article className="card category-card" data-testid="card-expenses-category">
              <div className="card-header"><div><p className="card-overline">WHERE IT GOES</p><h3>Expenses by category</h3><p className="card-subtitle">May 2024 · $2,534 total</p></div><button className="more-button" aria-label="More expense options" data-testid="button-category-options"><MoreHorizontal size={19} /></button></div>
              <div className="donut-layout"><div className="donut-chart"><ResponsiveContainer width="100%" height="100%"><RechartsPieChart><Pie data={categories} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={63} outerRadius={88} paddingAngle={3} stroke="#fff" strokeWidth={3} startAngle={90} endAngle={-270}>{categories.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip formatter={(value, name) => [`${value}%`, name]} contentStyle={{ borderRadius: 10, border: "1px solid #dbe7f1", boxShadow: "0 6px 20px rgba(12,57,123,.08)", fontSize: 12 }} /></RechartsPieChart></ResponsiveContainer><div className="donut-center"><strong>2.5k</strong><span>spent</span></div></div><div className="category-legend">{categories.map(({ name, amount, color, value, icon: Icon }) => <div className="category-row" key={name}><div className="category-name"><span className="category-icon" style={{ color, background: `${color}16` }}><Icon size={13} /></span><span>{name}</span></div><div className="category-number"><strong>{amount}</strong><span>{value}%</span></div></div>)}</div></div>
            </article>
          </section>

          <section className="dashboard-grid dashboard-grid-secondary">
            <article className="card transactions-card" data-testid="card-recent-transactions">
              <div className="card-header"><div><p className="card-overline">RECENT ACTIVITY</p><h3>Recent transactions</h3><p className="card-subtitle">The latest movement across your accounts</p></div><button className="text-action" data-testid="button-view-transactions">View all <ArrowUpRight size={15} /></button></div>
              <div className="transactions-list">{transactions.map(({ merchant, category, date, amount, icon: Icon, tone, positive }, index) => <div className="transaction-row" key={merchant}><div className={`transaction-icon transaction-icon-${tone}`}><Icon size={16} strokeWidth={1.9} /></div><div className="transaction-main"><strong>{merchant}</strong><span>{category}</span></div><div className="transaction-date">{date}</div><strong className={`transaction-amount ${positive ? "amount-positive" : ""}`}>{amount}</strong><button className="row-more" aria-label={`More options for ${merchant}`} data-testid={`button-transaction-more-${index}`}><MoreHorizontal size={16} /></button></div>)}</div>
            </article>

            <article className="card investments-card" data-testid="card-investments">
              <div className="card-header"><div><p className="card-overline">LONG-TERM VIEW</p><h3>Investments</h3><p className="card-subtitle">A steady little portfolio</p></div><button className="more-button" aria-label="More investment options" data-testid="button-investment-options"><MoreHorizontal size={19} /></button></div>
              <div className="portfolio-total"><span>Total portfolio value</span><strong>$8,460.72</strong><div className="portfolio-gain"><ArrowUpRight size={14} /> +12.6% <small>all time</small></div></div>
              <div className="holdings"><p className="holdings-label">TOP HOLDINGS</p>{[["Vanguard Total Stock", "VTI", "$3,220.40", "+15.2%", "#0c397b"], ["Apple Inc.", "AAPL", "$2,840.12", "+9.8%", "#05b7e8"], ["iShares Core Bond", "AGG", "$1,480.20", "+4.1%", "#f2b66d"]].map(([name, ticker, value, gain, color]) => <div className="holding-row" key={ticker}><span className="holding-mark" style={{ background: color }}>{ticker.slice(0, 1)}</span><span className="holding-name"><strong>{name}</strong><small>{ticker}</small></span><span className="holding-value"><strong>{value}</strong><small>{gain}</small></span></div>)}</div>
              <button className="portfolio-action" data-testid="button-view-investments">View portfolio <ArrowUpRight size={15} /></button>
            </article>
          </section>

          <section className="card budget-card" data-testid="card-budgets">
            <div className="card-header budget-header"><div><p className="card-overline">PLAN AHEAD</p><h3>Budget check-in</h3><p className="card-subtitle">Your May budgets, at a glance</p></div><button className="text-action" data-testid="button-manage-budgets">Manage budgets <ArrowUpRight size={15} /></button></div>
            <div className="budget-grid">{budgets.map(({ name, spent, total, color, icon: Icon, note }) => { const percentage = Math.round((spent / total) * 100); return <div className="budget-item" key={name}><div className="budget-title-row"><div className="budget-label"><span className="budget-icon" style={{ color, background: `${color}16` }}><Icon size={16} /></span><strong>{name}</strong></div><span className="budget-percent">{percentage}%</span></div><div className="progress-track"><span className="progress-fill" style={{ width: `${percentage}%`, background: color }} /></div><div className="budget-number-row"><span><strong>{money(spent)}</strong> of {money(total)}</span><span>{money(total - spent)} left</span></div><p className="budget-note">{note}</p></div>; })}</div>
          </section>
        </div>
        <footer className="page-footer"><span>Ledgerly is a calm space for your everyday money.</span><span>Last synced locally · just now</span></footer>
      </main>
    </div>
  );
}

export default App;