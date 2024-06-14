import { useEffect, useState } from "react"
import { variables } from "./variables"
import axios from 'axios'

export const Employee=()=>{
    const [departments,setDepartments]=useState([]);
    const [employees,setEmployees]=useState([]);

    const [modalTitle,setmodalTitle]=useState("");

    const [employeeName,setEmployeeName]=useState("");
    const [employeeId,setemployeeId]=useState(0);
    const [dateOfJoining,setDateOfJoining]=useState(0);
    const [photoFileName,setPhotoFileName]=useState(0);
    const [department,setDepartment]=useState(0);

    const deleteRequest=(id)=>{
       if(window.confirm("Sure?")){
            axios.delete(`${variables.API_URL}employee/${id}`)
            .then((response)=>{
                alert(response.data);
                getAllEmployeeRequest();
            })
            .catch((err)=>{alert(err)});
        }
    }
    const createRequest=()=>{
        let data={
            Department:department,
            DateOfJoining:dateOfJoining,
            PhotoFileName:photoFileName,
            EmployeeName:employeeName
        }
        axios.post(`${variables.API_URL}employee`,data)
        .then((response)=>{
            alert(response.data);
            getAllEmployeeRequest();
         })
         .catch((err)=>{alert(err)});
    }
    const updateRequest=()=>{
        let data={
            Department:department,
            DateOfJoining:dateOfJoining,
            PhotoFileName:photoFileName,
            EmployeeId:employeeId,
            EmployeeName:employeeName
        }
        axios.put(`${variables.API_URL}employee`,data)
        .then((response)=>{
            alert(response.data);
            getAllEmployeeRequest();
            
         })
         .catch((err)=>{alert(err)});
    }
    const addEmployeeHandler=()=>{
        setmodalTitle("Add emp!")
        setDepartment("")
        setDateOfJoining("")
        setPhotoFileName("anonymous.png")
        setemployeeId(0)
        setEmployeeName("")
    }
    const editEmployeeHandler=(emp)=>{
        setmodalTitle("edit emp!")
        setDepartment(emp.Department)
        setDateOfJoining(emp.DateOfJoining)
        setPhotoFileName(emp.PhotoFileName)
        setemployeeId(emp.EmployeeId)
        setEmployeeName(emp.EmployeeName)
    }

    const getAllDepartmentsRequest=()=>{
        axios.get(`${variables.API_URL}department`)
        .then((response)=>{
            setDepartments(response.data);
         });
    }
    const getAllEmployeeRequest=()=>{
        axios.get(`${variables.API_URL}employee`)
        .then((response)=>{
            setEmployees(response.data);
         });
    }
    const imageUpload=(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("file",e.target.files[0],e.target.files[0].name);
        axios.post(`${variables.API_URL}employee/savefile`,formData)
        .then((response)=>{
    
            setPhotoFileName(response.data);

         })
         .catch((err)=>{alert(err)});
    
        
    }
    useEffect(()=>{
        getAllEmployeeRequest();
        getAllDepartmentsRequest();
     },[]);
    return(<>
        <h1>This is Department page</h1>
        <button type="button" className="btn btn-primary m-2 float-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={addEmployeeHandler}>Add Employee</button>


        <table>
            <thead>
                <tr>
                    <th>EmployeeId</th>
                    <th>EmployeeName</th>
                    <th>Department</th>
                    <th>DOJ</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {employees.map(emp=>{return (
                <tr>
                    <td>{emp.EmployeeId}</td>
                    <td>{emp.EmployeeName}</td>
                    <td>{emp.Department}</td>
                    <td>{emp.DateOfJoining}</td>
                    <td>
                        <button type="button" className="btn btn-light mr-1"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                         onClick={()=>{return editEmployeeHandler(emp)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                        </button>
                        <button type="button" className="btn btn-light mr-1"
                        onClick={()=>{return deleteRequest(emp.EmployeeId)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                            </svg>
                        </button>
                    </td>
                </tr>)})}
            </tbody>
        </table>
        <div className="modal fade " id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">

                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title"> {modalTitle}</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            
                            <div className="modal-body">
                                <div className="d-flex flex-row bd-highlight mb-3">
                                    <div className="p-2 w-50 bd-highlight">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">EmpName</span>
                                            <input type="text" className="form-control" value={employeeName} onChange={(event)=>setEmployeeName(event.target.value)}/> 
                                        </div>
                                
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Department</span>
                                            <select className="form-select" value={department} onChange={(event)=>setDepartment(event.target.value)}>
                                                {departments.map(dep=><option key={dep.DepartmentId}>{dep.DepartmentName}</option>)}
                                            </select>

                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">DOJ</span>
                                            <input type="date" className="form-control" value={dateOfJoining} onChange={(event)=>setDateOfJoining(event.target.value)}/> 
                                        </div>
                                    </div>
                                    <div className="p-2 w-50 bd-highlight">
                                        <img width="250px" height="250px"src={variables.PHOTO_STORAGE_URL+photoFileName}/>
                                        <input className="m-2" type="file" onChange={imageUpload}/>
                                    </div>

                               

                                </div>
                                 {employeeId===0?
                                <button type="button" className="btn btn-primary float-start" onClick={createRequest}>Create</button>:
                                null
                                }
                                {employeeId!==0?
                                <button type="button" className="btn btn-primary float-start" onClick={updateRequest}>Update</button>:
                                null
                                }
                                
                            </div>
                        </div>

                        

                    </div>
        </div>

        </>
    )
}