import './App.css'
import DocumentUploader from "./components/DocumentUploader.tsx";
import BaseComponent from "./components/BaseComponent.tsx";

function App() {
    return (
        <BaseComponent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card bg-base-100 shadow-xl p-6">
                    <h2 className="text-2xl font-bold mb-4">Certificazione Documenti</h2>
                    <DocumentUploader />
                </div>

                <div className="card bg-base-100 shadow-xl p-6">
                    <h2 className="text-2xl font-bold mb-4">Anteprima Documento</h2>
                    {/* Componente di anteprima */}
                </div>
            </div>
        </BaseComponent>
    );
}

export default App
