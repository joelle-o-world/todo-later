import { useEffect, useState } from "react";

export default function useCurrentDate(refreshEvery = 60) {
  const [now, setNow] = useState(new Date());
  const refresh = () => setNow(new Date());
  useEffect(() => {
    const interval = setInterval(refresh, refreshEvery * 1000);
    return () => clearInterval(interval);
  }, [refreshEvery]);
  return now;
}
