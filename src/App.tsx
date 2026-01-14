import SealedPackage from './components/SealedPackage';

function App() {
  return (
    <div className="relative w-screen h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="warped-bg pointer-events-none"></div>

      {/* Main Card Container - Mobile optimized */}
      <div className="relative z-10 w-full max-w-[400px] px-4 flex flex-col items-center justify-center h-[100dvh]">

        <SealedPackage />

      </div>
    </div>
  );
}

export default App;
