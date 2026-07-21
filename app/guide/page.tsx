import Link from "next/link";
import { ArrowLeft, Play, Filter, BookOpen, Compass, Clipboard } from "lucide-react";

export default function UserGuidePage() {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-[#ECE8DE] pb-6">
        <div>
          <h1 className="font-display font-extrabold text-[28px] text-[#171717] tracking-tight">
            User Guide
          </h1>
          <p className="text-[14px] text-[#5F6368] mt-1 font-medium">
            How to Operate the Discovery Dashboard
          </p>
        </div>
        <Link
          href="/"
          className="bg-white border border-[#ECE8DE] text-[#5F6368] hover:text-[#171717] text-[12px] font-bold px-4 py-2.5 rounded-[12px] transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>
      </div>

      {/* Numbered Flow Section */}
      <div className="bg-white border border-[#ECE8DE] rounded-[18px] p-6 shadow-sm space-y-6">
        <h2 className="font-display font-bold text-[18px] text-[#171717]">
          Step-by-Step Operation Guide
        </h2>
        
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-[#F3F5F1] border border-[#59624B]/20 text-[#59624B] flex items-center justify-center font-mono font-bold text-[14px] shrink-0">
              1
            </div>
            <div>
              <h3 className="font-display font-bold text-[15px] text-[#171717]">Step 1: Open Dashboard</h3>
              <p className="text-[13px] text-[#5F6368] mt-1 leading-relaxed">
                Start with the ready dashboard. By default, the engine loads all 189 high-confidence behavioral signals collected from the 1,176 reviews database.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-[#F3F5F1] border border-[#59624B]/20 text-[#59624B] flex items-center justify-center font-mono font-bold text-[14px] shrink-0">
              2
            </div>
            <div>
              <h3 className="font-display font-bold text-[15px] text-[#171717]">Step 2: Filter Evidence</h3>
              <p className="text-[13px] text-[#5F6368] mt-1 leading-relaxed">
                Use the filter panel to isolate feedback by source (e.g., Reddit) or select multiple customer segments (e.g., heavy_user, price_sensitive). Toggle "Hide unclassified or weak-signal records" to focus only on clean patterns.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-[#F3F5F1] border border-[#59624B]/20 text-[#59624B] flex items-center justify-center font-mono font-bold text-[14px] shrink-0">
              3
            </div>
            <div>
              <h3 className="font-display font-bold text-[15px] text-[#171717]">Step 3: Read the 8 Findings</h3>
              <p className="text-[13px] text-[#5F6368] mt-1 leading-relaxed">
                Review the 8 brief-related dashboard cards below. Read the dynamic charts and expand the "What this chart means" panel to understand the behavioral context.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recommended Flow & Dashboard Mappings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recommended Flow */}
        <div className="bg-white border border-[#ECE8DE] rounded-[18px] p-6 shadow-sm space-y-4">
          <h2 className="font-display font-bold text-[16px] text-[#171717] flex items-center gap-2">
            <Compass size={16} className="text-[#59624B]" /> Recommended Flow
          </h2>
          <ol className="list-decimal pl-5 text-[13px] text-[#5F6368] space-y-3 leading-relaxed">
            <li>
              Review the global metrics on the dashboard to realize that <strong>trust barriers dominate</strong> convenience or pricing issues.
            </li>
            <li>
              Toggle the customer segment filters to <strong>heavy_user</strong> to see why high-frequency repeat shoppers avoid trying new categories.
            </li>
            <li>
              Look at the <strong>Segment × Reason-Type Matrix</strong> to pinpoint exact intersections of segment risk, and click on cells to zoom in.
            </li>
            <li>
              Verify statistical findings qualitatively by scrolling down to the <strong>Verbatim Evidence</strong> quotes matching the active filter.
            </li>
            <li>
              Export the filtered dataset and generated markdown report to share findings with design and roadmap teams.
            </li>
          </ol>
        </div>

        {/* How to Read the Dashboard */}
        <div className="bg-white border border-[#ECE8DE] rounded-[18px] p-6 shadow-sm space-y-4">
          <h2 className="font-display font-bold text-[16px] text-[#171717] flex items-center gap-2">
            <Clipboard size={16} className="text-[#59624B]" /> How to Read the 8 Questions
          </h2>
          <ul className="list-disc pl-5 text-[12.5px] text-[#5F6368] space-y-2 leading-relaxed">
            <li>
              <strong>Q1 (Repeat-Buying):</strong> Repeat purchases are driven by risk-avoidance, as habit scores remain extremely low (only 3.7%).
            </li>
            <li>
              <strong>Q2 (Explore Barriers):</strong> Trust and quality risks are the primary barrier blocking trials of unfamiliar categories.
            </li>
            <li>
              <strong>Q3 (Product Discovery):</strong> Current discovery is weak and accidental, with complaints on broken search algorithms.
            </li>
            <li>
              <strong>Q4 (Habit Role):</strong> Loyal habits are secondary to deal-seeking price comparison across quick-commerce apps.
            </li>
            <li>
              <strong>Q5 (Information Needed):</strong> Shoppers request authenticity badges, packaging integrity, and expiry transparency.
            </li>
            <li>
              <strong>Q6 (Frustrations):</strong> Frustrations center on fake products, expired items, and forced substitutions.
            </li>
            <li>
              <strong>Q7 (Experiment Segments):</strong> Loyal heavy users show the highest readiness to try new categories if trust is built.
            </li>
            <li>
              <strong>Q8 (Unmet Needs):</strong> Unmet needs map to concrete opportunities like freshness guarantees and clear refund flows.
            </li>
          </ul>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 flex justify-center">
        <Link
          href="/"
          className="bg-[#F8CB46] hover:bg-[#F8CB46]/90 text-[#171717] text-[13px] font-extrabold px-6 py-3 rounded-[14px] shadow-sm transition-colors"
        >
          Open Discovery Dashboard
        </Link>
      </div>
    </div>
  );
}
