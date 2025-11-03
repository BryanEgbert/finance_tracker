// import { useState } from 'react'
import { Route, Switch } from 'wouter'
import { HomePage } from './pages/HomePage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />
      </Switch>
    </>
  )
}

export default App
