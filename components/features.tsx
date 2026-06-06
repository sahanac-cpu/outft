import { Reveal } from "./reveal";
import { FtMark } from "./logo";
import { DnaWheel } from "./dna-wheel";
import { BoardsShowcase } from "./boards-showcase";

const FOLLOWS = [
  { i: "L", h: "@lenav", sw: "sw2" },
  { i: "M", h: "@maren", sw: "sw3" },
  { i: "A", h: "@ari", sw: "sw5" },
  { i: "T", h: "@theo", sw: "sw6" },
  { i: "S", h: "@soraya", sw: "sw4" },
  { i: "J", h: "@jude", sw: "sw1" },
  { i: "N", h: "@noor", sw: "sw5" },
  { i: "R", h: "@remy", sw: "sw3" },
];

export function Features() {
  return (
    <section id="dna" className="bg-bone">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <span className="lbl">What you get</span>
          <h2 className="mt-4 max-w-[20ch] font-serif text-[clamp(1.5rem,3vw,2.4rem)] font-medium leading-[1.05] tracking-[-0.01em]">
            Five ways outft reads you back.
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-px overflow-hidden rounded-[28px] border border-line2 bg-line2 md:mt-20">
          {/* 01 — Fashion DNA : the wheel */}
          <Reveal className="bg-white p-7 md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-14">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-[15px] text-grey-soft">01</span>
                  <h3 className="flex items-center gap-2 font-serif text-[28px] leading-tight md:text-[34px]">
                    Fashion <FtMark size="1.5rem" /> DNA
                  </h3>
                </div>
                <p className="mt-4 max-w-[40ch] text-[14.5px] leading-relaxed text-ink2">
                  Every fit you log is read for palette, cut and register, then
                  drawn as a wheel of facets around you. Quiet luxury, old money,
                  the wildcard seven percent.
                </p>
              </div>

              <div className="flex justify-center">
                <DnaWheel />
              </div>
            </div>
          </Reveal>

          {/* 02 — Boards & backlogs */}
          <Reveal className="bg-white p-7 md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-14">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-[15px] text-grey-soft">02</span>
                  <h3 className="font-serif text-[28px] leading-tight md:text-[34px]">
                    Boards &amp; backlogs
                  </h3>
                </div>
                <p className="mt-4 max-w-[40ch] text-[14.5px] leading-relaxed text-ink2">
                  Every fit becomes a record. Sort them into boards, keep a
                  backlog of the looks you have not worn yet, and watch the week
                  fill in day by day.
                </p>
              </div>

              <div>
                <BoardsShowcase />
              </div>
            </div>
          </Reveal>

          {/* 03 — Follow freely */}
          <Reveal className="bg-white p-7 md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-center md:gap-14">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-[15px] text-grey-soft">03</span>
                  <h3 className="font-serif text-[28px] leading-tight md:text-[34px]">
                    Follow freely
                  </h3>
                </div>
                <p className="mt-4 max-w-[40ch] text-[14.5px] leading-relaxed text-ink2">
                  Follow as many people and creators as you like. The only gate
                  is posting your own fit, so a bigger list never means a noisier
                  feed.
                </p>
              </div>

              <div className="flex flex-wrap items-end gap-x-5 gap-y-6">
                {FOLLOWS.map((s) => (
                  <div key={s.h} className="text-center">
                    <span
                      className={`mx-auto grid h-16 w-16 place-items-center rounded-full ${s.sw} font-serif text-[22px] text-white shadow-[0_12px_24px_-14px_rgba(40,36,30,0.5)]`}
                    >
                      {s.i}
                    </span>
                    <div className="mt-2 text-[11px] text-grey">{s.h}</div>
                  </div>
                ))}
                <div className="flex h-16 items-center text-[12px] italic text-grey">
                  <span className="font-serif">and everyone else you choose</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 04 — ft. twin : match */}
          <Reveal className="bg-white p-7 md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-14">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-[15px] text-grey-soft">04</span>
                  <h3 className="flex items-center gap-2 font-serif text-[28px] leading-tight md:text-[34px]">
                    <FtMark size="1.5rem" /> twin
                  </h3>
                </div>
                <p className="mt-4 max-w-[40ch] text-[14.5px] leading-relaxed text-ink2">
                  outft finds the people you actually dress like and ranks the
                  match. Some are friends. Some you have not met yet.
                </p>
              </div>

              <div className="flex items-center justify-center gap-6 md:gap-10">
                <Disc letter="S" sw="sw4" label="you" />
                <div className="flex flex-col items-center">
                  <div className="font-serif text-[40px] font-semibold leading-none text-ink md:text-[56px]">
                    92%
                  </div>
                  <div className="mt-1 text-[9px] uppercase tracking-[0.24em] text-grey">
                    match
                  </div>
                  <div className="mt-3 h-px w-16 bg-line2" />
                </div>
                <Disc letter="L" sw="sw2" label="@lenav" />
              </div>
            </div>
          </Reveal>

          {/* 05 — Daily ft. : three windows */}
          <Reveal className="bg-white p-7 md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-center md:gap-14">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-[15px] text-grey-soft">05</span>
                  <h3 className="flex items-center gap-2 font-serif text-[28px] leading-tight md:text-[34px]">
                    Daily <FtMark size="1.5rem" />
                  </h3>
                </div>
                <p className="mt-4 max-w-[40ch] text-[14.5px] leading-relaxed text-ink2">
                  Three windows a day. Post in one and the feed opens, captions
                  and all. Skip them and the day stays quiet on both sides.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { t: "Morning", h: "07-11", o: "Gym", on: false },
                  { t: "Afternoon", h: "11-17", o: "Solo date", on: true },
                  { t: "Evening", h: "17-23", o: "Dinner", on: false },
                ].map((w) => (
                  <div
                    key={w.t}
                    className={`rounded-2xl border p-4 ${
                      w.on ? "border-ink bg-ink text-white" : "border-line2 bg-panel"
                    }`}
                  >
                    <div className={`text-[10px] uppercase tracking-[0.16em] ${w.on ? "text-white/70" : "text-grey"}`}>
                      {w.t}
                    </div>
                    <div className="mt-2 font-serif text-[22px]">{w.h}</div>
                    <div className={`mt-4 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] ${w.on ? "text-white/80" : "text-grey-soft"}`}>
                      {w.on ? (
                        <>
                          <Dot light /> open · {w.o}
                        </>
                      ) : (
                        <>
                          <LockIcon /> {w.o}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Disc({ letter, sw, label }: { letter: string; sw: string; label: string }) {
  return (
    <div className="text-center">
      <span
        className={`mx-auto grid h-20 w-20 place-items-center rounded-full ${sw} font-serif text-[30px] text-white shadow-[0_16px_30px_-16px_rgba(40,36,30,0.55)] md:h-24 md:w-24`}
      >
        {letter}
      </span>
      <div className="mt-3 text-[12px] text-ink2">{label}</div>
    </div>
  );
}

function Dot({ light }: { light?: boolean }) {
  return <span className={`h-1.5 w-1.5 rounded-full ${light ? "bg-white" : "bg-ink"}`} />;
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3 stroke-current" fill="none" strokeWidth={1.5}>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
