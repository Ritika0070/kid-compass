import { useEffect, useRef } from "react";

const BackgroundDecor = () => {
  const refs = useRef([]);

  // width/height/color/opacity/rotate: exactly as given, never scaled.
  const boxes = [
    { width: 330, height: 300, color: "#FAF682", opacity: 0.5, rotate: -10 },
    { width: 190, height: 210, color: "#FCC6B8", opacity: 0.25, rotate: -27 },
    { width: 190, height: 190, color: "#c2f7c0", opacity: 0.3, rotate: -10 },
    { width: 240, height: 240, color: "#c2f7c0", opacity: 0.3, rotate: -25 },
    { width: 470, height: 370, color: "#FFF8BE", opacity: 1, rotate: 10 },
    { width: 240, height: 330, color: "#befffc", opacity: 0.3, rotate: -25 },
    { width: 300, height: 250, color: "#c8b7f5", opacity: 0.3, rotate: 10 },
    { width: 330, height: 330, color: "#ccb8fc", opacity: 0.2, rotate: 15 },
  ];

  // Starting layout: a 4-column x 2-row grid spread across the real
  // window (fractions of innerWidth/innerHeight), so boxes always land
  // spaced apart no matter the screen size — no clustering, no clamping
  // multiple boxes toward the same edge.
  const gridSlots = [
    { col: 0, row: 0 },
    { col: 1, row: 0 },
    { col: 2, row: 0 },
    { col: 3, row: 0 },
    { col: 1, row: 1 },
    { col: 0, row: 1 },
    { col: 2, row: 1 },
    { col: 3, row: 1 },
  ];
  const colFrac = [0.0, 0.26, 0.52, 0.78];
  const rowFrac = [0.03, 0.58];

  useEffect(() => {
    const placeInGrid = (b, slot, w, h) => {
      let x = colFrac[slot.col] * w;
      let y = rowFrac[slot.row] * h;
      x = Math.min(Math.max(x, 0), Math.max(w - b.width, 0));
      y = Math.min(Math.max(y, 0), Math.max(h - b.height, 0));
      return { x, y };
    };

    const state = boxes.map((b, i) => {
      const { x, y } = placeInGrid(b, gridSlots[i], window.innerWidth, window.innerHeight);
      return {
        x,
        y,
        dx: (Math.random() * 0.35 + 0.15) * (Math.random() < 0.5 ? -1 : 1),
        dy: (Math.random() * 0.35 + 0.15) * (Math.random() < 0.5 ? -1 : 1),
        rot: b.rotate,
        drot: (Math.random() * 0.03 + 0.01) * (Math.random() < 0.5 ? -1 : 1),
      };
    });

    // Apply starting position immediately, before the first animation
    // frame, so there's no flash at (0,0).
    state.forEach((s, i) => {
      const el = refs.current[i];
      if (el) {
        el.style.transform = `translate(${s.x}px,${s.y}px) rotate(${s.rot}deg)`;
      }
    });

    let frame;

    const animate = () => {
      state.forEach((s, i) => {
        s.x += s.dx;
        s.y += s.dy;
        s.rot += s.drot;

        const w = window.innerWidth;
        const h = window.innerHeight;

        const bw = boxes[i].width;
        const bh = boxes[i].height;

        // Overhang scales with the box's own size (max 40% of it, capped at
        // 80px) so a box never drifts mostly off-screen before bouncing back.
        const marginX = Math.min(80, bw * 0.4);
        const marginY = Math.min(80, bh * 0.4);

        if (s.x < -marginX || s.x + bw > w + marginX) s.dx *= -1;

        if (s.y < -marginY || s.y + bh > h + marginY) s.dy *= -1;

        refs.current[i].style.transform = `translate(${s.x}px,${s.y}px) rotate(${s.rot}deg)`;
      });

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      {boxes.map((box, i) => (
        <div
          key={i}
          ref={(el) => (refs.current[i] = el)}
          style={{
            position: "absolute",

            width: box.width,
            height: box.height,

            borderRadius: "36px",

            background: box.color,

            opacity: box.opacity,

            boxShadow: "inset 0 0 45px rgba(255,255,255,.25)",

            filter: "blur(.3px)",

            pointerEvents: "none",

            willChange: "transform",
          }}
        />
      ))}
    </>
  );
};

export default BackgroundDecor;