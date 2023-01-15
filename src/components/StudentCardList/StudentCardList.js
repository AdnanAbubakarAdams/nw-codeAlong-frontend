import StudentCard from '../StudentCard/StudentCard';
import "./StudentCardList.css"

const StudentCardList = ({ studentData }) => {
  console.log(`<StudentList /> rendered!`);
  return (
    <div className="StudentCardList">
      {studentData.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
};

export default StudentCardList;