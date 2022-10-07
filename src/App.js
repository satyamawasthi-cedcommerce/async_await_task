import './App.css';
import '@shopify/polaris/build/esm/styles.css';
// import MainComp from './Components/MainComp';
import Products from './Components/Products';

function App() {
  return (
    <div className="App">
      {/* <MainComp/> */}
      <Products/>
    </div>
  );
}

export default App;
