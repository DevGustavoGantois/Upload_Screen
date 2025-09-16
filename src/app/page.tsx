import { LoginForm } from "@/components/c-login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <>
     <main className="max-w-[1000px] mx-auto mt-20 lg:mt-60 p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-start">Login</CardTitle>
          <CardDescription className="text-base text-start">Preencha os campos abaixo para entrar na plataforma.</CardDescription>
        </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
      </Card>
    </main> 
    </>
  );
}
