import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordModal from "./PasswordModal";

function Home() {
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedMakeIds, setSelectedMakeIds] = useState([]);
    const [pendingAction, setPendingAction] = useState(null); // { type, payload }
    let navigate = useNavigate();

    useEffect(() => {
        fetch("https://odin-inventory-gk98.onrender.com/makes")
            .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
            .then((data) => setMakes(Array.isArray(data) ? data : []))
            .catch(() => setMakes([]));
    }, []);

    useEffect(() => {
        fetch("https://odin-inventory-gk98.onrender.com/models")
            .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
            .then((data) => setModels(Array.isArray(data) ? data : []))
            .catch(() => setModels([]));
    }, []);

    const filteredModels = selectedMakeIds.length > 0
        ? models.filter(model => selectedMakeIds.includes(model.make_id))
        : models;

    const handleMakeChange = (makeId) => {
        setSelectedMakeIds(prev =>
            prev.includes(makeId) ? prev.filter(id => id !== makeId) : [...prev, makeId]
        );
    };

    // Called after password confirmed
    const executeAction = async () => {
        if (!pendingAction) return;
        const { type, payload } = pendingAction;
        setPendingAction(null);

        if (type === "add") {
            navigate("add");
        }

        if (type === "edit") {
            navigate(`/edit/${payload.modelId}`);
        }

        if (type === "delete") {
            try {
                const response = await fetch(
                    `https://odin-inventory-gk98.onrender.com/models/${payload.modelId}`,
                    { method: "DELETE" }
                );
                if (response.ok) {
                    setModels(models.filter(model => model.id !== payload.modelId));
                    alert("Model deleted successfully");
                } else {
                    alert("Failed to delete model");
                }
            } catch {
                alert("Error deleting model");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

            {/* Password Modal */}
            {pendingAction && (
                <PasswordModal
                    onConfirm={executeAction}
                    onCancel={() => setPendingAction(null)}
                />
            )}

            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="flex gap-8">

                    {/* Sidebar */}
                    <div className="w-64 flex-shrink-0">
                        <div className="bg-slate-700 rounded-lg p-6 sticky top-6 shadow-xl">
                            <h2 className="text-2xl font-bold text-white mb-6 pb-4 border-b border-slate-600">
                                Filter By Make
                            </h2>
                            <div className="space-y-3">
                                {makes.map((make) => (
                                    <label key={make.id} className="flex items-center cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            value={make.id}
                                            checked={selectedMakeIds.includes(make.id)}
                                            onChange={() => handleMakeChange(make.id)}
                                            className="w-5 h-5 rounded border-2 border-blue-400 bg-slate-600 text-blue-500 cursor-pointer accent-blue-500"
                                        />
                                        <span className="ml-3 text-white text-lg group-hover:text-blue-300 transition">
                                            {make.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Models Grid */}
                    <div className="flex-1">
                        <div className="bg-slate-700 rounded-lg p-8 shadow-xl">
                            <div className="mb-8 flex items-center justify-between">
                                <h2 className="text-3xl font-bold text-white">
                                    Available Models
                                    <span className="text-blue-400 ml-2">({filteredModels.length})</span>
                                </h2>
                                <button
                                    onClick={() => setPendingAction({ type: "add" })}
                                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg"
                                >
                                    Add Car
                                </button>
                            </div>

                            {filteredModels.length === 0 ? (
                                <div className="p-12 text-center">
                                    <p className="text-slate-300 text-lg">No models found.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {filteredModels.map((model, index) => (
                                        <div
                                            key={index}
                                            className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg p-6 shadow-lg hover:shadow-2xl hover:from-slate-500 hover:to-slate-600 transition-all duration-300 border border-slate-500"
                                        >
                                            <div className="space-y-4">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-white">{model.model_name}</h3>
                                                    <p className="text-blue-400 font-semibold mt-1">{model.make}</p>
                                                </div>
                                                <div className="border-t border-slate-600 pt-4 space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-slate-300">Price:</span>
                                                        <span className="text-2xl font-bold text-blue-400">
                                                            £{model.price.toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-slate-300">Stock Available:</span>
                                                        <span className={`font-bold text-lg ${model.stock_quantity > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                            {model.stock_quantity} units
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-3 mt-4">
                                                    <button
                                                        onClick={() => setPendingAction({ type: "edit", payload: { modelId: model.id } })}
                                                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => setPendingAction({ type: "delete", payload: { modelId: model.id } })}
                                                        className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;