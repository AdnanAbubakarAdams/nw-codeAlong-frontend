import { useEffect, useState } from 'react';
import './App.css';
import StudentCardList from './components/StudentCardList/StudentCardList';
import Loading from './components/Loading/Loading';

// TODO: Get this value from .env
const API_URL = 'http://localhost:1991';

function App() {
  const [studentData, setStudentData] = useState([]);

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('<App /> useEffect() fired');
    async function fetchData() {
      // You can await here
      setLoading(true)
      const response = await fetch(`${API_URL}/students`);
      const json = await response.json();
      console.log('<App /> useEffect() fetched data', json);
      const { data } = json;
      setStudentData(data);
      setLoading(false)
    }
    fetchData();
  }, []);

  console.log(`<App /> rendered! loading= ${loading} num students = ${studentData.length}`);
  return (
    <div className="App">
      {loading ? <Loading/> : <StudentCardList studentData={studentData} />}
      
    </div>
  );
}

export default App;