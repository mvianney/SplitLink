import Logo from "@/components/Logo";

const G = "var(--color-accent)";

function ScreenHeader({ title }: { title: string }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <Logo size={16} />
        <span className="text-[11px] font-semibold tracking-tight">SplitLink</span>
      </div>
      <span className="text-[11px] text-white/60">{title}</span>
    </div>
  );
}

export function CreateScreen() {
  const rows = [
    { who: "@kemi", amt: "$40", you: true },
    { who: "@ada", amt: "$30" },
    { who: "@tobi", amt: "$30" },
  ];
  return (
    <>
      <ScreenHeader title="New split" />
      <div className="text-[11px] uppercase tracking-widest text-white/50">Group name</div>
      <div className="mt-1 border border-white/15 bg-black px-3 py-2 text-sm font-medium">
        Dance group
      </div>
      <div className="mt-3 text-[11px] uppercase tracking-widest text-white/50">Total</div>
      <div className="mt-1 flex items-baseline gap-1 border border-[var(--color-accent)]/60 bg-black px-3 py-2">
        <span className="text-2xl font-semibold" style={{ color: G }}>
          $100
        </span>
        <span className="text-[10px] text-white/60">USDC</span>
      </div>
      <div className="mt-3 text-[11px] uppercase tracking-widest text-white/50">Members</div>
      <ul className="mt-1 flex flex-col gap-1.5">
        {rows.map((r) => (
          <li
            key={r.who}
            className="flex items-center justify-between border border-white/10 bg-[#101010] px-3 py-2 text-xs"
          >
            <span className="flex items-center gap-2">
              <span className="h-5 w-5 rounded-full border border-white/20 bg-black text-center text-[10px] leading-5">
                {r.who[1]?.toUpperCase()}
              </span>
              {r.who}
              {r.you && (
                <span className="rounded-sm bg-white/10 px-1 text-[9px] uppercase tracking-wider text-white/70">
                  you
                </span>
              )}
            </span>
            <span className="font-semibold">{r.amt}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-3">
        <div
          className="w-full border-2 border-black bg-[var(--color-accent)] py-2 text-center text-xs font-semibold text-black"
          style={{ boxShadow: "3px 3px 0 0 #fff" }}
        >
          Send split request
        </div>
      </div>
    </>
  );
}

export function RequestsScreen() {
  const invites = [
    { who: "@ada", amt: "$30" },
    { who: "@tobi", amt: "$30" },
  ];
  return (
    <>
      <ScreenHeader title="Requests" />
      <div className="text-sm font-semibold">Dance group</div>
      <div className="text-[11px] text-white/60">Waiting on 2 of 2</div>

      <ul className="mt-3 flex flex-col gap-2">
        {invites.map((i) => (
          <li
            key={i.who}
            className="flex items-center justify-between border border-white/10 bg-[#101010] px-3 py-2.5"
          >
            <div>
              <div className="text-xs font-medium">{i.who}</div>
              <div className="text-[10px] text-white/50">share {i.amt}</div>
            </div>
            <span className="border border-orange-400 bg-orange-400/15 px-2 py-0.5 text-[10px] font-semibold text-orange-300">
              Pending
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto border border-white/10 bg-black px-3 py-2 text-[11px] text-white/70">
        One rejection cancels the request.
      </div>
    </>
  );
}

export function AcceptScreen() {
  return (
    <>
      <ScreenHeader title="Invite" />
      <div className="mt-2 text-xs text-white/70">
        <span className="font-semibold text-white">@kemi</span> invited you to
      </div>
      <div className="text-lg font-semibold tracking-tight">Dance group</div>

      <div className="mt-3 border border-[var(--color-accent)]/60 bg-black p-3">
        <div className="text-[10px] uppercase tracking-widest text-white/50">Your share</div>
        <div className="mt-1 text-3xl font-semibold" style={{ color: G }}>
          $30
        </div>
      </div>

      <div className="mt-3 inline-flex w-fit items-center gap-1.5 border border-white/15 bg-[#101010] px-2 py-1 text-[10px] text-white/80">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: G }} />
        Signed with wallet
      </div>

      <div className="mt-auto grid grid-cols-2 gap-2 pt-3">
        <div className="border-2 border-black bg-white py-2 text-center text-xs font-semibold text-black">
          Reject
        </div>
        <div
          className="border-2 border-black bg-[var(--color-accent)] py-2 text-center text-xs font-semibold text-black"
          style={{ boxShadow: "3px 3px 0 0 #fff" }}
        >
          Accept
        </div>
      </div>
    </>
  );
}

export function PayScreen() {
  return (
    <>
      <ScreenHeader title="Pay" />
      <div className="text-sm font-semibold">Dance group</div>
      <div className="text-[11px] text-white/60">Pay the full amount, once.</div>
      <div className="mt-3 flex justify-center">
        <QrMock />
      </div>
      <div className="mt-3 border border-white/15 bg-black px-2 py-1.5 text-center text-[10px] font-mono text-white/70 truncate">
        splitlink.app/p/9fQ…k2n
      </div>
      <div className="mt-auto border border-[var(--color-accent)]/60 bg-black p-3">
        <div className="text-[10px] uppercase tracking-widest text-white/50">
          Status
        </div>
        <div className="mt-1 text-sm font-semibold" style={{ color: G }}>
          $100.00 paid into the vault
        </div>
      </div>
    </>
  );
}

export function ClaimScreen() {
  return (
    <>
      <ScreenHeader title="Cashout" />
      <div className="text-sm font-semibold">Dance group</div>
      <div className="text-[11px] text-white/60">Your share is ready.</div>

      <div className="mt-4 border border-[var(--color-accent)] bg-black p-4 text-center">
        <div className="text-[10px] uppercase tracking-widest text-white/50">
          Ready to claim
        </div>
        <div className="mt-1 text-4xl font-semibold" style={{ color: G }}>
          $30.00
        </div>
        <div className="text-[10px] text-white/60">USDC on Solana</div>
      </div>

      <div className="mt-auto pt-3">
        <div
          className="w-full border-2 border-black bg-[var(--color-accent)] py-2 text-center text-sm font-semibold text-black"
          style={{ boxShadow: "3px 3px 0 0 #fff" }}
        >
          Cashout
        </div>
        <div className="mt-1.5 text-center text-[9px] text-white/50">
          Lands in the wallet you signed with.
        </div>
      </div>
    </>
  );
}

function QrMock() {
  // Deterministic faux QR
  const size = 11;
  const pattern: number[] = [];
  for (let i = 0; i < size * size; i++) {
    const v = (i * 73 + 11) % 7;
    pattern.push(v < 3 ? 1 : 0);
  }
  // Finder squares
  const finder = (gx: number, gy: number) => {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        pattern[(gy + y) * size + (gx + x)] = 1;
      }
    }
  };
  finder(0, 0);
  finder(size - 3, 0);
  finder(0, size - 3);
  return (
    <div className="grid gap-[2px] border-4 border-white bg-white p-2" style={{ gridTemplateColumns: `repeat(${size}, 10px)` }}>
      {pattern.map((p, i) => (
        <div
          key={i}
          style={{
            width: 10,
            height: 10,
            background: p ? "#000" : "#fff",
          }}
        />
      ))}
    </div>
  );
}
