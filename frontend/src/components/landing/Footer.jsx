import { motion } from "framer-motion";

/*
  Footer / "About Us" section.
  Reference was a generic dark SaaS footer (brand + contact, 3 link
  columns, social icons, bottom bar) — same skeleton, but content and
  color language pulled from the rest of the site: Baloo 2 everywhere,
  the green (#A2D542) used as the CTA/accent color on the hero and the
  purple (#A070B9) used on the ForParents CTA, both reused here instead
  of introducing a new accent.
*/

const LINK_COLUMNS = [
  {
    heading: "Explore",
    links: ["Play & Explore", "Go on Adventures", "AI-Powered Guidance", "For Parents"],
  },
  {
    heading: "Company",
    links: ["About Us", "Careers", "Blog", "Press Kit"],
  },
  {
    heading: "Resources",
    links: ["FAQs", "Help Center", "Safety & Privacy", "Parent Guide"],
  },
];

const SOCIALS = [
  {
    label: "Instagram",
    path: "M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.79.22 2.43.46.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.24.64.41 1.36.46 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.79-.46 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.24-1.36.41-2.43.46-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.79-.22-2.43-.46a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.24-.64-.41-1.36-.46-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.79.46-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.44 2.5c.64-.24 1.36-.41 2.43-.46C8.94 2.01 9.28 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-8.4a1.17 1.17 0 1 1 0-2.33 1.17 1.17 0 0 1 0 2.33z",
  },
  {
    label: "Facebook",
    path: "M13.5 21v-7.5h2.52l.38-2.93h-2.9V8.7c0-.85.24-1.43 1.46-1.43h1.55V4.66A20.7 20.7 0 0 0 14.3 4.5c-2.2 0-3.71 1.34-3.71 3.8v2.27H8.06v2.93h2.53V21h2.91z",
  },
  {
    label: "YouTube",
    path: "M22 12s0-3.13-.4-4.64a2.5 2.5 0 0 0-1.76-1.77C18.34 5.2 12 5.2 12 5.2s-6.34 0-7.84.4a2.5 2.5 0 0 0-1.76 1.76C2 8.87 2 12 2 12s0 3.13.4 4.64c.22.85.9 1.53 1.76 1.76 1.5.4 7.84.4 7.84.4s6.34 0 7.84-.4a2.5 2.5 0 0 0 1.76-1.76C22 15.13 22 12 22 12zM9.94 15.3V8.7L15.7 12l-5.76 3.3z",
  },
  {
    label: "Twitter",
    path: "M22 5.9c-.66.3-1.36.5-2.1.6.75-.45 1.33-1.17 1.6-2.02-.71.42-1.5.72-2.33.89A3.66 3.66 0 0 0 12.8 8.6c0 .29.03.57.1.83A10.4 10.4 0 0 1 5.3 5.5a3.66 3.66 0 0 0 1.14 4.9c-.6-.02-1.16-.19-1.65-.46v.05c0 1.78 1.27 3.27 2.95 3.6a3.7 3.7 0 0 1-1.65.06 3.67 3.67 0 0 0 3.42 2.55A7.35 7.35 0 0 1 2 17.75a10.37 10.37 0 0 0 5.62 1.65c6.74 0 10.43-5.58 10.43-10.43l-.01-.47c.72-.51 1.34-1.16 1.83-1.9-.66.3-1.37.5-2.1.6.66-.4 1.16-1.03 1.4-1.78z",
  },
];

const hoverTransition = { type: "spring", stiffness: 450, damping: 32 };

export default function Footer() {
  return (
    <footer id="about-us" style={{ backgroundColor: "#232042", marginTop: "80px" }}>
      {/* ===========================
            Main footer content
         =========================== */}
      <motion.div
        className="mx-auto"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1] }}
        style={{ width: "90%",  padding: "56px 0 40px" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-10">
        <div className="col-span-2 md:col-span-2">
        <div
        className="flex items-center"
        style={{
          gap: "14px",
        }}
      >
        <img
          src="/chumbi-logo.png"
          alt="Chumbi Valley"
          style={{
                width: "80px",
                height: "64px",
                objectFit: "contain",
                flexShrink: 0,
                transform: "translateY(-10px)",
              }}
                />

            <span
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontWeight: 800,
                fontSize: "20px",
                color: "#FFFFFF",
                whiteSpace: "nowrap",
              }}
            >
              Chumbi Valley
            </span>
          </div>

            <p
              className="m-0"
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: 1.5,
                color: "#B8B6C9",
                marginTop: "14px",
                maxWidth: "300px",
              }}
            >
              A safe and fun place where children play, explore, and discover
              who they are — with a little help from their AI friend.
            </p>

            <div className="flex flex-col gap-3 mt-6">
              <a
                href="mailto:hello@chumbivalley.com"
                className="flex items-center gap-2"
                style={{ textDecoration: "none" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11z"
                    stroke="#A2D542"
                    strokeWidth="1.6"
                  />
                  <path d="M4 6.5 12 13l8-6.5" stroke="#A2D542" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <span
                  style={{
                    fontFamily: "'Baloo 2', cursive",
                    fontWeight: 700,
                    fontSize: "14px",
                    color: "#FFFFFF",
                  }}
                >
                  hello@chumbivalley.com
                </span>
              </a>

              <a
                href="#"
                className="flex items-center gap-2"
                style={{ textDecoration: "none" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 15.5v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.12 3.68 2 2 0 0 1 3.11 1.5h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.66 2.62a2 2 0 0 1-.45 2.11L7.1 9.17a16 16 0 0 0 6 6l1.22-1.22a2 2 0 0 1 2.11-.45c.84.32 1.72.54 2.62.66a2 2 0 0 1 1.72 2.02z"
                    stroke="#A2D542"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  style={{
                    fontFamily: "'Baloo 2', cursive",
                    fontWeight: 700,
                    fontSize: "14px",
                    color: "#FFFFFF",
                  }}
                >
                  Chat With Us
                </span>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {LINK_COLUMNS.map((col) => (
            <div key={col.heading}>
              <p
                className="m-0"
                style={{
                  fontFamily: "'Baloo 2', cursive",
                  fontWeight: 800,
                  fontSize: "15px",
                  color: "#A2D542",
                }}
              >
                {col.heading}
              </p>
              <div className="flex flex-col gap-3 mt-4">
                {col.links.map((label) => (
                  <a
                    key={label}
                    href="#"
                    style={{
                      fontFamily: "'Baloo 2', cursive",
                      fontWeight: 500,
                      fontSize: "13.5px",
                      color: "#DAD8E8",
                      textDecoration: "none",
                    }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-3 mt-10">
          {SOCIALS.map((social) => (
            <motion.a
              key={social.label}
              href="#"
              aria-label={social.label}
              whileHover={{ y: -3, backgroundColor: "#A2D542" }}
              transition={hoverTransition}
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFFFFF">
                <path d={social.path} />
              </svg>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* ===========================
            Bottom bar
         =========================== */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
        <div
          className="mx-auto flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ width: "90%", maxWidth: "1313px", padding: "20px 0" }}
        >
          <p
            className="m-0"
            style={{
              fontFamily: "'Baloo 2', cursive",
              fontWeight: 500,
              fontSize: "12.5px",
              color: "#8886A0",
              textAlign: "center",
            }}
          >
            © {new Date().getFullYear()} Made for curious minds.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="#"
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontWeight: 600,
                fontSize: "12.5px",
                color: "#DAD8E8",
                textDecoration: "underline",
              }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontWeight: 600,
                fontSize: "12.5px",
                color: "#DAD8E8",
                textDecoration: "underline",
              }}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
