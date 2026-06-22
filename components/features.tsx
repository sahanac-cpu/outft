import { Reveal, RuleDraw } from "./reveal";

const FEATURES = [
  {
    index: "01",
    title: "Fashion DNA",
    body: "Every fit you log is read for palette, cut and register, then drawn as a composition of facets. Quiet luxury, old money, the wildcard seven percent.",
    detail: "Reads palette · silhouette · register",
  },
  {
    index: "02",
    title: "Boards & backlogs",
    body: "Every fit becomes a record. Sort them into boards, keep a backlog of looks you have not worn yet, and watch the week fill in day by day.",
    detail: "Daily log · boards · archive",
  },
  {
    index: "03",
    title: "Follow freely",
    body: "Follow as many people and creators as you like. The only gate is posting your own fit, so a bigger list never means a noisier feed.",
    detail: "No cap · honest by construction",
  },
  {
    index: "04",
    title: "ft. twin",
    body: "outft finds the people you actually dress like and ranks the match. Some are friends. Some you have not met yet.",
    detail: "DNA match · ranked similarity",
  },
  {
    index: "05",
    title: "Daily ft.",
    body: "Three windows a day. Post in one and the feed opens, captions and all. Skip them and the day stays quiet on both sides.",
    detail: "Morning · Afternoon · Evening",
  },
];

export function Features() {
  return (
    <section id="dna" className="bg-transparent">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">

        {/* section header */}
        <Reveal>
          <span className="lbl">What you get</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 max-w-[22ch] font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.0] tracking-[-0.02em] text-[#000000]">
            Five ways outft reads you back.
          </h2>
        </Reveal>
        <RuleDraw delay={0.18} className="mt-8 w-full" />

        {/* feature rows */}
        <div className="mt-0">
          {FEATURES.map((f, i) => (
            <Reveal key={f.index} delay={i * 0.06}>
              <div className="group grid grid-cols-[3rem_1fr] gap-6 border-b border-[#333333] py-8 md:grid-cols-[3rem_1fr_auto] md:gap-12">
                {/* index */}
                <span className="font-sans text-[13px] font-light text-[#808080]">
                  {f.index}
                </span>

                {/* title + body */}
                <div>
                  <h3 className="font-serif text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-tight text-[#000000]">
                    {f.title}
                  </h3>
                  <p className="mt-3 max-w-[52ch] font-sans text-[14px] font-light leading-relaxed text-[#555555]">
                    {f.body}
                  </p>
                </div>

                {/* detail tag — right col, desktop only */}
                <div className="hidden items-center md:flex">
                  <span className="border border-[#808080] px-3 py-1.5 font-sans text-[10px] font-light uppercase tracking-[0.2em] text-[#808080]">
                    {f.detail}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
