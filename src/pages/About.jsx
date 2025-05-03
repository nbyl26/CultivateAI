import Layout from "../components/Layout";

export default function About() {
    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-4">Tentang CultivateAI</h1>
            <p className="mb-4">
                CultivateAI adalah aplikasi berbasis AI yang dirancang untuk membantu petani kecil di
                Asia Pasifik. Aplikasi ini menyediakan:
            </p>
            <ul className="list-disc pl-5 mb-4">
                <li>Rekomendasi tanaman berdasarkan lokasi dan musim</li>
                <li>Monitoring tanaman secara manual</li>
                <li>Forum diskusi antar petani</li>
                <li>Chatbot AI (Gemini) untuk tanya-jawab instan</li>
            </ul>
            <p>
                Solusi ini dikembangkan dalam rangka Google Solution Challenge 2025 dengan harapan
                memberdayakan komunitas pertanian lokal menggunakan teknologi cerdas dan terjangkau.
            </p>
        </Layout>
    );
}
