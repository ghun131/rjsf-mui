import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/froala_style.min.css'
import FroalaEditorComponent from 'react-froala-wysiwyg'
import './App.scss'
import OverviewForm from './components/OverviewForm'

const App = (): JSX.Element => {
  return (
    <div className="App">
      {/* <div style={{ marginBottom: '5rem' }}>
        <h1>Default Form</h1>
        <DefaultForm />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h1>MUI Form</h1>
        <MyMuiForm />
      </div> */}

      <OverviewForm />
      <FroalaEditorComponent tag="textarea" />
    </div>
  )
}

export default App
