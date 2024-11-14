import './App.css';
import React, {useState, useEffect} from 'react';
import useLocalStorage from './useLocalStorage';
import {marked} from 'marked';

const App = () => {
  const [code, setCode] = useLocalStorage('codeKey', '## Hello')
  const [compiled, setCompiled] = useState('<h2 id="hello">Hello</h2>')
  const [hide, hidePreview] = useState(true)
  const [docs, setDocs] = useState('')
  const [docsHide, docsPreview] = useState(true)
  
  useEffect(() => {
      fetch('/api/v1/basic-syntax.json')
          .then((response) => response.json())
          .then((data) => {
            setDocs(data)
          })
          .catch((error) =>
              console.error('An error occurred.', error))
  }, [])
  
  const openMD = () => {
    console.log(0)
    hidePreview(true)
    docsPreview(false)
  }

  const openPreview = () => {
    console.log(0)
    hidePreview(false)
    docsPreview(true)
  }

  const openDocs = () => {
    console.log(0)
    hidePreview(false)
    docsPreview(false)
  }

  const handleChange = (e) => {
    setCode(e.target.value)
    setCompiled(marked.parse(e.target.value))
  }

  return (
    <>
      <h1>MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button onClick={openMD} >MarkDown</button>
          <button onClick={openPreview}>Preview</button>
          <button onClick={openDocs}>Docs</button>
        </div>
        {hide && !docsHide && (
          <div>
            <textarea onChange={handleChange} value={code}/>
          </div> )}

        {docsHide && (
          <div>
            <textarea value={compiled} readOnly/>
          </div> )}

        {!hide && !docsHide && (

          <div style={{textAlign: "left"}}>
            {docs.basic_syntax.map((basic, basicNum) => (
              <div className="docsDiv" key={basicNum}> 
                <h1>{basic.name}</h1>
                <p>{basic.description}</p>
                
                  {basic.examples.map((typical, typicalNum) => (
                    <div className="examplesDiv">
                      <h2>Example {typicalNum + 1}:</h2>
                      <li> markdown</li>
                      <p key={typicalNum}>{typical.markdown}</p>
                      <li> html</li>
                      <p key={typicalNum}>{typical.html}</p>
                    </div>
                  ))}

                  {basic.additional_examples.map((extra, extraNum) => (
                    <div className="examplesDiv">
                      <h2 key={extraNum}>{extra.name}</h2>
                      <p key={extraNum}>{extra.description}</p>
                      <li> markdown</li>
                      <p key={extraNum}>{extra.markdown}</p>
                      <li> html</li>
                      <p key={extraNum}>{extra.html}</p>
                    </div>
                  ))}
              </div>                
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default App;