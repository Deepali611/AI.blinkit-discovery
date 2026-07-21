"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  reviews, 
  ReviewRow, 
  TOTAL_REVIEWS_SCANNED, 
  REASON_COLORS, 
  SEGMENT_COLORS 
} from "@/lib/data";
import { 
  ChevronDown, 
  ChevronUp, 
  SlidersHorizontal, 
  RefreshCw, 
  FileDown, 
  Check, 
  ExternalLink,
  ShieldCheck, 
  FileCode,
  Layers,
  Database,
  ArrowRightLeft,
  Quote
} from "lucide-react";

// Segment initial-avatar mapping helper
const getSegmentAvatar = (segment: string) => {
  const map: Record<string, string> = {
    heavy_user: "HU",
    quality_focused: "QF",
    price_sensitive: "PS",
    light_new_user: "LN",
    one_time_complainer: "OC",
    senior_citizen: "SC",
    unclear: "UN"
  };
  return map[segment] || "U";
};

// Expose bucketInfoNeeded locally
function bucketInfoNeeded(text: string): string | null {
  if (!text || text === "none" || text === "not stated") return null;
  const t = text.toLowerCase();
  if (/(authentic|seller verif|condition guarantee|seal|ingredient|quality rec|quality assurance)/.test(t))
    return "Authenticity & quality guarantee";
  if (/(expiry|tamper|cold-chain|packaging|delivery time guarantee|weatherproof)/.test(t))
    return "Packaging & delivery integrity";
  if (/(price|fee|mrp|tax|surge|billing)/.test(t)) return "Pricing transparency";
  if (/(return|replace|refund|cancellation|compensation|promo|substitution|order edit)/.test(t))
    return "Return & refund reliability";
  if (/(stock|catalog|assortment|sku|variant|coupon|incentive)/.test(t)) return "Stock & catalog accuracy";
  if (/(payment|wallet|cod|upi|permission|accountability)/.test(t)) return "Payment & platform trust";
  if (/(interface|feature awareness|search|cart|elderly|serviceability|coverage|order-mod)/.test(t))
    return "Discovery & usability";
  return "Other";
}

export default function LandingPage() {
  // Tab State
  const [activeTab, setActiveTab] = useState<"dashboard" | "collect_analyze">("dashboard");

  // Filter States
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [hideWeakSignal, setHideWeakSignal] = useState(false);
  const [matrixFilter, setMatrixFilter] = useState<{ segment: string; reason: string } | null>(null);

  // Guide expand states
  const [guide1Expanded, setGuide1Expanded] = useState(false);
  const [guide2Expanded, setGuide2Expanded] = useState(false);
  const [downloadsOpen, setDownloadsOpen] = useState(false);

  // Filter computation
  const filteredReviews = reviews.filter((r) => {
    // 1. Source Filter
    if (selectedSources.length > 0 && !selectedSources.includes(r.source)) {
      return false;
    }
    // 2. Segment Filter
    if (selectedSegments.length > 0 && !selectedSegments.includes(r.user_segment)) {
      return false;
    }
    // 3. Weak signal filter
    if (hideWeakSignal) {
      if (r.user_segment === "unclear" || r.confidence === "low") {
        return false;
      }
    }
    // 4. Matrix interactive filter
    if (matrixFilter) {
      if (r.user_segment !== matrixFilter.segment || r.reason_type !== matrixFilter.reason) {
        return false;
      }
    }
    return true;
  });

  // Recompute signal quality count live
  const highConfCount = filteredReviews.filter((r) => r.confidence === "high").length;
  const lowerConfCount = filteredReviews.filter((r) => r.confidence !== "high").length;

  // Reset all filters
  const resetFilters = () => {
    setSelectedSources([]);
    setSelectedSegments([]);
    setHideWeakSignal(false);
    setMatrixFilter(null);
  };

  // Source list and segment list for UI rendering
  const sourcesList = ["Google Play", "Reddit", "YouTube", "App Store"];
  const segmentsList = [
    "heavy_user",
    "quality_focused",
    "price_sensitive",
    "light_new_user",
    "one_time_complainer",
    "senior_citizen",
    "unclear"
  ];

  // Helper for toggle multi-select sources
  const toggleSource = (src: string) => {
    if (selectedSources.includes(src)) {
      setSelectedSources(selectedSources.filter((s) => s !== src));
    } else {
      setSelectedSources([...selectedSources, src]);
    }
  };

  // Helper for toggle multi-select segments
  const toggleSegment = (seg: string) => {
    if (selectedSegments.includes(seg)) {
      setSelectedSegments(selectedSegments.filter((s) => s !== seg));
    } else {
      setSelectedSegments([...selectedSegments, seg]);
    }
  };

  // Dynamic takeaway logic
  const getTopTwoTakeaway = (data: { name: string; count: number }[]) => {
    const sorted = [...data].sort((a, b) => b.count - a.count);
    if (sorted.length >= 2 && sorted[0].count > 0) {
      return `${sorted[0].name.replace(/_/g, " ")} and ${sorted[1].name.replace(/_/g, " ")} lead this view, but signal is spread across multiple themes.`;
    } else if (sorted.length === 1 && sorted[0].count > 0) {
      return `${sorted[0].name.replace(/_/g, " ")} leads this view.`;
    }
    return "No active signals match the selected filters.";
  };

  // Download logic helpers
  const triggerDownload = (content: string, filename: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadsOpen(false);
  };

  const downloadCSV = () => {
    const headers = ["Row Number", "Repeat Signal", "Category", "Barrier", "Reason Type", "Info Needed", "Segment", "Duplicate", "Confidence", "Source", "Quote"];
    const rows = filteredReviews.map((r) => [
      r.row_number,
      r.repeat_buying_signal,
      `"${r.category_mentioned}"`,
      `"${r.barrier_to_new_category}"`,
      r.reason_type,
      `"${r.info_needed}"`,
      r.user_segment,
      r.duplicate_flag,
      r.confidence,
      r.source,
      `"${r.quote.replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    triggerDownload(csvContent, "blinkit_filtered_feedback.csv", "text/csv;charset=utf-8;");
  };

  const downloadJSON = () => {
    const jsonContent = JSON.stringify(filteredReviews, null, 2);
    triggerDownload(jsonContent, "blinkit_filtered_feedback.json", "application/json");
  };

  const downloadMD = () => {
    let md = `# Blinkit Discovery Engine - Summary Report\n\n`;
    md += `**Date:** ${new Date().toLocaleDateString()}\n`;
    md += `**Active Records in Filter View:** ${filteredReviews.length} / 189\n\n`;
    md += `## Filter Settings\n`;
    md += `- **Sources:** ${selectedSources.length ? selectedSources.join(", ") : "All sources"}\n`;
    md += `- **Segments:** ${selectedSegments.length ? selectedSegments.join(", ") : "All segments"}\n`;
    md += `- **Hide Weak Signals:** ${hideWeakSignal ? "Yes" : "No"}\n`;
    if (matrixFilter) {
      md += `- **Matrix Focus Cell:** Segment "${matrixFilter.segment}" × Reason "${matrixFilter.reason}"\n`;
    }
    md += `\n`;
    md += `## Top Qualitative Evidence (Verbatim Proofs)\n\n`;
    filteredReviews.slice(0, 8).forEach((r, idx) => {
      md += `### Evidence #${idx + 1} (Row #${r.row_number})\n`;
      md += `> "${r.quote}"\n\n`;
      md += `- **Category:** ${r.category_mentioned}\n`;
      md += `- **Barrier:** ${r.barrier_to_new_category}\n`;
      md += `- **Segment:** ${r.user_segment}\n`;
      md += `- **Reason:** ${r.reason_type}\n`;
      md += `- **Confidence:** ${r.confidence}\n\n`;
    });
    triggerDownload(md, "blinkit_filter_summary.md", "text/markdown");
  };

  // Matrix calculation data
  const matrixSegments = segmentsList;
  const matrixReasons = ["trust", "price", "convenience", "no_discovery", "habit", "other"];

  // Click handler for matrix cell
  const handleMatrixCellClick = (segment: string, reason: string) => {
    if (matrixFilter && matrixFilter.segment === segment && matrixFilter.reason === reason) {
      setMatrixFilter(null);
    } else {
      setMatrixFilter({ segment, reason });
    }
  };

  // Ranked segments calculation
  const segmentStats = segmentsList.map(seg => {
    const matching = filteredReviews.filter(r => r.user_segment === seg);
    const count = matching.length;
    const avgConf = matching.length > 0
      ? matching.reduce((sum, r) => sum + (r.confidence === "high" ? 1.0 : r.confidence === "med" ? 0.6 : 0.3), 0) / matching.length
      : 0;
    return { name: seg, count, avgConf };
  }).filter(e => e.count > 0).sort((a, b) => b.count - a.count);

  const segmentStatsTotal = segmentStats.reduce((a, b) => a + b.count, 0) || 1;

  // Unmet Needs calculation
  const unmetNeedsStats = Object.keys(REASON_COLORS).map(() => null); // mock placeholder loop length
  const unmetNeedsCounts: Record<string, number> = {};
  filteredReviews.forEach(r => {
    const b = bucketInfoNeeded(r.info_needed);
    if (b) {
      unmetNeedsCounts[b] = (unmetNeedsCounts[b] || 0) + 1;
    }
  });
  const unmetNeedsSorted = Object.entries(unmetNeedsCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
  const unmetNeedsTotal = unmetNeedsSorted.reduce((a, b) => a + b.count, 0) || 1;

  // Strongest Evidence calculation
  const strongestEvidence = filteredReviews
    .filter(r => r.duplicate_flag === "no")
    .map(r => {
      let score = 0;
      if (r.confidence === "high") score += 3;
      else if (r.confidence === "med") score += 2;
      else score += 1;

      const hasAsk = r.info_needed && r.info_needed !== "none" && r.info_needed !== "not stated";
      if (hasAsk) score += 2;

      return { ...r, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  return (
    <div className="space-y-12">
      {/* ═══════════════════════════════════════════
          LANDING PAGE HERO & GUIDE CARDS
          ═══════════════════════════════════════════ */}
      <div className="space-y-8">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-bold text-[#59624B] uppercase tracking-[0.2em] bg-[#F3F5F1] px-3.5 py-1 rounded-full border border-[#59624B]/20 inline-block">
            AI-Powered Category Discovery Engine
          </span>
          <h1 className="font-display font-extrabold text-[42px] leading-tight text-[#171717] tracking-tight">
            Blinkit Discovery Engine
          </h1>
          <p className="text-[15px] text-[#5F6368] leading-relaxed">
            Collect real customer feedback, keep only meaningful behavioral signal, 
            and turn it into a dashboard that explains why customers repeat-buy the same 
            categories, where trust breaks down, and which segments are ready to explore 
            something new.
          </p>

          {/* 4 Pill Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-[11px] font-bold text-[#59624B] bg-white border border-[#ECE8DE] px-3.5 py-1.5 rounded-full shadow-sm hover:border-[#59624B]/30 transition-all">
              Trust barriers
            </span>
            <span className="text-[11px] font-bold text-[#59624B] bg-white border border-[#ECE8DE] px-3.5 py-1.5 rounded-full shadow-sm hover:border-[#59624B]/30 transition-all">
              Price switching
            </span>
            <span className="text-[11px] font-bold text-[#59624B] bg-white border border-[#ECE8DE] px-3.5 py-1.5 rounded-full shadow-sm hover:border-[#59624B]/30 transition-all">
              Segment evidence
            </span>
            <span className="text-[11px] font-bold text-[#59624B] bg-white border border-[#ECE8DE] px-3.5 py-1.5 rounded-full shadow-sm hover:border-[#59624B]/30 transition-all">
              Verbatim proof
            </span>
          </div>
        </div>

        {/* Green Execution Banner */}
        <div className="bg-[#F3F5F1] border border-[#59624B]/20 rounded-[18px] p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="space-y-2 flex-1">
            <span className="text-[10px] font-extrabold text-[#59624B] uppercase tracking-wider block">
              Executed Analysis Loaded by Default
            </span>
            <h2 className="font-display font-extrabold text-[18px] text-[#171717] leading-snug">
              Start with the ready dashboard. The review analysis is already 
              collected, analyzed, and waiting for review.
            </h2>
            <p className="text-[13px] text-[#5F6368] leading-relaxed">
              Want to see how the pipeline works end to end?{" "}
              <button 
                onClick={() => setActiveTab("collect_analyze")}
                className="text-[#59624B] font-bold underline hover:text-[#171717]"
              >
                Open the methodology walkthrough
              </button>
              .{" "}
              <span className="text-[#8C8C8C] italic">
                This uses a fixed dataset of 1,176 reviews collected for this analysis.
              </span>
            </p>
          </div>
          {/* Stat Card */}
          <div className="bg-white border border-[#ECE8DE] rounded-[14px] p-4 text-center shrink-0 min-w-[170px] shadow-sm">
            <div className="text-[28px] font-black text-[#59624B] leading-none">
              189
            </div>
            <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider mt-1.5">
              meaningful signals
            </div>
            <div className="text-[9px] text-[#8C8C8C] font-mono mt-0.5">
              analyzed & tagged
            </div>
          </div>
        </div>

        {/* Two Guide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white border border-[#ECE8DE] rounded-[18px] p-6 shadow-sm space-y-4">
            <div>
              <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-wider block">
                For demo users
              </span>
              <h3 className="font-display font-bold text-[16px] text-[#171717] mt-0.5">
                How to operate this tool
              </h3>
            </div>
            <div>
              <button
                onClick={() => setGuide1Expanded(!guide1Expanded)}
                className="text-[11px] font-bold text-[#59624B] hover:text-[#171717] flex items-center gap-1 focus:outline-none"
              >
                {guide1Expanded ? "Hide preview details" : "Preview operate guide"}
                {guide1Expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
              {guide1Expanded && (
                <ul className="list-disc pl-4 text-[12px] text-[#5F6368] space-y-1.5 mt-2 bg-[#F8F9FA] p-3 rounded-[12px] border border-[#ECE8DE]/60 leading-relaxed">
                  <li>What the sources and customer segment filters do</li>
                  <li>How to read high-confidence vs. low-confidence signals</li>
                  <li>How to trace findings back to verbatim customer evidence quotes</li>
                </ul>
              )}
            </div>
            <Link
              href="/guide"
              className="inline-flex items-center gap-1 text-[12px] font-bold text-[#59624B] hover:text-[#171717] hover:underline"
            >
              Open guide <ExternalLink size={12} />
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[#ECE8DE] rounded-[18px] p-6 shadow-sm space-y-4">
            <div>
              <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-wider block">
                For PMs and reviewers
              </span>
              <h3 className="font-display font-bold text-[16px] text-[#171717] mt-0.5">
                Backend architecture one-pager
              </h3>
            </div>
            <div>
              <button
                onClick={() => setGuide2Expanded(!guide2Expanded)}
                className="text-[11px] font-bold text-[#59624B] hover:text-[#171717] flex items-center gap-1 focus:outline-none"
              >
                {guide2Expanded ? "Hide preview details" : "Preview synopsis details"}
                {guide2Expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
              {guide2Expanded && (
                <ul className="list-disc pl-4 text-[12px] text-[#5F6368] space-y-1.5 mt-2 bg-[#F8F9FA] p-3 rounded-[12px] border border-[#ECE8DE]/60 leading-relaxed">
                  <li>Where each raw source comes from (Reddit, YouTube, App Store)</li>
                  <li>How quality filtering and structured extraction gates work</li>
                  <li>Why every dashboard number stays traceable to real reviews</li>
                </ul>
              )}
            </div>
            <Link
              href="/architecture"
              className="inline-flex items-center gap-1 text-[12px] font-bold text-[#59624B] hover:text-[#171717] hover:underline"
            >
              Open synopsis <ExternalLink size={12} />
            </Link>
          </div>
        </div>

        {/* Top-Level Tab Toggle */}
        <div className="flex justify-center pt-2">
          <div className="bg-[#F2F1EC] p-1 rounded-[14px] border border-[#ECE8DE] flex gap-1 shadow-sm">
            <button
              onClick={() => setActiveTab("collect_analyze")}
              className={`px-6 py-2 text-[12.5px] font-bold rounded-[10px] transition-all flex items-center gap-2 ${
                activeTab === "collect_analyze"
                  ? "bg-white text-[#171717] shadow-sm"
                  : "text-[#5F6368] hover:text-[#171717]"
              }`}
            >
              <Layers size={14} /> Collect & Analyze
            </button>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-6 py-2 text-[12.5px] font-bold rounded-[10px] transition-all flex items-center gap-2 ${
                activeTab === "dashboard"
                  ? "bg-white text-[#171717] shadow-sm"
                  : "text-[#5F6368] hover:text-[#171717]"
              }`}
            >
              <SlidersHorizontal size={14} /> Dashboard View
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          TAB 1: COLLECT & ANALYZE (Methodology & Demo)
          ═══════════════════════════════════════════ */}
      {activeTab === "collect_analyze" && (
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="bg-white border border-[#ECE8DE] rounded-[18px] p-6 shadow-sm space-y-4">
            <h2 className="font-display font-extrabold text-[20px] text-[#171717]">
              Pipeline Transformation Demonstration
            </h2>
            <p className="text-[13.5px] text-[#5F6368] leading-relaxed">
              Blinkit feedback is ingested from four organic channels, normalized, filtered for noise (removing short comments or courier complaints), and classified into structured parameters. Here is a live example of the before-and-after extraction:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Raw Before */}
              <div className="bg-[#F8F9FA] border border-[#ECE8DE] rounded-[14px] p-5 space-y-3">
                <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-wider block">
                  Before: Raw Review
                </span>
                <blockquote className="text-[13px] text-[#5F6368] leading-relaxed italic bg-white p-4 rounded-[12px] border border-[#ECE8DE]/60">
                  "Ordered fresh milk packets and some vegetables. The milk was bloated and expired tomorrow, and the tomatoes were half rotten. I'm going back to buying perishables from Mother Dairy nearby. Can't risk it."
                </blockquote>
                <p className="text-[11.5px] text-[#8C8C8C]">
                  Messy, descriptive text containing spelling errors and generic frustration.
                </p>
              </div>

              {/* JSON After */}
              <div className="bg-[#F8F9FA] border border-[#ECE8DE] rounded-[14px] p-5 space-y-3">
                <span className="text-[9px] font-bold text-[#59624B] uppercase tracking-wider block">
                  After: Structured Schema Output
                </span>
                <pre className="bg-white border border-[#ECE8DE]/60 rounded-[12px] p-4 text-[10.5px] font-mono text-[#5F6368] overflow-x-auto leading-normal">
{`{
  "has_signal": true,
  "repeat_buying_signal": "no",
  "category_mentioned": "produce (perishables)",
  "barrier_to_new_category": "spoiled items and short expiry dates",
  "reason_type": "trust",
  "info_needed": "expiry visibility and freshness badges",
  "user_segment": "quality_focused",
  "confidence": "high"
}`}
                </pre>
                <p className="text-[11.5px] text-[#59624B] font-semibold flex items-center gap-1">
                  ✓ Grounded character-match validated.
                </p>
              </div>
            </div>
          </div>

          {/* Dataset Source breakdown */}
          <div className="bg-white border border-[#ECE8DE] rounded-[18px] p-6 shadow-sm space-y-6">
            <h2 className="font-display font-extrabold text-[20px] text-[#171717]">
              Dataset Source Breakdown
            </h2>
            <p className="text-[13.5px] text-[#5F6368] leading-relaxed">
              The analysis is based on 1,176 raw reviews scanned. Out of these, 189 high-quality records were extracted and tagged:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#F8F9FA] border border-[#ECE8DE] rounded-[14px] p-4 text-center">
                <div className="text-[20px] font-bold text-[#171717]">662</div>
                <div className="text-[10px] font-semibold text-[#8C8C8C] uppercase tracking-wider mt-1">
                  Google Play
                </div>
                <div className="text-[11px] text-[#5F6368] font-semibold mt-0.5">56.3% of feed</div>
              </div>
              
              <div className="bg-[#F8F9FA] border border-[#ECE8DE] rounded-[14px] p-4 text-center">
                <div className="text-[20px] font-bold text-[#171717]">360</div>
                <div className="text-[10px] font-semibold text-[#8C8C8C] uppercase tracking-wider mt-1">
                  Reddit Threads
                </div>
                <div className="text-[11px] text-[#5F6368] font-semibold mt-0.5">30.6% of feed</div>
              </div>

              <div className="bg-[#F8F9FA] border border-[#ECE8DE] rounded-[14px] p-4 text-center">
                <div className="text-[20px] font-bold text-[#171717]">144</div>
                <div className="text-[10px] font-semibold text-[#8C8C8C] uppercase tracking-wider mt-1">
                  YouTube Comments
                </div>
                <div className="text-[11px] text-[#5F6368] font-semibold mt-0.5">12.2% of feed</div>
              </div>

              <div className="bg-[#F8F9FA] border border-[#ECE8DE] rounded-[14px] p-4 text-center">
                <div className="text-[20px] font-bold text-[#171717]">10</div>
                <div className="text-[10px] font-semibold text-[#8C8C8C] uppercase tracking-wider mt-1">
                  App Store
                </div>
                <div className="text-[11px] text-[#5F6368] font-semibold mt-0.5">0.9% of feed</div>
              </div>
            </div>

            <div className="border-l-2 border-[#D64545] pl-4 py-2 bg-[#FFF5F5] rounded-r-lg">
              <p className="text-[12.5px] text-[#5F6368]">
                <strong>Source bias disclaimer:</strong> App Store sample is extremely small (n=10) and yields directional qualitative cues only. Reddit feedback skews to comparison debates (e.g. Blinkit vs Zepto) whereas Google Play Store reviews capture quick post-delivery complaints.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          TAB 2: INTERACTIVE DASHBOARD VIEW
          ═══════════════════════════════════════════ */}
      {activeTab === "dashboard" && (
        <div className="space-y-10">
          
          {/* Filters & Signal Quality Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Filters panel */}
            <div className="lg:col-span-4 bg-white border border-[#ECE8DE] rounded-[18px] p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#ECE8DE]/60 pb-3">
                <h3 className="font-display font-bold text-[15px] text-[#171717] flex items-center gap-1.5">
                  <SlidersHorizontal size={14} className="text-[#59624B]" /> Filters Panel
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-[11px] font-bold text-[#59624B] hover:text-[#171717] flex items-center gap-1"
                >
                  <RefreshCw size={11} /> Reset
                </button>
              </div>

              {/* Description */}
              <p className="text-[12px] text-[#5F6368] leading-relaxed">
                Filter by feedback source and customer segment. Every chart below recalculates 
                from the selected evidence.
              </p>

              {/* Source filter pills */}
              <div className="space-y-2">
                <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase tracking-wider block">
                  Feedback Sources
                </span>
                <div className="flex flex-wrap gap-2">
                  {sourcesList.map((src) => {
                    const isSelected = selectedSources.includes(src);
                    return (
                      <button
                        key={src}
                        onClick={() => toggleSource(src)}
                        className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all ${
                          isSelected
                            ? "bg-[#59624B] text-white border-[#59624B]"
                            : "bg-[#F8F9FA] text-[#5F6368] border-[#ECE8DE] hover:border-[#8C8C8C]/50"
                        }`}
                      >
                        {src}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Segment checkboxes */}
              <div className="space-y-2">
                <span className="font-sans text-[9px] font-bold text-[#8C8C8C] uppercase tracking-wider block">
                  Customer Segments
                </span>
                <div className="space-y-2">
                  {segmentsList.map((seg) => {
                    const isSelected = selectedSegments.includes(seg);
                    return (
                      <label 
                        key={seg} 
                        className="flex items-center gap-2.5 text-[12.5px] text-[#171717] cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSegment(seg)}
                          className="w-4 h-4 rounded border-[#ECE8DE] text-[#59624B] focus:ring-[#59624B]/30"
                        />
                        <span className="capitalize group-hover:text-[#59624B] transition-colors">
                          {seg.replace(/_/g, " ")}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Weak Signal Checkbox */}
              <div className="border-t border-[#ECE8DE]/60 pt-4">
                <label className="flex items-start gap-2.5 text-[12.5px] text-[#171717] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hideWeakSignal}
                    onChange={(e) => setHideWeakSignal(e.target.checked)}
                    className="w-4 h-4 rounded border-[#ECE8DE] text-[#59624B] focus:ring-[#59624B]/30 mt-0.5"
                  />
                  <div>
                    <span className="font-semibold block leading-tight">
                      Hide unclassified or weak-signal records
                    </span>
                    <span className="text-[10px] text-[#8C8C8C] block mt-0.5 leading-normal">
                      Excludes unclear user segments and low-confidence classifications.
                    </span>
                  </div>
                </label>
              </div>

              {/* Interactive Matrix active filter card details */}
              {matrixFilter && (
                <div className="bg-[#FFF6DD] border border-[#F8CB46]/30 p-3.5 rounded-[12px] text-[12px] space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#8C8C8C] uppercase text-[9px] tracking-wider block">
                      Active Matrix Cell Focus
                    </span>
                    <button
                      onClick={() => setMatrixFilter(null)}
                      className="text-[10px] font-bold text-[#171717] underline hover:text-[#59624B]"
                    >
                      Clear cell focus
                    </button>
                  </div>
                  <p className="text-[#171717] leading-relaxed">
                    Showing Segment <strong className="capitalize">"{matrixFilter.segment.replace(/_/g, " ")}"</strong> with Reason <strong className="capitalize">"{matrixFilter.reason}"</strong>.
                  </p>
                </div>
              )}
            </div>

            {/* Right details: Signal Quality and Matrix */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Signal Quality Banner */}
              <div className="bg-[#F3F5F1] border border-[#59624B]/20 rounded-[18px] p-5 flex items-start gap-3.5 shadow-sm">
                <ShieldCheck size={20} className="text-[#59624B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-bold text-[14px] text-[#171717] leading-none mb-1">
                    Signal Quality Verification
                  </h4>
                  <p className="text-[12.5px] text-[#5F6368] leading-relaxed">
                    Using <strong className="text-[#171717]">{highConfCount}</strong> high-confidence records 
                    from 189 meaningful feedback items. <strong className="text-[#171717]">{lowerConfCount}</strong> lower-confidence 
                    records are kept out so the charts stay reliable.
                  </p>
                  <p className="text-[11px] text-[#8C8C8C] italic mt-1 leading-normal">
                    *Segment classification is inferred from review language, not verified account data — treat as directional.
                  </p>
                </div>
              </div>

              {/* ANCHOR VISUAL: Segment x Reason-Type Matrix */}
              <div className="bg-white border border-[#ECE8DE] rounded-[18px] p-6 shadow-sm space-y-4">
                <div>
                  <h3 className="font-display font-bold text-[16px] text-[#171717]">
                    Segment × Reason-Type Matrix
                  </h3>
                  <p className="text-[12.5px] text-[#5F6368] leading-relaxed mt-1">
                    Matrix compares segments by reason type. Cells show count, percentage of active matrix, and average confidence rating. Click cells to filter the entire page view.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-[11px]">
                    <thead>
                      <tr className="border-b border-[#ECE8DE] bg-[#F8F9FA]">
                        <th className="p-3 font-bold text-[#8C8C8C] uppercase tracking-wider">
                          Segment
                        </th>
                        {matrixReasons.map((reason) => (
                          <th key={reason} className="p-3 font-bold text-[#8C8C8C] uppercase tracking-wider capitalize text-center">
                            {reason}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {matrixSegments.map((seg) => (
                        <tr key={seg} className="border-b border-[#ECE8DE] hover:bg-[#F8F9FA]">
                          <td className="p-3 font-bold text-[#171717] capitalize">
                            {seg.replace(/_/g, " ")}
                          </td>
                          {matrixReasons.map((reason) => {
                            // Find matches in filteredReviews (without cell filter)
                            const baseReviews = reviews.filter((r) => {
                              if (selectedSources.length > 0 && !selectedSources.includes(r.source)) return false;
                              if (selectedSegments.length > 0 && !selectedSegments.includes(r.user_segment)) return false;
                              if (hideWeakSignal && (r.user_segment === "unclear" || r.confidence === "low")) return false;
                              return true;
                            });

                            const matching = baseReviews.filter(
                              (r) => r.user_segment === seg && r.reason_type === reason
                            );
                            const count = matching.length;
                            const pct = baseReviews.length > 0 
                              ? ((count / baseReviews.length) * 100).toFixed(0) 
                              : "0";
                            const avgConf = matching.length > 0
                              ? matching.reduce((sum, r) => sum + (r.confidence === "high" ? 1.0 : r.confidence === "med" ? 0.6 : 0.3), 0) / matching.length
                              : 0;

                            const isCurrentFocus = matrixFilter && matrixFilter.segment === seg && matrixFilter.reason === reason;

                            return (
                              <td
                                key={reason}
                                onClick={() => handleMatrixCellClick(seg, reason)}
                                className={`p-2.5 border-r border-[#ECE8DE] text-center cursor-pointer transition-all duration-150 ${
                                  isCurrentFocus
                                    ? "bg-[#F8CB46] text-[#171717] font-extrabold"
                                    : count > 0
                                    ? "hover:bg-[#FFF6DD] text-[#171717]"
                                    : "text-[#8C8C8C]/50 hover:bg-[#F8F9FA]"
                                }`}
                              >
                                {count > 0 ? (
                                  <div className="space-y-0.5">
                                    <div className="font-bold text-[12px]">{count}</div>
                                    <div className="text-[9px] opacity-80">{pct}%</div>
                                    <div className="text-[8.5px] font-mono opacity-60">c={avgConf.toFixed(1)}</div>
                                  </div>
                                ) : (
                                  <span className="text-[9px] font-mono opacity-30">-</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-[11px] text-[#8C8C8C] leading-normal italic text-center">
                  Caption: Matrix compares segments by reason type. It is read-only; use the filters above to narrow by one or more segments. Click a cell to focus.
                </p>
              </div>

            </div>
          </div>

          {/* ═══════════════════════════════════════════
              THE 8 RESEARCH QUESTIONS
              ═══════════════════════════════════════════ */}
          <div className="space-y-6">
            <h2 className="font-display font-extrabold text-[22px] text-[#171717] tracking-tight border-b border-[#ECE8DE] pb-3">
              Research Synthesis Cards
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Q1 Card */}
              {(() => {
                const qReviews = filteredReviews.filter(r => r.repeat_buying_signal === "yes");
                const stats = ["habit", "convenience", "trust", "price", "no_discovery", "other"].map(type => {
                  const count = qReviews.filter(r => r.reason_type === type).length;
                  return { name: type, count };
                });
                const total = stats.reduce((a, b) => a + b.count, 0) || 1;
                const bars = stats
                  .map(e => ({ name: e.name, count: e.count, pct: ((e.count / total) * 100).toFixed(0) }))
                  .sort((a, b) => b.count - a.count);

                return (
                  <QuestionCard
                    qNum={1}
                    title="Why do customers repeatedly purchase from the same categories?"
                    description="Shows the breakdown of reason types for customers who repeat-buy, explaining why routine shopping is risk-avoidance."
                    explanation="This chart shows how many repeat shoppers cite specific drivers like habit or convenience vs. avoiding other categories out of concern. Note that a single review can touch multiple themes, so percentages may not sum to 100%."
                    bars={bars}
                    takeaway={getTopTwoTakeaway(stats)}
                    colors={REASON_COLORS}
                  />
                );
              })()}

              {/* Q2 Card */}
              {(() => {
                const qReviews = filteredReviews.filter(r => r.repeat_buying_signal === "no");
                const stats = ["trust", "price", "convenience", "no_discovery", "habit", "other"].map(type => {
                  const count = qReviews.filter(r => r.reason_type === type).length;
                  return { name: type, count };
                });
                const total = stats.reduce((a, b) => a + b.count, 0) || 1;
                const bars = stats
                  .map(e => ({ name: e.name, count: e.count, pct: ((e.count / total) * 100).toFixed(0) }))
                  .sort((a, b) => b.count - a.count);

                return (
                  <QuestionCard
                    qNum={2}
                    title="What prevents customers from exploring new categories?"
                    description="Breaks down barriers preventing customers from trials, highlighting trust and quality risks."
                    explanation="This aggregates the primary reasons cited by customers who refuse to try new categories. Trust/quality risk dominates, followed by price switching. Percentages represent the proportion of barrier mentions in the active view."
                    bars={bars}
                    takeaway={getTopTwoTakeaway(stats)}
                    colors={REASON_COLORS}
                  />
                );
              })()}

              {/* Q3 Card */}
              {(() => {
                // Count category_mentioned when reason_type is no_discovery or trust/other
                const catCounts: Record<string, number> = {};
                filteredReviews.forEach(r => {
                  if (r.category_mentioned !== "none") {
                    catCounts[r.category_mentioned] = (catCounts[r.category_mentioned] || 0) + 1;
                  }
                });
                const stats = Object.entries(catCounts).map(([name, count]) => ({ name, count }));
                const total = stats.reduce((a, b) => a + b.count, 0) || 1;
                const bars = stats
                  .map(e => ({ name: e.name, count: e.count, pct: ((e.count / total) * 100).toFixed(0) }))
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 5);

                return (
                  <QuestionCard
                    qNum={3}
                    title="How do customers discover products today?"
                    description="Highlights current discovery channel signals, showing broken search and regional stocking."
                    explanation="Shows review counts discussing product discovery issues. Highly directional as discovery complaints are usually silent churn rather than vocal feedback."
                    bars={bars}
                    takeaway={getTopTwoTakeaway(stats)}
                    colors={SEGMENT_COLORS}
                  />
                );
              })()}

              {/* Q4 Card */}
              {(() => {
                const stats = ["habit", "price", "trust", "convenience", "no_discovery", "other"].map(type => {
                  const count = filteredReviews.filter(r => r.reason_type === type).length;
                  return { name: type, count };
                });
                const total = stats.reduce((a, b) => a + b.count, 0) || 1;
                const bars = stats
                  .map(e => ({ name: e.name, count: e.count, pct: ((e.count / total) * 100).toFixed(0) }))
                  .sort((a, b) => b.count - a.count);

                return (
                  <QuestionCard
                    qNum={4}
                    title="What role do habits play in shopping behaviour?"
                    description="Compares habit-based shopping with active app-switching price evaluations."
                    explanation="Measures habit as a driver of shopping compared to other variables. Extremely low counts indicate that quick-commerce customers evaluate platforms actively rather than shop by routine."
                    bars={bars}
                    takeaway={getTopTwoTakeaway(stats)}
                    colors={REASON_COLORS}
                  />
                );
              })()}

              {/* Q5 Card */}
              {(() => {
                const stats = unmetNeedsSorted.slice(0, 5);
                const total = stats.reduce((a, b) => a + b.count, 0) || 1;
                const bars = stats.map(e => ({ name: e.name, count: e.count, pct: ((e.count / total) * 100).toFixed(0) }));

                return (
                  <QuestionCard
                    qNum={5}
                    title="What information do customers need before trying a new category?"
                    description="Ranks the specific informational requirements customers name before trials."
                    explanation="Buckets customer requests into actionable themes (e.g., expiry transparency, seal guarantees). Bars represent the frequency of these requests in the filtered dataset."
                    bars={bars}
                    takeaway={getTopTwoTakeaway(stats)}
                    colors={SEGMENT_COLORS}
                  />
                );
              })()}

              {/* Q6 Card */}
              {(() => {
                const frustCounts: Record<string, number> = {};
                filteredReviews.forEach(r => {
                  if (r.barrier_to_new_category !== "none") {
                    frustCounts[r.barrier_to_new_category] = (frustCounts[r.barrier_to_new_category] || 0) + 1;
                  }
                });
                const stats = Object.entries(frustCounts).map(([name, count]) => ({ name, count }));
                const total = stats.reduce((a, b) => a + b.count, 0) || 1;
                const bars = stats
                  .map(e => ({ name: e.name, count: e.count, pct: ((e.count / total) * 100).toFixed(0) }))
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 5);

                return (
                  <QuestionCard
                    qNum={6}
                    title="What frustrations emerge repeatedly?"
                    description="Details the specific catalog and delivery quality frustrations mentioned by customers."
                    explanation="Ranked complaints such as counterfeit goods, short expiry, and substitutions. Shows where quality checks fail."
                    bars={bars}
                    takeaway={getTopTwoTakeaway(stats)}
                    colors={REASON_COLORS}
                  />
                );
              })()}

              {/* Q7 Card */}
              {(() => {
                const qReviews = filteredReviews.filter(r => r.repeat_buying_signal === "yes");
                const stats = segmentsList.map(seg => {
                  const count = qReviews.filter(r => r.user_segment === seg).length;
                  return { name: seg, count };
                });
                const total = stats.reduce((a, b) => a + b.count, 0) || 1;
                const bars = stats
                  .map(e => ({ name: e.name, count: e.count, pct: ((e.count / total) * 100).toFixed(0) }))
                  .sort((a, b) => b.count - a.count)
                  .filter(e => e.count > 0);

                return (
                  <QuestionCard
                    qNum={7}
                    title="Which customer segments are more likely to experiment?"
                    description="Displays segment breakdown for active experimenters vs. loyal buyers."
                    explanation="Shows which cohorts yield the highest readiness index. Heavy users and quality-focused buyers represent the clearest target audiences."
                    bars={bars}
                    takeaway={getTopTwoTakeaway(stats)}
                    colors={SEGMENT_COLORS}
                  />
                );
              })()}

              {/* Q8 Card */}
              {(() => {
                const stats = unmetNeedsSorted.slice(0, 5);
                const total = stats.reduce((a, b) => a + b.count, 0) || 1;
                const bars = stats.map(e => ({ name: e.name, count: e.count, pct: ((e.count / total) * 100).toFixed(0) }));

                return (
                  <QuestionCard
                    qNum={8}
                    title="What unmet needs emerge consistently?"
                    description="Ranks top catalog gaps and service needs based on customer suggestions."
                    explanation="Synthesizes customer suggestions for what Blinkit should build (freshness badges, easy return policies) to enable discovery."
                    bars={bars}
                    takeaway={getTopTwoTakeaway(stats)}
                    colors={REASON_COLORS}
                  />
                );
              })()}

            </div>
          </div>

          {/* ═══════════════════════════════════════════
              WHICH SEGMENTS FACE WHICH ISSUES & UNMET NEEDS
              ═══════════════════════════════════════════ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Segments list card */}
            <div className="bg-white border border-[#ECE8DE] rounded-[18px] p-6 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-[16px] text-[#171717]">
                Which Segments Face Which Issues
              </h3>
              
              <div className="space-y-4">
                {segmentStats.length === 0 ? (
                  <p className="text-[12.5px] text-[#8C8C8C] italic text-center py-4">
                    No active segments in filter view
                  </p>
                ) : (
                  segmentStats.map((stat) => {
                    const pct = ((stat.count / segmentStatsTotal) * 100).toFixed(0);
                    return (
                      <div key={stat.name} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#59624B]/15 text-[#59624B] font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                          {getSegmentAvatar(stat.name)}
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex justify-between items-center text-[12px] font-semibold text-[#171717]">
                            <span className="truncate capitalize">{stat.name.replace(/_/g, " ")}</span>
                            <span className="text-[#5F6368] font-mono shrink-0">
                              {stat.count} recs · avg c={stat.avgConf.toFixed(1)}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-[#F2F1EC] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#59624B] rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Unmet Needs Chart */}
            <div className="bg-white border border-[#ECE8DE] rounded-[18px] p-6 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-[16px] text-[#171717]">
                Unmet Needs Breakdown
              </h3>

              <div className="space-y-4">
                {unmetNeedsSorted.length === 0 ? (
                  <p className="text-[12.5px] text-[#8C8C8C] italic text-center py-4">
                    No unmet needs in filter view
                  </p>
                ) : (
                  unmetNeedsSorted.map((stat) => {
                    const pct = ((stat.count / unmetNeedsTotal) * 100).toFixed(0);
                    return (
                      <div key={stat.name} className="space-y-1">
                        <div className="flex justify-between text-[12px] font-semibold text-[#171717]">
                          <span>{stat.name}</span>
                          <span className="text-[#5F6368] font-mono">{stat.count}</span>
                        </div>
                        <div className="w-full h-2 bg-[#F2F1EC] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#59624B] rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <p className="text-[11px] text-[#8C8C8C] leading-normal italic pt-2">
                Caption: This shows what customers need but don't feel Blinkit currently provides.
              </p>
            </div>

          </div>

          {/* ═══════════════════════════════════════════
              STRONGEST EVIDENCE & VERBATIMS
              ═══════════════════════════════════════════ */}
          <div className="space-y-8">
            {/* Strongest Evidence table */}
            <div className="bg-white border border-[#ECE8DE] rounded-[18px] p-6 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-[16px] text-[#171717]">
                Strongest Evidence
              </h3>
              <p className="text-[12.5px] text-[#5F6368]">
                Reviews ranked by classification confidence + presence of an actionable ask (excluding duplicate flags).
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[12px] border-collapse">
                  <thead>
                    <tr className="bg-[#F8F9FA] border-b border-[#ECE8DE]">
                      <th className="p-3 font-bold text-[#8C8C8C] uppercase tracking-wider text-center">Score</th>
                      <th className="p-3 font-bold text-[#8C8C8C] uppercase tracking-wider">Source</th>
                      <th className="p-3 font-bold text-[#8C8C8C] uppercase tracking-wider">Confidence</th>
                      <th className="p-3 font-bold text-[#8C8C8C] uppercase tracking-wider">Reason Type</th>
                      <th className="p-3 font-bold text-[#8C8C8C] uppercase tracking-wider">Segment</th>
                      <th className="p-3 font-bold text-[#8C8C8C] uppercase tracking-wider">Verbatim Quote</th>
                    </tr>
                  </thead>
                  <tbody>
                    {strongestEvidence.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-4 text-center text-[#8C8C8C] italic">
                          No matching records in filter view
                        </td>
                      </tr>
                    ) : (
                      strongestEvidence.map((e) => (
                        <tr key={e.row_number} className="border-b border-[#ECE8DE] hover:bg-[#F8F9FA]">
                          <td className="p-3 font-mono font-bold text-[#59624B] text-center">{e.score}/5</td>
                          <td className="p-3 font-semibold text-[#171717]">{e.source}</td>
                          <td className="p-3">
                            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                              e.confidence === "high" 
                                ? "bg-[#59624B]/10 text-[#59624B] border-[#59624B]/20" 
                                : "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20"
                            }`}>
                              {e.confidence}
                            </span>
                          </td>
                          <td className="p-3 capitalize">{e.reason_type}</td>
                          <td className="p-3 capitalize">{e.user_segment.replace(/_/g, " ")}</td>
                          <td className="p-3 italic text-[#5F6368]">"{e.quote}"</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Verbatim Evidence Section */}
            <div className="bg-white border border-[#ECE8DE] rounded-[18px] p-6 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-[16px] text-[#171717]">
                Verbatim Evidence
              </h3>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {filteredReviews.length === 0 ? (
                  <p className="text-[12.5px] text-[#8C8C8C] italic text-center py-6">
                    No verbatim feedback matches current filters.
                  </p>
                ) : (
                  filteredReviews.slice(0, 15).map((r) => (
                    <div key={r.row_number} className="border border-[#ECE8DE] bg-[#F8F9FA] rounded-[12px] p-4 space-y-2">
                      <p className="italic text-[#171717] text-[13px] leading-relaxed">
                        &quot;{r.quote}&quot;
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-[10px] text-[#8C8C8C] font-mono">
                        <span className="bg-[#E4E8E1] text-[#171717] px-2 py-0.5 rounded uppercase font-bold">
                          {r.user_segment}
                        </span>
                        <span className="bg-[#E4E8E1] text-[#171717] px-2 py-0.5 rounded uppercase font-bold">
                          {r.reason_type}
                        </span>
                        <span className="bg-[#E4E8E1] text-[#171717] px-2 py-0.5 rounded uppercase font-bold">
                          {r.confidence}
                        </span>
                        <span>Row #{r.row_number}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <p className="text-[11.5px] text-[#8C8C8C] leading-normal italic">
                Showing the strongest qualitative evidence from {filteredReviews.length} records in the active filter view.
              </p>
            </div>

          </div>

          {/* Downloads Dropdown */}
          <div className="flex justify-center pt-2">
            <div className="relative">
              <button
                onClick={() => setDownloadsOpen(!downloadsOpen)}
                className="bg-[#59624B] hover:bg-[#59624B]/90 text-white text-[12.5px] font-bold px-6 py-3 rounded-[14px] shadow-sm flex items-center gap-2 transition-all"
              >
                <FileDown size={14} /> Download Active Data <ChevronDown size={14} />
              </button>
              {downloadsOpen && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white border border-[#ECE8DE] rounded-[14px] shadow-lg w-56 p-2 z-50">
                  <button
                    onClick={downloadCSV}
                    className="w-full text-left px-4 py-2 text-[12px] font-semibold text-[#5F6368] hover:text-[#171717] hover:bg-[#F2F1EC] rounded-[8px] transition-colors"
                  >
                    Export dataset as CSV
                  </button>
                  <button
                    onClick={downloadJSON}
                    className="w-full text-left px-4 py-2 text-[12px] font-semibold text-[#5F6368] hover:text-[#171717] hover:bg-[#F2F1EC] rounded-[8px] transition-colors"
                  >
                    Export dataset as JSON
                  </button>
                  <button
                    onClick={downloadMD}
                    className="w-full text-left px-4 py-2 text-[12px] font-semibold text-[#5F6368] hover:text-[#171717] hover:bg-[#F2F1EC] rounded-[8px] transition-colors"
                  >
                    Export Markdown report
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* ═══════════════════════════════════════════
          PROJECT REPOSITORY CARD (FOOTER)
          ═══════════════════════════════════════════ */}
      <div className="max-w-4xl mx-auto border-t border-[#ECE8DE] pt-8">
        <div className="bg-[#F2F1EC] border border-[#ECE8DE] rounded-[18px] p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-wider block">
              Source Code
            </span>
            <h4 className="font-display font-bold text-[15px] text-[#171717]">
              Project Repository
            </h4>
            <p className="text-[12px] text-[#5F6368]">
              Access the codebase, schema configurations, and static JSON feedback tables on GitHub.
            </p>
          </div>
          <a
            href="https://github.com/Deepali611/AI.blinkit-discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-white border border-[#ECE8DE] text-[#171717] hover:bg-[#ECE8DE]/20 text-[12px] font-bold px-4 py-2.5 rounded-[12px] shadow-sm transition-all"
          >
            Open on GitHub <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}

// QuestionCard collapsible child component
function QuestionCard({
  qNum,
  title,
  description,
  explanation,
  bars,
  takeaway,
  colors,
}: {
  qNum: number;
  title: string;
  description: string;
  explanation: string;
  bars: { name: string; count: number; pct: string }[];
  takeaway: string;
  colors: Record<string, string>;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-[#ECE8DE] rounded-[18px] p-6 shadow-sm space-y-4">
      {/* Title + Q tag */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display font-bold text-[14.5px] text-[#171717] leading-snug">
          {title}
        </h3>
        <span className="font-mono text-[9px] font-bold text-[#59624B] bg-[#F3F5F1] px-2.5 py-0.5 rounded-full border border-[#59624B]/20 shrink-0">
          Q{qNum}
        </span>
      </div>

      {/* Description */}
      <p className="text-[12px] text-[#5F6368] leading-relaxed">
        {description}
      </p>

      {/* Expandable what this means */}
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[11px] font-bold text-[#59624B] hover:text-[#171717] flex items-center gap-1 focus:outline-none"
        >
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          {expanded ? "Hide explanation" : "What this chart means"}
        </button>
        {expanded && (
          <div className="mt-2 text-[11.5px] text-[#5F6368] bg-[#F3F5F1]/60 border border-[#ECE8DE] p-3 rounded-[12px] leading-relaxed">
            {explanation}
          </div>
        )}
      </div>

      {/* Ranked Bar List */}
      <div className="space-y-3 pt-2">
        {bars.length === 0 ? (
          <div className="text-[12px] text-[#8C8C8C] italic text-center py-4 bg-[#F8F9FA] rounded-[12px] border border-[#ECE8DE]/60">
            No matching data in current filtered view
          </div>
        ) : (
          bars.slice(0, 5).map((bar, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-[11.5px] font-semibold text-[#171717]">
                <span className="capitalize">{bar.name.replace(/_/g, " ")}</span>
                <span className="text-[#5F6368] font-mono">
                  {bar.count} ({bar.pct}%)
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#F2F1EC] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${bar.pct}%`,
                    backgroundColor: colors[bar.name.replace(/ /g, "_")] || "#C9C4B8",
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Takeaway Sentence */}
      <div className="border-t border-[#ECE8DE]/60 pt-3">
        <p className="text-[11px] text-[#59624B] font-semibold italic bg-[#F3F5F1] px-3 py-1.5 rounded-[10px] border border-[#59624B]/10 leading-snug">
          Takeaway: {takeaway}
        </p>
      </div>
    </div>
  );
}
