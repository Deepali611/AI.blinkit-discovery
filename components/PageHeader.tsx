export default function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8 border-b border-[#ECE8DE] pb-5">
      <h1 className="font-display font-extrabold text-[28px] tracking-tight text-[#171717]" style={{ lineHeight: 1.15 }}>
        {title}
      </h1>
      <p className="font-sans text-[13.5px] text-[#5F6368] mt-2.5 max-w-3xl leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}
