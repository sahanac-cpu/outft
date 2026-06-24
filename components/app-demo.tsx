const GROTESK = '"Helvetica Neue", Helvetica, Arial, sans-serif';

/* ─────────── icons ─────────── */
const HomeIcon = (p: { active?: boolean }) => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={p.active ? 1.9 : 1.5}>
    <path d="M3 10.5 12 4l9 6.5M5 9.5V20h14V9.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CamIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <rect x="3" y="6.5" width="18" height="13" rx="2.5" />
    <circle cx="12" cy="13" r="3.4" />
    <path d="M8 6.5l1.2-2h5.6L16 6.5" strokeLinejoin="round" />
  </svg>
);
const PersonIcon = (p: { active?: boolean }) => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={p.active ? 1.9 : 1.5}>
    <circle cx="12" cy="8" r="3.4" />
    <path d="M5.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" strokeLinecap="round" />
  </svg>
);

function BottomNav({ active }: { active: "home" | "camera" | "ft" | "profile" }) {
  const item = (k: string, label: string, node: React.ReactNode) => {
    const on = active === k;
    return (
      <div className={`flex flex-col items-center gap-1 ${on ? "text-ink" : "text-grey"}`}>
        {node}
        <span className={`text-[9.5px] tracking-tight ${on ? "font-semibold" : "font-normal"}`}>{label}</span>
      </div>
    );
  };
  return (
    <div className="mt-auto px-3 pb-4 pt-2">
      <div className="flex items-center justify-around rounded-[20px] border border-line bg-white/80 px-2 py-2.5 backdrop-blur">
        {item("home", "Home", <HomeIcon active={active === "home"} />)}
        {item("camera", "Camera", <CamIcon />)}
        {item("ft", "ft.", <span className="font-serif text-[16px] italic leading-none">ft.</span>)}
        {item("profile", "Profile", <PersonIcon active={active === "profile"} />)}
      </div>
    </div>
  );
}

/* ─────────── screen 1: feed ─────────── */
function FeedCard({ name, caption, tags, sw, src }: { name: string; caption: string; tags: string[]; sw: string; src?: string }) {
  return (
    <div>
      <div className={`relative w-full overflow-hidden rounded-[16px] ${sw}`} style={{ aspectRatio: "4 / 3.3" }}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={name} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <span className="grain-local" aria-hidden />
        )}
      </div>
      <div className="mt-2.5 px-0.5">
        <div className="text-[17px] font-semibold lowercase leading-tight text-ink">{name}</div>
        <div className="text-[13.5px] text-ink2">{caption}</div>
        <div className="mt-2 flex gap-1.5">
          {tags.map((t) => (
            <span key={t} className="rounded-full bg-[#efeeec] px-2.5 py-0.5 text-[11px] lowercase text-grey">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
function FeedScreen() {
  return (
    <div className="flex h-full flex-col bg-white" style={{ fontFamily: GROTESK }}>
      <div className="flex items-baseline justify-between px-5 pb-3 pt-7">
        <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-ink">Friends&apos; traces.</h3>
        <span className="text-[11px] uppercase tracking-[0.12em] text-grey">22 June</span>
      </div>
      <div className="flex-1 space-y-5 overflow-hidden px-4">
        <FeedCard name="maya" caption="Night out." tags={["party", "solo"]} sw="sw5" src="/IMG_2141.png" />
        <FeedCard name="lila" caption="20 June" tags={["date", "uni"]} sw="sw3" />
      </div>
      <BottomNav active="home" />
    </div>
  );
}

/* ─────────── screen 2: camera ─────────── */
function CameraScreen() {
  return (
    <div className="relative h-full overflow-hidden bg-black" style={{ fontFamily: GROTESK }}>
      <div className="absolute inset-0 sw5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/IMG_2141.png" alt="" className="h-full w-full object-cover opacity-95" />
      </div>
      {/* top */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-7 text-white">
        <span className="text-[10.5px] uppercase tracking-[0.2em]">Window open · 14:32</span>
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15 text-[12px]">⚡</span>
      </div>
      {/* frame guides */}
      <div className="pointer-events-none absolute inset-7 rounded-[18px] border border-white/45" />
      <div className="pointer-events-none absolute left-1/2 top-7 h-[calc(100%-3.5rem)] w-px -translate-x-1/2 bg-white/15" />
      {/* shutter */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-9">
        <span className="mb-5 rounded-full bg-black/35 px-3 py-1 text-[10.5px] uppercase tracking-[0.22em] text-white backdrop-blur">
          Snap today&apos;s fit
        </span>
        <div className="grid h-[68px] w-[68px] place-items-center rounded-full border-[3px] border-white/85">
          <div className="h-[54px] w-[54px] rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}

/* ─────────── screen 3: ft. DNA ─────────── */
const DNA = [
  { label: "Old money", pct: 41 },
  { label: "Streetwear", pct: 27 },
  { label: "Minimalist", pct: 18 },
  { label: "Wildcard", pct: 14 },
];
function DnaScreen() {
  return (
    <div className="flex h-full flex-col bg-white px-5 pt-7" style={{ fontFamily: GROTESK }}>
      <div className="flex items-baseline gap-1.5">
        <span className="font-serif text-[22px] italic text-ink">ft.</span>
        <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-ink">DNA</h3>
      </div>
      <div className="mt-7">
        <span className="text-[10.5px] uppercase tracking-[0.18em] text-grey">You read as</span>
        <div className="mt-1 font-serif text-[68px] font-medium leading-[0.82] tracking-[-0.02em] text-ink">
          41<span className="align-top text-[0.4em]">%</span>
        </div>
        <div className="font-serif text-[24px] italic text-ink2">Old money.</div>
      </div>
      <div className="mt-9 space-y-4">
        {DNA.map((b) => (
          <div key={b.label}>
            <div className="flex items-baseline justify-between text-[14px] text-ink">
              <span>{b.label}</span>
              <span className="font-serif">{b.pct}%</span>
            </div>
            <div className="mt-1.5 h-[3px] w-full bg-[#ececec]">
              <div className="h-full bg-ink" style={{ width: `${b.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
      <BottomNav active="ft" />
    </div>
  );
}

/* ─────────── screen 4: profile ─────────── */
function ProfileStat({ n, l }: { n: string; l: string }) {
  return (
    <div className="text-center">
      <div className="font-serif text-[22px] leading-none text-ink">{n}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-grey">{l}</div>
    </div>
  );
}
function ProfileScreen() {
  return (
    <div className="flex h-full flex-col bg-white px-5 pt-7" style={{ fontFamily: GROTESK }}>
      <div className="flex items-center gap-3">
        <div className="relative h-14 w-14 overflow-hidden rounded-full sw4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/IMG_2141.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div>
          <div className="text-[18px] font-semibold lowercase leading-tight text-ink">@you</div>
          <div className="text-[12.5px] text-grey">41% old money · joined &rsquo;26</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 border-y border-line py-3">
        <ProfileStat n="128" l="Fits" />
        <ProfileStat n="34" l="Friends" />
        <ProfileStat n="7" l="Boards" />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[10.5px] uppercase tracking-[0.14em] text-grey">Your record</span>
        <span className="text-[10.5px] text-grey">128</span>
      </div>
      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        {["sw3", "sw6", "sw1", "sw5", "sw4", "sw2"].map((sw, i) => (
          <div key={i} className={`relative overflow-hidden rounded-[8px] ${sw}`} style={{ aspectRatio: "1" }}>
            {i === 0 && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src="/IMG_2141.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
            )}
            {i !== 0 && <span className="grain-local" aria-hidden />}
          </div>
        ))}
      </div>
      <BottomNav active="profile" />
    </div>
  );
}

/* ─────────── the demo ─────────── */
const SCREENS = [
  { key: "feed", n: "01", sub: "The feed opens — your friends' traces, the day they post.", render: <FeedScreen /> },
  { key: "camera", n: "02", sub: "The camera — snap the fit you actually wore.", render: <CameraScreen /> },
  { key: "dna", n: "03", sub: "ft. DNA — your wardrobe, read back in numbers.", render: <DnaScreen /> },
  { key: "profile", n: "04", sub: "Your profile — every fit you've kept, in one place.", render: <ProfileScreen /> },
];

export function AppDemo() {
  return (
    <section id="demo" className="relative border-t border-line2">
      <div className="mx-auto max-w-[1500px] px-6 py-20 md:px-10 md:py-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="lbl">The app — a demonstration</span>
            <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2rem,5vw,3.8rem)] font-normal leading-[0.98] tracking-[-0.02em] text-ink">
              Four screens. One ritual.
            </h2>
          </div>
          <p className="font-serif text-[clamp(1rem,1.6vw,1.25rem)] font-light italic text-ink2 md:max-w-[34ch] md:text-right">
            Snap → read → share. Scroll across the day in the app.
          </p>
        </div>

        {/* horizontal scroll of 4 phones */}
        <div className="-mx-6 mt-14 flex snap-x snap-mandatory gap-7 overflow-x-auto px-6 pb-8 md:-mx-10 md:px-10 [scrollbar-width:none]">
          {SCREENS.map((s, i) => (
            <figure
              key={s.key}
              className="w-[290px] shrink-0 snap-center"
            >
              <div
                className="relative h-[600px] w-[290px] overflow-hidden bg-white"
                style={{
                  borderRadius: 42,
                  boxShadow: "0 44px 90px -34px rgba(40,36,30,0.42), 0 12px 30px -14px rgba(40,36,30,0.22)",
                }}
              >
                {s.render}
              </div>
              <figcaption className="mt-6 flex gap-3 border-t border-line pt-4">
                <span className="lbl shrink-0">{s.n}</span>
                <p className="font-serif text-[15px] font-light italic leading-snug text-ink2">{s.sub}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
