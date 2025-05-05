"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getTop3Equipes } from "@/app/_services/votarServices";

const data = [
  { name: "E1", valor: 60, equipe: "Equipe 1" },
  { name: "E2", valor: 45, equipe: "Equipe 2" },
  { name: "E3", valor: 25, equipe: "Equipe 3" },
];

const coresEquipe = {
  1: "#4f46e5",
  2: "#10b981",
  3: "#f59e0b",
};

export default function GraficoHorizontal({ refreshTrigger }) {
  const [data, setData] = useState([]);
  //use Effect
  useEffect(() => {
    async function carregarDados() {
      try {
        const total = await getTop3Equipes();
        console.log(total);
        if (total.status) {
          setData(total.top3);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        return;
      }
    }

    carregarDados();
  }, [refreshTrigger]);
  return (
    <Card className="w-[85%] sm:w-full mx-auto mt-8 border-4 border-orange-400 mb-12">
      <CardHeader className="text-orange-400 font-semibold text-center">
        Ranking das Equipes por total de Pontos.
      </CardHeader>
      <CardContent>
        <div className="h-[220px]">
          <ResponsiveContainer className="w-full">
            <BarChart
              data={data}
              barSize={50}
              layout="vertical"
              margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
            >
              <XAxis type="number" />
              <YAxis type="category" dataKey="id_competidor" />
              <Tooltip />

              <Bar dataKey="total" radius={[8, 8, 8, 8]}>
                <LabelList
                  dataKey="total"
                  position="insideRight"
                  fill="#ffffff"
                  formatter={(value) => `${value} pts.`}
                  style={{ fontWeight: "bold" }}
                  className="text-sm sm:text-xl"
                />
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={coresEquipe[entry.id_competidor]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
