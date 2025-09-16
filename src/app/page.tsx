import { LoginForm } from "@/components/c-login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <>
     <main className="max-w-[1000px] mx-auto mt-20 lg:mt-60 p-8">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Preencha os campos abaixo para entrar na plataforma.</CardDescription>
          <CardContent>
            <LoginForm />
          </CardContent>
        </CardHeader>
      </Card>
    </main> 
    </>
  );
}
