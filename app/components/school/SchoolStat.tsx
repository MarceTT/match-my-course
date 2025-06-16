"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartTooltip,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";
import { rewriteToCDN } from "@/app/utils/rewriteToCDN";

interface ChartEntry {
  name: string;
  value: number;
}

interface SchoolStatProps {
  data: ChartEntry[];
  averageAge: number;
  nacionalidades:number;
}

const COLORS = ["#1E1F5E", "#2E528F", "#4893C4", "#82E5E2"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md border rounded px-3 py-2 text-sm">
        <strong>{payload[0].name}</strong>: {payload[0].value.toFixed(1)}%
      </div>
    );
  }
  return null;
};

const SchoolStat = ({
  data,
  averageAge,
  nacionalidades,
}: SchoolStatProps) => {
  return (
    <div className="max-w-4xl mx-auto mt-12 mb-10 lg:mb-0 xl:mb-0">
      <h1 className="text-2xl font-bold mb-6 text-center md:text-left lg:text-left xl:text-left">
        Estudiantes por continente (2024)
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        {/* Donut chart */}
        <div className="flex justify-center">
          <ResponsiveContainer width={260} height={260}>
            <PieChart>
              <Pie
                data={data}
                innerRadius={70}
                outerRadius={110}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <RechartTooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Leyenda */}
        <div className="flex flex-col gap-4 mx-auto">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <div>
                <span className="font-bold text-md">
                  {entry.value.toFixed(1)}%
                </span>
                <span className="ml-2 text-gray-700">{entry.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Estadísticas adicionales */}
        <div className="flex flex-col items-center gap-8 text-center">
          <div>
            <div className="w-10 h-10 relative mx-auto">
              <Image
                src={rewriteToCDN(
                  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/iconos+sitio/EDAD.svg"
                )}
                alt="Edad promedio"
                fill
                className="object-contain"
                loading="lazy"
              />
            </div>
            <div className="text-2xl font-semibold mt-2">{averageAge} años</div>
            <div className="text-sm text-gray-500">Edad promedio</div>
          </div>
          <div>
            <div className="w-10 h-10 relative mx-auto">
              <Image
                src={rewriteToCDN(
                  "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/iconos+sitio/NACIONALIDAD+GRAFICO.svg"
                )}
                alt="Número de nacionalidades"
                fill
                className="object-contain"
                loading="lazy"
              />
            </div>
            <div className="text-2xl font-semibold mt-2">
              {nacionalidades}
            </div>
            <div className="text-sm text-gray-500">
              Número de nacionalidades
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolStat;
