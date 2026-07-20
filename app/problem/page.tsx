import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProblemStage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <PageHeader
        title="Blinkit Review Analysis Workflow"
        subtitle="Stage 0 — The Discovery Problem"
      />

      <div className="bg-surface border border-[#ECE8DE] rounded-[18px] p-8 shadow-standard space-y-6">
        <h3 className="font-display font-extrabold text-[22px] text-[#171717] tracking-tight leading-snug">
          Why do transacting customers isolate their carts?
        </h3>
        
        <div className="font-sans text-[15px] leading-relaxed text-[#5F6368] space-y-5">
          <p>
            Blinkit's high-frequency customer base relies on us daily for core groceries and fresh produce, yet resists exploring high-margin adjacent categories like electronics, daily dairy/eggs, or snacks. 
          </p>
          <p>
            This severe category isolation stunts customer lifetime value (LTV) and caps active cross-category growth. To bridge this discovery gap, we must systematically gather customer feedback, extract precise buying blockers, and engineer evidence-backed product interventions.
          </p>
        </div>

        {/* Explicit takeaway panel */}
        <div className="border-l-2 border-[#59624B] pl-4 py-2 bg-[#F3F5F1] rounded-r-lg">
          <p className="text-[13px] text-[#59624B] font-semibold leading-normal">
            Takeaway: PM resources must focus on diagnosing customer friction points before attempting to run recommendations feeds.
          </p>
        </div>
      </div>

      {/* Navigation flow footer */}
      <div className="flex justify-end pt-4">
        <Link
          href="/evidence"
          className="bg-[#F8CB46] hover:bg-[#F8CB46]/90 text-[#171717] text-[13px] font-extrabold px-5 py-3 rounded-[14px] transition-colors ease-out flex items-center gap-1.5 shadow-standard"
        >
          Next Step: Gathering Evidence <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}
