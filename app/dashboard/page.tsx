'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, DollarSign, Cloud, Sprout, ShieldCheck } from 'lucide-react';

export default function DashboardPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [stats, setStats] = useState({
        activeCrops: 0,
        monthlyProfit: 0,
        monthlyIncome: 0,
        monthlyExpense: 0,
        pendingTasks: 0,
        weatherAlerts: 0,
    });

    useEffect(() => {
        const checkAuth = () => {
            try {
                const userData = localStorage.getItem('user');
                const token = localStorage.getItem('token');

                if (userData && token) {
                    setUser(JSON.parse(userData));
                    setIsLoading(false);
                } else {
                    router.replace('/landing');
                }
            } catch {
                router.replace('/landing');
            }
        };

        checkAuth();
        calculateStats();

        const handleUpdate = () => calculateStats();
        window.addEventListener('transactionsUpdated', handleUpdate);
        window.addEventListener('cropsUpdated', handleUpdate);
        window.addEventListener('tasksUpdated', handleUpdate);
        return () => {
            window.removeEventListener('transactionsUpdated', handleUpdate);
            window.removeEventListener('cropsUpdated', handleUpdate);
            window.removeEventListener('tasksUpdated', handleUpdate);
        };
    }, [router]);

    const calculateStats = () => {
        try {
            // ── Active Crops ─────────────────────────────────────
            const cropsRaw = localStorage.getItem('farmCrops');
            const activeCrops = cropsRaw ? JSON.parse(cropsRaw).filter((c: any) => c.status === 'active' || !c.status).length : 0;

            // ── Pending Tasks ─────────────────────────────────────
            const tasksRaw = localStorage.getItem('farmTasks');
            const pendingTasks = tasksRaw ? JSON.parse(tasksRaw).filter((t: any) => !t.completed && !t.done).length : 0;

            // ── Monthly Income / Expense ──────────────────────────
            const transactions = localStorage.getItem('farmTransactions');
            let monthlyIncome = 0, monthlyExpense = 0;
            if (transactions) {
                const parsed = JSON.parse(transactions);
                const now = new Date();
                const monthly = parsed.filter((t: any) => {
                    const d = new Date(t.date);
                    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
                });
                monthlyIncome = monthly.filter((t: any) => t.type === 'income').reduce((s: number, t: any) => s + t.amount, 0);
                monthlyExpense = monthly.filter((t: any) => t.type === 'expense').reduce((s: number, t: any) => s + t.amount, 0);
            }

            setStats({
                activeCrops,
                pendingTasks,
                monthlyIncome,
                monthlyExpense,
                monthlyProfit: monthlyIncome - monthlyExpense,
                weatherAlerts: 0,
            });
        } catch { }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="spinner mx-auto mb-4" />
                    <p style={{ color: 'var(--text-secondary)' }}>लोड हो रहा है...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
                <h1 className="text-2xl font-bold mb-1">नमस्ते, {user.name || 'किसान'}! 👋</h1>
                <p className="text-emerald-100 text-sm">आज आपके खेत के साथ क्या हो रहा है यहां देखें।</p>
                {user.email && (
                    <p className="text-emerald-200 text-xs mt-1">📧 {user.email}</p>
                )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    {
                        icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
                        bg: 'from-emerald-100 to-emerald-50',
                        label: 'इस महीने आय',
                        value: `\u20b9${stats.monthlyIncome.toLocaleString('en-IN')}`,
                        sub: 'खर्च ट्रैकर से',
                        link: '/expenses',
                        color: 'var(--text-primary)',
                    },
                    {
                        icon: <TrendingUp className="w-6 h-6 text-red-500" />,
                        bg: 'from-red-100 to-red-50',
                        label: 'इस महीने खर्च',
                        value: `\u20b9${stats.monthlyExpense.toLocaleString('en-IN')}`,
                        sub: 'खर्च ट्रैकर से',
                        link: '/expenses',
                        color: 'var(--text-primary)',
                    },
                    {
                        icon: <Sprout className="w-6 h-6 text-blue-600" />,
                        bg: 'from-blue-100 to-blue-50',
                        label: 'इस महीने मुनाफा',
                        value: `${stats.monthlyProfit >= 0 ? '+' : ''}\u20b9${stats.monthlyProfit.toLocaleString('en-IN')}`,
                        sub: stats.monthlyProfit >= 0 ? 'फायदे में' : 'घाटे में',
                        link: '/expenses',
                        color: stats.monthlyProfit >= 0 ? '#059669' : '#dc2626',
                    },
                    {
                        icon: <Cloud className="w-6 h-6 text-amber-600" />,
                        bg: 'from-amber-100 to-amber-50',
                        label: 'मौसम अलर्ट',
                        value: `${stats.weatherAlerts}`,
                        sub: 'आज का पूर्वानुमान',
                        link: '/weather',
                        color: 'var(--text-primary)',
                    },
                ].map((s, i) => (
                    <div key={i} className="card hover:shadow-lg cursor-pointer transition-all" onClick={() => router.push(s.link)}>
                        <div className="flex items-center">
                            <div className={`p-3 bg-gradient-to-br ${s.bg} rounded-lg shrink-0`}>{s.icon}</div>
                            <div className="ml-4 min-w-0">
                                <p className="text-sm truncate" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
                                <p className="text-2xl font-bold leading-tight" style={{ color: s.color }}>{s.value}</p>
                                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.sub}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            {/* Quick Access */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { href: '/weather', icon: <Cloud className="w-6 h-6 text-blue-600" />, bg: 'from-blue-100 to-blue-200', title: 'मौसम पूर्वानुमान', desc: 'आज का मौसम और खेती सलाह देखें', border: 'hover:border-blue-300' },
                    { href: '/crops', icon: <Sprout className="w-6 h-6 text-emerald-600" />, bg: 'from-emerald-100 to-emerald-200', title: 'फसल सुझाव', desc: '65+ फसलों की जानकारी देखें', border: 'hover:border-emerald-300' },
                    { href: '/prices', icon: <TrendingUp className="w-6 h-6 text-green-600" />, bg: 'from-green-100 to-green-200', title: 'मंडी भाव', desc: 'आज के ताजा मंडी भाव देखें', border: 'hover:border-green-300' },
                    { href: '/diseases', icon: <ShieldCheck className="w-6 h-6 text-red-600" />, bg: 'from-red-100 to-red-200', title: 'रोग पहचान', desc: 'फसल रोग की जांच करें', border: 'hover:border-red-300' },
                    { href: '/expenses', icon: <DollarSign className="w-6 h-6 text-purple-600" />, bg: 'from-purple-100 to-purple-200', title: 'खर्च ट्रैकर', desc: 'आय-व्यय का हिसाब रखें', border: 'hover:border-purple-300' },
                    { href: '/schemes', icon: <Sprout className="w-6 h-6 text-amber-600" />, bg: 'from-amber-100 to-amber-200', title: 'सरकारी योजनाएं', desc: 'योजनाओं के लिए आवेदन करें', border: 'hover:border-amber-300' },
                ].map((c, i) => (
                    <div key={i} onClick={() => router.push(c.href)}
                        className={`card hover:shadow-xl cursor-pointer border-2 border-transparent ${c.border} transition-all duration-300`}>
                        <div className="flex items-center mb-3">
                            <div className={`w-12 h-12 bg-gradient-to-br ${c.bg} rounded-xl flex items-center justify-center mr-3`}>{c.icon}</div>
                            <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{c.title}</h3>
                        </div>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{c.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
