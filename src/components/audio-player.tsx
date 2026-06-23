"use client";

import { useRef, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import { formatDuration } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  /** Habilita controles de episódio longo: avançar/retroceder e velocidade */
  podcast?: boolean;
  className?: string;
};

const SPEEDS = [1, 1.25, 1.5, 2];

export function AudioPlayer({ src, podcast = false, className }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(0);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) a.pause();
    else a.play();
    setPlaying(!playing);
  };

  const seek = (value: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = value;
    setCurrent(value);
  };

  const skip = (delta: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.min(Math.max(0, a.currentTime + delta), duration);
  };

  const cycleSpeed = () => {
    const a = audioRef.current;
    if (!a) return;
    const next = (speedIdx + 1) % SPEEDS.length;
    a.playbackRate = SPEEDS[next];
    setSpeedIdx(next);
  };

  return (
    <div
      className={cn(
        "rounded-card border border-border bg-card p-4 shadow-sm",
        className
      )}
    >
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onEnded={() => setPlaying(false)}
      />

      <div className="flex items-center gap-3">
        {podcast && (
          <button
            type="button"
            aria-label="Retroceder 15 segundos"
            onClick={() => skip(-15)}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        )}

        <button
          type="button"
          aria-label={playing ? "Pausar" : "Reproduzir"}
          onClick={toggle}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-105 cursor-pointer"
        >
          {playing ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="ml-0.5 h-5 w-5" />
          )}
        </button>

        {podcast && (
          <button
            type="button"
            aria-label="Avançar 30 segundos"
            onClick={() => skip(30)}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <RotateCw className="h-5 w-5" />
          </button>
        )}

        <div className="flex flex-1 items-center gap-3">
          <span className="w-12 text-right text-xs tabular-nums text-muted-foreground">
            {formatDuration(current) || "0:00"}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={current}
            onChange={(e) => seek(Number(e.target.value))}
            aria-label="Progresso"
            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-border accent-[var(--accent)]"
          />
          <span className="w-12 text-xs tabular-nums text-muted-foreground">
            {formatDuration(duration) || "0:00"}
          </span>
        </div>

        {podcast && (
          <button
            type="button"
            onClick={cycleSpeed}
            aria-label="Velocidade de reprodução"
            className="rounded-full border border-border px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
          >
            {SPEEDS[speedIdx]}x
          </button>
        )}

        <button
          type="button"
          aria-label={muted ? "Ativar som" : "Silenciar"}
          onClick={() => {
            const a = audioRef.current;
            if (!a) return;
            a.muted = !muted;
            setMuted(!muted);
          }}
          className="text-muted-foreground hover:text-foreground cursor-pointer"
        >
          {muted ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}
