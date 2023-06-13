import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form as Forms } from "react-bootstrap";
import { useDispatch ,useSelector } from "react-redux";
import { postStudents, updateStudents ,getStudentsbyid } from "../../store/slice/studentSlice";
import { useNavigate } from "react-router-dom";
const StudentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = window.location.href;
  const { studentsGetIdData , isLoading ,status } = useSelector((state) => state.students);
  // const [hobbie,setHobbies] = useState([]);
  // console.log(studentsGetIdData,"studentsGetIdData")
  const searchParams = new URLSearchParams(window.location.search);
  const [updateid,setUpdateid] = useState(searchParams.get("id"));

  const hobbies = ["cricket", "football", "tennics", "music"];
  // console.log(updateid,"idddd");


  useEffect( () => {
    if(updateid){
     axios
           .get(`http://localhost:8000/students/${updateid}`)
           .then((response) => setStudent(response.data[0]));
    }


    
    // if (updateid) {
         // axios
         //   .get(`http://localhost:8000/students/${updateid}`)
         //   .then((response) => setStudent(response.data[0]));
   
         //    const dateString = student.dob;
         //    const date = dateString.split("T")[0];
         //    setStudent({
         //   dob: date,
         // });
      //  }
      //  setStudent(studentsGetIdData);
   
  }, [updateid]);


  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    const { hobbies } = student;

    console.log(`${value} is ${checked}`);
    if (checked) {
      setStudent({
        ...student,
        hobbies: [...hobbies, value],
      });
    }
    else {
      setStudent({
        ...student,
        hobbies: hobbies.filter((e) => e !== value),
      });
    }
  };

  const handleradioButton = (e) =>{
    const { value } = e.target;

    setStudent({
      ...student,
      gender: value
    });
  }

  // const [checkedItems, setCheckedItems] = useState([]);

  const [updateStatus, setUpdateStatus] = useState(url.includes("UpdateData"));

  const [student, setStudent] = useState({
    rollno: "",
    name: "",
    last_name: "",
    city: "",
    dob: "",
    gender: "",
    hobbies: [],
  });
  // console.log("student", student);
  // console.log("checkeditems",checkedItems)

  // const state = useSelector((state) => state);
  // console.log(state,"stattttete")
  // if (state?.studets?.isLoading) {
  //   return <h1>{state.studets.status}</h1>;
  // }
  
  

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(student, "student");
    dispatch(postStudents(student));

    setStudent({
      name: "",
      last_name: "",
      city: "",
      dob: "",
      gender: "",
      hobbies: [],
    });
    if (true) {
      console.log("status,",status);
    }
    navigate("/");
  };

  const handleSubmitupdate = async (e) => {
    e.preventDefault();
    dispatch(updateStudents(student));
    setStudent({
      name: "",
      last_name: "",
      city: "",
      dob: "",
      gender: "",
      hobbies: [],
    });
    navigate("/");
   
  };


  

  

  return (
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
      {updateStatus === false ? <h2>Add Student</h2> : <h2>Update Student</h2>}
      <Forms style={{ width: "80%" }}>
        <Forms.Group className="mb-3" >
          <Forms.Label>Roll No</Forms.Label>

          <Forms.Control
            type="number"
            disabled={updateStatus}
            value={student.rollno || ""}
            onChange={(e) =>
              setStudent({ ...student, rollno: Number(e.target.value) })
            }
            placeholder="Enter Rollno"
          />
        </Forms.Group>

        <Forms.Group className="mb-3" >
          <Forms.Label>Name</Forms.Label>

          <Forms.Control
            type="text"
            value={student.name}
            onChange={(e) => setStudent({ ...student, name: e.target.value })}
            placeholder="Enter Your Name"
          />
        </Forms.Group>

        <Forms.Group className="mb-3">
          <Forms.Label>Last Name</Forms.Label>

          <Forms.Control
            type="text"
            value={student.last_name}
            onChange={(e) =>
              setStudent({ ...student, last_name: e.target.value })
            }
            placeholder="Enter Your Last Name"
          />
        </Forms.Group>

        <Forms.Group className="mb-3">
          <Forms.Label>City</Forms.Label>

          <Forms.Control
            type="text"
            value={student.city}
            onChange={(e) => setStudent({ ...student, city: e.target.value })}
            placeholder="Enter Your City"
          />
        </Forms.Group>

        <Forms.Group className="mb-3" >
          <Forms.Label>Dob</Forms.Label>

          <Forms.Control
            type="date"
            value={student?.dob?.slice(0,10)}
            onChange={(e) => setStudent({ ...student, dob: e.target.value })}
            placeholder="Enter Your Dob"
          />
        </Forms.Group>

        <Forms.Group className="mb-3">
          <Forms.Label>Gender</Forms.Label>

          <div>
            {/* {["radio"].map((type) => (
              <div key={`inline-${type}`}  className="mb-3">
                <Forms.Check
                  inline
                  label="Male"
                  value="Male"
                  name="gender"
                  type={type}
                  checked={student.gender === "Male"}
                  id={`inline-${type}-1`}
                  onChange={(e) => setStudent({ ...student, gender: e.target.value })}
                />
                <Forms.Check
                  inline
                  label="Female"
                  value="Female"
                  name="gender"
                  type={type}
                  checked={student.gender === "Female"}
                  id={`inline-${type}-2`}
                  onChange={(e) => setStudent({ ...student, gender: e.target.value })}
                />
                <Forms.Check
                  inline
                  label="Transgender"
                  value="Transgender"
                  type={type}
                  name="gender"
                  checked={student.gender === "Transgender"}
                  id={`inline-${type}-3`}
                  onChange={(e) => setStudent({ ...student, gender: e.target.value })}
                />
              </div>
            ))} */}
            <input
              type="radio"
              id="contactChoice1"
              name="Male"
              value="Male"
              checked={student.gender === "Male"}
              onChange={(e)=>handleradioButton(e)}
            />
            <label htmlFor="contactChoice1">Male</label>

            <input
              type="radio"
              id="contactChoice2"
              name="Female"
              value="Female"
              checked={student.gender === "Female"}
              onChange={(e)=>handleradioButton(e)}
            />
            <label htmlFor="contactChoice2">Female</label>

            <input
              type="radio"
              id="contactChoice3"
              name="Transgender"
              checked={student.gender === "Transgender"}
              value="Transgender"
              onChange={(e)=>handleradioButton(e)}
            />
            <label htmlFor="contactChoice3">Transgender</label>
          </div>
        </Forms.Group>

        <Forms.Group className="mb-3" >
          <Forms.Label>Hobbies</Forms.Label>

          <div>
            {/* {["checkbox"].map((type) => (
              hobbies.map((items,index)=>(
              <div key={index} className="mb-3">
                <Form.Check
                  inline
                  label={items}
                  value={items}
                  name={items}
                  type={type}
                  onChange={(e) => setStudent({ ...student, hobbies: e.target.value })}
                  id={items}
                />
              </div>
              ))
             
            ))} */}
            <div>
              {hobbies?.map((item, index) => (
                <div key={index} style={{ display: "inline", marginRight: 5 }}>
                  <input
                    type="checkbox"
                    id={index}
                    value={item}
                    checked={student?.hobbies?.includes(item)}
                    onChange={(e)=>handleCheckbox(e)}
                  />{" "}
                  <label htmlFor={index}>{item}</label>
                </div>
              ))}
            </div>
            {/* onChange={(e)=> setStudent(state => {
                    const hobbies=state['hobbies']
                    let newarr=[]

                    if(e.target.checked){
                      hobbies.push(item)
                      state['hobbies']=hobbies
                    return state                    
                    } else {                      
                      hobbies.map(ele => {
                        if(ele!=item) newarr.push(ele)
                        console.log("newarr",newarr);       

                      })               
                      state['hobbies']=newarr
                      return state                    
                    }

                  })} */}
          </div>
        </Forms.Group>

        {updateStatus === false ? (
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              handleSubmitupdate(e);
            }}
          >
            Update
          </Button>
        )}
      </Forms>
    </div>
  );
};

export default StudentForm;
