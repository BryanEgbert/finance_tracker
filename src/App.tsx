import { Route, Switch } from 'wouter'
import { Navbar } from '@/components/Navbar';
import { HomePage } from './pages/HomePage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { CreateRoutinePage } from './pages/CreateRoutinePage';
import { RoutinesPage } from './pages/RoutinesPage';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'View Routines', path: '/routines' },
  { label: 'Create Routine', path: '/routine/create' },
  { label: 'Sign In', path: '/signin' },
  { label: 'Sign Up', path: '/signup' },
];

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="FinTrack" links={navLinks} />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/routine/create" component={CreateRoutinePage} />
        <Route path="/routines" component={RoutinesPage} />
      </Switch>
    </div>
  )
}

export default App
