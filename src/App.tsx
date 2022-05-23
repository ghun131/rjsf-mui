import './App.scss'
import DefaultForm from './components/DefaultForm'
import MyMuiForm from './components/MyMuiForm'
import OverviewForm from './components/OverviewForm'

const App = (): JSX.Element => {
  return (
    <div className='App'>
      {/* <div style={{ marginBottom: '5rem' }}>
        <h1>Default Form</h1>
        <DefaultForm />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h1>MUI Form</h1>
        <MyMuiForm />
      </div> */}

      <OverviewForm />
    </div>
  )
}

export default App
