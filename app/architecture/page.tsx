import Link from "next/link";
import { ArrowLeft, Database, Sliders, Shield, FileText, CheckCircle2, PieChart } from "lucide-react";

export default function ArchitecturePage() {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-[#ECE8DE] pb-6">
        <div>
          <h1 className="font-display font-extrabold text-[28px] text-[#171717] tracking-tight">
            Engine Synopsis
          </h1>
          <p className="text-[14px] text-[#5F6368] mt-1 font-medium">
            Backend Architecture and Data Pipeline Methodology
          </p>
        </div>
        <Link
          href="/"
          className="bg-white border border-[#ECE8DE] text-[#5F6368] hover:text-[#171717] text-[12px] font-bold px-4 py-2.5 rounded-[12px] transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>
      </div>

      {/* 6-Step Visual Flow */}
      <div className="bg-white border border-[#ECE8DE] rounded-[18px] p-6 shadow-sm space-y-6">
        <h2 className="font-display font-bold text-[18px] text-[#171717]">
          Pipeline Information Architecture
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-[#F8F9FA] border border-[#ECE8DE] rounded-[14px] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#59624B] uppercase tracking-wider bg-[#F3F5F1] px-2.5 py-0.5 rounded-full">
                Step 1: Collect
              </span>
              <Database size={16} className="text-[#59624B]" />
            </div>
            <h3 className="font-display font-bold text-[14px] text-[#171717]">
              Source Adapters
            </h3>
            <p className="text-[12.5px] text-[#5F6368] leading-relaxed">
              Collect real customer feedback from app stores, Reddit, and YouTube discussions.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#F8F9FA] border border-[#ECE8DE] rounded-[14px] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#59624B] uppercase tracking-wider bg-[#F3F5F1] px-2.5 py-0.5 rounded-full">
                Step 2: Normalize
              </span>
              <Sliders size={16} className="text-[#59624B]" />
            </div>
            <h3 className="font-display font-bold text-[14px] text-[#171717]">
              Shared Feedback Schema
            </h3>
            <p className="text-[12.5px] text-[#5F6368] leading-relaxed">
              Convert every source into a consistent structure with text, source, and category context.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#F8F9FA] border border-[#ECE8DE] rounded-[14px] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#59624B] uppercase tracking-wider bg-[#F3F5F1] px-2.5 py-0.5 rounded-full">
                Step 3: Filter
              </span>
              <Shield size={16} className="text-[#59624B]" />
            </div>
            <h3 className="font-display font-bold text-[14px] text-[#171717]">
              Quality Gates
            </h3>
            <p className="text-[12.5px] text-[#5F6368] leading-relaxed">
              Remove off-topic content and bare statements with no reasoning before AI touches the data.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-[#F8F9FA] border border-[#ECE8DE] rounded-[14px] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#59624B] uppercase tracking-wider bg-[#F3F5F1] px-2.5 py-0.5 rounded-full">
                Step 4: Extract
              </span>
              <FileText size={16} className="text-[#59624B]" />
            </div>
            <h3 className="font-display font-bold text-[14px] text-[#171717]">
              Structured Extraction Pass
            </h3>
            <p className="text-[12.5px] text-[#5F6368] leading-relaxed">
              Classify each review against the brief's 8 research questions using ONE controlled prompt with a signal-gate step, not generic sentiment analysis.
            </p>
          </div>

          {/* Step 5 */}
          <div className="bg-[#F8F9FA] border border-[#ECE8DE] rounded-[14px] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#59624B] uppercase tracking-wider bg-[#F3F5F1] px-2.5 py-0.5 rounded-full">
                Step 5: Validate
              </span>
              <CheckCircle2 size={16} className="text-[#59624B]" />
            </div>
            <h3 className="font-display font-bold text-[14px] text-[#171717]">
              Quote-Grounding
            </h3>
            <p className="text-[12.5px] text-[#5F6368] leading-relaxed">
              Every extracted reason requires an exact supporting quote from the source review; near-duplicate content is flagged.
            </p>
          </div>

          {/* Step 6 */}
          <div className="bg-[#F8F9FA] border border-[#ECE8DE] rounded-[14px] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#59624B] uppercase tracking-wider bg-[#F3F5F1] px-2.5 py-0.5 rounded-full">
                Step 6: Explain
              </span>
              <PieChart size={16} className="text-[#59624B]" />
            </div>
            <h3 className="font-display font-bold text-[14px] text-[#171717]">
              Dashboard Evidence
            </h3>
            <p className="text-[12.5px] text-[#5F6368] leading-relaxed">
              Show chart patterns, filters, and verbatim quotes from the same active, filterable dataset.
            </p>
          </div>
        </div>
      </div>

      {/* 5 Intelligence Layer Sections */}
      <div className="space-y-6">
        <h2 className="font-display font-bold text-[20px] text-[#171717] tracking-tight">
          System Intelligence Layers
        </h2>

        <div className="space-y-6">
          {/* Layer 1 */}
          <div className="bg-white border border-[#ECE8DE] rounded-[18px] p-6 shadow-sm">
            <h3 className="text-[15px] font-bold text-[#171717] font-display mb-2">
              Intelligence Layer 1: Source Coverage
            </h3>
            <p className="text-[13px] text-[#5F6368] leading-relaxed">
              Our framework aggregates reviews across multiple key digital environments to capture diverse customer experiences. However, we acknowledge specific collection biases per source: Reddit posts skew toward long-form competitor comparisons and only title contents are analyzed; App Store feedback yields a small qualitative sample (n=10) that is directional only; and Google Play Store reviews skew heavily toward brief rating statements or immediate courier/picker delivery issues.
            </p>
          </div>

          {/* Layer 2 */}
          <div className="bg-white border border-[#ECE8DE] rounded-[18px] p-6 shadow-sm">
            <h3 className="text-[15px] font-bold text-[#171717] font-display mb-2">
              Intelligence Layer 2: Signal Protection
            </h3>
            <p className="text-[13px] text-[#5F6368] leading-relaxed">
              To filter out noise before LLM analysis, we establish a strict quality gate. This eliminates emoji-only reviews, short statements under 15 characters, or bare complaints lacking explanation. In our active dataset, this filter retains a real signal rate of 16.1% (189 validated feedback items from 1,176 raw reviews scanned), ensuring that all charts and analyses stay clean and reliable.
            </p>
          </div>

          {/* Layer 3 */}
          <div className="bg-white border border-[#ECE8DE] rounded-[18px] p-6 shadow-sm">
            <h3 className="text-[15px] font-bold text-[#171717] font-display mb-2">
              Intelligence Layer 3: Structured Extraction
            </h3>
            <p className="text-[13px] text-[#5F6368] leading-relaxed">
              Rather than running separate analysis passes for different questions, our engine uses ONE controlled prompt that covers all 8 brief research questions per review. A signal-gate step determines if a review has actionable behavioral signal, mapping categories, barriers, segments, and quotes to a standardized JSON schema in a single pass for high efficiency and prompt consistency.
            </p>
          </div>

          {/* Layer 4 */}
          <div className="bg-white border border-[#ECE8DE] rounded-[18px] p-6 shadow-sm">
            <h3 className="text-[15px] font-bold text-[#171717] font-display mb-2">
              Intelligence Layer 4: Validation and Aggregation
            </h3>
            <p className="text-[13px] text-[#5F6368] leading-relaxed">
              Every structured reason extracted is programmatic-grounded: the system performs an exact character-match verification to confirm that the quote exists word-for-word in the raw source review. Near-duplicate or copypasta reviews are automatically detected and flagged (with a real 20% duplicate rate observed in the dataset), preventing spam patterns from inflating index scores. Confidence ratings (high, medium, low) are assigned to gauge the reliability of each signal block.
            </p>
          </div>

          {/* Layer 5 */}
          <div className="bg-white border border-[#ECE8DE] rounded-[18px] p-6 shadow-sm">
            <h3 className="text-[15px] font-bold text-[#171717] font-display mb-2">
              Intelligence Layer 5: Explainable Dashboard
            </h3>
            <p className="text-[13px] text-[#5F6368] leading-relaxed">
              All computations on the dashboard are driven dynamically by the active filter state. Selecting specific segments or sources immediately recomputes all percentages, counts, and summaries. Additionally, each analytical card features an expandable "What this chart means" panel to explain what the metric measures and why percentages might not sum to 100% due to multi-themed customer responses.
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom Nav Back */}
      <div className="pt-4 flex justify-center">
        <Link
          href="/"
          className="bg-[#F8CB46] hover:bg-[#F8CB46]/90 text-[#171717] text-[13px] font-extrabold px-6 py-3 rounded-[14px] shadow-sm transition-colors"
        >
          Return to Discovery Dashboard
        </Link>
      </div>
    </div>
  );
}
