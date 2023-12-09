import AgeGroupPriceList from "./AgeGroupPriceList";

function App() {
  return (
    <div className="App">
      <AgeGroupPriceList onChange={(result) => console.log(result)} />
    </div>
  );
}

export default App;
