import { useState } from 'react'

import './App.css'

function App() {

  const typeOfCreation = [
    {
      id: 0,
      name: 'teachers'
    },
    {
      id: 1,
      name: 'subjects'
    },
    {
      id: 2,
      name: 'schoolClass'
    }
  ]

  const [teachers, setTeachers] = useState([])
  const [subjects, setSubjects] = useState([])
  const [schoolClass, setSchoolClass] = useState([])

  const [createMenu, setCreateMenu] = useState(true)
  const [searchMenu, setSearchMenu] = useState(false)

  const showCreation = () => {
    setCreateMenu(true)
    setSearchMenu(false)
  }

  const showSearch = () => {
    setCreateMenu(false)
    setSearchMenu(true)
  }

  const createData = (nameOfUser) => {
    switch (nameOfUser) {
      case 'teachers':
        const inputValueTeachers = document.getElementById('teachers')
        if (inputValueTeachers?.value == undefined || inputValueTeachers?.value == '') {
          break;
        }

        let oldTeachers = teachers
        oldTeachers.push(inputValueTeachers?.value)
        setTeachers(oldTeachers)
        break;
      case 'subjects':
        const inputValueSubjects = document.getElementById('subjects')
        if (inputValueSubjects?.value == undefined || inputValueSubjects?.value == '') {
          break;
        }
        let oldsubjects = subjects
        oldsubjects.push(inputValueSubjects?.value)
        setSubjects(oldsubjects)
        break;
      case 'schoolClass':
        const inputValueSchoolClass = document.getElementById('schoolClass')
        if (inputValueSchoolClass?.value == undefined || inputValueSchoolClass?.value == '') {
          break;
        }
        let oldschoolClass = schoolClass
        oldschoolClass.push(inputValueSchoolClass?.value)
        setSchoolClass(oldschoolClass)
        break;
      default:
        alert('Erro ao cadastrar')
        break;
    }
  }

  return (
    <main>
      <header>
        <div id='buttonHeader'>
          <button onClick={showCreation}>Creation</button>
          <button onClick={showSearch}>Search</button>
        </div>
        <div id='titleHeader'>Subjects Schedule</div>
      </header>
      <div className={createMenu ? 'show' : 'hide'}>
        <div id='creationProfiles'>
          {typeOfCreation.map((creation) => {
          return (
            <div key={creation.id} className={'inputsCreation'}>
              Creation of {creation.name}<br/>
              <input type="text" name="" id={creation.name} /><br/>
              <button onClick={_=>createData(creation.name)}>Create</button>
            </div>
          )
          })}
        </div>
        
        <div id={'creationOfTimes'}>
          <div>Creation of Schedule</div>
          <div id={'timeInputs'}>
            <select name="" id="66">
              {teachers.map(teacher => {
                return (
                  <option key={teacher} value={teacher}>{teacher}</option>
                )
              })}
            </select>
            <select name="" id="77">
              
            </select>
            <select name="" id="88">
              
            </select>
            <input type="text" name="" id="" placeholder='Insert number of days'/>
            <button>Creation</button>
          </div>
        </div>
      </div>
      <div className={searchMenu? 'show':'hide'}>a</div>
    </main>
  )
}

export default App
