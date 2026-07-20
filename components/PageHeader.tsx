export default function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-[36px] tracking-tight text-ink" style={{ fontWeight: 780, lineHeight: 1.08 }}>
        {title}
      </h1>
      <p className="text-[17px] text-muted mt-2" style={{ lineHeight: 1.55 }}>
        {subtitle}
      </p>
    </div>
  );
}
