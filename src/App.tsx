import { StoreProvider, useStore } from './lib/store';
import { Header } from './components/ui';
import Landing from './screens/Landing';
import Quiz from './screens/Quiz';
import Thinking from './screens/Thinking';
import Recommendations from './screens/Recommendations';
import Summary from './screens/Summary';
import Contact from './screens/Contact';
import WhatsAppBridge from './screens/WhatsAppBridge';
import Success from './screens/Success';
import Expert from './screens/Expert';
import Catalog from './screens/Catalog';

function Router() {
  const { screen } = useStore();

  return (
    <div className="min-h-[100dvh] bg-canvas">
      <Header />
      <main key={screen} className="animate-fade-in">
        {screen === 'landing' && <Landing />}
        {screen === 'quiz' && <Quiz />}
        {screen === 'thinking' && <Thinking />}
        {screen === 'recommendations' && <Recommendations />}
        {screen === 'summary' && <Summary />}
        {screen === 'contact' && <Contact />}
        {screen === 'whatsapp' && <WhatsAppBridge />}
        {screen === 'success' && <Success />}
        {screen === 'expert' && <Expert />}
        {screen === 'catalog' && <Catalog />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Router />
    </StoreProvider>
  );
}
