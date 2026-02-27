import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNavbar from "@/components/BottomNavbar";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main className="flex-grow pb-24 md:pb-0">
                {children}
            </main>
            <Footer />
            <BottomNavbar />
        </>
    );
}
