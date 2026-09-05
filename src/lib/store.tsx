import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { makeT, num as toDigits } from '../data/i18n';
import type {
  Answers,
  ContactDetails,
  Lang,
  Personalization,
  Product,
  Screen,
} from './types';

export const EMPTY_ANSWERS: Answers = {
  occasion: null,
  recipients: [],
  quantityBand: null,
  quantityExact: null,
  budget: null,
  style: null,
  customization: [],
  timeline: null,
};

export const EMPTY_CONTACT: ContactDetails = {
  name: '',
  organization: '',
  phone: '',
  email: '',
  preferred: 'whatsapp',
  notes: '',
};

export const EMPTY_PERSONALIZATION: Personalization = {
  metal: null,
  ribbon: null,
  engravingText: '',
  logoName: null,
  quantity: 1,
};

/** The polished scenario behind the "Play demo scenario" button on the landing screen. */
export const DEMO_ANSWERS: Answers = {
  occasion: 'corporate',
  recipients: ['employees', 'teams'],
  quantityBand: '51-100',
  quantityExact: 50,
  budget: '10-20',
  style: 'premium',
  customization: ['logo', 'engraving'],
  timeline: 'weeks',
};

export const DEMO_CONTACT: ContactDetails = {
  name: 'Nasser Al-Rashid',
  organization: 'Kuwait Gulf Holding',
  phone: '+965 9000 1234',
  email: 'nasser@example.com',
  preferred: 'whatsapp',
  notes: 'Annual employee recognition ceremony — awards needed before the event date.',
};

interface Store {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: ReturnType<typeof makeT>;
  n: (v: number | string) => string;
  dir: 'ltr' | 'rtl';

  screen: Screen;
  go: (s: Screen) => void;

  step: number;
  setStep: (s: number) => void;

  answers: Answers;
  setAnswers: (patch: Partial<Answers>) => void;

  selected: Product | null;
  setSelected: (p: Product | null) => void;

  personalization: Personalization;
  setPersonalization: (patch: Partial<Personalization>) => void;

  contact: ContactDetails;
  setContact: (patch: Partial<ContactDetails>) => void;

  logoName: string | null;
  setLogoName: (n: string | null) => void;

  reset: () => void;
  loadDemo: () => void;
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const [screen, setScreen] = useState<Screen>('landing');
  const [step, setStep] = useState(0);
  const [answers, setAnswersState] = useState<Answers>(EMPTY_ANSWERS);
  const [selected, setSelected] = useState<Product | null>(null);
  const [personalization, setPersonalizationState] =
    useState<Personalization>(EMPTY_PERSONALIZATION);
  const [contact, setContactState] = useState<ContactDetails>(EMPTY_CONTACT);
  const [logoName, setLogoName] = useState<string | null>(null);

  const dir: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr';

  // Direction is set once, at the root, so every child inherits it (RTL Rule 4).
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const t = useMemo(() => makeT(lang), [lang]);
  const n = useCallback((v: number | string) => toDigits(v, lang), [lang]);

  const setAnswers = useCallback(
    (patch: Partial<Answers>) => setAnswersState((prev) => ({ ...prev, ...patch })),
    [],
  );
  const setPersonalization = useCallback(
    (patch: Partial<Personalization>) =>
      setPersonalizationState((prev) => ({ ...prev, ...patch })),
    [],
  );
  const setContact = useCallback(
    (patch: Partial<ContactDetails>) => setContactState((prev) => ({ ...prev, ...patch })),
    [],
  );

  const go = useCallback((s: Screen) => {
    setScreen(s);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const reset = useCallback(() => {
    setAnswersState(EMPTY_ANSWERS);
    setSelected(null);
    setPersonalizationState(EMPTY_PERSONALIZATION);
    setContactState(EMPTY_CONTACT);
    setLogoName(null);
    setStep(0);
    setScreen('landing');
    window.scrollTo({ top: 0 });
  }, []);

  const loadDemo = useCallback(() => {
    setAnswersState(DEMO_ANSWERS);
    setContactState(DEMO_CONTACT);
    setLogoName('kuwait-gulf-holding-logo.png');
    setPersonalizationState({
      ...EMPTY_PERSONALIZATION,
      engravingText: 'EMPLOYEE OF THE YEAR',
      logoName: 'kuwait-gulf-holding-logo.png',
      quantity: 50,
    });
    setStep(5);
    setScreen('thinking');
    window.scrollTo({ top: 0 });
  }, []);

  const value: Store = {
    lang,
    setLang,
    t,
    n,
    dir,
    screen,
    go,
    step,
    setStep,
    answers,
    setAnswers,
    selected,
    setSelected,
    personalization,
    setPersonalization,
    contact,
    setContact,
    logoName,
    setLogoName,
    reset,
    loadDemo,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}
