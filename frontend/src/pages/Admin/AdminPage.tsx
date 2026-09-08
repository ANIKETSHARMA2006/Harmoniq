import Topbar from "@/components/Topbar";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Admin tools will appear here.
        </p>
      </main>
    </div>
  );
};

export default AdminPage;
