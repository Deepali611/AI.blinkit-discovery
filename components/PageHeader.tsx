export default function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8 border-b border-[#E8E5DF]/50 pb-5">
      <h1 className="font-serif font-bold text-[32px] tracking-tight text-[#1E221F]" style={{ lineHeight: 1.15 }}>
        {title}
      </h1>
      <p className="font-sans text-[14.5px] text-[#6B7566] mt-2.5 max-w-3xl leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}
