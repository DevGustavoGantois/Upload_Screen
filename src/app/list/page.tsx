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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selected, setSelected] = useState("")
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

  return (
    <section className="max-w-7xl mx-auto p-8">
      {isLoading ? (
        <p className="text-center">Carregando...</p>
      ) : contentTable.length > 0 ? (
        <div className="flex flex-col justify-start gap-2">
          <Label>Qual loteamento?</Label>
          <Select onValueChange={(value) => setSelected(value)}>
            <SelectTrigger className="w-full">
              <SelectValue  placeholder="Escolha uma opção" />
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
              {contentTable.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.id}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.file}</TableCell>
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
  );
}
