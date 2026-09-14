import * as React from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { cn } from "@/lib/utils";

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type Contribution = {
  date: string;
  count: number;
  level: ContributionLevel;
};

export type RepoContribution = {
  name: string;
  count: number;
  logo?: React.ReactNode;
  href?: string;
};

const DEFAULT_ACCENT = "#39d353";
const DEFAULT_CELL_SIZE = 12;
const DEFAULT_LABEL = "Top contributions in:";
const DEFAULT_MONTHS = 12;
const WEEKS_PER_MONTH = 365.25 / 12 / 7;
const STACK_LIMIT = 3;
const MIN_CARD_WIDTH = 320;
const MIN_LABEL_WEEKS = 3;

const gapFor = (cellSize: number) => Math.max(2, Math.round(cellSize / 4));
// never zero: weeks.slice(-0) would hand back the whole history instead of nothing
const weeksFor = (months: number) =>
  Math.max(1, Math.ceil(months * WEEKS_PER_MONTH));

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const SPRING = { type: "spring", bounce: 0.2, duration: 0.62 } as const;
const HEADER_SPRING = { ...SPRING, bounce: 0.45 } as const;
const ROW_SPRING = { ...SPRING, bounce: 0.26, delay: 0.08 } as const;
const ROW_OFFSET = 16;
const CELL_FADE = { duration: 0.2, ease: EASE_OUT } as const;
const TOOLTIP_FADE = { duration: 0.14, ease: EASE_OUT } as const;
const TOOLTIP_EDGE = 8;
const COLUMN_STAGGER = 0.012;
const LABEL_BLUR = 6;
const LABEL_REVEAL = { duration: 0.45, ease: EASE_OUT } as const;

const LEVELS = [0, 1, 2, 3, 4] as const;

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function toMonthLabels(weeks: Contribution[][]) {
  const labels: (string | null)[] = weeks.map(() => null);
  const monthAt = (index: number) => weeks[index]?.[0]?.date.slice(5, 7);

  let start = 0;
  for (let i = 1; i <= weeks.length; i++) {
    if (i < weeks.length && monthAt(i) === monthAt(start)) continue;
    // a shorter run is narrower than the label itself, so it would sit under the next month
    if (i - start >= MIN_LABEL_WEEKS) {
      labels[start] = MONTH_NAMES[Number(monthAt(start)) - 1] ?? null;
    }
    start = i;
  }

  return labels;
}

const LEVEL_OPACITY: Record<ContributionLevel, number> = {
  0: 0,
  1: 0.3,
  2: 0.52,
  3: 0.76,
  4: 1,
};

type LevelStyle = { backgroundColor: string; opacity: number };

type HoveredDay = { day: Contribution; x: number; y: number };

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function describeDay({ count, date }: Contribution) {
  const noun = count === 1 ? "contribution" : "contributions";
  return `${count} ${noun} on ${DATE_FORMAT.format(new Date(`${date}T00:00:00`))}`;
}

const CALENDAR_API = "https://github-contributions-api.jogruber.de/v4";
const EVENTS_API = "https://api.github.com/users";

type ApiDay = { date: string; count: number; level: number };
type PushEvent = {
  type: string;
  repo?: { name: string };
  payload?: { commits?: unknown[] };
};

async function fetchCalendar(login: string) {
  try {
    const res = await fetch(`${CALENDAR_API}/${login}?y=last`);
    if (!res.ok) return null;

    const days: ApiDay[] = (await res.json())?.contributions ?? [];
    if (!days.length) return null;

    // columns are weeks, so the first day has to be a sunday or every column shears
    const start = days.findIndex(
      (day) => new Date(`${day.date}T00:00:00Z`).getUTCDay() === 0,
    );

    return days.slice(start < 0 ? 0 : start).map<Contribution>((day) => ({
      date: day.date,
      count: day.count,
      level: Math.min(4, Math.max(0, day.level)) as ContributionLevel,
    }));
  } catch (err) {
    console.error("Failed to fetch GitHub contributions calendar:", err);
    return null;
  }
}

async function fetchRepos(login: string): Promise<RepoContribution[]> {
  try {
    const res = await fetch(`${EVENTS_API}/${login}/events/public?per_page=100`);
    if (!res.ok) return [];

    const events: PushEvent[] = await res.json();
    if (!Array.isArray(events)) return [];

    const counts = new Map<string, number>();

    for (const event of events) {
      if (event.type !== "PushEvent" || !event.repo) continue;
      const commits = event.payload?.commits?.length ?? 1;
      counts.set(event.repo.name, (counts.get(event.repo.name) ?? 0) + commits);
    }

    return [...counts.entries()]
      .sort(([, a], [, b]) => b - a)
      .slice(0, STACK_LIMIT)
      .map(([fullName, count]) => {
        const [owner, name] = fullName.split("/");
        return {
          name,
          count,
          href: `https://github.com/${fullName}`,
          // github has no repo logo, only an owner avatar, so own repos use the initial
          logo:
            owner.toLowerCase() === login.toLowerCase() ? undefined : (
              <img
                src={`https://github.com/${owner}.png?size=64`}
                alt=""
                className="size-full object-cover"
                loading="lazy"
              />
            ),
        };
      });
  } catch (err) {
    console.error("Failed to fetch GitHub top repos:", err);
    return [];
  }
}

function useGitHubUser(login?: string, includeRepos: boolean = false) {
  const [data, setData] = React.useState<{
    contributions: Contribution[];
    repos: RepoContribution[];
  }>();

  React.useEffect(() => {
    if (!login) return;
    let active = true;

    const promises: [Promise<Contribution[] | null>, Promise<RepoContribution[]>] = [
      fetchCalendar(login),
      includeRepos ? fetchRepos(login) : Promise.resolve([]),
    ];

    Promise.all(promises)
      .then(([contributions, repos]) => {
        if (active && contributions) setData({ contributions, repos });
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [login, includeRepos]);

  return data;
}

function emptyDays(weeks: number): Contribution[] {
  const today = new Date();
  return Array.from({ length: weeks * 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (weeks * 7 - 1 - i));
    return {
      date: date.toISOString().slice(0, 10),
      count: 0,
      level: 0 as ContributionLevel,
    };
  });
}

function toScale(accent: string | string[]): LevelStyle[] {
  if (typeof accent === "string") {
    return LEVELS.map((level) => ({
      backgroundColor: accent,
      opacity: LEVEL_OPACITY[level],
    }));
  }

  const colors = accent.length > 4 ? accent : ["transparent", ...accent];
  return LEVELS.map((level) => {
    const color = colors[level] ?? colors[colors.length - 1] ?? "transparent";
    return { backgroundColor: color, opacity: color === "transparent" ? 0 : 1 };
  });
}

function toWeeks(contributions: Contribution[]) {
  const weeks: Contribution[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }
  return weeks;
}

const Tooltip = ({
  hovered,
  reduceMotion,
}: {
  hovered: HoveredDay;
  reduceMotion: boolean | null;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [left, setLeft] = React.useState(hovered.x);

  useIsoLayoutEffect(() => {
    const half = (ref.current?.offsetWidth ?? 0) / 2;
    const edge = TOOLTIP_EDGE + half;
    setLeft(Math.min(Math.max(hovered.x, edge), window.innerWidth - edge));
  }, [hovered]);

  return createPortal(
    <div
      className="pointer-events-none fixed z-50"
      style={{
        left,
        top: hovered.y,
        transform: "translate(-50%, calc(-100% - 8px))",
      }}
    >
      <motion.div
        ref={ref}
        className="whitespace-nowrap rounded-lg bg-foreground px-2.5 py-1 text-[11px] font-medium text-background shadow-md border border-background/20"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
        transition={reduceMotion ? { duration: 0 } : TOOLTIP_FADE}
      >
        {describeDay(hovered.day)}
      </motion.div>
    </div>,
    document.body,
  );
};

const ContributionGrid = ({
  contributions,
  scale,
  cellSize,
  showMonths,
  label,
  reduceMotion,
}: {
  contributions: Contribution[];
  scale: LevelStyle[];
  cellSize: number;
  months?: number;
  showMonths: boolean;
  label: string;
  reduceMotion: boolean | null;
}) => {
  const weeks = React.useMemo(() => toWeeks(contributions), [contributions]);
  const gap = gapFor(cellSize);
  const [hovered, setHovered] = React.useState<HoveredDay>();

  // Full weeks from start to finish without dropping any day
  const visible = weeks;
  const sweepEnd = (visible.length - 1) * COLUMN_STAGGER + CELL_FADE.duration;

  const hover = (day: Contribution) => (event: React.PointerEvent) => {
    const cell = event.currentTarget.getBoundingClientRect();
    setHovered({ day, x: cell.left + cell.width / 2, y: cell.top });
  };

  return (
    <div
      data-slot="github-activity-grid"
      role="img"
      aria-label={label}
      className="relative w-full overflow-x-auto overflow-y-visible pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="inline-flex flex-col min-w-full items-center">
        {showMonths && (
          <motion.div
            className="flex"
            style={{ gap, marginBottom: gap + 2 }}
            initial={
              reduceMotion
                ? false
                : { opacity: 0, filter: `blur(${LABEL_BLUR}px)` }
            }
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{
              ...LABEL_REVEAL,
              delay: reduceMotion ? 0 : sweepEnd,
            }}
          >
            {toMonthLabels(visible).map((month, index) => (
              <div
                key={index}
                className="relative h-4 shrink-0"
                style={{ width: cellSize }}
              >
                {month && (
                  <span className="absolute left-0 top-0 text-[10px] leading-none text-foreground/60 font-mono select-none">
                    {month}
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        )}

        <div
          className="flex overflow-visible pb-2"
          style={{ gap }}
          onPointerLeave={() => setHovered(undefined)}
        >
          {visible.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col shrink-0" style={{ gap }}>
              {week.map((day) => (
                <motion.div
                  key={day.date}
                  onPointerEnter={hover(day)}
                  className="shrink-0 rounded-[3px] bg-foreground/[0.08] cursor-pointer hover:ring-1 hover:ring-primary/60 transition-shadow"
                  style={{ width: cellSize, height: cellSize }}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    ...CELL_FADE,
                    delay: reduceMotion ? 0 : weekIndex * COLUMN_STAGGER,
                  }}
                >
                  <div
                    className="h-full w-full rounded-[3px]"
                    style={scale[day.level] ?? scale[0]}
                  />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {hovered && (
          <Tooltip
            key="tooltip"
            hovered={hovered}
            reduceMotion={reduceMotion}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const Avatar = ({
  repo,
  layoutId,
  transition,
  className,
}: {
  repo: RepoContribution;
  layoutId: string;
  transition: Transition;
  className?: string;
}) => (
  <motion.span
    layoutId={layoutId}
    transition={transition}
    className={cn(
      "grid size-7 shrink-0 place-items-center overflow-hidden rounded-full bg-neutral-200 text-[11px] font-medium uppercase text-foreground/70 ring-2 ring-background dark:bg-neutral-800",
      "[&_img]:size-full [&_img]:object-cover [&_svg]:size-full",
      className,
    )}
  >
    {repo.logo ?? repo.name.charAt(0)}
  </motion.span>
);

const RepoRow = ({
  repo,
  layoutId,
  transition,
}: {
  repo: RepoContribution;
  layoutId: string;
  transition: Transition;
}) => {
  const className =
    "flex items-center gap-3 rounded-xl mx-2 px-3 py-2 transition-colors hover:bg-foreground/5";

  const content = (
    <>
      <Avatar repo={repo} layoutId={layoutId} transition={transition} />
      <span className="flex-1 truncate text-sm font-medium text-foreground">
        {repo.name}
      </span>
      <span className="text-xs font-mono tabular-nums text-foreground/60">
        {repo.count} {repo.count === 1 ? "commit" : "commits"}
      </span>
    </>
  );

  return repo.href ? (
    <a href={repo.href} target="_blank" rel="noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
};

const Chevron = ({
  open,
  transition,
}: {
  open: boolean;
  transition: Transition;
}) => (
  <motion.svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className="size-6 text-foreground/60 group-hover:text-primary transition-colors"
    initial={false}
    animate={{ rotate: open ? 180 : 0 }}
    transition={transition}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m16 10-4 4-4-4" />
  </motion.svg>
);

export type GitHubActivityProps = React.ComponentProps<"div"> & {
  username?: string;
  contributions?: Contribution[];
  repos?: RepoContribution[];
  year?: number;
  accent?: string | string[];
  cellSize?: number;
  months?: number;
  showMonths?: boolean;
  showRepos?: boolean;
  label?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const GitHubActivity = ({
  className,
  username,
  contributions: contributionsProp = [],
  repos: reposProp = [],
  year,
  accent = DEFAULT_ACCENT,
  cellSize = DEFAULT_CELL_SIZE,
  months = DEFAULT_MONTHS,
  showMonths = true,
  showRepos = false,
  label = DEFAULT_LABEL,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  style,
  ...props
}: GitHubActivityProps) => {
  const reduceMotion = useReducedMotion();
  const uid = React.useId();
  const [openState, setOpenState] = React.useState(defaultOpen);

  const open = openProp ?? openState;
  const toggle = () => {
    if (openProp === undefined) setOpenState(!open);
    onOpenChange?.(!open);
  };

  const needsFetch = !contributionsProp.length || (showRepos && !reposProp.length);
  const fetched = useGitHubUser(needsFetch ? username : undefined, showRepos);
  const placeholder = React.useMemo(
    () => (username ? emptyDays(weeksFor(months)) : []),
    [username, months],
  );

  const contributions = contributionsProp.length
    ? contributionsProp
    : (fetched?.contributions ?? placeholder);
  const repos = reposProp.length ? reposProp : (fetched?.repos ?? []);

  const scale = React.useMemo(() => toScale(accent), [accent]);
  const transition = reduceMotion ? { duration: 0 } : SPRING;
  const headerTransition = reduceMotion ? { duration: 0 } : HEADER_SPRING;
  const rowTransition = reduceMotion ? { duration: 0 } : ROW_SPRING;

  const kick = reduceMotion ? {} : { x: ROW_OFFSET, y: ROW_OFFSET };
  const listMotion = {
    initial: { opacity: 0, ...kick },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, ...kick },
  };

  const total = React.useMemo(
    () => contributions.reduce((sum, day) => sum + day.count, 0),
    [contributions],
  );

  const heading = year
    ? `${total.toLocaleString()} contributions in ${year}`
    : `${total.toLocaleString()} contributions in the last year`;

  const gap = gapFor(cellSize);
  const totalWeeks = Math.max(1, Math.ceil(contributions.length / 7));
  const gridWidth = totalWeeks * (cellSize + gap) - gap;
  const width = Math.max(MIN_CARD_WIDTH, gridWidth + 96);

  return (
    <div
      data-slot="github-activity"
      className={cn(
        "relative w-fit max-w-full rounded-[28px] bg-card border border-primary/15 shadow-2xl p-6 sm:p-8 md:p-10",
        showRepos && repos.length > 0 && "pb-[92px]",
        className,
      )}
      style={{ width, ...style }}
      {...props}
    >
      <div className="mb-6 flex items-center justify-between px-1">
        <p className="text-sm sm:text-base md:text-lg font-mono font-semibold text-foreground">
          {heading}
        </p>
        {username && (
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-mono text-primary hover:underline"
          >
            @{username}
          </a>
        )}
      </div>

      <ContributionGrid
        contributions={contributions}
        scale={scale}
        cellSize={cellSize}
        months={months}
        showMonths={showMonths}
        label={heading}
        reduceMotion={reduceMotion}
      />

      {showRepos && repos.length > 0 && (
        <motion.div
          layout
          id={`${uid}-panel`}
          data-slot="github-activity-panel"
          data-state={open ? "open" : "closed"}
          className={cn(
            "absolute inset-x-3 bottom-3 overflow-hidden bg-background/95 border border-primary/10 shadow-lg backdrop-blur-xl",
            open && "top-3",
          )}
          style={{ borderRadius: 18 }}
          transition={transition}
        >
          <motion.div
            layout="position"
            transition={headerTransition}
            className="flex items-center justify-between gap-3 py-3 px-4"
          >
            <span className="truncate text-xs sm:text-sm font-medium text-foreground">{label}</span>

            <div className="flex items-center gap-3">
              {!open && (
                <div className="flex items-center">
                  {repos.slice(0, STACK_LIMIT).map((repo, index) => (
                    <Avatar
                      key={index}
                      repo={repo}
                      layoutId={`${uid}-${index}`}
                      transition={transition}
                      className="-ml-2 first:ml-0"
                    />
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={toggle}
                aria-expanded={open}
                aria-controls={`${uid}-panel`}
                aria-label={
                  open ? "Hide top repositories" : "Show top repositories"
                }
                className="group grid size-7 shrink-0 place-items-center rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
              >
                <Chevron open={open} transition={transition} />
              </button>
            </div>
          </motion.div>

          <AnimatePresence initial={false} mode="popLayout">
            {open && (
              <motion.ul
                key="list"
                layout="position"
                {...listMotion}
                transition={rowTransition}
                className="px-1 pb-2 overflow-y-auto max-h-[calc(100%-56px)]"
              >
                {repos.map((repo, index) => (
                  <li key={index}>
                    <RepoRow
                      repo={repo}
                      layoutId={`${uid}-${index}`}
                      transition={transition}
                    />
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export { GitHubActivity };
export default GitHubActivity;
