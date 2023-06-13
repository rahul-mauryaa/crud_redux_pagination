import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postStudents = createAsyncThunk(
  "studentsList/postStudents",
  async (student) => {
    console.log(student, "poststudent");
    // let response = await fetch("http://localhost:8000/students");
    // let json = await response.json();
    // // console.log(json);
    // return json;
    const json = await axios
      .post("http://localhost:8000/students", {
        rollno: student.rollno,
        name: student.name,
        last_name: student.last_name,
        city: student.city,
        dob: student.dob,
        gender: student.gender,
        hobbies: student.hobbies,
      })
      .then((resp) => resp.data);
    return json;
  }
);

export const updateStudents = createAsyncThunk(
  "studentsList/updateStudents",
  async (student) => {
    // console.log(student,"studentssssssss")
    const json = await axios
      .patch(`http://localhost:8000/students/${student.rollno}`, {
        rollno: student.rollno,
        name: student.name,
        last_name: student.last_name,
        city: student.city,
        dob: student.dob,
        gender: student.gender,
        hobbies: student.hobbies,
      })
      .then((resp) => resp.data);
    return json;
  }
);

export const getStudents = createAsyncThunk(
  "studentsList/getStudents",
  async ({activePage,LIMIT}) => {
    // let response = await fetch("http://localhost:8000/students");
    // let json = await response.json();
    // // console.log(json);
    // return json;


    // const json = await axios
    //   .get("http://localhost:8000/students")
    //   .then((resp) => resp.data);
    // return json;

   const json = await axios
      .get("http://localhost:8000/students", {
        params: {
          page: activePage,
          size: LIMIT,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
      });

      return json;
  }
);


export const getStudentsbyid = createAsyncThunk(
  "studentsList/getStudentsbyid",
  async (updateid) => {
    // let response = await fetch("http://localhost:8000/students");
    // let json = await response.json();
    // // console.log(json);
    // return json;
    const json = await  axios
    .get(`http://localhost:8000/students/${updateid}`)
    .then((response) =>response.data[0]);

     
    return json;
  }
);



export const deleteStudents = createAsyncThunk(
  "studentsList/deleteStudents",
  async (id) => {
    const json = await axios
      .delete(`http://localhost:8000/students/${id}`)
      .then((resp) => resp.data);
    return json;
  }
);

const studentSlice = createSlice({
  name: "studentsList",
  initialState: {
    students: [],
    studentsGetIdData:[],
    totalstudent:0,
    status: null,
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getStudents.pending, (state, action) => {
      state.isLoading = true;
      state.status = "Fetching students. Please wait a moment...";
    });
    builder.addCase(getStudents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.students = action.payload.records;
      state.totalstudent = action.payload.total;
    });
    builder.addCase(getStudents.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      state.status = "Failed to Load data...";
    });

    builder.addCase(deleteStudents.pending, (state, action) => {
      state.isLoading = true;
      state.status = "Delete students. Please wait a moment...";
    });
    builder.addCase(deleteStudents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.students = state.students.filter(
        (items) => items.rollno !== action.payload.rollno
      );
    });
    builder.addCase(deleteStudents.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      state.status = "Failed to delete data...";
    });

    builder.addCase(postStudents.pending, (state, action) => {
      state.isLoading = true;
      state.status = "Post students. Please wait a moment...";
    });
    builder.addCase(postStudents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.students = [...state.students, action.payload];
    });
    builder.addCase(postStudents.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      state.status = "Failed to Post data...";
    });

    builder.addCase(updateStudents.pending, (state, action) => {
      state.isLoading = true;
      state.status = "Update students. Please wait a moment...";
    });
    builder.addCase(updateStudents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.students = state.students.filter(
        (items) => items.rollno !== action.payload.rollno
      );
      state.students.push(action.payload);
    });
    builder.addCase(updateStudents.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      state.status = "Failed to Update data...";
    });


    builder.addCase(getStudentsbyid.fulfilled, (state, action) => {
      state.isLoading = false;
      state.studentsGetIdData = action.payload;
    });

  },
  // extraReducers: {
  //   [getStudents.fulfilled]: (state, action) => {
  //     state.students = action.payload;
  //     state.status = null;
  //   },
  //   [getStudents.pending]: (state) => {
  //     state.status = "Fetching students. Please wait a moment...";
  //   },
  //   [getStudents.rejected]: (state) => {
  //     state.status = "Failed to fetch data...";
  //   },
  //   [deleteStudents.fulfilled]: (state, action) => {
  //     console.log(action.payload,"action")
  //     state.students = state.students.filter((items)=>items.rollno !== action.payload.rollno);
  //     state.status = null;
  //   },
  //   [deleteStudents.pending]: (state) => {
  //     state.status = "Delete students. Please wait a moment...";
  //   },
  //   [deleteStudents.rejected]: (state) => {
  //     state.status = "Failed to delete data...";
  //   },
  //   [postStudents.fulfilled]: (state, action) => {

  //     state.students = [...state.students,action.payload];
  //     state.status = null;
  //   },
  //   [postStudents.pending]: (state) => {
  //     state.status = "Post students. Please wait a moment...";
  //   },
  //   [postStudents.rejected]: (state) => {
  //     state.status = "Failed to post data...";
  //   },
  //   [updateStudents.fulfilled]: (state, action) => {
  //     //  let updateData =state.students.filter((items)=>items.rollno !== action.payload.rollno);
  //      state.students = state.students.filter((items)=>items.rollno !== action.payload.rollno);
  //      state.students.push(action.payload);

  //     //  console.log(updateData,"updateDatastudents")

  //   //  console.log(action.payload,"action updatestudent")
  //     // state.students = [...state.students,action.payload];
  //     // state.status = null;
  //   },

  // }
});

export default studentSlice.reducer;
