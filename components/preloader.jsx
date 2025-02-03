'use client'
import { useEffect, useState } from "react";

export default function () {
    
    const [loading, setLoading] = useState(true);
    const handleLoad = () => {
        setLoading(false);
    };

    useEffect(() => {
        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }
        return () => window.removeEventListener("load", handleLoad);
    }, []);

    if (!loading) return null; // Hide the preloader when loading is done

    return <div id="preloader"></div>;
}