import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './layouts/login'
import Dashboard from './layouts/dashboard'
import Main from './layouts/main'
import NavBar from './components/ui/NavBar'
import Catalog from './layouts/catalog'
import ProductsProvider from './hooks/useProducts'
import GroupsProvider from './hooks/useGroups'
import { ToastContainer } from 'react-bootstrap'
import AuthProvider from './hooks/useAuth'

function App() {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <GroupsProvider>
          <ProductsProvider>
            <Switch>
              <Route exact path="/" component={Catalog} />
              <Route path="/catalog/:productId?" component={Catalog} />
              <Route path="/login/:type?" component={Login} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/main" component={Main} />
              <Redirect to="/" />
            </Switch>
          </ProductsProvider>
        </GroupsProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  )
}

export default App
