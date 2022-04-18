import './App.css';
import { ClassComponent } from './ClassComponent/ClassComponent';
import { FunctionalComponent } from './FunctionalComponent/FunctionalComponent';

function App() {
  return (
    <div className="App">
      <ClassComponent />
      <FunctionalComponent action="Активировать!" />
    </div>
  );
}

export default App;
