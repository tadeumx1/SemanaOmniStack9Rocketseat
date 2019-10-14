import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Login from './pages/Login'
import List from './pages/List'
import Book from './pages/Book'

// Usando o SwitchNavigator no React Native quando o usuário for de uma tela
// para outra a anterior vai deixar de existir, é usado para autenticação

// Com o StackNavigator o usuário é possível voltar para a tela

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        Book
    })
)

export default Routes
