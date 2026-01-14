import SealedPackage from './components/SealedPackage';

function App() {
  return (
    <div className="relative w-full min-h-[100dvh] h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="warped-bg pointer-events-none"></div>

      {/* Main Card Container - Mobile first responsive */}
      <div className="relative z-10 w-full max-w-[100vw] sm:max-w-[420px] px-3 sm:px-4 py-4 flex flex-col items-center justify-center min-h-[100dvh]">

        <SealedPackage />

      </div>
    </div>
  );
}

export default App;
