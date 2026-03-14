// import { Navbar1 } from "@/src/components/navbar1";
// import React from "react";

// const layout = ({ children }: { children: React.ReactNode }) => {
//     return (
//         <div>
//             <Navbar1></Navbar1>
//             {children}
//         </div>
//     );
// };

// export default layout;


"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { Navbar1 } from "@/src/components/navbar1";
import Footer from "@/src/components/Footer";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return  (
     <div>
           <Navbar1></Navbar1>
           {children} 
           <Footer />     
            </div>
  )
}




