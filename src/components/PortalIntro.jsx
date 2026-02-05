import { useEffect } from "react";

export default function PortalIntro({ onFinish }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      document.body.style.overflow = "auto";
      onFinish();
    }, 2800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="relative w-[320px] h-[320px]">
        <div className="absolute inset-0 rounded-full border-4 border-purple-600 animate-portal-spin" />
        <div className="absolute inset-8 rounded-full bg-purple-600/30 blur-2xl animate-portal-pulse" />
        <div className="absolute inset-0 animate-portal-sparks rounded-full" />
      </div>
    </div>
  );
}
