"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function LoginForm() {
    const selectOptions = ["Loteamentos", "Recebimentos", "Vendas"];
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const formSchema = z.object({
        user: z.string().min(8, "O email precisa ter no mínimo 8 caracteres").max(16, "O email pode ter no máximo 16 caracteres"),
        select: z.string().optional(),
        password: z.string().min(8, "A senha precisa ter no mínimo 8 caracteres").max(13, "A senha pode ter no máximo 16 caracteres.")
    });

    type FormDataSchema = z.infer<typeof formSchema>;

    const form = useForm<FormDataSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            user: "",
            select: "",
            password: "",
        },
    });

    const onSubmit = (value: FormDataSchema) => {
        try {
            axios.post("https://api_do_upload_de_arquivos/login", value)
            setTimeout(() => {
                router.push("/list")
            }, 3000);
        }
        catch (error) {
            console.log("Erro ao chamar a API", error)
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <>
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <FormField name="user" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Nome de usuário</FormLabel>
                            <FormControl>
                                <Input
                                type="text"
                                placeholder="Digite seu nome de usuário" 
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    {/* <FormField name="select" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Qual loteamento?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Escolha uma opção" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {selectOptions.map((item, index) => {
                                        return (
                                            <span key={index}>  
                                                <SelectItem value={(index + 1).toString()}>{item}</SelectItem>
                                            </span>
                                        )
                                    })}
                                </SelectContent>
                            </Select>
                            <FormMessage />   
                        </FormItem>
                    )} /> */}
                    <FormField name="password" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <Input
                                type="password"
                                placeholder="Digite sua senha..."
                                {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <div className="w-full mt-4 flex flex-col justify-center items-center">
                    <Button className="w-full cursor-pointer" disabled={isLoading}>
                        {isLoading ? "Entrando..." : "Entrar"}
                    </Button>
                    </div>
                </form>
            </Form>
        </div>
        </>
    )
}