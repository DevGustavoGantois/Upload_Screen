"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formSchema = z.object({
    user: z.string().min(4, "O usuário precisa ter no mínimo 4 caracteres").max(16, "O usuário pode ter no máximo 16 caracteres"),
    password: z.string().min(8, "A senha precisa ter no mínimo 8 caracteres").max(32, "A senha pode ter no máximo 32 caracteres"),
  });

  type FormDataSchema = z.infer<typeof formSchema>;

  const form = useForm<FormDataSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: "",
      password: "",
    },
  });

  const onSubmit = async (value: FormDataSchema) => {
    try {
      setIsLoading(true);

      if (value.user === "ronni" && value.password === "ronniHomemDosSotwares123") {
        await axios.post("https://api_do_upload_de_arquivos/login", value);
        toast.success(`O Login do usuário ${value.user} foi realizado com sucesso!`)
        router.push("/list");
      } else {
        toast.error("Usuário ou senha incorretos!");
        console.log("Erro ao chamar a API.")
      }
    } catch (error) {
      console.error("Erro ao chamar a API", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            name="user"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome de usuário</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Digite seu nome de usuário" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Digite sua senha..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full mt-4 flex flex-col justify-center items-center">
            <Button className="w-full cursor-pointer" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
