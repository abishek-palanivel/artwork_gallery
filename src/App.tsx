import ArtworkTable from './components/ArtworkTable';

import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <div style={{ padding: '20px' }}>
        <ArtworkTable />
      </div>
    </div>
  );
}

export default App;
