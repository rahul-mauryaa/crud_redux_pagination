import React, { useState, useEffect ,useMemo } from "react";
import axios from "axios";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { Button, Form, Table } from "react-bootstrap";
// import StudentForm from "./StudentForm";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getStudents,
  deleteStudents,
  updateStudents,
} from "../../store/slice/studentSlice";

const LIMIT = 2;

const totalPagesCalculator = (total, limit) => {
  const pages = [];
  for (let x = 1; x <= Math.round(parseInt(total) / limit); x++) {
    pages.push(x);
  }

  return pages;
};

const Student = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students,totalstudent, isLoading, status } = useSelector(
    (state) => state.students
  );

  console.log(students,"students")
  
  // const [students, setStudents] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const totalStudents = totalstudent;

  // console.log(students, "students");
  // useEffect(() => {
  //   dispatch(getStudents())
  // }, [dispatch])

  const handeleDelete = (id) => {
    dispatch(deleteStudents(id));
  };

  const handeleUpdate = (id) => {
    navigate(`/UpdateData?id=${id}`);
  };


  useMemo(() => {
    // axios
    //   .get("http://localhost:8000/students", {
    //     params: {
    //       page: activePage,
    //       size: LIMIT,
    //     },
    //   })
    //   .then(({ data }) => {
    //     setStudents(data.records);
    //     settotalStudents(data.total);
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //   });

      dispatch(getStudents({activePage:activePage,LIMIT:LIMIT}))

      // handeleDelete();
      // handeleUpdate();
     
  }, [activePage]);

  
 

  // if (isLoading) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <h1>{status}</h1>
  //     </div>
  //   );
  // }

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 10,
          width: "auto",
        }}
      >
        <div
          style={{
            height: "auto",
            width: "80%",
            display: "flex",
            justifyContent: "end",
            marginTop: 15,
          }}
        >
          <Link to="/AddData">
            <Button variant="primary">Add Data</Button>
          </Link>
        </div>
        {/* <StudentForm /> */}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "auto",
          marginTop: 10,
          paddingBottom: 25,
        }}
      >
        <h2>Student List</h2>
        <Table striped bordered hover style={{ width: "80%" }}>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
              <th>DOb</th>
              <th>Gender</th>
              <th>Hobbies</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students &&
              students?.map((items, i) => {
                // const date = items.dob;
                // const newdob = date.split("T")[0]

                return (
                  <tr key={i}>
                    <td>{items?.rollno}</td>
                    <td>{items?.name}</td>
                    <td>{items?.last_name}</td>
                    <td>{items?.city}</td>
                    <td>{items?.dob?.slice(0, 10)}</td>
                    <td>{items?.gender}</td>
                    <td>{items?.hobbies?.map((item) => item + ",")}</td>
                    <td>
                      <span
                        onClick={() => handeleDelete(items.rollno)}
                        style={{ cursor: "pointer", marginRight: 10 }}
                      >
                        <FiTrash2 />
                      </span>
                      <span
                        onClick={() => handeleUpdate(items.rollno)}
                        style={{ cursor: "pointer" }}
                      >
                        <FiEdit />
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {activePage !== 1 && (
              <li
                className="page-item"
                onClick={() => setActivePage(activePage - 1)}
              >
                <a className="page-link" href="javascript:void(null)">
                  Previous
                </a>
              </li>
            )}
            {totalPagesCalculator(totalStudents, LIMIT).map((page) => (
              <li
                className={`page-item ${activePage === page ? "active" : ""}`}
                key={page}
              >
                <a
                  className="page-link"
                  href="javascript:void(null)"
                  onClick={() => setActivePage(page)}
                >
                  {page}
                </a>
              </li>
            ))}
            {activePage !== totalPagesCalculator(totalStudents, LIMIT).length && (
              <li
                className="page-item"
                onClick={() => setActivePage(activePage + 1)}
              >
                <a className="page-link" href="javascript:void(null)">
                  Next
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Student;
