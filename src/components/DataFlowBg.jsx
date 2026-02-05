import { memo } from "react";

const DataFlowBg = memo(function DataFlowBg() {
  // Reduced lines for performance (was 90)
  const lines = 30;

  return (
    <div className="dataflow-bg">
      <div className="network-bg" />

      {/* 
         Optimization:
         1. Reduced line count
         2. Removed per-line 'robotJitter' animation which was likely causing layout thrashing 
            (We keep the main scroll)
      */}
      <div className="dataflow-conveyor">
        {Array.from({ length: lines }).map((_, i) => (
          <div className="dataflow-line opacity-30" key={i}>
            TECHATHONX2K26 // SYSTEM // CORE // TECHATHONX2K26 // SYSTEM // CORE //
          </div>
        ))}

        {/* duplicate for seamless loop */}
        {Array.from({ length: lines }).map((_, i) => (
          <div className="dataflow-line opacity-30" key={`dup-${i}`}>
            TECHATHONX2K26 // SYSTEM // CORE // TECHATHONX2K26 // SYSTEM // CORE //
          </div>
        ))}
      </div>
    </div>
  );
});

export default DataFlowBg;
