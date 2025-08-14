'use client';

import About from "@/components/About";
import Hero from "@/components/Hero";
import NavBar from "@/components/Navbar";
import Features from "@/components/Features";
import Story from "@/components/Story";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Music from "@/components/Music";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Harrell from '@/components/Harrell'
import Milton from '@/components/Milton'

function page() {

  const pathname = usePathname();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const hash = window.location.hash.slice(1);
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    }
  }, [hasMounted, pathname]); // reruns when path changes
  
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      {/*<Hero />*/}
      <About />
      <Features />
      <Music />
      <Harrell />
      <Milton />
      {/*
      <Story />
      <Contact />
     <Footer />
      */}

    </main>
  );
}

export default page;
