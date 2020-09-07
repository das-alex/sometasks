import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul className="navigation-links">
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/employees">Сотрудники</Link></li>
            </ul>
          </nav>
        </header>
        <main className="App-main">
          <Switch>
            <Route path="/employees">
              <Employees />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function getEmployees() {
      await fetch('https://reqres.in/api/users?per_page=12')
        .then(res => res.json())
        .then(data => setEmployees(data.data));
    }
    getEmployees();
  }, []);

  function addEmployee(event) {
    const name = prompt('Добавить нового сотрудника. Введите его имя, пожалуйста:');
    if (name !== null && name !== '') {
      setEmployees([...employees, {id: employees.length+1, first_name: name}]);
    }
  }

  function removeEmployee(id) {
    const isRemove = window.confirm('Удалить сотрудника?');
    if (isRemove) {
      const filtered = employees.filter(item => item.id !== id);
      setEmployees(filtered);
    }
  }

  return (
    <div className="employees-block">
      <button onClick={addEmployee}>Добавить сотрудника</button>
      <ul>
        {employees.map(item => (
          <li key={item.id}>
            {item.first_name}‎‎&#10240;
            <button onClick={removeEmployee.bind(this, item.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Home() {
  return <h1>Some home info</h1>
}

export default App;
