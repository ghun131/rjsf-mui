import './App.scss'
import DefaultForm from './components/DefaultForm'
import MyMuiForm from './components/MyMuiForm'
import OverviewForm from './components/OverviewForm'
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";

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
      <FroalaEditorComponent tag="textarea" />
    </div>
  )
}

export default App
