// import { useState } from 'react'
import { Route, Switch } from 'wouter'
import { HomePage } from './pages/HomePage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { CreateRoutinePage } from './pages/CreateRoutinePage';
import { RoutinesPage } from './pages/RoutinesPage';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/routine/create" component={CreateRoutinePage} />
        <Route path="/routines" component={RoutinesPage} />
      </Switch>
    </>
  )
}

export default App
