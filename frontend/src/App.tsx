//frontend/src/app.tsx
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './store/slices/counterSlice'; 
import { RootState } from './store/store'; // Importa el tipo RootState
import './index.css';


function App() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600">Contador: {count}</h1>
      <div className="mt-4">
      <button 
  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mr-2"
  onClick={() => {
    console.log("Incrementar clickeado");
    dispatch(increment());
  }}
>
  Incrementar
</button>

<button 
  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
  onClick={() => {
    console.log("Decrementar clickeado");
    dispatch(decrement());
  }}
>
  Decrementar
</button>

      </div>
    </div>
  );
}

export default App;

