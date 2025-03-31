"use client";

import { PieChart, Pie, Cell, Tooltip as RechartTooltip } from "recharts";
import { FaFlag } from "react-icons/fa";
import { LuBadgeInfo } from "react-icons/lu";

interface ChartEntry {
  name: string;
  value: number;
}

interface SchoolStatProps {
  data: ChartEntry[];
  averageAge: number;
  nationalityCount: number;
}

const COLORS = ["#1E1F5E", "#2E528F", "#4893C4", "#82E5E2"];

const SchoolStat = ({ data, averageAge, nationalityCount }: SchoolStatProps) => {
  return (
    <div className="mb-8 mt-8">
      <h3 className="text-xl font-bold mb-6">Estudiantes por continente año 2024</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        {/* Donut chart */}
        <div className="flex justify-center">
          <PieChart width={240} height={240}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <RechartTooltip />
          </PieChart>
        </div>

        {/* Leyenda */}
        <div className="flex flex-col gap-4">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              />
              <div>
                <span className="font-bold text-md">{entry.value.toFixed(1)}%</span>
                <span className="ml-2 text-gray-700">{entry.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Edad promedio y nacionalidades */}
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center">
            <LuBadgeInfo className="w-10 h-10 text-black" />
            <span className="text-xl font-bold mt-2">{averageAge} años</span>
            <span className="text-sm text-gray-500">Promedio</span>
          </div>
          <div className="flex flex-col items-center">
            <FaFlag className="w-10 h-10 text-black" />
            <span className="text-xl font-bold mt-2">{nationalityCount}</span>
            <span className="text-sm text-gray-500">Nacionalidades</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolStat;
