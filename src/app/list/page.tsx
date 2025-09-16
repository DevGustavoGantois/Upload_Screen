"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProtectedRoute from "@/utils/protected-route";
import axios from "axios";
import { useEffect, useState } from "react";

type TablePropsUpload = {
  id: string;
  date: string;
  file: string;
  status: string | boolean;
};

export default function Page() {
  const selectOptions = ["Loteamentos", "Recebimentos", "Vendas"];
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [contentTable, setContentTable] = useState<TablePropsUpload[]>([]);

  useEffect(() => {
    const fetchTable = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<TablePropsUpload[]>(
          "https://loteamento_table/list"
        );
        setContentTable(response.data);
      } catch (error) {
        console.log("Erro ao chamar a API", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTable();
  }, []);

  const filteredTable = selected
    ? contentTable.filter((row) => row.id === selected)
    : contentTable;

  return (
    <ProtectedRoute>
        <section className="max-w-7xl mx-auto p-8">
      {isLoading ? (
        <p className="text-center">Carregando...</p>
      ) : contentTable.length > 0 ? (
        <div className="flex flex-col justify-start gap-2">
          <Label>Qual loteamento?</Label>
          <Select onValueChange={(value) => setSelected(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Escolha uma opção" />
            </SelectTrigger>
            <SelectContent>
              {selectOptions.map((item, index) => (
                <SelectItem key={index} value={(index + 1).toString()}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Arquivos</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTable.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.id}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    <a
                      href={row.file}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-900"
                    >
                      Baixar
                    </a>
                  </TableCell>
                  <TableCell>{row.status ? "Ativo" : "Inativo"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <p className="text-center text-gray-600 text-xl">Nada encontrado</p>
        </div>
      )}
    </section>
    </ProtectedRoute>
  );
}
