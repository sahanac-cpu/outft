const BOARDS = [
  { name: "Solo dates", n: "24 fits", a: "sw2", b: "sw6", c: "sw1" },
  { name: "Dinners out", n: "31 fits", a: "sw5", b: "sw3", c: "sw5" },
  { name: "Gym", n: "18 fits", a: "sw1", b: "sw4", c: "sw3" },
  { name: "Saved", n: "96 fits", a: "sw6", b: "sw2", c: "sw4" },
];

const WEEK = [
  { d: "M", sw: "sw1" },
  { d: "T", sw: "sw3" },
  { d: "W", sw: "sw6" },
  { d: "T", sw: "sw5" },
  { d: "F", sw: "sw2" },
  { d: "S", sw: "sw4" },
  { d: "S", sw: "" },
];

export function BoardsShowcase() {
  return (
    <div className="mx-auto max-w-[380px] rounded-[16px] border border-line bg-panel p-4">
      {/* this week */}
      <div className="mb-3 flex items-baseline justify-between">
        <span className="lbl">This week</span>
        <span className="text-[10px] text-grey">Week 21 · May 19–25</span>
      </div>
      <div className="mb-5 grid grid-cols-7 gap-1.5">
        {WEEK.map((w, i) => (
          <div key={i} className="text-center">
            <div
              className={`relative mb-1.5 overflow-hidden rounded-lg ${w.sw || "border border-dashed border-line2 bg-bone"}`}
              style={{ aspectRatio: "3 / 4" }}
            >
              {w.sw && <span className="grain-local" />}
            </div>
            <span className="text-[9px] uppercase tracking-[0.08em] text-grey">{w.d}</span>
          </div>
        ))}
      </div>

      {/* boards & backlogs */}
      <div className="mb-3 flex items-baseline justify-between">
        <span className="lbl">Boards &amp; backlogs</span>
        <span className="text-[10px] text-grey">See all</span>
      </div>
      <div className="grid grid-cols-2 gap-3.5">
        {BOARDS.map((bd) => (
          <div key={bd.name}>
            <div className="relative" style={{ aspectRatio: "7 / 5" }}>
              <div
                className={`absolute rounded-xl ${bd.a} shadow-[0_8px_18px_-12px_rgba(40,36,30,0.4)]`}
                style={{ inset: "8px 10px 0 6px", opacity: 0.5 }}
              />
              <div
                className={`absolute rounded-xl ${bd.b} shadow-[0_8px_18px_-12px_rgba(40,36,30,0.4)]`}
                style={{ inset: "4px 5px 0 3px", opacity: 0.75 }}
              />
              <div className={`absolute inset-0 overflow-hidden rounded-xl ${bd.c} shadow-[0_8px_18px_-12px_rgba(40,36,30,0.4)]`}>
                <span className="grain-local" />
              </div>
            </div>
            <div className="mt-2.5 text-[12px] text-ink">{bd.name}</div>
            <div className="text-[9.5px] uppercase tracking-[0.08em] text-grey">{bd.n}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
