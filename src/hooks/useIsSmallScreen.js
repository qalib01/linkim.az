import { useEffect, useState } from "react";

function useIsSmallScreen() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1200);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 1200);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isSmallScreen;
}

export default useIsSmallScreen;