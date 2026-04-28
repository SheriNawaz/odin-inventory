import { useState } from "react";

function PasswordModal({ onConfirm, onCancel }) {
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = () => {
        if (input === import.meta.env.VITE_ADMIN_PASSWORD) {
            onConfirm();
        } else {
            setError(true);
            setInput("");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-slate-700 rounded-lg p-8 shadow-2xl w-full max-w-sm border border-slate-500">
                <h2 className="text-xl font-bold text-white mb-2">Admin Access Required</h2>
                <p className="text-slate-300 text-sm mb-6">Enter the admin password to continue.</p>
                <input
                    type="password"
                    value={input}
                    onChange={(e) => { setInput(e.target.value); setError(false); }}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    placeholder="Password"
                    autoFocus
                    className="w-full px-4 py-3 bg-slate-600 border-2 border-slate-500 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none mb-2"
                />
                {error && <p className="text-red-400 text-sm mb-3">Incorrect password.</p>}
                <div className="flex gap-3 mt-4">
                    <button onClick={onCancel} className="flex-1 bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg transition-colors">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PasswordModal;