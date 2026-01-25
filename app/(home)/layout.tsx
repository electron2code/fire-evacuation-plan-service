import CustomHeader from "@/components/web/custom-header";
import Footer from "@/components/web/footer";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    // <main className="max-w-7xl w-full mx-auto">
    <main className="w-full bg-gray-100 overflow-x-hidden">
      <CustomHeader />
      <div className="h-20"></div>
      {children}
      <Footer />
    </main>
  )
}