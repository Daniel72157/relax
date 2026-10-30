"use client";

import { useEffect, useRef, useState } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";

interface Panorama360Props {
    src: string;
    caption?: string;
}

export default function Panorama360({ src, caption }: Panorama360Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

    useEffect(() => {
        if (!containerRef.current) return;

        let cancelled = false;
        let viewer: Viewer | null = null;

        // Evita que el doble montaje de Strict Mode (dev) cancele
        // la descarga real de la imagen panorámica
        const timer = setTimeout(() => {
            if (cancelled || !containerRef.current) return;

            setStatus("loading");
            viewer = new Viewer({
                container: containerRef.current,
                panorama: src,
                caption: caption ?? "",
                loadingTxt: "Cargando panorama...",
                touchmoveTwoFingers: true,
                mousewheelCtrlKey: true,
                defaultZoomLvl: 0,
                navbar: ["zoom", "fullscreen"]
            });

            viewer.addEventListener("ready", () => {
                if (!cancelled) setStatus("ready");
            });
        }, 50);

        return () => {
            cancelled = true;
            clearTimeout(timer);
            viewer?.destroy();
        };
    }, [src, caption]);

    return (
        <div className="relative w-full h-full rounded-xl overflow-hidden">
            <div ref={containerRef} className="w-full h-full" />
        </div>
    );
}