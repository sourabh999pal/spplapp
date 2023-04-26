
import Navigation from './src/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';


import { ToastProvider } from 'react-native-toast-notifications'    //toaster for notification import
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';

const App = () => {


 

  return (
    
      <ToastProvider>
        
        <AppNav />
        
        
      </ToastProvider >
       
  );
}

export default App

