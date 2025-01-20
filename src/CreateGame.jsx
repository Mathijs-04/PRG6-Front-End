import {useState} from "react";
import {useNavigate} from "react-router";

function CreateGame() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        developer: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    async function createGame() {
        try {
            const response = await fetch('http://145.24.223.187:8000/games', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Successfully created:', data);
                setFormData({title: '', description: '', developer: ''});
                navigate('/games');
            } else {
                console.error('Error creating game:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createGame();
    };

    return (
        <>
            <h1 className="text-2xl font-bold">Create Game</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Create a new game</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-1">
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-md bg-white text-black focus:outline-none focus:ring-2"
                            placeholder="Title of the game"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-1">
                            Description:
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-md bg-white text-black focus:outline-none focus:ring-2"
                            placeholder="Description of the game"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="developer" className="block text-sm font-medium mb-1">
                            Developer:
                        </label>
                        <input
                            type="text"
                            id="developer"
                            name="developer"
                            value={formData.developer}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-md bg-white text-black focus:outline-none focus:ring-2"
                            placeholder="Developer of the game"
                        />
                    </div>
                    <button type="submit"
                            className="px-4 py-2 bg-white text-black font-semibold rounded-md border border-black">
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}

export default CreateGame;
