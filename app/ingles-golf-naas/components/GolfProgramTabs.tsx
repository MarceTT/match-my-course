"use client";

import { useId, useState } from "react";

/**
 * Adults / juniors switch for the Naas golf programme.
 *
 * The original toggled `hidden` on two panels with a small inline script. Here
 * it is a tab list with real `role="tab"` / `role="tabpanel"` wiring and proper
 * `aria-controls` / `id` pairing, which the original lacked — same behaviour,
 * announced correctly by a screen reader.
 */

export interface GolfFact {
  value: string;
  label: string;
}

export interface GolfDay {
  day: string;
  morning: string;
  afternoon: string;
}

export interface GolfList {
  title: string;
  items: string[];
}

export interface GolfProgram {
  id: string;
  tabLabel: string;
  kicker: string;
  title: string;
  description: string;
  price: {
    caption: string;
    amount: string;
    note: string;
  };
  facts: GolfFact[];
  calendarTitle: string;
  calendar: GolfDay[];
  calendarNote: string;
  lists: GolfList[];
}

export default function GolfProgramTabs({ programs }: { programs: GolfProgram[] }) {
  const [active, setActive] = useState(programs[0].id);
  const baseId = useId();

  return (
    <>
      <div
        role="tablist"
        aria-label="Modalidad del programa"
        className="m-0 mt-3 flex gap-2.5 border-b border-[#dde4ee] pb-4"
      >
        {programs.map((program) => {
          const selected = program.id === active;
          return (
            <button
              key={program.id}
              role="tab"
              type="button"
              id={`${baseId}-tab-${program.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${program.id}`}
              onClick={() => setActive(program.id)}
              className={`cursor-pointer rounded-[10px] border px-7 py-[13px] text-[15px] font-bold ${
                selected
                  ? "border-[#405cf1] bg-[#405cf1] text-white"
                  : "border-[#d6e0eb] bg-white text-[#2d3e55]"
              }`}
            >
              {program.tabLabel}
            </button>
          );
        })}
      </div>

      {programs.map((program) => (
        <div
          key={program.id}
          role="tabpanel"
          id={`${baseId}-panel-${program.id}`}
          aria-labelledby={`${baseId}-tab-${program.id}`}
          hidden={program.id !== active}
          className="pb-[54px] pt-10"
        >
          <div className="flex items-start justify-between gap-10 max-[700px]:flex-col">
            <div className="max-w-[650px]">
              <span className="text-[12px] font-extrabold tracking-[2px] text-[#4765ed]">
                {program.kicker}
              </span>
              <h2 className="my-4 mb-5 text-[clamp(29px,3.3vw,43px)] font-bold leading-[1.16] tracking-[-1.4px]">
                {program.title}
              </h2>
              <p className="text-[17px] text-[#59677c]">{program.description}</p>
            </div>
            <div className="flex flex-[0_0_268px] flex-col rounded-[20px] bg-[linear-gradient(130deg,#e9f5ff,#e2f9eb)] p-[26px] max-[700px]:w-full max-[700px]:flex-auto">
              <small className="font-extrabold text-[#365378]">{program.price.caption}</small>
              <strong className="text-[36px] tracking-[-1px] text-[#14894e]">
                {program.price.amount}
              </strong>
              <span className="text-[13px] text-[#69798e]">{program.price.note}</span>
            </div>
          </div>

          <div className="my-[33px] mb-10 grid grid-cols-4 gap-3.5 max-[700px]:grid-cols-2">
            {program.facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-[14px] border border-[#e2e8f1] bg-white p-[22px]"
              >
                <b className="block text-[21px] text-[#243b7a]">{fact.value}</b>
                <span className="text-[13px] text-[#59677c]">{fact.label}</span>
              </div>
            ))}
          </div>

          <h3 className="my-[25px] mb-4 text-[23px] font-bold">{program.calendarTitle}</h3>
          <div
            className="grid gap-[9px] max-[700px]:flex max-[700px]:overflow-x-auto"
            style={{
              gridTemplateColumns: `repeat(${program.calendar.length},minmax(0,1fr))`,
            }}
          >
            {program.calendar.map((day) => (
              <div
                key={day.day}
                className="flex min-h-[142px] flex-col gap-2 rounded-[13px] bg-[#eef4ff] px-3 py-4 max-[700px]:min-w-[170px]"
              >
                <b className="text-[16px]">{day.day}</b>
                <span className="text-sm">{day.morning}</span>
                <em className="rounded-md bg-[#daf8e8] p-[7px] text-sm font-bold not-italic text-[#126d45]">
                  {day.afternoon}
                </em>
              </div>
            ))}
          </div>
          <p className="text-[13px] text-[#69798e]">{program.calendarNote}</p>

          <div className="mt-8 grid grid-cols-2 gap-[45px] max-[700px]:grid-cols-1 max-[700px]:gap-0">
            {program.lists.map((list) => (
              <div key={list.title}>
                <h3 className="my-[25px] mb-4 text-[23px] font-bold">{list.title}</h3>
                <ul className="list-disc pl-[19px] leading-[1.9] text-[#485a72]">
                  {list.items.map((item) => (
                    <li key={item} className="mb-[7px]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
