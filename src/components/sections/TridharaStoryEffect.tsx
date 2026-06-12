"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Stream = {
  name: string;
  detail: string;
  className: string;
  color: string;
  start: [number, number];
  controlA: [number, number];
  controlB: [number, number];
};

const streams: Stream[] = [
  {
    name: "Shaiva",
    detail: "stillness",
    className: "tridhara-label-shaiva",
    color: "#9bc8ff",
    start: [0.1, 0.22],
    controlA: [0.3, 0.08],
    controlB: [0.52, 0.26]
  },
  {
    name: "Vaishnava",
    detail: "bhakti",
    className: "tridhara-label-vaishnava",
    color: "#e6b84f",
    start: [0.05, 0.72],
    controlA: [0.32, 0.62],
    controlB: [0.5, 0.58]
  },
  {
    name: "Shakta",
    detail: "shakti",
    className: "tridhara-label-shakta",
    color: "#e86767",
    start: [0.92, 0.17],
    controlA: [0.78, 0.36],
    controlB: [0.67, 0.44]
  }
];

function cubicPoint(
  start: [number, number],
  controlA: [number, number],
  controlB: [number, number],
  end: [number, number],
  t: number
) {
  const i = 1 - t;
  return {
    x: i ** 3 * start[0] + 3 * i ** 2 * t * controlA[0] + 3 * i * t ** 2 * controlB[0] + t ** 3 * end[0],
    y: i ** 3 * start[1] + 3 * i ** 2 * t * controlA[1] + 3 * i * t ** 2 * controlB[1] + t ** 3 * end[1]
  };
}

export function TridharaStoryEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let width = 0;
    let height = 0;
    let animationId = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const drawCurve = (stream: Stream, end: [number, number], progress: number) => {
      const start: [number, number] = [stream.start[0] * width, stream.start[1] * height];
      const controlA: [number, number] = [stream.controlA[0] * width, stream.controlA[1] * height];
      const controlB: [number, number] = [stream.controlB[0] * width, stream.controlB[1] * height];
      const endPoint: [number, number] = [end[0] * width, end[1] * height];

      const gradient = context.createLinearGradient(start[0], start[1], endPoint[0], endPoint[1]);
      gradient.addColorStop(0, "rgba(255,255,255,0)");
      gradient.addColorStop(0.35, `${stream.color}55`);
      gradient.addColorStop(1, `${stream.color}dd`);

      context.save();
      context.globalCompositeOperation = "screen";
      context.lineCap = "round";
      context.lineWidth = Math.max(18, width * 0.018);
      context.strokeStyle = `${stream.color}16`;
      context.beginPath();
      context.moveTo(start[0], start[1]);
      context.bezierCurveTo(controlA[0], controlA[1], controlB[0], controlB[1], endPoint[0], endPoint[1]);
      context.stroke();

      context.lineWidth = Math.max(2, width * 0.003);
      context.strokeStyle = gradient;
      context.beginPath();
      context.moveTo(start[0], start[1]);
      context.bezierCurveTo(controlA[0], controlA[1], controlB[0], controlB[1], endPoint[0], endPoint[1]);
      context.stroke();

      for (let index = 0; index < 9; index += 1) {
        const offset = media.matches ? index / 9 : (progress + index * 0.115) % 1;
        const point = cubicPoint(start, controlA, controlB, endPoint, offset);
        const size = 2.4 + Math.sin((offset + index) * Math.PI) * 1.5;
        context.fillStyle = stream.color;
        context.shadowColor = stream.color;
        context.shadowBlur = 18;
        context.beginPath();
        context.arc(point.x, point.y, size, 0, Math.PI * 2);
        context.fill();
      }
      context.restore();
    };

    const render = () => {
      context.clearRect(0, 0, width, height);

      const centerX = width < 768 ? 0.72 : 0.69;
      const centerY = width < 768 ? 0.5 : 0.47;
      const pulse = media.matches ? 0.55 : (Math.sin(frame * 0.026) + 1) / 2;

      streams.forEach((stream, index) => {
        drawCurve(stream, [centerX, centerY], (frame * 0.0045 + index * 0.2) % 1);
      });

      context.save();
      context.globalCompositeOperation = "screen";
      const glow = context.createRadialGradient(
        centerX * width,
        centerY * height,
        0,
        centerX * width,
        centerY * height,
        Math.max(width, height) * 0.32
      );
      glow.addColorStop(0, `rgba(232,190,92,${0.42 + pulse * 0.18})`);
      glow.addColorStop(0.35, "rgba(232,190,92,0.16)");
      glow.addColorStop(1, "rgba(232,190,92,0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
      context.restore();

      frame += 1;
      animationId = window.requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="tridhara-story-effect" aria-hidden="true">
      <canvas ref={canvasRef} className="tridhara-stream-canvas" />
      <div className="tridhara-effect-core">
        <Image
          src="/images/gallery/radha-krishna-deities-ornate-decoration-altar-19.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 340px, 220px"
          className="object-cover object-top"
          priority
        />
        <span className="tridhara-core-flame" />
      </div>
      {streams.map((stream) => (
        <div key={stream.name} className={`tridhara-stream-label ${stream.className}`}>
          <span>{stream.name}</span>
          <small>{stream.detail}</small>
        </div>
      ))}
    </div>
  );
}
