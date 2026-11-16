"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Row = { engine: string; node: string; cloud: string; qps: number; p95: number; bars: number[] };

const seed: Row[] = [
  { engine: "Oracle", node: "ora-fin-rac01", cloud: "OCI", qps: 4820, p95: 3.1, bars: [5, 7, 6, 8, 7, 9, 8, 7, 9, 10, 8, 9] },
  { engine: "SQL Server", node: "mssql-ag-prd", cloud: "Azure", qps: 3215, p95: 4.4, bars: [6, 5, 7, 6, 8, 7, 6, 8, 7, 7, 9, 8] },
  { engine: "MySQL", node: "mysql-ic-03", cloud: "AWS", qps: 6170, p95: 2.2, bars: [4, 6, 5, 7, 6, 5, 7, 8, 6, 7, 6, 8] },
  { engine: "PostgreSQL", node: "pg-patroni-1", cloud: "AWS", qps: 5390, p95: 2.7, bars: [7, 6, 8, 7, 9, 8, 7, 8, 10, 9, 8, 9] },
];

const logPool = [
  ["OK", "pg-patroni-1 · replica lag 0.18s"],
  ["TUNE", "ora-fin-rac01 · SQL plan baseline accepted"],
  ["OK", "mssql-ag-prd · AG sync healthy (3/3)"],
  ["BACKUP", "mysql-ic-03 · PITR snapshot verified"],
  ["SCALE", "aurora-pg · reader added (eu-west-2)"],
  ["OK", "adw-lakehouse · pipeline 'orders_cdc' fresh"],
  ["DR", "ora-fin-rac01 · Data Guard switchover drill passed"],
  ["TUNE", "pg-patroni-1 · autovacuum thresholds adjusted"],
  ["OK", "fabric-ingest · 14 tables loaded, 0 rejects"],
  ["SEC", "mssql-ag-prd · TDE key rotation complete"],
] as const;

const tagColor: Record<string, string> = {
  OK: "text-teal",
  TUNE: "text-sky-300",
  BACKUP: "text-violet-300",
  SCALE: "text-amber-300",
  DR: "text-rose-300",
  SEC: "text-emerald-300",
};

export function OpsConsole() {
  const reduce = useReducedMotion();
  const [rows, setRows] = useState(seed);
  const [logs, setLogs] = useState(() => logPool.slice(0, 4).map((l, i) => ({ id: i, tag: l[0], msg: l[1] })));
  const counter = useRef(4);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      setRows((prev) =>
        prev.map((r) => {
          const next = Math.max(3, Math.min(10, r.bars[r.bars.length - 1] + Math.round(Math.random() * 4 - 2)));
          return {
            ...r,
            qps: Math.round(r.qps * (0.97 + Math.random() * 0.06)),
            p95: Math.max(1.2, +(r.p95 + (Math.random() * 0.6 - 0.3)).toFixed(1)),
            bars: [...r.bars.slice(1), next],
          };
        }),
      );
    }, 1400);
    const l = setInterval(() => {
      const n = counter.current++;
      const [tag, msg] = logPool[n % logPool.length];
      setLogs((prev) => [...prev.slice(-3), { id: n, tag, msg }]);
    }, 2300);
    return () => {
      clearInterval(t);
      clearInterval(l);
    };
  }, [reduce]);

  return (
    <div className="relative">
      {/* glow */}
      <div className="absolute -inset-8 rounded-[3rem] bg-teal/20 blur-3xl" aria-hidden />
      <div
        className="relative overflow-hidden bg-navy-900/90 ring-1 ring-white/10 backdrop-blur clip-bevel shadow-2xl shadow-black/50"
        role="img"
        aria-label="Illustrative monitoring console showing healthy Oracle, SQL Server, MySQL and PostgreSQL clusters across OCI, Azure and AWS"
      >
        {/* scanline */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-transparent via-teal/[0.06] to-transparent animate-scan" />

        {/* title bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 font-mono text-[0.7rem] text-white/50">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-teal" />
            <span className="ml-3 text-white/70">adept://estate-monitor</span>
          </div>
          <span className="flex items-center gap-1.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-teal" />
            </span>
            LIVE
          </span>
        </div>

        {/* rows */}
        <div className="divide-y divide-white/[0.06] px-5">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 py-2.5 font-mono text-[0.62rem] uppercase tracking-wider text-white/35 sm:grid-cols-[1.3fr_auto_auto_auto]">
            <span>Cluster</span>
            <span className="hidden sm:block">Load</span>
            <span className="text-right">QPS</span>
            <span className="text-right">p95</span>
          </div>
          {rows.map((r) => (
            <div
              key={r.node}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-4 py-3 sm:grid-cols-[1.3fr_auto_auto_auto]"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-teal shadow-[0_0_8px] shadow-teal" />
                  <span className="truncate font-display text-sm font-bold text-white">{r.engine}</span>
                  <span className="rounded-sm bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.6rem] text-white/50">
                    {r.cloud}
                  </span>
                </div>
                <div className="mt-0.5 pl-3.5 font-mono text-[0.68rem] text-white/40">{r.node}</div>
              </div>
              <div className="hidden h-7 items-end gap-[3px] sm:flex" aria-hidden>
                {r.bars.map((b, i) => (
                  <motion.span
                    key={i}
                    className="w-[5px] rounded-[1px] bg-gradient-to-t from-teal/40 to-teal"
                    animate={{ height: `${b * 10}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                ))}
              </div>
              <span className="text-right font-mono text-sm tabular-nums text-white/85">{r.qps.toLocaleString("en-GB")}</span>
              <span className="w-14 text-right font-mono text-sm tabular-nums text-teal">{r.p95.toFixed(1)}ms</span>
            </div>
          ))}
        </div>

        {/* log */}
        <div className="border-t border-white/10 bg-black/25 px-5 py-4 font-mono text-[0.7rem] leading-6">
          <div className="h-24 overflow-hidden">
            <AnimatePresence initial={false}>
              {logs.map((l) => (
                <motion.div
                  key={l.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex gap-3 truncate"
                >
                  <span className={`w-14 shrink-0 ${tagColor[l.tag] ?? "text-teal"}`}>[{l.tag}]</span>
                  <span className="truncate text-white/60">{l.msg}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="mt-1 text-white/70">
            <span className="text-teal">adept</span>
            <span className="text-white/40">@estate</span>:~$ <span className="inline-block h-3.5 w-2 translate-y-0.5 bg-teal animate-blink" />
          </div>
        </div>
      </div>
      <p className="mt-3 text-right font-mono text-[0.6rem] uppercase tracking-widest text-white/30">Illustrative</p>
    </div>
  );
}
