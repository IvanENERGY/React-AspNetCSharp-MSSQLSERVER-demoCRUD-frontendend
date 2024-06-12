import { useEffect, useState } from "react"
import { variables } from "./variables"
import axios from 'axios'
export const Department=()=>{
    const [departments,setDepartments]=useState([]);

    const [modalTitle,setmodalTitle]=useState("");
    const [deptName,setDeptName]=useState("");
    const [deptId,setDeptId]=useState(0);

    const [deptIdFilter,setDeptIdFilter]=useState("");
    const [deptNameFilter,setDeptNameFilter]=useState("");
    const [deptsWithoutFilter,setdeptsWithoutFilter]=useState([]);


    useEffect(()=>{
        //      var deptIdFilterCopy=deptIdFilter;
        // console.log(`deptIdfilter is ${deptIdFilter}`);
        // var deptNameFilterCopy=deptNameFilter;
        
        var filteredData= deptsWithoutFilter.filter(
            function (el){
                return el.DepartmentId.toString().toLowerCase().includes(
                    deptIdFilter.toString().trim().toLowerCase()
                )&&
                el.DepartmentName.toString().toLowerCase().includes(
                    deptNameFilter.toString().trim().toLowerCase()
                )
            }
        )
        setDepartments(filteredData);
    
        
    },[deptIdFilter,deptNameFilter])
  
    const sortResult=(prop,asc)=>{
        var sortedData=[...deptsWithoutFilter].sort(function(a,b){  //Must use [... ]generate copy of old array; otherwise it would just be the same array and setDepartment NOT working
            if(asc){
        
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });
        console.log(sortedData);
        setDepartments(sortedData);
    }
    const changeDepartmentIdFilter=(e)=>{
        setDeptIdFilter(e.target.value)
      
    }
    const changeDepartmentNameFilter=(e)=>{
        setDeptNameFilter(e.target.value);
      
    }
    const deleteRequest=(dept)=>{
       if(window.confirm("Sure?")){
            axios.delete(`${variables.API_URL}department/${dept.DepartmentId}`)
            .then((response)=>{
                alert(response.data);
                getAllDepartmentsRequest();
            })
            .catch((err)=>{alert(err)});
        }
    }
    const createRequest=()=>{
        let data={
            DepartmentName:deptName
        }
        axios.post(`${variables.API_URL}department`,data)
        .then((response)=>{
            alert(response.data);
            getAllDepartmentsRequest();
         })
         .catch((err)=>{alert(err)});
    }
    const updateRequest=()=>{
        let data={
            DepartmentName:deptName,
            DepartmentId:deptId
        }
        axios.put(`${variables.API_URL}department`,data)
        .then((response)=>{
            alert(response.data);
            getAllDepartmentsRequest();
         })
         .catch((err)=>{alert(err)});
    }
    const addDeptHandler=()=>{
        setmodalTitle("Add Department!")
        setDeptName("")
        setDeptId(0)
    }
    const editDeptHandler=(dept)=>{
        setmodalTitle("Edit Department!")
        setDeptName(dept.DepartmentName)
        setDeptId(dept.DepartmentId)
    }

    const getAllDepartmentsRequest=()=>{
        axios.get(`${variables.API_URL}department`)
        .then((response)=>{
            setDepartments(response.data);
            setdeptsWithoutFilter(response.data);
         });
    }
    useEffect(()=>{
        getAllDepartmentsRequest();
     },[]); 
    return(<>
        <h1>This is Department page</h1>
        <button type="button" className="btn btn-primary m-2 float-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={addDeptHandler}>Add department</button>


        <table>
            <thead>
                <tr>
                    <th>
                        <div className="d-flex flex-row">

                       
                                <input className="form-control m-2" onChange={changeDepartmentIdFilter} placeholder="IdFilter"/>
                                <button type="button" className="btn btn-light" onClick={()=>sortResult('DepartmentId',true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0"/>
                                    </svg>

                                </button>
                                <button type="button" className="btn btn-light" onClick={()=>sortResult('DepartmentId',false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0"/>
                                    </svg>

                                </button>
                         </div>
                         DepartmentId
                    </th>
                    <th>
                        <div className="d-flex flex-row">

                            <input className="form-control m-2" onChange={changeDepartmentNameFilter} placeholder="NameFilter"/>
                            <button type="button" className="btn btn-light" onClick={()=>sortResult('DepartmentName',true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0"/>
                                    </svg>

                                </button>
                                <button type="button" className="btn btn-light" onClick={()=>sortResult('DepartmentName',false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0"/>
                                    </svg>

                                </button>
                        </div>
                        DepartmentName
                    </th>
                    <th>
                        Options
                    </th>
                </tr>
            </thead>
            <tbody>
                {departments.map(dept=>{return (
                <tr>
                    <td>{dept.DepartmentId}</td>
                    <td>{dept.DepartmentName}</td>
                    <td>
                        <button type="button" className="btn btn-light mr-1"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                         onClick={()=>{return editDeptHandler(dept)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                        </button>
                        <button type="button" className="btn btn-light mr-1"
                        onClick={()=>{return deleteRequest(dept)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                            </svg>
                        </button>
                    </td>
                </tr>)})}
            </tbody>
        </table>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">

                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title"> {modalTitle}</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">DepartmentName</span>
                                    <input type="text" className="form-control" value={deptName} onChange={(event)=>setDeptName(event.target.value)}/>

                                </div>
                                {deptId===0?
                                <button type="button" className="btn btn-primary float-start" onClick={createRequest}>Create</button>:
                                null
                                }
                                {deptId!==0?
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