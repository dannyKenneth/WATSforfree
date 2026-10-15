import AuthForm from "@/components/AuthForm";

interface LoginPageProps {
  searchParams: Promise<{ confirmation?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { confirmation } = await searchParams;

  return (
    <AuthForm
      mode="login"
      confirmationFailed={confirmation === "failed"}
    />
  );
}
