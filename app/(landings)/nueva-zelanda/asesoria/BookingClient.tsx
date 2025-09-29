"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { es } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendGTMEvent } from "@/app/lib/gtm";
import { useSearchParams } from "next/navigation";
import logoUrl from "@/public/logos/final-logo.png";
import { launchConfettiBurst } from "@/lib/confetti";
import { CheckCircle2, RefreshCw, Loader2 } from "lucide-react";

type Busy = { start: string; end: string };

const BOOKING_TZ = process.env.NEXT_PUBLIC_BOOKING_TZ || "America/Santiago";
const DAY_START = process.env.NEXT_PUBLIC_BOOKING_DAY_START || "09:00";
const DAY_END = process.env.NEXT_PUBLIC_BOOKING_DAY_END || "18:00";
const WORKDAYS = (process.env.NEXT_PUBLIC_BOOKING_WORKDAYS || "1,2,3,4,5,6")
  .split(",")
  .map((n) => Number(n.trim()));
const SLOT_INTERVAL_MIN = Number(process.env.NEXT_PUBLIC_BOOKING_SLOT_INTERVAL_MINUTES || 15);
const DURATION_MIN = Number(process.env.NEXT_PUBLIC_BOOKING_DURATION_MINUTES || 15);
const MIN_NOTICE_MIN = Number(process.env.NEXT_PUBLIC_BOOKING_MIN_NOTICE_MINUTES || 120);
const BUFFER_MIN = Number(process.env.NEXT_PUBLIC_BOOKING_BUFFER_MINUTES || 10);
const HOLIDAYS = (process.env.NEXT_PUBLIC_BOOKING_HOLIDAYS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const SAT_DAY_START = process.env.NEXT_PUBLIC_BOOKING_SATURDAY_DAY_START || "09:00";
const SAT_DAY_END = process.env.NEXT_PUBLIC_BOOKING_SATURDAY_DAY_END || "13:00";

function fmt2(n: number) { return n.toString().padStart(2, "0"); }

function toTZParts(d: Date, timeZone: string) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(d);
  const map: Record<string, string> = {};
  parts.forEach((p) => { if (p.type !== "literal") map[p.type] = p.value; });
  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour: Number(map.hour),
    minute: Number(map.minute),
    second: Number(map.second),
  };
}

function partsToDateOnly(p: {year:number;month:number;day:number}) {
  return `${fmt2(p.year)}-${fmt2(p.month)}-${fmt2(p.day)}`;
}

function fakeTZDateUTC(y:number,m:number,d:number,h:number,mi:number) {
  return new Date(Date.UTC(y, m-1, d, h, mi, 0));
}

function addMinutes(date: Date, mins: number) {
  return new Date(date.getTime() + mins * 60_000);
}

function parseHM(hm: string) {
  const [h, m] = hm.split(":").map(Number);
  return { h, m };
}

type BookingResult = {
  join_url: string;
  icsBase64?: string;
  icsFileName?: string;
  googleUrl?: string;
  manage?: { rescheduleUrl?: string; cancelUrl?: string };
};

const FormSchema = z.object({
  name: z.string().min(2, { message: "Ingresa tu nombre" }),
  email: z.string().email({ message: "Email inválido" }),
});

type FormFields = z.infer<typeof FormSchema>;

export default function BookingClient() {
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollMargin, setScrollMargin] = useState(96);
  const step2ContinueRef = useRef<HTMLButtonElement>(null);
  const [highlightContinue, setHighlightContinue] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const [busy, setBusy] = useState<Busy[]>([]);
  const [loadingBusy, setLoadingBusy] = useState(false);
  const [time, setTime] = useState<string | null>(null);
  const [booking, setBooking] = useState<BookingResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [rescheduleUrl, setRescheduleUrl] = useState<string | null>(null);
  const [cancelUrl, setCancelUrl] = useState<string | null>(null);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [lastAction, setLastAction] = useState<"created" | "rescheduled" | null>(null);
  // Bloqueos locales para reflejar al instante la reunión recién creada (key: YYYY-MM-DD)
  const [localBusyByDate, setLocalBusyByDate] = useState<Record<string, { start: string; end: string }[]>>({});

  // Si viene desde email con tokens de gestión, inicializa URLs de gestión
  useEffect(() => {
    const p = searchParams?.get("manage_p");
    const t = searchParams?.get("manage_t");
    const base = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_BASE_URL || "");
    if (p && t) {
      const resBase = `${base}/api/zoom/reschedule?p=${encodeURIComponent(p)}&t=${encodeURIComponent(t)}`;
      const canUrl = `${base}/api/zoom/cancel?p=${encodeURIComponent(p)}&t=${encodeURIComponent(t)}`;
      setRescheduleUrl(resBase);
      setCancelUrl(canUrl);
      setIsRescheduling(true);
    }
  }, [searchParams]);

  // Detectar altura aproximada del header sticky y usar scroll-margin-top
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const detect = () => {
      const header = document.querySelector('header') as HTMLElement | null;
      const sticky = document.querySelector('.sticky.top-0') as HTMLElement | null;
      const h = header?.offsetHeight || sticky?.offsetHeight || 96;
      setScrollMargin(Math.max(56, Math.min(h + 16, 160))); // entre 56 y 160 px
    };
    detect();
    window.addEventListener('resize', detect);
    return () => window.removeEventListener('resize', detect);
  }, []);

  // Mantener el formulario en vista SOLO cuando cambia de paso (evitar scroll en carga inicial)
  const mountedRef = useRef(false);
  const prevStepRef = useRef<1 | 2 | 3 | 4>(1);
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      prevStepRef.current = step;
      return;
    }
    if (prevStepRef.current === step) return; // no hacer scroll si no cambió el paso
    prevStepRef.current = step;
    if (typeof window === 'undefined') return;
    const el = containerRef.current;
    if (!el) return;
    const doScroll = () => {
      try {
        el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      } catch {
        const y = el.getBoundingClientRect().top + window.scrollY - scrollMargin;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };
    requestAnimationFrame(() => {
      doScroll();
      setTimeout(doScroll, 50);
    });
  }, [step]);

  const scrollToStep2Continue = useCallback(() => {
    if (typeof window === 'undefined') return;
    const el = step2ContinueRef.current;
    if (!el) return;
    try {
      el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    } catch {
      const y = el.getBoundingClientRect().top + window.scrollY - scrollMargin;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    // Resalta el botón por un instante para guiar la mirada
    setHighlightContinue(true);
    setTimeout(() => setHighlightContinue(false), 900);
  }, [scrollMargin]);

  const form = useForm<FormFields>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: { name: "", email: "" },
  });

  // const todayTZ = useMemo(() => toTZParts(new Date(), BOOKING_TZ), []);

  const selectedDateStr = useMemo(() => {
    if (!selected) return undefined;
    const p = toTZParts(selected, BOOKING_TZ);
    return partsToDateOnly(p);
  }, [selected]);

  // Deshabilitar fines de semana/no laborables y feriados
  const disabledMatchers = useMemo(() => {
    const allowed = new Set(WORKDAYS);
    const all = [0,1,2,3,4,5,6];
    const disabledDows = all.filter((d) => !allowed.has(d));
    const holidayDates = HOLIDAYS.map((d) => {
      const [y, m, da] = d.split("-").map(Number);
      return new Date(y, (m||1)-1, da||1);
    });
    return [...holidayDates, { dayOfWeek: disabledDows as any }];
  }, []);

  const loadBusy = useCallback(async (dateStr: string) => {
    try {
      setLoadingBusy(true);
      const url = `/api/zoom/meetings?from=${encodeURIComponent(dateStr)}&to=${encodeURIComponent(dateStr)}`;
      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Error");
      setBusy(data.busy || []);
    } catch (e: any) {
      console.error(e);
      toast.error("No se pudo cargar disponibilidad.");
    } finally {
      setLoadingBusy(false);
    }
  }, []);

  useEffect(() => {
    if (selectedDateStr && (step === 2)) {
      setTime(null);
      setBooking(null);
      loadBusy(selectedDateStr);
      try { sendGTMEvent("booking_step_2_opened", { date: selectedDateStr }); } catch {}
    }
  }, [selectedDateStr, step, loadBusy]);

  const slots = useMemo(() => {
    if (!selectedDateStr) return [] as { time: string; disabled: boolean; reason?: 'busy' | 'notice' }[];
    const [y, mo, da] = selectedDateStr.split("-").map(Number);

    // día permitido
    const weekday = new Date(Date.UTC(y, mo - 1, da)).getUTCDay();
    if (!WORKDAYS.includes(weekday)) return [];

    // Horario según día (L-V vs Sábado)
    const isSaturday = weekday === 6;
    const { h: startH, m: startM } = parseHM(isSaturday ? SAT_DAY_START : DAY_START);
    const { h: endH, m: endM } = parseHM(isSaturday ? SAT_DAY_END : DAY_END);

    // now en TZ (fake UTC)
    const nowP = toTZParts(new Date(), BOOKING_TZ);
    const fakeNow = fakeTZDateUTC(nowP.year, nowP.month, nowP.day, nowP.hour, nowP.minute);
    const fakeNotice = addMinutes(fakeNow, MIN_NOTICE_MIN);

    const items: { time: string; disabled: boolean; reason?: 'busy' | 'notice' }[] = [];
    let curH = startH;
    let curM = startM;
    while (curH < endH || (curH === endH && curM <= endM)) {
      const slotStartFake = fakeTZDateUTC(y, mo, da, curH, curM);
      const slotEndFake = addMinutes(slotStartFake, DURATION_MIN);
      const timeStr = `${fmt2(curH)}:${fmt2(curM)}`;

      const tooSoon = slotStartFake < fakeNotice;
      // overlapped con busy (Zoom) + locales
      const overlap = (() => {
        const base = [...busy, ...((selectedDateStr && localBusyByDate[selectedDateStr]) || [])];
        return base.some((b) => {
          const [by, bmo, bda] = b.start.slice(0, 10).split("-").map(Number);
          const [bh, bmin] = b.start.slice(11, 16).split(":").map(Number);
          const [ey, emo, eda] = b.end.slice(0, 10).split("-").map(Number);
          const [eh, emin] = b.end.slice(11, 16).split(":").map(Number);
          const bStartFake = fakeTZDateUTC(by, bmo, bda, bh, bmin);
          const bEndFake = fakeTZDateUTC(ey, emo, eda, eh, emin);
          const bStartBuf = addMinutes(bStartFake, -BUFFER_MIN);
          const bEndBuf = addMinutes(bEndFake, BUFFER_MIN);
          return slotStartFake < bEndBuf && slotEndFake > bStartBuf;
        });
      })();

      items.push({ time: timeStr, disabled: overlap || tooSoon, reason: overlap ? 'busy' : tooSoon ? 'notice' : undefined });

      curM += SLOT_INTERVAL_MIN;
      while (curM >= 60) { curM -= 60; curH += 1; }
    }
    return items;
  }, [selectedDateStr, busy, localBusyByDate]);

  const onBook = useCallback(async (values: FormFields) => {
    if (!selectedDateStr || !time) return;
    try {
      setSubmitting(true);
      const endpoint = isRescheduling && rescheduleUrl ? rescheduleUrl : "/api/zoom/book";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: values.name, email: values.email, date: selectedDateStr, time, duration: DURATION_MIN }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Error de reserva");
      setBooking({
        join_url: data.meeting.join_url,
        icsBase64: data.calendar?.icsBase64,
        icsFileName: data.calendar?.icsFileName,
        googleUrl: data.calendar?.googleUrl,
        manage: { rescheduleUrl: data.manage?.rescheduleUrl, cancelUrl: data.manage?.cancelUrl },
      });
      // Registrar bloqueo local inmediato para la fecha seleccionada
      try {
        const [hh, mm] = (time || "00:00").split(":").map(Number);
        if (selectedDateStr) {
          const start = `${selectedDateStr}T${fmt2(hh)}:${fmt2(mm)}:00`;
          const [y, mo, da] = selectedDateStr.split("-").map(Number);
          const endDate = addMinutes(fakeTZDateUTC(y, mo, da, hh, mm), DURATION_MIN);
          const p = toTZParts(endDate, BOOKING_TZ);
          const end = `${fmt2(p.year)}-${fmt2(p.month)}-${fmt2(p.day)}T${fmt2(p.hour)}:${fmt2(p.minute)}:00`;
          setLocalBusyByDate((prev) => ({
            ...prev,
            [selectedDateStr]: [ ...(prev[selectedDateStr] || []), { start, end } ],
          }));
        }
      } catch {}
      setStep(4);
      if (typeof window !== 'undefined') try { launchConfettiBurst(); } catch {}
      if (isRescheduling) {
        setLastAction("rescheduled");
        toast.success("Reunión reprogramada");
        setIsRescheduling(false);
      } else {
        setLastAction("created");
        toast.success("Reunión creada");
      }
      if (data.manage?.rescheduleUrl) setRescheduleUrl(data.manage.rescheduleUrl);
      if (data.manage?.cancelUrl) setCancelUrl(data.manage.cancelUrl);
      try { sendGTMEvent("booking_confirmed", { date: selectedDateStr, time, email: values.email }); } catch {}
    } catch (e: any) {
      toast.error(e?.message || "No se pudo crear la reunión");
    } finally {
      setSubmitting(false);
    }
  }, [selectedDateStr, time, isRescheduling, rescheduleUrl]);

  // Helpers de formato para mostrar bloques ocupados en hora local
  function fmtTimeLabel(str: string) {
    const [d, t] = [str.slice(0,10), str.slice(11,16)];
    return t; // HH:mm
  }

  const busyBlocksWithBuffer = useMemo(() => {
    const base = [...busy, ...((selectedDateStr && localBusyByDate[selectedDateStr]) || [])];
    return base.map((b) => {
      const [by, bmo, bda] = b.start.slice(0, 10).split("-").map(Number);
      const [bh, bmin] = b.start.slice(11, 16).split(":").map(Number);
      const [ey, emo, eda] = b.end.slice(0, 10).split("-").map(Number);
      const [eh, emin] = b.end.slice(11, 16).split(":").map(Number);
      const s = addMinutes(fakeTZDateUTC(by, bmo, bda, bh, bmin), -BUFFER_MIN);
      const e = addMinutes(fakeTZDateUTC(ey, emo, eda, eh, emin), BUFFER_MIN);
      const sp = toTZParts(s, BOOKING_TZ);
      const ep = toTZParts(e, BOOKING_TZ);
      const sLocal = `${fmt2(sp.year)}-${fmt2(sp.month)}-${fmt2(sp.day)}T${fmt2(sp.hour)}:${fmt2(sp.minute)}:00`;
      const eLocal = `${fmt2(ep.year)}-${fmt2(ep.month)}-${fmt2(ep.day)}T${fmt2(ep.hour)}:${fmt2(ep.minute)}:00`;
      return { start: sLocal, end: eLocal };
    });
  }, [busy, localBusyByDate, selectedDateStr]);

  function downloadIcs() {
    if (!booking?.icsBase64) return;
    const byteString = typeof window !== 'undefined' ? atob(booking.icsBase64) : Buffer.from(booking.icsBase64, 'base64').toString('binary');
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
    const blob = new Blob([ab], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = booking.icsFileName || 'cita.ics';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="w-full" ref={containerRef} style={{ scrollMarginTop: `${scrollMargin}px` }}>
      {/* Header con logo */}
      <div className="flex items-center gap-3 pb-4 border-b mb-4">
        {logoUrl ? (
          <Image src={logoUrl} alt="MatchMyCourse" width={100} height={100} className="rounded-md" />
        ) : (
          <div className="w-9 h-9 rounded-md bg-primary" />
        )}
        <div>
          <div className="text-base font-semibold leading-tight">Reserva tu asesoría</div>
          <div className="text-xs text-muted-foreground">Videollamada por Zoom · Zona horaria {BOOKING_TZ}</div>
          {isRescheduling && (
            <div className="mt-1 inline-block text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">Reprogramación</div>
          )}
        </div>
      </div>

      {/* Pasos */}
      <div className="flex items-center gap-2 text-sm mb-4 flex-wrap">
        <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full border ${step === 1 ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-primary'}`}>1</span>
        <span className={step === 1 ? 'font-medium' : 'text-muted-foreground'}>Selecciona fecha</span>
        <span className="mx-1 text-muted-foreground">/</span>
        <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full border ${step === 2 ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-primary'}`}>2</span>
        <span className={step === 2 ? 'font-medium' : 'text-muted-foreground'}>Elige hora</span>
        <span className="mx-1 text-muted-foreground">/</span>
        <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full border ${step === 3 ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-primary'}`}>3</span>
        <span className={step === 3 ? 'font-medium' : 'text-muted-foreground'}>Datos y confirmación</span>
        <span className="mx-1 text-muted-foreground">/</span>
        <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full border ${step === 4 ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-primary'}`}>4</span>
        <span className={step === 4 ? 'font-medium' : 'text-muted-foreground'}>Completado</span>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-3">
              <Calendar
                mode="single"
                selected={selected}
                onSelect={setSelected}
                captionLayout="dropdown"
                fromMonth={new Date()}
                locale={es}
                disabled={disabledMatchers as any}
                className="rounded-md border"
              />
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <p className="text-xs text-muted-foreground">L–V {DAY_START}–{DAY_END} · Sáb {SAT_DAY_START}–{SAT_DAY_END} · Dom cerrado</p>
                <Button onClick={() => setStep(2)} disabled={!selected}>
                  Continuar
                </Button>
              </div>
            </div>
          </motion.div>
        ) : step === 2 ? (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <div className="text-muted-foreground">Fecha seleccionada</div>
                  <div className="font-medium">{selectedDateStr}</div>
                </div>
                <Button variant="ghost" onClick={() => setStep(1)}>Cambiar fecha</Button>
              </div>

              <div>
                <div className="mb-2 text-sm text-muted-foreground flex items-center gap-2">
                  {loadingBusy && <Loader2 className="h-4 w-4 animate-spin" />}
                  {loadingBusy ? "Cargando disponibilidad..." : "Elige una hora"}
                </div>
                {slots.length === 0 ? (
                  <div className="text-sm text-muted-foreground">No hay horarios disponibles para este día.</div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {slots.map((slot) => {
                      const isSelected = time === slot.time;
                      const variant = slot.disabled ? (slot.reason === 'busy' ? 'destructive' : 'secondary') : (isSelected ? 'default' : 'outline');
                      const title = slot.disabled ? (slot.reason === 'busy' ? 'Ocupado' : 'No disponible') : undefined;
                      return (
                        <Button
                          key={slot.time}
                          variant={variant as any}
                          disabled={slot.disabled}
                          title={title}
                          onClick={() => {
                            if (slot.disabled) return;
                            setTime(slot.time);
                            try { sendGTMEvent("booking_time_selected", { date: selectedDateStr, time: slot.time }); } catch {}
                            // Asegurar visibilidad del botón Continuar
                            scrollToStep2Continue();
                          }}
                        >
                          {slot.time}
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
              {busyBlocksWithBuffer.length > 0 && (
                <div>
                  <div className="mt-4 mb-2 text-sm text-muted-foreground">Bloques ocupados</div>
                  <div className="flex flex-wrap gap-2">
                    {busyBlocksWithBuffer.map((b, idx) => (
                      <span key={`${b.start}-${idx}`} title="Ocupado" className="text-xs px-2 py-1 rounded-md border bg-gray-100 text-gray-600">
                        {fmtTimeLabel(b.start)}–{fmtTimeLabel(b.end)}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">Incluye margen de {BUFFER_MIN} min antes y después.</p>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>Atrás</Button>
                <Button
                  type="button"
                  ref={step2ContinueRef}
                  style={{ scrollMarginTop: `${scrollMargin}px` }}
                  className={highlightContinue ? "ring-2 ring-primary ring-offset-2 animate-pulse" : undefined}
                  disabled={loadingBusy || !time}
                  onClick={() => setStep(3)}
                >
                  {loadingBusy ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Cargando...
                    </span>
                  ) : (
                    "Continuar"
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        ) : step === 3 ? (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <div className="text-muted-foreground">Fecha y hora</div>
                  <div className="font-medium">{selectedDateStr} {time}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" onClick={() => setStep(2)}>Cambiar hora</Button>
                  <Button variant="ghost" onClick={() => setStep(1)}>Cambiar fecha</Button>
                </div>
              </div>

              <form onSubmit={form.handleSubmit(onBook)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm mb-1">Nombre</label>
                    <Input placeholder="Tu nombre" {...form.register("name")} />
                    {form.formState.errors.name && (
                      <p className="mt-1 text-xs text-red-600">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Email</label>
                    <Input type="email" placeholder="tu@email.com" {...form.register("email")} />
                    {form.formState.errors.email && (
                      <p className="mt-1 text-xs text-red-600">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" onClick={() => setStep(2)}>Atrás</Button>
                  <Button type="submit" disabled={!time || submitting}>
                    {submitting ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Enviando...
                      </span>
                    ) : (
                      "Confirmar reserva"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-4">
              {booking && (
                <div className={`p-4 border rounded-md ${lastAction === 'rescheduled' ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'}`}>
                  <div className={`font-semibold mb-1 flex items-center gap-2 ${lastAction === 'rescheduled' ? 'text-amber-900' : 'text-green-900'}`}>
                    {lastAction === 'rescheduled' ? (
                      <>
                        <RefreshCw className="h-4 w-4" />
                        <span>¡Listo! Reunión reprogramada</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        <span>¡Listo! Reunión creada en Zoom</span>
                      </>
                    )}
                  </div>
                  <a className="text-blue-600 underline break-all" href={booking.join_url} target="_blank" rel="noreferrer">
                    {booking.join_url}
                  </a>
                  <div className="flex items-center gap-2 mt-3">
                    {booking.googleUrl && (
                      <a className="text-xs text-blue-600 underline" href={booking.googleUrl} target="_blank" rel="noreferrer">
                        Añadir a Google Calendar
                      </a>
                    )}
                    {booking.icsBase64 && (
                      <button onClick={downloadIcs} className="text-xs text-blue-600 underline">
                        Descargar .ics
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    { (booking.manage?.rescheduleUrl || rescheduleUrl) && (
                      <Button size="sm" variant="outline" onClick={() => { setIsRescheduling(true); setStep(1); }}>
                        Reprogramar
                      </Button>
                    )}
                    { (booking.manage?.cancelUrl || cancelUrl) && (
                      <Button size="sm" variant="destructive" onClick={async () => {
                        try {
                          const url = (booking.manage?.cancelUrl || cancelUrl)!;
                          const r = await fetch(url, { method: 'POST' });
                          const j = await r.json();
                          if (!r.ok || !j.success) throw new Error(j.error || 'Error');
                          toast.success('Reunión cancelada');
                          setBooking(null);
                          setTime(null);
                        } catch (e:any) {
                          toast.error(e?.message || 'No se pudo cancelar');
                        }
                      }}>
                        Cancelar
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Recibirás un correo de confirmación si está configurado.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
