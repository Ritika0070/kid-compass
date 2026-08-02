import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { profileApi } from "../../services/api";
import { loadProfile, isProfileComplete } from "../../utils/profileComplete";
import ProfileReminderBunny from "./ProfileReminderBunny";
import { mergeBackendProfile } from "../../utils/mergeProfile";


const DESIGN_W = 1366;
const cqw = (px) => `${((px / DESIGN_W) * 100).toFixed(4)}cqw`;


const MOBILE_DESIGN_W = 390;
const cqwMobile = (px) => `${((px / MOBILE_DESIGN_W) * 100).toFixed(4)}cqw`;

// ---- island panel placement — tweak these ----
const PANEL_INSET_TOP = cqw(10);
const PANEL_INSET_BOTTOM = cqw(100);
const PANEL_INSET_LEFT = cqw(185);
const PANEL_INSET_RIGHT = cqw(25);

// mobile copy sits in its own small container, so insets are much
// smaller — no sidebar to clear, no big bottom cards to clear.
const PANEL_INSET_MOBILE_TOP = cqw(20);
const PANEL_INSET_MOBILE_BOTTOM = cqw(20);
const PANEL_INSET_MOBILE_LEFT = cqw(20);
const PANEL_INSET_MOBILE_RIGHT = cqw(20);

// buffer inside the panel so island nodes near the edge don't clip
const PANEL_SAFE_PAD_Y = "5%";
const PANEL_SAFE_PAD_X = "5%";

// flip to true any time you need to see the panel/safe-field
// outlines again while tweaking insets.
const DEBUG_PANEL = false;

// shared timing — panel strip slide matches the CornerDecor branch
// sequence.
const PANEL_SLIDE_TRANSITION = { duration: 0.9, ease: [0.4, 0, 0.2, 1] };

// branch "out" / "in" legs — pulled out as consts so entrance and
// index-change sequence can't drift out of sync with each other.
const BRANCH_OUT_TRANSITION = { duration: 0.35, ease: [0.4, 0, 1, 1] };
const BRANCH_IN_TRANSITION = { duration: 0.55, ease: [0, 0, 0.2, 1] };

// icon files live in public/icons/, so they're served from /icons/*
// at the app root regardless of which route renders this component.
const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "/icons/home.png" },
  { id: "activities", label: "Activities", icon: "/icons/activities.png" },
  { id: "progress", label: "My Progress", icon: "/icons/progress.png" },
  { id: "dashboard", label: "Dashboard", icon: "/icons/dashboard.png" },
];

// ---- corner decoration sizes (desktop only) ----
const CORNER_DECOR = {
  topLeft:     { w: 281, h: 213, src: "mainmenu/decor-branch-top-left.png" },
  topRight:    { w: 360, h: 333, src: "mainmenu/decor-branch-top-right.png" },
  bottomLeft:  { w: 215, h: 216, src: "mainmenu/decor-branch-bottom-left.png" },
  bottomRight: { w: 440, h: 292, src: "mainmenu/decor-branch-bottom-right.png" },
};


const ISLAND_PANELS = [
  [
    { id: 1, title: "Welcome", locked: false,
      top: "32%", left: "11%", size: { w: 232, h: 233 },
      mobileTop: "25%", mobileLeft: "16%", mobileSize: { w: 110, h: 120 },
      img: "/islands/home.png" },
    { id: 2, title: "Storyteller's Cave", locked: false,
      top: "22%", left: "48%", size: { w: 240, h: 235 },
      mobileTop: "26%", mobileLeft: "64%", mobileSize: { w: 100, h: 116 },
      img: "/islands/cave.png" },
    { id: 3, title: "Circuit Runner", locked: false,
      top: "50%", left: "78%", size: { w: 244, h: 218 },
      mobileTop: "74%", mobileLeft: "38%", mobileSize: { w: 100, h: 102 },
      img: "/islands/circuit.png" },
    { id: 4, title: "Build the Kingdom", locked: false,
      top: "72%", left: "35%", size: { w: 264, h: 226 },
      mobileTop: "74%", mobileLeft: "78%", mobileSize: { w: 130, h: 110 },
      img: "/islands/kingdom.png" },
  ],
  [
    { id: 6, title: "Number Nest", locked: false,
      top: "30%", left: "16%", size: { w: 230, h: 196 },
      mobileTop: "26%", mobileLeft: "26%", mobileSize: { w: 90, h: 66 },
      img: "/islands/kingdom.png" },
    { id: 7, title: "Word Wonders", locked: false,
      top: "72%", left: "30%", size: { w: 180, h: 126 },
      mobileTop: "26%", mobileLeft: "74%", mobileSize: { w: 90, h: 66 },
      img: "/islands/home_Panel2.png" },
    { id: 8, title: "Art Atoll", locked: false,
      top: "32%", left: "52%", size: { w: 90, h: 66 },
      mobileTop: "50%", mobileLeft: "50%", mobileSize: { w: 90, h: 66 },
      color: "#E0B24C" },
    { id: 9, title: "Science Springs", locked: false,
      top: "66%", left: "68%", size: { w: 90, h: 66 },
      mobileTop: "74%", mobileLeft: "26%", mobileSize: { w: 90, h: 66 },
      color: "#57A65A" },
    { id: 10, title: "Final Frontier", locked: true,
      top: "36%", left: "86%", size: { w: 90, h: 66 },
      mobileTop: "74%", mobileLeft: "74%", mobileSize: { w: 90, h: 66 },
      color: "#B7B7B7" },
  ],
];

function IslandNode({ island, mobile = false }) {
  const size = mobile ? island.mobileSize : island.size;
  const top = mobile ? island.mobileTop : island.top;
  const left = mobile ? island.mobileLeft : island.left;
  const right = mobile ? island.mobileRight : island.right;
  // mobile uses its own cqwMobile() scale (relative to MOBILE_DESIGN_W),
  // desktop keeps using cqw() (relative to DESIGN_W) — fully separate.
  const scale = mobile ? cqwMobile : cqw;

  return (
    <div
      style={{
        position: "absolute",
        top,
        ...(left !== undefined ? { left } : {}),
        ...(right !== undefined ? { right } : {}),
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: scale(6),
      }}
    >
      {/* island artwork — real exported PNG when one is set (panel 1),
          otherwise the old flat-color placeholder blob (locked /
          not-yet-designed islands). flexShrink:0 on both so being
          anchored near an edge (left or right) never squeezes the
          artwork below its declared size — see note at top of file. */}
      {island.img ? (
        <img
          src={island.img}
          alt={island.title}
          style={{
            width: scale(size.w),
            height: scale(size.h),
            flexShrink: 0,
            objectFit: "contain",
            opacity: island.locked ? 0.5 : 1,
            filter: `drop-shadow(0 ${scale(4)} ${scale(6)} rgba(0,0,0,0.25))`,
          }}
        />
      ) : (
        <div
          style={{
            width: scale(size.w),
            height: scale(size.h),
            flexShrink: 0,
            borderRadius: "42% 58% 55% 45% / 55% 45% 55% 45%",
            backgroundColor: island.color,
            opacity: island.locked ? 0.5 : 1,
            boxShadow: `0 ${scale(4)} ${scale(6)} rgba(0,0,0,0.25)`,
          }}
        />
      )}

      {island.locked && (
        <div
          style={{
            position: "absolute",
            top: "38%",
            width: scale(22),
            height: scale(22),
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.55)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: scale(12),
          }}
        >
          🔒
        </div>
      )}
    </div>
  );
}

function IslandPanelContent({ islands, mobile = false }) {
  return (
    <div style={{ position: "relative", width: "50%", height: "100%", flexShrink: 0 }}>
      {islands.map((island) => (
        <IslandNode key={island.id} island={island} mobile={mobile} />
      ))}
    </div>
  );
}

function PagerArrow({ direction, onClick, disabled }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        [direction === "left" ? "left" : "right"]: cqw(-6),
        transform: "translateY(-50%)",
        zIndex: 3,
      }}
    >
      <motion.button
        type="button"
        onClick={onClick}
        disabled={disabled}
        whileHover={disabled ? {} : { scale: 1.08, backgroundColor: "#6754B7" }}
        whileTap={disabled ? {} : { scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
        aria-label={direction === "left" ? "Previous islands" : "Next islands"}
        style={{
          width: cqw(44),
          height: cqw(44),
          minWidth: "30px",
          minHeight: "30px",
          borderRadius: "50%",
          border: "none",
          cursor: disabled ? "default" : "pointer",
          backgroundColor: "#FBEEC9",
          opacity: disabled ? 0.35 : 1,
          boxShadow: disabled ? "none" : `0 ${cqw(3)} ${cqw(5)} rgba(0,0,0,0.3)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
        }}
      >
        <svg
          width="42%"
          height="42%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4a3b2a"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {direction === "left" ? (
            <polyline points="15 18 9 12 15 6" />
          ) : (
            <polyline points="9 18 15 12 9 6" />
          )}
        </svg>
      </motion.button>
    </div>
  );
}


function IslandMapPager({
  insetTop = PANEL_INSET_TOP,
  insetBottom = PANEL_INSET_BOTTOM,
  insetLeft = PANEL_INSET_LEFT,
  insetRight = PANEL_INSET_RIGHT,
  onActiveIndexChange,
  mobile = false,
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index) => {
    const clamped = Math.max(0, Math.min(ISLAND_PANELS.length - 1, index));
    setActiveIndex(clamped);
    onActiveIndexChange?.(clamped);
  };

  return (
    <div
      className="absolute"
      style={{
        left: insetLeft,
        right: insetRight,
        top: insetTop,
        bottom: insetBottom,
        outline: DEBUG_PANEL ? "2px dashed red" : "none",
      }}
    >
      {DEBUG_PANEL && (
        <span
          style={{
            position: "absolute",
            top: "2px",
            left: "2px",
            fontFamily: "monospace",
            fontSize: "10px",
            color: "red",
            background: "rgba(255,255,255,0.85)",
            padding: "1px 4px",
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          panel box · top:{insetTop} bottom:{insetBottom} left:{insetLeft} right:{insetRight}
        </span>
      )}
      <PagerArrow direction="left" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} />
      <PagerArrow
        direction="right"
        onClick={() => goTo(activeIndex + 1)}
        disabled={activeIndex === ISLAND_PANELS.length - 1}
      />

      <div className="relative overflow-hidden" style={{ width: "100%", height: "100%" }}>
        {/* safe field — islands are positioned against THIS box, not
            the outer clipping box, so their badge/art/label stack
            never gets sliced by the overflow-hidden edge above. */}
        <div
          className="absolute"
          style={{
            top: PANEL_SAFE_PAD_Y,
            bottom: PANEL_SAFE_PAD_Y,
            left: PANEL_SAFE_PAD_X,
            right: PANEL_SAFE_PAD_X,
            outline: DEBUG_PANEL ? "2px dashed #2c6fdb" : "none",
          }}
        >
          {DEBUG_PANEL && (
            <span
              style={{
                position: "absolute",
                bottom: "2px",
                left: "2px",
                fontFamily: "monospace",
                fontSize: "10px",
                color: "#2c6fdb",
                background: "rgba(255,255,255,0.85)",
                padding: "1px 4px",
                zIndex: 5,
                pointerEvents: "none",
              }}
            >
              safe field · pad {PANEL_SAFE_PAD_X}/{PANEL_SAFE_PAD_Y}
            </span>
          )}
          <motion.div
            animate={{ x: activeIndex === 0 ? "0%" : "-50%" }}
            transition={PANEL_SLIDE_TRANSITION}
            style={{
              display: "flex",
              width: "200%",
              height: "100%",
            }}
          >
            {ISLAND_PANELS.map((islands, i) => (
              <IslandPanelContent key={i} islands={islands} mobile={mobile} />
            ))}
          </motion.div>
        </div>

        {/* page dots, purely for orientation while testing */}
        <div
          className="absolute flex"
          style={{
            bottom: cqw(8),
            left: "50%",
            transform: "translateX(-50%)",
            gap: cqw(6),
          }}
        >
          {ISLAND_PANELS.map((_, i) => (
            <div
              key={i}
              style={{
                width: cqw(8),
                height: cqw(8),
                minWidth: "5px",
                minHeight: "5px",
                borderRadius: "50%",
                backgroundColor: i === activeIndex ? "#6754B7" : "#D9CBAA",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function NavButton({ item, active, onClick, mobile }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 450, damping: 32 }}
      style={
        mobile
          ? {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px",
              width: "56px",
              height: "56px",
              border: "none",
              borderRadius: "16px",
              background: active ? "#6754B7" : "transparent",
              boxShadow: active ? "0 2px 1px rgba(0,0,0,0.75)" : "none",
              transformOrigin: "center center",
              willChange: "transform",
              backfaceVisibility: "hidden",
              transition: "background-color 0.2s ease, box-shadow 0.2s ease",
            }
          : {
              width: cqw(95),
              height: cqw(85),
              minWidth: cqw(95),
              minHeight: cqw(85),
              borderRadius: cqw(21),
              border: "none",
              cursor: "pointer",
              background: active ? "#6754B7" : "#F7DFAE",
              boxShadow: active
                ? `0 ${cqw(2)} ${cqw(1)} rgba(0,0,0,0.75)`
                : `0 ${cqw(4)} ${cqw(2)} rgba(230,200,144,0.75)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: cqw(4),
              padding: 0,
              transformOrigin: "center center",
              willChange: "transform",
              backfaceVisibility: "hidden",
              transition: "background-color 0.2s ease, box-shadow 0.2s ease",
            }
      }
    >
      <img
        src={item.icon}
        alt=""
        aria-hidden="true"
        style={{
          width: mobile ? "25px" : cqw(35),
          height: mobile ? "25px" : cqw(35),
          objectFit: "contain",
          opacity: active ? 0.85 : 1,
          transition: "opacity 0.2s ease",
        }}
      />
      <span
        style={{
          fontFamily: "Inria Sans",
          fontSize: mobile ? "10px" : cqw(13),
          fontWeight: 600,
          color: active ? "#ffffff" : "#4a3b2a",
          textAlign: "center",
          lineHeight: 1.1,
          transition: "color 0.2s ease",
        }}
      >
        {item.label}
      </span>
    </motion.button>
  );
}
// Corner tree/vine/plant/rock decoration — desktop only.
function CornerDecor({ activeIndex }) {
  const leftControls = useAnimation();
  const rightControls = useAnimation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      leftControls.start({ x: "0%", transition: BRANCH_IN_TRANSITION });
      rightControls.start({ x: "0%", transition: BRANCH_IN_TRANSITION });
      return;
    }
    let cancelled = false;
    const sequence = async () => {
      await Promise.all([
        leftControls.start({ x: "-130%", transition: BRANCH_OUT_TRANSITION }),
        rightControls.start({ x: "130%", transition: BRANCH_OUT_TRANSITION }),
      ]);
      if (cancelled) return;
      await Promise.all([
        leftControls.start({ x: "0%", transition: BRANCH_IN_TRANSITION }),
        rightControls.start({ x: "0%", transition: BRANCH_IN_TRANSITION }),
      ]);
    };
    sequence();
    return () => {
      cancelled = true;
    };
  }, [activeIndex, leftControls, rightControls]);

  const base = {
    position: "absolute",
    pointerEvents: "none",
    userSelect: "none",
    zIndex: 0,
  };

  return (
    <>
      <motion.img
        src={CORNER_DECOR.topLeft.src}
        alt=""
        initial={{ x: "-130%" }}
        animate={leftControls}
        style={{ ...base, top: 0, left: 0, width: cqw(CORNER_DECOR.topLeft.w), height: cqw(CORNER_DECOR.topLeft.h) }}
      />
      <motion.img
        src={CORNER_DECOR.topRight.src}
        alt=""
        initial={{ x: "130%" }}
        animate={rightControls}
        style={{ ...base, top: 0, right: 0, width: cqw(CORNER_DECOR.topRight.w), height: cqw(CORNER_DECOR.topRight.h) }}
      />
      <motion.img
        src={CORNER_DECOR.bottomLeft.src}
        alt=""
        initial={{ x: "-130%" }}
        animate={leftControls}
        style={{ ...base, bottom: 0, left: 0, width: cqw(CORNER_DECOR.bottomLeft.w), height: cqw(CORNER_DECOR.bottomLeft.h) }}
      />
      <motion.img
        src={CORNER_DECOR.bottomRight.src}
        alt=""
        initial={{ x: "130%" }}
        animate={rightControls}
        style={{ ...base, bottom: 0, right: 0, width: cqw(CORNER_DECOR.bottomRight.w), height: cqw(CORNER_DECOR.bottomRight.h) }}
      />
    </>
  );
}

// ============================================================
//  Profile pill — avatar + stacked name/level + star/count
// ============================================================

const AVATAR_SRC = (avatarId) => `/avatars/${avatarId}.png`;
const STAR_ICON_SRC = "/star.png";
const NICKNAME_MAX_CHARS = 8;

function useNameFitScale(name) {
  const measureRef = useRef(null);
  const columnRef = useRef(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const measure = () => {
      const textEl = measureRef.current;
      const columnEl = columnRef.current;
      if (!textEl || !columnEl) return;
      const naturalWidth = textEl.scrollWidth;
      const columnWidth = columnEl.clientWidth;
      if (naturalWidth <= 0 || columnWidth <= 0) return;
      setScale(naturalWidth > columnWidth ? columnWidth / naturalWidth : 1);
    };

    measure();
    if (document.fonts?.ready) {
      document.fonts.ready.then(measure);
    }
  }, [name]);

  return { measureRef, columnRef, scale };
}

const PILL_RADIUS = 18;
const PILL_PAD_X = 10;
const PILL_PAD_Y = 6;
const PILL_GAP = 10;

const AVATAR_SIZE = 51;
const STAR_SIZE = 34;
const STAR_GAP = 6;

const NAME_FONT = 22;
const LEVEL_FONT = 13;
const COUNT_FONT = 14;
const NAME_COLUMN_W = 75;

const MOBILE_PILL_RADIUS = 14;
const MOBILE_PILL_PAD_X = 8;
const MOBILE_PILL_PAD_Y = 5;
const MOBILE_PILL_GAP = 6;

const MOBILE_AVATAR_SIZE = 36;
const MOBILE_STAR_SIZE = 24;
const MOBILE_STAR_GAP = 4;

const MOBILE_NAME_FONT = 15;
const MOBILE_LEVEL_FONT = 10;
const MOBILE_COUNT_FONT = 11;
const MOBILE_NAME_COLUMN_W = 54;

function ProfilePill({ name, level, stars, avatarId, mobile = false }) {
  const truncated = name.length > NICKNAME_MAX_CHARS ? name.slice(0, NICKNAME_MAX_CHARS) : name;
  const { measureRef, columnRef, scale } = useNameFitScale(truncated);

  const u = mobile ? (px) => `${px}px` : cqw;

  const radius = mobile ? MOBILE_PILL_RADIUS : PILL_RADIUS;
  const padX = mobile ? MOBILE_PILL_PAD_X : PILL_PAD_X;
  const padY = mobile ? MOBILE_PILL_PAD_Y : PILL_PAD_Y;
  const gap = mobile ? MOBILE_PILL_GAP : PILL_GAP;
  const avatarSize = mobile ? MOBILE_AVATAR_SIZE : AVATAR_SIZE;
  const starSize = mobile ? MOBILE_STAR_SIZE : STAR_SIZE;
  const starGap = mobile ? MOBILE_STAR_GAP : STAR_GAP;
  const nameFont = mobile ? MOBILE_NAME_FONT : NAME_FONT;
  const levelFont = mobile ? MOBILE_LEVEL_FONT : LEVEL_FONT;
  const countFont = mobile ? MOBILE_COUNT_FONT : COUNT_FONT;
  const nameColumnW = mobile ? MOBILE_NAME_COLUMN_W : NAME_COLUMN_W;

  return (
    <div
      className={mobile ? "flex items-center" : "absolute flex items-center"}
      style={{
        ...(mobile ? {} : { right: cqw(55), top: cqw(30) }),
        borderRadius: u(radius),
        backgroundColor: "#FBEEC9",
        boxShadow: `0 ${u(4)} ${u(4)} rgba(0,0,0,0.25)`,
        padding: `${u(padY)} ${u(padX)}`,
        boxSizing: "border-box",
        gap: u(gap),
      }}
    >
      <img
        src={AVATAR_SRC(avatarId)}
        alt=""
        style={{
          width: u(avatarSize),
          height: u(avatarSize),
          minWidth: u(avatarSize),
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0,
        }}
      />

      <div
        ref={columnRef}
        style={{
          maxWidth: u(nameColumnW),
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <span
          ref={measureRef}
          style={{
            display: "inline-block",
            fontFamily: "Inria Sans",
            fontWeight: 700,
            fontSize: u(nameFont),
            color: "#2D1C82",
            whiteSpace: "nowrap",
            lineHeight: 1.1,
            transform: `scale(${scale})`,
            transformOrigin: "left center",
          }}
        >
          {truncated}
        </span>
        <span
          style={{
            fontFamily: "Inria Sans",
            fontWeight: 700,
            fontSize: u(levelFont),
            color: "#4430A4",
            whiteSpace: "nowrap",
            lineHeight: 1.2,
          }}
        >
          Level {level}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: u(starGap),
          flexShrink: 0,
        }}
      >
        <img
          src={STAR_ICON_SRC}
          alt=""
          style={{ width: u(starSize), height: u(starSize), flexShrink: 0 }}
        />
        <span
          style={{
            fontFamily: "Inria Sans",
            fontWeight: 700,
            fontSize: u(countFont),
            color: "#06090A",
            whiteSpace: "nowrap",
          }}
        >
          {stars}
        </span>
      </div>
    </div>
  );
}

export default function MainMenu({ onOpenDashboard }) {
  const { user, token } = useAuth();
  const [activeNav, setActiveNav] = useState("home");
  const [desktopIslandIndex, setDesktopIslandIndex] = useState(0);
  const [profileReady, setProfileReady] = useState(false);
  const [profileOk, setProfileOk] = useState(false);
useEffect(() => {
     let cancelled = false;

     async function checkProfile() {
       // start from whatever's cached locally (fast, works offline)
       let profile = loadProfile(user?.email);

       // then reconcile with the backend — this is what makes a fresh
       // login / refresh / logout-then-login always re-check correctly,
       // even on a device that never had this profile cached before
       if (token) {
         try {
           const data = await profileApi.get(token);
           if (data?.profile) {
             profile = mergeBackendProfile(profile || {}, data.profile);
             localStorage.setItem(
               `kids-compass-profile-${user?.email || "guest"}`,
               JSON.stringify(profile)
             );
           }
         } catch {
           // backend unreachable — fall back to whatever's cached locally
         }
       }

       if (!cancelled) {
         setProfileOk(isProfileComplete(profile));
         setProfileReady(true);
       }
     }

     checkProfile();
     return () => {
       cancelled = true;
     };
   }, [user, token]);

   if (!profileReady) return null; // or a small splash/spinner if you have one

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: "#4f6b3a" }}>
      <img
        src="/menu-bg.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {!profileOk && (
              <ProfileReminderBunny onGoToProfile={() => onOpenDashboard("Child Profiles")} />
      )}

      {/* ===========================
            Desktop
         =========================== */}
      <div
        className="hidden md:block relative w-full h-full"
        style={{ containerType: "inline-size" }}
      >
        <CornerDecor activeIndex={desktopIslandIndex} />

        <ProfilePill name="Aarav" level={7} stars={330} avatarId="Aditya" />

        <nav
          aria-label="Main menu"
          className="absolute flex flex-col items-center justify-center"
          style={{
            left: cqw(29),
            top: "50%",
            transform: "translateY(-50%)",
            width: cqw(137),
            height: cqw(428),
            borderRadius: cqw(36),
            backgroundColor: "#FBEEC9",
            boxShadow: `0 ${cqw(4)} ${cqw(4)} rgba(0,0,0,0.25)`,
            gap: cqw(17),
            padding: `${cqw(18.5)} ${cqw(21)}`,
            boxSizing: "border-box",
          }}
        >
          {NAV_ITEMS.map((item) => (
  <NavButton
    key={item.id}
    item={item}
    active={activeNav === item.id}
    onClick={() => {
      setActiveNav(item.id);
      if (item.id === "dashboard") onOpenDashboard?.();
    }}
  />
))}
   </nav>


        <IslandMapPager onActiveIndexChange={setDesktopIslandIndex} />

        <div
          className="absolute flex items-center"
          style={{
            left: cqw(300),
            bottom: cqw(33),
            width: cqw(400), 
            height: cqw(110),   
            borderRadius: cqw(18),
            backgroundColor: "#FBEEC9",
            boxShadow: `0 ${cqw(4)} ${cqw(4)} rgba(0,0,0,0.25), inset 0 0 0 ${cqw(1)} #ffffff`,
            padding: `0 ${cqw(24)}`,
            boxSizing: "border-box",
          }}
        >
          <span style={{ fontFamily: "system-ui, sans-serif", fontWeight: 700, fontSize: cqw(18), color: "#4a3b2a" }}>
            Resume Learning
          </span>
        </div>

        <div
          className="absolute flex items-center"
          style={{
            left: cqw(800),
            bottom: cqw(33),
            width: cqw(400),      
            height: cqw(110),    
            borderRadius: cqw(18),
            backgroundColor: "#FBEEC9",
            boxShadow: `0 ${cqw(4)} ${cqw(4)} rgba(0,0,0,0.25), inset 0 0 0 ${cqw(1)} #ffffff`,
            padding: `0 ${cqw(24)}`,
            boxSizing: "border-box",
          }}
        >
          <span style={{ fontFamily: "system-ui, sans-serif", fontWeight: 700, fontSize: cqw(18), color: "#4a3b2a" }}>
            Daily Quest
          </span>
        </div>
      </div>

      {/* ===========================
            Mobile
         =========================== */}
      <div className="flex md:hidden flex-col w-full h-full relative">
        <div
          className="flex items-center justify-between px-4 pt-4"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          <span style={{ fontWeight: 700, color: "#2f5233", fontSize: "18px" }}>Kid Compass</span>
          <ProfilePill mobile name="Aarav" level={7} stars={320} avatarId="Aditya" />
        </div>

        <div
          className="relative flex-1 px-4 pt-3"
          style={{ width: "100%", minHeight: 0, containerType: "inline-size", overflow: "hidden" }}
        >
          {/* mobile prop is what drives mobile island sizing/positioning
              (mobileSize + mobileTop/mobileLeft or mobileRight) —
              overflow:hidden here is a safety net so any island whose
              anchor pushes it outside the safe field gets clipped right
              here instead of bleeding out past the panel edge. */}
          <IslandMapPager
            mobile
            insetTop={PANEL_INSET_MOBILE_TOP}
            insetBottom={PANEL_INSET_MOBILE_BOTTOM}
            insetLeft={PANEL_INSET_MOBILE_LEFT}
            insetRight={PANEL_INSET_MOBILE_RIGHT}
          />
        </div>

        <div className="flex flex-col gap-3 px-4 pt-1 pb-24">
          <div
            style={{
              padding: "10px",
              borderRadius: "18px",
              backgroundColor: "#FBEEC9",
              boxShadow: "0 4px 4px rgba(0,0,0,0.25), inset 0 0 0 1px #ffffff"
          
            }}
          >
            <span style={{ fontFamily: "system-ui, sans-serif", fontWeight: 700, fontSize: "15px", color: "#4a3b2a" }}>
              Resume Learning
            </span>
          </div>
          <div
            style={{
              borderRadius: "18px",
              backgroundColor: "#FBEEC9",
              boxShadow: "0 4px 4px rgba(0,0,0,0.25), inset 0 0 0 1px #ffffff",
              padding: "10px",
            }}
          >
            <span style={{ fontFamily: "system-ui, sans-serif", fontWeight: 700, fontSize: "15px", color: "#4a3b2a" }}>
              Daily Quest
            </span>
          </div>
        </div>

        <nav
          aria-label="Main menu"
          className="absolute bottom-0 left-0 right-0 flex items-center justify-around"
          style={{
            backgroundColor: "#FBEEC9",
            boxShadow: "0 -2px 8px rgba(0,0,0,0.15)",
            padding: "10px 8px",
            paddingBottom: "calc(10px + env(safe-area-inset-bottom))",
          }}
        >
          {NAV_ITEMS.map((item) => (
  <NavButton
    key={item.id}
    item={item}
    active={activeNav === item.id}
    onClick={() => {
      setActiveNav(item.id);
      if (item.id === "dashboard") onOpenDashboard?.();
    }}
    mobile
  />
))}
        </nav>
      </div>
    </div>
  );
}