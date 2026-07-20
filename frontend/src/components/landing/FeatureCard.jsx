import { motion } from "framer-motion";

export default function FeatureCard({ icon, title, description, bg, index = 0 }) {
  return (
    <motion.div
      className="w-full h-full flex items-center"
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.33, 1, 0.68, 1] }}
      style={{
        backgroundColor: bg,
        borderRadius: "22px",
        padding: "18px 16px",
        gap: "14px",
        boxSizing: "border-box",
      }}
    >
      <img
        src={icon}
        alt=""
        className="flex-shrink-0"
        style={{
          height: "72px",
          width: "auto",
          objectFit: "contain",
        }}
      />
      <div className="flex flex-col justify-center" style={{ minWidth: 0, flex: 1 }}>
        <p
          className="m-0"
          style={{
            fontFamily: "'Baloo 2', cursive",
            fontWeight: 800,
            fontSize: "17px",
            lineHeight: 1.15,
            color: "#212020",
            overflowWrap: "break-word",
          }}
        >
          {title}
        </p>
        <p
          className="m-0"
          style={{
            fontFamily: "'Baloo 2', cursive",
            fontWeight: 500,
            fontSize: "13px",
            color: "#3A3A3A",
            lineHeight: 1.35,
            marginTop: "5px",
            overflowWrap: "break-word",
          }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}