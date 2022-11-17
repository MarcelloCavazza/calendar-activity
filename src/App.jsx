import { useState } from "react";

import "./App.css";

function App() {
  const typeOfCreation = [
    {
      id: 0,
      name: "teachers",
    },
    {
      id: 1,
      name: "subjects",
    },
    {
      id: 2,
      name: "schoolClass",
    },
  ];
  const [index, setIndex] = useState(0);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [schoolClass, setSchoolClass] = useState([]);

  const [schedules, setSchedules] = useState([]);

  const [createMenu, setCreateMenu] = useState(true);
  const [searchMenu, setSearchMenu] = useState(false);

  const showCreation = () => {
    setCreateMenu(true);
    setSearchMenu(false);
  };

  const showSearch = () => {
    setCreateMenu(false);
    setSearchMenu(true);
  };

  const createData = (nameOfUser) => {
    switch (nameOfUser) {
      case "teachers":
        const inputValueTeachers = document.getElementById("teachers");
        if (
          inputValueTeachers?.value == undefined ||
          inputValueTeachers?.value == ""
        ) {
          break;
        }
        setIndex(index + 1);
        let oldTeachers = [...teachers];
        oldTeachers.push({ value: inputValueTeachers?.value, id: index });
        setTeachers(oldTeachers);
        break;
      case "subjects":
        const inputValueSubjects = document.getElementById("subjects");
        if (
          inputValueSubjects?.value == undefined ||
          inputValueSubjects?.value == ""
        ) {
          break;
        }

        let oldsubjects = [...subjects];
        setIndex(index + 1);
        oldsubjects.push({ value: inputValueSubjects?.value, id: index });
        setSubjects(oldsubjects);
        break;
      case "schoolClass":
        const inputValueSchoolClass = document.getElementById("schoolClass");
        if (
          inputValueSchoolClass?.value == undefined ||
          inputValueSchoolClass?.value == ""
        ) {
          break;
        }

        let oldschoolClass = [...schoolClass];
        setIndex(index + 1);
        oldschoolClass.push({ value: inputValueSchoolClass?.value, id: index });
        setSchoolClass(oldschoolClass);
        break;
      default:
        alert("Error to create");
        break;
    }
  };

  const createAgenda = () => {
    let teacherSelect = document.getElementById("teacher");
    let subjectSelect = document.getElementById("subject");
    let clasSSelect = document.getElementById("clasS");
    let numberOfDays = document.getElementById("numberOfDays").value;

    let textteacherSelect =
      teacherSelect.options[teacherSelect.selectedIndex].text;
    let textsubjectSelect =
      subjectSelect.options[subjectSelect.selectedIndex].text;
    let textclasSSelect = clasSSelect.options[clasSSelect.selectedIndex].text;

    if (
      textteacherSelect == null ||
      textsubjectSelect == null ||
      textclasSSelect == null ||
      numberOfDays <= 0
    ) {
      alert("Error to create Schedule!");
      return false;
    }

    let textteacherId =
      teacherSelect.options[teacherSelect.selectedIndex].value;
    let fastTest = howManyDays(numberOfDays);
    for (let schedule of schedules) {
      if (
        schedule.teacherId + "" == textteacherId &&
        fastTest.finalTime <= schedule.dataToFinish
      ) {
        alert("Teacher already has classes");
        return false;
      }
    }
    let newStartDate = null;
    for (let schedule of schedules) {
      if (schedule.teacherId + "" == textteacherId) {
        newStartDate = schedule.dataToFinish;
      }
    }
    let reponse = null;
    if (newStartDate != null) {
      reponse = howManyDays(numberOfDays, newStartDate);
    } else {
      reponse = howManyDays(numberOfDays);
    }

    setIndex(index + 1);
    setSchedules([
      ...schedules,
      {
        id: index,
        teacherId: textteacherId,
        teacher: textteacherSelect,
        subject: textsubjectSelect,
        class: textclasSSelect,
        dataToFinish: reponse.finalTime,
        startDate:
          newStartDate != null ? newStartDate : reponse.formatedTOdaysDate,
      },
    ]);
  };

  const howManyDays = (numberOfDays, futureDate = false) => {
    {
      let date = null;
      if (futureDate) {
        let preSelectedDate = futureDate.replace("/", "-");
        preSelectedDate = preSelectedDate.split("");
        preSelectedDate = preSelectedDate.reverse();
        preSelectedDate = preSelectedDate.join("");
        console.log(preSelectedDate);
        date = new Date(preSelectedDate);
      } else {
        date = new Date();
      }
      const todaysDate = date.getTime();
      const formatedTOdaysDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      //only weekDays
      let finalDate = todaysDate;
      for (let index = 0; index < numberOfDays; index++) {
        const milisecondsPerDay = 86400000;
        finalDate += milisecondsPerDay;
        let dateTemp = new Date(finalDate);
        if (dateTemp.getDay() == 0 || dateTemp.getDay() == 6) {
          numberOfDays++;
        }
      }
      const newTime = new Date(finalDate);

      const finalTime = `${newTime.getDate()}/${
        newTime.getMonth() + 1
      }/${newTime.getFullYear()}`;
      return { finalTime, formatedTOdaysDate };
    }
  };

  return (
    <main>
      <header>
        <div id="buttonHeader">
          <button onClick={showCreation}>Creation</button>
          <button onClick={showSearch}>Search</button>
        </div>
        <div id="titleHeader">Subjects Schedule</div>
      </header>
      <div className={createMenu ? "show" : "hide"}>
        <div id="creationProfiles">
          {typeOfCreation.map((creation) => {
            return (
              <div key={creation.id} className={"inputsCreation"}>
                Creation of {creation.name}
                <br />
                <input type="text" name="" id={creation.name} />
                <br />
                <button onClick={(_) => createData(creation.name)}>
                  Create
                </button>
              </div>
            );
          })}
        </div>

        <div id={"creationOfTimes"}>
          <div>Creation of Schedule</div>
          <div id={"timeInputs"}>
            <select name="" id="teacher">
              <option value="null">Select a teacher</option>
              {teachers.map((teacher) => {
                return (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.value}
                  </option>
                );
              })}
            </select>
            <select name="" id="subject">
              <option value="null">Select a subject</option>
              {subjects.map((subject) => {
                return (
                  <option key={subject.id} value={subject.value}>
                    {subject.value}
                  </option>
                );
              })}
            </select>
            <select name="" id="clasS">
              <option value="null">Select a Class</option>
              {schoolClass.map((clasS) => {
                return (
                  <option key={clasS.id} value={clasS.value}>
                    {clasS.value}
                  </option>
                );
              })}
            </select>
            <input
              type="number"
              id="numberOfDays"
              placeholder="Insert number of days"
            />
            <button onClick={createAgenda}>Creation</button>
          </div>
        </div>
      </div>
      <div className={searchMenu ? "show" : "hide"}>
        <table id="dataSchool">
          <thead>
            <tr>
              <td>Teacher</td>
              <td>Subject</td>
              <td>Class</td>
              <td>Start Date</td>
              <td>Finish Date</td>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => {
              return (
                <tr key={schedule.id}>
                  <td>{schedule.teacher}</td>
                  <td>{schedule.subject}</td>
                  <td>{schedule.class}</td>
                  <td>{schedule.startDate}</td>
                  <td>{schedule.dataToFinish}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default App;
