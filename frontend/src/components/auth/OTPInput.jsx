import { useRef } from "react";

export default function OTPInput({
  length = 6,
  value,
  onChange,
  boxStyle = {},
  gap = "8px",
}) {
  const inputRefs = useRef([]);

  const digits = Array.from({ length }, (_, i) => value[i] || "");

  const commit = (next) => {
    onChange(next.join("").slice(0, length));
  };

  const handleChange = (i, raw) => {
    const char = raw.replace(/\D/g, "").slice(-1);

    const next = [...digits];
    next[i] = char;

    commit(next);

    if (char && i < length - 1) {
      requestAnimationFrame(() => {
        inputRefs.current[i + 1]?.focus();
      });
    }
  };

  const handleKeyDown = (i, e) => {
    switch (e.key) {
      case "Backspace": {
        e.preventDefault();

        const next = [...digits];

        // Current box has a digit -> clear it
        if (next[i] !== "") {
          next[i] = "";
          commit(next);

          requestAnimationFrame(() => {
            inputRefs.current[i]?.focus();
          });

          return;
        }

        // Current box empty -> move back
        if (i > 0) {
          next[i - 1] = "";
          commit(next);

          requestAnimationFrame(() => {
            inputRefs.current[i - 1]?.focus();
          });
        }

        return;
      }

      case "ArrowLeft":
        e.preventDefault();
        if (i > 0) {
          inputRefs.current[i - 1]?.focus();
        }
        return;

      case "ArrowRight":
        e.preventDefault();
        if (i < length - 1) {
          inputRefs.current[i + 1]?.focus();
        }
        return;

      default:
        return;
    }
  };

  const handleFocus = (i) => {
    const firstEmpty = digits.findIndex((d) => d === "");
    const target = firstEmpty === -1 ? length - 1 : firstEmpty;

    if (target !== i) {
      requestAnimationFrame(() => {
        inputRefs.current[target]?.focus();
      });
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!pasted) return;

    onChange(pasted);

    requestAnimationFrame(() => {
      inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
    });
  };

  const keepCaretAtEnd = (e) => {
    requestAnimationFrame(() => {
      const input = e.target;
      input.setSelectionRange(input.value.length, input.value.length);
    });
  };

  return (
    <div className="flex" style={{ gap }}>
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onFocus={() => handleFocus(i)}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onClick={keepCaretAtEnd}
          onMouseUp={(e) => {
            e.preventDefault();
            keepCaretAtEnd(e);
          }}
          className="text-center bg-white border border-gray-200 outline-none focus:ring-2 focus:ring-[#A3D9A5] transition"
          style={{
            boxSizing: "border-box",
            ...boxStyle,
          }}
        />
      ))}
    </div>
  );
}