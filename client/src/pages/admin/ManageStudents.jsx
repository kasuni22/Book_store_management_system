import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/ManageStudents.css";
import AdminNavbar from "../../components/AdminNavbar";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/auth");
        setStudents(res.data);
      } catch (err) {
        console.log("Error fetching students:", err.message);
      }
    };
    fetchStudents();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="admin-dashboard-container">
        <h1>👩‍🎓 Manage Students</h1>
        <p>View all registered student accounts</p>

        <div className="student-list">
          {students.length === 0 ? (
            <p>No students found.</p>
          ) : (
            <table className="student-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {students.map((stu) => (
                  <tr key={stu._id}>
                    <td>{stu.firstName} {stu.lastName}</td>
                    <td>{stu.email}</td>
                    <td>{stu.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageStudents;
