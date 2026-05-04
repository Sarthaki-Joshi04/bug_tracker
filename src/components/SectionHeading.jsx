export default function SectionHeading({ eyebrow, title, copy, align = "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : ""}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-4">{title}</h2>
      {copy ? <p className="section-copy mt-4">{copy}</p> : null}
    </div>
  );
}
