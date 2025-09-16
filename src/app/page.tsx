import { LoginForm } from "@/components/c-login-form";
import Plasma from "@/components/c-plasma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="w-full h-full relative bg-black rounded-r-3xl">
        <Plasma
          color="#7231FF"
          speed={1.5}
          direction="forward"
          scale={1.2}
          opacity={0.8}
          mouseInteractive={true}
        />
      </div>

      <main className="flex justify-center items-center p-8">
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-start">Login</CardTitle>
            <CardDescription className="text-base text-start">
              Preencha os campos abaixo para entrar na plataforma.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </main>
    </section>
  );
}
