import { useEffect, useState } from 'react';
import './App.css';
import StudentCardList from './components/StudentCardList/StudentCardList';
import Loading from './components/Loading/Loading';
import Error from './components/Error/Error';
import Container from './components/Container/Container';

// TODO: Get this value from .env
const API_URL = 'http://localhost:1991';

function App() {
  const [studentData, setStudentData] = useState([]);

  const [loading, setLoading] = useState(true)
  
  const [error, setError] = useState("");

  useEffect(() => {
    console.log('<App /> useEffect() fired');
    async function fetchData() {
      try {
        // Remove any errors from previous attempts
        setError("");
      // You can await here
      setLoading(true)
      const response = await fetch(`${API_URL}/students`);
      const json = await response.json();
      console.log('<App /> useEffect() fetched data', json);
      const { data, error } = json;
      if (response.ok) {
        // handle success
        setStudentData(data);
        // stop showing the user the loading UI
        setLoading(false);
      } else {
        // handle error
        setError(error);
        setLoading(false);
      }
  } catch (error) {
    console.log(`<App /> useEffect error: ${error.message}`);
        setError(error.message);
        setLoading(false);
    }     
    }
    fetchData();
  }, []);


   /* If loading, render <Loading />
    else if error, render <Error error={error} />
    else render <StudentList />
  */
 const renderContent = () => {
  if (loading) {
    return <Loading />;
  } else if (error) {
    return <Error error={error}/>
  } else {
    return <StudentCardList studentData={studentData} />
  }
 }
  console.log(`<App /> rendered! loading= ${loading} num students = ${studentData.length}`);
  return (
    <div className="App">
      <Container center={Boolean(error || loading)}>
        {renderContent()}
        </Container>
    </div>
  );
}

export default App;