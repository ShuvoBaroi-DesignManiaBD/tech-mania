"use client";
import { Progress } from "antd";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const TopLoadingBar = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const startLoading = () => {
      setLoading(true);
      setProgress(0);

      // Start by setting the progress to 30%
      interval = setTimeout(() => {
        setProgress(30);
      }, 300); // 300ms delay to show initial loading progress

      // Then increase to 60%
      setTimeout(() => {
        setProgress(60);
      }, 550); // 1 second delay to simulate mid-stage loading

      // Then increase to 100%
      setTimeout(() => {
        setProgress(100);
        completeLoading();
      }, 800); // 1.5 seconds total delay to simulate final loading
    };

    const completeLoading = () => {
      setTimeout(() => {
        setLoading(false);
        setProgress(0); // Reset the progress bar after loading completes
      }, 500); // Brief delay to show 100% completion before hiding the bar
      clearTimeout(interval);
    };

    // When pathname or searchParams change, trigger the loading bar
    startLoading();

    return () => {
      clearTimeout(interval);
    };
  }, [pathname, searchParams]);

  return (
    loading && (
      <div
        style={{
          position: "fixed",
          top: -12,
          left: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        <Progress
          percent={progress}
          showInfo={false}
          status="active"
          strokeWidth={3}
          strokeColor="#85b3ff"
          size={["100%", 10]}
          className="!h-10"
          style={{ borderRadius: 0 }}
        />
      </div>
    )
  );
};

export default TopLoadingBar;
