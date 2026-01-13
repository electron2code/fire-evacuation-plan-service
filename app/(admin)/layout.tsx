import Header from "@/components/web/dashboard/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/web/dashboard/app-sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <main className="w-full h-screen overflow-y-auto">
                <SidebarProvider>
                    <AppSidebar />
                    <div className="w-full">
                        <Header />
                        {children}
                    </div>
                    <Toaster position="top-right" />
                </SidebarProvider>
            </main>
        </ThemeProvider>
    )
}