import Navbar from "@/components/navbar";
import Container from "@/components/container";
import getCurrentUser from "../actions/getCurrentUser";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    console.log("PLEASE LOGIN");
  }

  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  );
}
