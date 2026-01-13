import CustomHeader from "@/components/web/custom-header";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    // <main className="max-w-7xl w-full mx-auto">
    <main className="w-full min-h-screen bg-gray-100 overflow-x-hidden">
      <CustomHeader />
      {children}
    </main>
  )
}