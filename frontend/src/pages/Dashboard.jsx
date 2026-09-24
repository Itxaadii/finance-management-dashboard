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

// Icon-wrapper tone classes that used to live in .transaction-icon-*
const transactionIconTone = {
  teal: "text-[#148ca2] bg-[#e8f8f6]",
  blue: "text-[#5b7c9f] bg-[#edf3fa]",
  gold: "text-[#a77639] bg-[#fff3df]",
  lavender: "text-[#667ea2] bg-[#eff2fc]",
  peach: "text-[#b56d50] bg-[#fff0eb]",
  cyan: "text-[#1585aa] bg-[#e8f8fb]",
};

const CARD_BASE =
  "rounded-2xl border border-[#dbe7f1]/[0.92] bg-white/90 shadow-[0_6px_20px_rgba(12,57,123,0.035)]";

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="min-w-[134px] rounded-[9px] border border-line bg-white/[0.97] px-[10px] py-[9px] text-[10px] text-muted shadow-[0_8px_24px_rgba(12,57,123,0.1)]">
      <p className="mb-[7px] font-extrabold text-ink">{label}</p>
      <p className="mt-1 flex items-center gap-[5px]">
        <span className="h-[5px] w-[5px] rounded-full bg-paytm" /> Spending
        <strong className="ml-auto text-ink">{money(payload[0].value)}k</strong>
      </p>
      <p className="mt-1 flex items-center gap-[5px]">
        <span className="h-[5px] w-[5px] rounded-full bg-ink/50" /> Income
        <strong className="ml-auto text-ink">{money(payload[1]?.value || 0)}k</strong>
      </p>
    </div>
  );
}

function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <button
          aria-label="Close navigation"
          className="sidebar-backdrop fixed inset-0 z-[19] hidden border-0 bg-[rgba(8,45,101,0.28)] max-[850px]:block"
          onClick={onClose}
          data-testid="button-close-sidebar"
        />
      )}
      <aside
        className={`sidebar ${open ? "sidebar-open" : ""} fixed inset-y-0 left-0 z-20 flex w-[252px] min-h-dvh flex-col bg-[linear-gradient(159deg,#0c397b_0%,#0a3473_58%,#082d65_100%)] p-[27px_18px_18px] text-[#eaf8ff] shadow-[9px_0_32px_rgba(12,57,123,0.06)]`}
      >
        <div className="flex items-center gap-[10px] px-[13px] text-[19px] font-bold tracking-[-0.045em] text-white">
          <div className="grid h-[34px] w-[34px] place-items-center rounded-[11px] border border-white/[0.22] bg-[#54c8e9]/[0.16] text-pale">
            <CircleDollarSign size={21} strokeWidth={2.3} />
          </div>
          <span>ledgerly</span>
          <button
            className="ml-auto hidden h-[29px] w-[29px] place-items-center rounded-[8px] border-0 bg-transparent text-[rgba(238,250,255,0.7)] max-[850px]:grid"
            onClick={onClose}
            aria-label="Close navigation"
            data-testid="button-mobile-close"
          >
            <X size={19} />
          </button>
        </div>

        <div className="mx-[13px] mb-[29px] mt-[56px]">
          <p className="mb-[9px] text-[9px] font-extrabold tracking-[.16em] text-pale">
            PERSONAL FINANCE
          </p>
          <p className="max-w-[150px] text-[12px] leading-[1.45] text-[rgba(238,250,255,0.58)]">
            A clearer view of your money.
          </p>
        </div>

        <nav aria-label="Primary navigation" className="flex flex-col gap-1">
          <p className="mx-[13px] mb-[9px] text-[9px] font-extrabold uppercase tracking-[.16em] text-[rgba(169,225,242,0.53)]">
            Workspace
          </p>
          {navigation.slice(0, 4).map(({ label, icon: Icon, active }) => (
            <button
              className={`relative flex h-[45px] w-full items-center gap-[13px] rounded-xl px-[14px] text-left text-[13px] transition-colors duration-[180ms] ${
                active
                  ? "bg-pale font-bold text-[#073e63] shadow-[0_8px_18px_rgba(0,0,0,0.08)]"
                  : "text-[rgba(238,250,255,0.62)] hover:bg-pale/10 hover:text-white"
              }`}
              key={label}
              onClick={onClose}
              data-testid={`nav-${label.toLowerCase()}`}
            >
              <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
              <span>{label}</span>
              {active && (
                <span className="absolute right-[10px] h-[17px] w-[3px] rounded-[5px] bg-paytm" aria-hidden="true" />
              )}
            </button>
          ))}
          <p className="mx-[13px] mb-[9px] mt-[31px] text-[9px] font-extrabold uppercase tracking-[.16em] text-[rgba(169,225,242,0.53)]">
            Your space
          </p>
          {navigation.slice(4).map(({ label, icon: Icon }) => (
            <button
              className="flex h-[45px] w-full items-center gap-[13px] rounded-xl px-[14px] text-left text-[13px] text-[rgba(238,250,255,0.62)] transition-colors duration-[180ms] hover:bg-pale/10 hover:text-white"
              key={label}
              onClick={onClose}
              data-testid={`nav-${label.toLowerCase()}`}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto">
          <div className="mx-[5px] mb-[25px] flex gap-[10px] rounded-[13px] border border-[#a9e1f2]/[0.14] bg-[#a9e1f2]/[0.08] p-[12px_10px]">
            <div className="grid h-[30px] w-[30px] flex-none place-items-center rounded-[9px] bg-[#54c8e9]/[0.13] text-cyan">
              <PiggyBank size={18} />
            </div>
            <div>
              <p className="mb-1 text-[11px] font-bold text-[rgba(238,250,255,0.86)]">Small steps add up</p>
              <p className="text-[10px] leading-[1.45] text-[rgba(238,250,255,0.52)]">
                You saved $420 more than last month.
              </p>
            </div>
          </div>
          <p className="mx-[13px] flex justify-between text-[10px] text-[rgba(238,250,255,0.42)]">
            <span>Ledgerly</span>
            <span>v1.0</span>
          </p>
        </div>
      </aside>
    </>
  );
}

function StatCard({ label, value, change, detail, icon: Icon, tone, testId }) {
  const isPrimary = tone === "primary";
  const iconTone = {
    primary: "text-pale bg-[#a9e1f2]/[0.14]",
    income: "text-[#1684a3] bg-[#e8f7f6]",
    spending: "text-[#ba7533] bg-[#fff4e5]",
    savings: "text-[#587e9d] bg-[#eef2fa]",
  }[tone];

  return (
    <article
      className={`min-h-[139px] rounded-2xl border p-[18px_19px_16px] shadow-[0_6px_20px_rgba(12,57,123,0.035)] max-[560px]:min-h-[126px] max-[560px]:p-[15px_14px] ${
        isPrimary
          ? "border-transparent bg-gradient-to-br from-[#0c397b] to-[#092f6b] text-[#eaf8ff] shadow-[0_11px_23px_rgba(12,57,123,0.13)]"
          : "border-[#dbe7f1]/[0.92] bg-white/90"
      }`}
      data-testid={testId}
    >
      <div className="flex items-center justify-between gap-[10px]">
        <span
          className={`text-[11px] font-semibold max-[560px]:text-[9px] ${
            isPrimary ? "text-[rgba(238,250,255,0.7)]" : "text-[#748da0]"
          }`}
        >
          {label}
        </span>
        <span className={`grid h-[31px] w-[31px] place-items-center rounded-[9px] max-[560px]:h-[27px] max-[560px]:w-[27px] ${iconTone}`}>
          <Icon size={17} strokeWidth={1.9} />
        </span>
      </div>
      <p
        className={`mb-[12px] mt-[18px] text-2xl font-[750] tracking-[-0.06em] max-[560px]:mb-[10px] max-[560px]:mt-[16px] max-[560px]:text-[20px] ${
          isPrimary ? "text-white" : "text-ink-deep"
        }`}
      >
        {value}
      </p>
      <div className="flex items-center gap-[7px]">
        <span
          className={`text-[10px] font-extrabold max-[560px]:text-[9px] ${
            isPrimary ? "text-pale" : change?.startsWith("-") ? "text-[#168c80]" : "text-[#1684a3]"
          }`}
        >
          {change}
        </span>
        <span className={`text-[10px] max-[560px]:text-[9px] ${isPrimary ? "text-[rgba(238,250,255,0.52)]" : "text-[#94a5b2]"}`}>
          {detail}
        </span>
      </div>
    </article>
  );
}

function Dashboard() {
  const [period, setPeriod] = useState("half");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const chartData = useMemo(() => spendHistory[period], [period]);
  const periodLabel = period === "month" ? "This month" : period === "quarter" ? "Last 3 months" : "Last 6 months";

  return (
    <div className="app-shell flex min-h-dvh bg-paper">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="main-content min-w-0 w-[calc(100%-252px)] ml-[252px]">
        <header className="topbar flex h-[84px] items-center justify-between gap-[18px] border-b border-[rgba(219,231,241,0.8)] bg-[rgba(247,249,251,0.82)] px-[clamp(25px,4vw,57px)]">
          <div className="flex items-center gap-[17px] max-[560px]:gap-[11px]">
            <button
              className="hidden h-[37px] w-[37px] place-items-center rounded-[11px] border border-line bg-white text-ink max-[850px]:grid"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
              data-testid="button-open-sidebar"
            >
              <Menu size={21} />
            </button>
            <div>
              <p className="mb-1 text-[11px] text-[#8ca0b0] max-[560px]:text-[10px]">Tuesday, May 28, 2024</p>
              <h1 className="text-[18px] font-bold tracking-[-0.035em] text-ink-deep max-[560px]:text-[15px]">
                Good morning, Alex{" "}
                <Sparkles className="ml-1 inline-block -translate-y-px text-[14px] text-paytm" size={14} strokeWidth={2.2} aria-hidden="true" />
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-[21px] max-[560px]:gap-[6px]">
            <div className="relative">
              <button
                className={`relative grid h-[37px] w-[37px] place-items-center rounded-[11px] border border-transparent text-[#688397] transition-colors duration-[180ms] ${
                  notificationsOpen ? "border-line bg-white text-ink" : "hover:border-line hover:bg-white hover:text-ink"
                }`}
                aria-label="View notifications"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                data-testid="button-notifications"
              >
                <Bell size={19} strokeWidth={1.8} />
                <span className="absolute right-[7px] top-[7px] h-[6px] w-[6px] rounded-full border border-paper bg-paytm" />
              </button>
              {notificationsOpen && (
                <div className="absolute right-0 top-[calc(100%+12px)] z-30 w-[210px] rounded-xl border border-line bg-white/[0.98] p-[14px] shadow-[0_14px_34px_rgba(12,57,123,0.13)]">
                  <p className="mb-[5px] text-[12px] font-bold text-ink">You are all caught up</p>
                  <p className="text-[11px] leading-[1.45] text-[#8ca0b0]">No new money moments today.</p>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                className="flex items-center gap-[10px] border-0 bg-transparent py-[3px] pl-[7px] text-left text-ink"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-expanded={profileOpen}
                data-testid="button-profile"
              >
                <span className="grid h-[36px] w-[36px] place-items-center rounded-[12px] bg-pale text-[11px] font-[800] tracking-[.02em] text-ink">
                  AS
                </span>
                <span className="flex min-w-[88px] flex-col gap-[3px] max-[560px]:hidden">
                  <strong className="text-[12px] font-bold">Alex Smith</strong>
                  <small className="text-[10px] text-[#8ca0b0]">Personal account</small>
                </span>
                <ChevronDown
                  size={16}
                  className={`ml-[2px] text-[#8ca0b0] transition-transform duration-[180ms] max-[560px]:hidden ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-[calc(100%+12px)] z-30 w-[150px] rounded-xl border border-line bg-white/[0.98] p-[7px] shadow-[0_14px_34px_rgba(12,57,123,0.13)]">
                  <button
                    className="w-full rounded-[7px] px-[9px] py-[8px] text-left text-[11px] text-[#60788d] hover:bg-[#eef8fb] hover:text-ink"
                    data-testid="button-view-profile"
                  >
                    View profile
                  </button>
                  <button
                    className="w-full rounded-[7px] px-[9px] py-[8px] text-left text-[11px] text-[#60788d] hover:bg-[#eef8fb] hover:text-ink"
                    data-testid="button-preferences"
                  >
                    Preferences
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1520px] px-[clamp(25px,4vw,57px)] pb-[40px] pt-[34px] max-[560px]:px-[16px] max-[560px]:pb-[32px] max-[560px]:pt-[27px]">
          <section className="mb-[28px] flex items-end justify-between gap-[25px] max-[560px]:mb-[23px] max-[560px]:flex-col max-[560px]:items-start max-[560px]:gap-[17px]">
            <div>
              <p className="mb-[8px] text-[9px] font-extrabold tracking-[.16em] text-[#7f9aae]">YOUR MONEY, IN FOCUS</p>
              <h2 className="text-[clamp(23px,2.4vw,30px)] font-bold tracking-[-0.065em] text-ink-deep max-[560px]:max-w-[320px] max-[560px]:text-[25px]">
                Here&apos;s your financial picture.
              </h2>
              <p className="mt-[9px] text-[13px] leading-[1.5] text-[#7890a2] max-[560px]:max-w-[330px] max-[560px]:text-[12px]">
                A quiet moment to check in, make a plan, and keep moving forward.
              </p>
            </div>
            <button
              className="inline-flex h-[39px] items-center gap-[8px] whitespace-nowrap rounded-[10px] border border-paytm bg-paytm pl-[11px] pr-[15px] text-[11px] font-bold text-[#073e63] shadow-[0_7px_16px_rgba(5,183,232,0.16)] transition-all duration-[180ms] hover:-translate-y-px hover:shadow-[0_10px_20px_rgba(5,183,232,0.23)] max-[560px]:justify-center max-[560px]:self-stretch"
              data-testid="button-add-transaction"
            >
              <span className="grid h-[18px] w-[18px] place-items-center rounded-full border border-[rgba(7,62,99,0.25)] text-[16px] leading-none">
                +
              </span>
              Add transaction
            </button>
          </section>

          <section
            className="mb-[19px] grid grid-cols-4 gap-[14px] max-[850px]:grid-cols-2 max-[560px]:gap-[10px]"
            aria-label="Financial summary"
          >
            <StatCard label="Total balance" value="$24,680.42" change="+$1,420.00" detail="vs. last month" icon={WalletCards} tone="primary" testId="card-total-balance" />
            <StatCard label="Monthly income" value="$3,240.00" change="+8.4%" detail="vs. last month" icon={ArrowDownLeft} tone="income" testId="card-monthly-income" />
            <StatCard label="Monthly spending" value="$2,534.18" change="-4.2%" detail="vs. last month" icon={ArrowUpRight} tone="spending" testId="card-monthly-spending" />
            <StatCard label="Savings rate" value="21.8%" change="+2.6%" detail="vs. last month" icon={PiggyBank} tone="savings" testId="card-savings-rate" />
          </section>

          <section className="dashboard-grid-primary mb-[19px] grid gap-[19px] [grid-template-columns:minmax(0,1.48fr)_minmax(320px,0.9fr)]">
            <article className={`${CARD_BASE} p-[23px_24px] max-[560px]:rounded-[14px] max-[560px]:p-[19px_16px]`} data-testid="card-spending-overview">
              <div className="flex items-start justify-between gap-[18px]">
                <div>
                  <p className="mb-[7px] text-[9px] font-extrabold tracking-[.16em] text-[#8ca5b5]">MONEY FLOW</p>
                  <h3 className="text-[16px] tracking-[-0.035em] text-ink-deep max-[560px]:text-[15px]">Spending overview</h3>
                  <p className="mt-[5px] text-[11px] text-[#91a3af]">Your outgoings compared with income</p>
                </div>
                <div className="flex gap-[3px] rounded-[9px] bg-[#f0f6f8] p-[3px]" role="group" aria-label="Spending period">
                  {[["month", "1M"], ["quarter", "3M"], ["half", "6M"]].map(([value, label]) => (
                    <button
                      className={`h-[25px] min-w-[31px] rounded-[7px] text-[9px] font-extrabold ${
                        period === value ? "bg-white text-[#073e63] shadow-[0_2px_7px_rgba(12,57,123,0.09)]" : "text-[#8da0ad] hover:text-ink"
                      }`}
                      key={value}
                      onClick={() => setPeriod(value)}
                      aria-pressed={period === value}
                      data-testid={`button-period-${value}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-[5px] mt-[25px] flex items-end justify-between gap-[12px]">
                <div>
                  <span className="mb-[4px] block text-[10px] text-[#8ca0b0]">{periodLabel}</span>
                  <strong className="text-[25px] tracking-[-0.06em] text-ink max-[560px]:text-[22px]">$2,534.18</strong>
                </div>
                <span className="mb-[3px] inline-flex items-center gap-[3px] text-[10px] font-extrabold text-[#168c80]">
                  <ArrowDownLeft size={14} /> 4.2% <small className="ml-[2px] font-medium text-[#9caeb9] max-[560px]:hidden">less than before</small>
                </span>
              </div>
              <div className="h-[214px] -ml-[11px] -mr-[6px] mt-[6px] max-[560px]:h-[187px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 18, right: 5, left: -18, bottom: 0 }}>
                    <defs>
                      <linearGradient id="spendingFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#05b7e8" stopOpacity={0.24} />
                        <stop offset="100%" stopColor="#05b7e8" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0c397b" stopOpacity={0.07} />
                        <stop offset="100%" stopColor="#0c397b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#e7eff5" strokeDasharray="4 4" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#8da0b0", fontSize: 11 }} dy={9} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8da0b0", fontSize: 11 }} tickFormatter={(value) => `$${value}k`} />
                    <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#b8d8e4", strokeDasharray: "4 4" }} />
                    <Area type="monotone" dataKey="income" stroke="#0c397b" strokeWidth={2} strokeOpacity={0.35} fill="url(#incomeFill)" activeDot={{ r: 4, fill: "#0c397b", stroke: "#fff", strokeWidth: 2 }} />
                    <Area type="monotone" dataKey="spending" stroke="#05b7e8" strokeWidth={2.5} fill="url(#spendingFill)" activeDot={{ r: 5, fill: "#05b7e8", stroke: "#fff", strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-[6px] flex items-center gap-[17px] text-[10px] text-[#7e95a4]">
                <span className="inline-flex items-center gap-[6px]">
                  <i className="h-[2px] w-[15px] rounded-[5px] bg-paytm" /> Spending
                </span>
                <span className="inline-flex items-center gap-[6px]">
                  <i className="h-[2px] w-[15px] rounded-[5px] bg-ink/45" /> Income
                </span>
                <span className="ml-auto text-[#a1b1bc] max-[560px]:hidden">Updated just now</span>
              </div>
            </article>

            <article className={`${CARD_BASE} p-[23px_24px] max-[560px]:rounded-[14px] max-[560px]:p-[19px_16px]`} data-testid="card-expenses-category">
              <div className="flex items-start justify-between gap-[18px]">
                <div>
                  <p className="mb-[7px] text-[9px] font-extrabold tracking-[.16em] text-[#8ca5b5]">WHERE IT GOES</p>
                  <h3 className="text-[16px] tracking-[-0.035em] text-ink-deep max-[560px]:text-[15px]">Expenses by category</h3>
                  <p className="mt-[5px] text-[11px] text-[#91a3af]">May 2024 · $2,534 total</p>
                </div>
                <button className="-mr-[8px] -mt-[4px] grid h-[26px] w-[26px] place-items-center rounded-[7px] text-[#9aadb9] hover:bg-[#eef7fa] hover:text-ink" aria-label="More expense options" data-testid="button-category-options">
                  <MoreHorizontal size={19} />
                </button>
              </div>
              <div className="donut-layout mt-[19px] grid items-center gap-[8px] [grid-template-columns:165px_minmax(0,1fr)]">
                <div className="donut-chart relative h-[188px] w-[165px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie data={categories} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={63} outerRadius={88} paddingAngle={3} stroke="#fff" strokeWidth={3} startAngle={90} endAngle={-270}>
                        {categories.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [`${value}%`, name]} contentStyle={{ borderRadius: 10, border: "1px solid #dbe7f1", boxShadow: "0 6px 20px rgba(12,57,123,.08)", fontSize: 12 }} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <strong className="text-[21px] tracking-[-0.05em] text-ink">2.5k</strong>
                    <span className="mt-[2px] text-[10px] text-[#8fa2ae]">spent</span>
                  </div>
                </div>
                <div className="flex flex-col gap-[11px] max-[560px]:gap-[9px]">
                  {categories.map(({ name, amount, color, value, icon: Icon }) => (
                    <div className="flex items-center justify-between gap-[7px]" key={name}>
                      <div className="flex min-w-0 items-center gap-[7px] text-[10px] text-[#71899a]">
                        <span className="grid h-[24px] w-[24px] flex-none place-items-center rounded-[7px]" style={{ color, background: `${color}16` }}>
                          <Icon size={13} />
                        </span>
                        <span className="whitespace-nowrap">{name}</span>
                      </div>
                      <div className="flex flex-col items-end gap-[2px]">
                        <strong className="text-[10px] text-ink">{amount}</strong>
                        <span className="text-[9px] text-[#9eafb9]">{value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </section>

          <section className="dashboard-grid-secondary mb-[19px] grid gap-[19px] [grid-template-columns:minmax(0,1.48fr)_minmax(320px,0.9fr)]">
            <article className={`${CARD_BASE} p-[23px_24px] max-[560px]:rounded-[14px] max-[560px]:p-[19px_16px]`} data-testid="card-recent-transactions">
              <div className="flex items-start justify-between gap-[18px]">
                <div>
                  <p className="mb-[7px] text-[9px] font-extrabold tracking-[.16em] text-[#8ca5b5]">RECENT ACTIVITY</p>
                  <h3 className="text-[16px] tracking-[-0.035em] text-ink-deep max-[560px]:text-[15px]">Recent transactions</h3>
                  <p className="mt-[5px] text-[11px] text-[#91a3af]">The latest movement across your accounts</p>
                </div>
                <button className="-mr-[3px] inline-flex items-center gap-[5px] whitespace-nowrap p-1 text-[10px] font-bold text-[#1385a5] hover:text-ink" data-testid="button-view-transactions">
                  View all <ArrowUpRight size={15} />
                </button>
              </div>
              <div className="mt-[21px]">
                {transactions.map(({ merchant, category, date, amount, icon: Icon, tone, positive }, index) => (
                  <div
                    className="transaction-row grid min-h-[55px] items-center gap-[11px] border-t border-[#edf2f5] first:border-t-0 [grid-template-columns:32px_minmax(130px,1fr)_minmax(92px,auto)_auto_24px]"
                    key={merchant}
                  >
                    <div className={`grid h-[29px] w-[29px] place-items-center rounded-[9px] ${transactionIconTone[tone]}`}>
                      <Icon size={16} strokeWidth={1.9} />
                    </div>
                    <div className="flex min-w-0 flex-col gap-[3px]">
                      <strong className="overflow-hidden text-ellipsis whitespace-nowrap text-[11px] font-bold text-ink">{merchant}</strong>
                      <span className="text-[10px] text-[#98a9b4]">{category}</span>
                    </div>
                    <div className="whitespace-nowrap text-[10px] text-[#98a9b4] max-[1120px]:hidden">{date}</div>
                    <strong className={`whitespace-nowrap text-[11px] font-bold max-[560px]:text-[10px] ${positive ? "text-[#15917e]" : "text-[#617b8c]"}`}>
                      {amount}
                    </strong>
                    <button
                      className="grid h-[23px] w-[23px] place-items-center rounded-[6px] text-[#9aadb9] hover:bg-[#eef7fa] hover:text-ink max-[560px]:hidden"
                      aria-label={`More options for ${merchant}`}
                      data-testid={`button-transaction-more-${index}`}
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </article>

            <article className={`${CARD_BASE} p-[23px_24px] max-[560px]:rounded-[14px] max-[560px]:p-[19px_16px]`} data-testid="card-investments">
              <div className="flex items-start justify-between gap-[18px]">
                <div>
                  <p className="mb-[7px] text-[9px] font-extrabold tracking-[.16em] text-[#8ca5b5]">LONG-TERM VIEW</p>
                  <h3 className="text-[16px] tracking-[-0.035em] text-ink-deep max-[560px]:text-[15px]">Investments</h3>
                  <p className="mt-[5px] text-[11px] text-[#91a3af]">A steady little portfolio</p>
                </div>
                <button className="-mr-[8px] -mt-[4px] grid h-[26px] w-[26px] place-items-center rounded-[7px] text-[#9aadb9] hover:bg-[#eef7fa] hover:text-ink" aria-label="More investment options" data-testid="button-investment-options">
                  <MoreHorizontal size={19} />
                </button>
              </div>
              <div className="mb-[25px] mt-[23px] border-b border-[#edf2f5] pb-[19px]">
                <span className="mb-[5px] block text-[10px] text-[#8da0ad]">Total portfolio value</span>
                <strong className="inline-block text-[27px] tracking-[-0.065em] text-ink-deep">$8,460.72</strong>
                <div className="ml-[8px] inline-flex items-center gap-[3px] text-[10px] font-extrabold text-[#15917e]">
                  <ArrowUpRight size={14} /> +12.6% <small className="ml-[2px] font-medium text-[#9caeb9]">all time</small>
                </div>
              </div>
              <div>
                <p className="mb-[12px] text-[9px] font-extrabold tracking-[.15em] text-[#8ca5b5]">TOP HOLDINGS</p>
                {[
                  ["Vanguard Total Stock", "VTI", "$3,220.40", "+15.2%", "#0c397b"],
                  ["Apple Inc.", "AAPL", "$2,840.12", "+9.8%", "#05b7e8"],
                  ["iShares Core Bond", "AGG", "$1,480.20", "+4.1%", "#f2b66d"],
                ].map(([name, ticker, value, gain, color]) => (
                  <div className="mb-[13px] flex items-center gap-[9px]" key={ticker}>
                    <span className="grid h-[27px] w-[27px] place-items-center rounded-[8px] text-[9px] font-extrabold text-white" style={{ background: color }}>
                      {ticker.slice(0, 1)}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
                      <strong className="overflow-hidden text-ellipsis whitespace-nowrap text-[10px] text-[#5d7588]">{name}</strong>
                      <small className="text-[9px] text-[#a1b1bc]">{ticker}</small>
                    </span>
                    <span className="flex flex-col items-end gap-[3px]">
                      <strong className="text-[10px] text-ink">{value}</strong>
                      <small className="text-[9px] text-[#15917e]">{gain}</small>
                    </span>
                  </div>
                ))}
              </div>
              <button className="mt-[4px] flex h-[34px] w-full items-center justify-center gap-[6px] rounded-[9px] border border-[#b8dce8] bg-[#f6fcfd] text-[10px] font-bold text-[#1684a3] hover:border-paytm hover:bg-[#eefafd]" data-testid="button-view-investments">
                View portfolio <ArrowUpRight size={15} />
              </button>
            </article>
          </section>

          <section className={`${CARD_BASE} pb-[24px] p-[23px_24px] max-[560px]:rounded-[14px] max-[560px]:p-[19px_16px]`} data-testid="card-budgets">
            <div className="flex items-center justify-between gap-[18px] max-[560px]:items-start">
              <div>
                <p className="mb-[7px] text-[9px] font-extrabold tracking-[.16em] text-[#8ca5b5]">PLAN AHEAD</p>
                <h3 className="text-[16px] tracking-[-0.035em] text-ink-deep max-[560px]:text-[15px]">Budget check-in</h3>
                <p className="mt-[5px] text-[11px] text-[#91a3af]">Your May budgets, at a glance</p>
              </div>
              <button className="-mr-[3px] inline-flex items-center gap-[5px] whitespace-nowrap p-1 text-[10px] font-bold text-[#1385a5] hover:text-ink" data-testid="button-manage-budgets">
                Manage budgets <ArrowUpRight size={15} />
              </button>
            </div>
            <div className="mt-[24px] grid grid-cols-3 gap-[25px] max-[560px]:grid-cols-1 max-[560px]:gap-[21px] max-[560px]:mt-[20px]">
              {budgets.map(({ name, spent, total, color, icon: Icon, note }, index) => {
                const percentage = Math.round((spent / total) * 100);
                return (
                  <div
                    className={`min-w-0 ${index > 0 ? "max-[560px]:border-t max-[560px]:border-[#edf2f5] max-[560px]:pt-[19px]" : ""}`}
                    key={name}
                  >
                    <div className="flex items-center justify-between gap-[10px]">
                      <div className="flex items-center gap-[8px] text-[11px] text-ink">
                        <span className="grid h-[29px] w-[29px] place-items-center rounded-[8px]" style={{ color, background: `${color}16` }}>
                          <Icon size={16} />
                        </span>
                        <strong>{name}</strong>
                      </div>
                      <span className="text-[10px] font-extrabold text-[#8ea1ad]">{percentage}%</span>
                    </div>
                    <div className="my-[14px] h-[6px] overflow-hidden rounded-[9px] bg-[#edf2f5]">
                      <span className="block h-full rounded-[inherit]" style={{ width: `${percentage}%`, background: color }} />
                    </div>
                    <div className="mb-[8px] flex items-center justify-between gap-[8px] text-[9px] text-[#9babb6]">
                      <span>
                        <strong className="text-[10px] text-[#60798b]">{money(spent)}</strong> of {money(total)}
                      </span>
                      <span>{money(total - spent)} left</span>
                    </div>
                    <p className="mt-[9px] text-[9px] text-[#a0afb8]">{note}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
        <footer className="flex justify-between gap-[20px] px-[clamp(25px,4vw,57px)] pb-[25px] text-[10px] text-[#9babb6] max-[560px]:flex-col max-[560px]:gap-[6px] max-[560px]:px-[16px] max-[560px]:pb-[20px] max-[560px]:text-[9px]">
          <span>Ledgerly is a calm space for your everyday money.</span>
          <span>Last synced locally · just now</span>
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;