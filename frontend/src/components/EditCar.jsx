import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditCar() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [makes, setMakes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        make_id: "",
        model_name: "",
        price: "",
        stock_quantity: ""
    });

    // Fetch all makes
    useEffect(() => {
        fetch("https://odin-inventory-gk98.onrender.com/makes")
            .then((res) => res.json())
            .then((data) => {
                setMakes(data);
            })
            .catch((err) => console.error(err));
    }, []);

    // Fetch the specific car data
    useEffect(() => {
        fetch(`https://odin-inventory-gk98.onrender.com/models/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setFormData({
                    make_id: data.make_id,
                    model_name: data.model_name,
                    price: data.price,
                    stock_quantity: data.stock_quantity
                });
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                alert('Failed to load car data');
                navigate('/');
            });
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.make_id || !formData.model_name || !formData.price || !formData.stock_quantity) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch(`https://odin-inventory-gk98.onrender.com/models/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    make_id: parseInt(formData.make_id),
                    model_name: formData.model_name,
                    price: parseInt(formData.price),
                    stock_quantity: parseInt(formData.stock_quantity)
                })
            });

            if (response.ok) {
                alert('Car updated successfully!');
                navigate('/');
            } else {
                const error = await response.json();
                alert('Failed to update car: ' + error.error);
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Error updating car');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <p className="text-white text-xl">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <h1 className="text-4xl font-bold text-white">Edit Car</h1>
                    <p className="text-blue-100 mt-2">Update car details</p>
                </div>
            </div>

            {/* Form Container */}
            <div className="max-w-2xl mx-auto px-6 py-12">
                <div className="bg-slate-700 rounded-lg p-8 shadow-xl">
                    <form onSubmit={handleSubmit}>
                        {/* Car Make Select */}
                        <div className="mb-6">
                            <label className="block text-white font-bold mb-2">
                                Car Make
                            </label>
                            <select
                                name="make_id"
                                value={formData.make_id}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-slate-600 border-2 border-slate-500 rounded-lg text-white focus:border-blue-500 focus:outline-none transition"
                            >
                                <option value="">Select a make</option>
                                {makes.map((make) => (
                                    <option key={make.id} value={make.id}>
                                        {make.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Model Name Input */}
                        <div className="mb-6">
                            <label className="block text-white font-bold mb-2">
                                Model Name
                            </label>
                            <input
                                type="text"
                                name="model_name"
                                value={formData.model_name}
                                onChange={handleChange}
                                placeholder="e.g., Camry, Civic, Mustang"
                                required
                                className="w-full px-4 py-3 bg-slate-600 border-2 border-slate-500 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition"
                            />
                        </div>

                        {/* Price Input */}
                        <div className="mb-6">
                            <label className="block text-white font-bold mb-2">
                                Price (£)
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="e.g., 25000"
                                min="0"
                                required
                                className="w-full px-4 py-3 bg-slate-600 border-2 border-slate-500 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition"
                            />
                        </div>

                        {/* Stock Quantity Input */}
                        <div className="mb-8">
                            <label className="block text-white font-bold mb-2">
                                Stock Quantity
                            </label>
                            <input
                                type="number"
                                name="stock_quantity"
                                value={formData.stock_quantity}
                                onChange={handleChange}
                                placeholder="e.g., 5"
                                min="0"
                                required
                                className="w-full px-4 py-3 bg-slate-600 border-2 border-slate-500 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => navigate("/")}
                                className="flex-1 bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                            >
                                Update Car
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditCar;
