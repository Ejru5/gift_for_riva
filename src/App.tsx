import SealedPackage from './components/SealedPackage';

function App() {
  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="warped-bg pointer-events-none"></div>

      {/* Main Card Container */}
      <div className="relative z-10 w-full max-w-[400px] p-4 flex flex-col items-center justify-center min-h-screen">

        <SealedPackage />

      </div>
    </div>
  );
}

export default App;
