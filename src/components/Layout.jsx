import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-green-50 text-gray-800">
            <Header />
            <main className="flex-1 max-w-6xl mx-auto w-full p-6">{children}</main>
            <Footer />
        </div>
    );
}
