React Part

<hr>
<h1>Learning Summary on React</h1>

<h2>Bootstrap Setup</h2>
<pre>
Inside head
<p>-------------------------------------------------------------</p>
&lt;link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"


last line of body
<p>-------------------------------------------------------------</p>
&lt;script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous">&lt;/script>
</pre>
<h2>Bootstrap Icon</h2>
<a href="https://icons.getbootstrap.com/">https://icons.getbootstrap.com/</a>
<h2>Bootstrap Modal</h2>
<h3>Template</h3>
<pre>
&lt;div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
    &lt;div className="modal-dialog modal-lg modal-dialog-centered">
        &lt;div className="modal-content">
            &lt;div className="modal-header">
                &lt;h4 className="modal-title"> {modalTitle}&lt;/h4>
                &lt;button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">&lt;/button>
            &lt;/div>
            &lt;div className="modal-body">
                &lt;p>Some Content &lt;/p>                      
            &lt;/div>
        &lt;/div>
    &lt;/div>
&lt;/div>
</pre>
<h3>Trigger</h3>
<pre>
&lt;button type="button" className="btn btn-primary m-2 float-end"
data-bs-toggle="modal"
data-bs-target="#exampleModal"
onClick={addEmployeeHandler}>Add Employee&lt;/button>
//we setmodalTitle in addEmployeeHandler
</pre>
<h2>Filtering Displayed List</h2>
<ol>
<li>Set up state for input box change </li>
<pre>
const [deptNameFilter,setDeptNameFilter]=useState("");
</pre>
<li>Set up state for original list data (forever unchange)</li>
<pre>
const [departmentOriginal,setdepartmentOriginal]=useState([]);
</pre>
<li>Set up input box for filtering</li>
<pre>
&lt;input className="form-control m-2" onChange={(e)=>setDeptNameFilter(e.target.value)} placeholder="NameFilter"/>
</pre>

<li>Set up Filtering watcher</li>
<pre>
    useEffect(()=>{
        var filteredList= departmentOriginal.filter(
            function (el){ //el in original_list ->filtered ->filteredList
                return el.DepartmentId.toString().toLowerCase().includes(deptIdFilter.toString().trim().toLowerCase())&&
                        el.DepartmentName.toString().toLowerCase().includes(deptNameFilter.toString().trim().toLowerCase())
            }
        )
        setDepartmentOnDisplay(filteredList);
    },[deptIdFilter,deptNameFilter])
</pre>
</ol>
<h2>Sorting Displayed List</h2>
<ol>
<li>Setup asc+dsc button for sorting one props</li>
<pre>
&lt;button type="button" className="btn btn-light" onClick={()=>sortResult('DepartmentId',true)}>
    &lt;svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
    &lt;path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0"/>
    &lt;/svg>
&lt;/button>

&lt;button type="button" className="btn btn-light" onClick={()=>sortResult('DepartmentId',false)}>
    &lt;svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
    &lt;path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0"/>
    &lt;/svg>
&lt;/button>
</pre>
<li>Setup Sorting function</li>
<pre>
const sortResult=(prop,asc)=>{
    var sortedData=[...departmentOriginal].sort(function(a,b){  //Must use [... ]generate copy of old array; otherwise it would just be the same array and setDepartment NOT working
        if(asc){
            return (a[prop]>b[prop])?1:((a[prop]< b[prop])?-1:0)}
            else{
            return (b[prop]>a[prop])?1:((b[prop]< a[prop])?-1:0);
        }
    });
    setDepartmentOnDisplay(sortedData);
}
</pre>
</ol>
<h2>
File saving 
</h2>
<ol>
<pre>
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
</pre>
<li>Fileonchange</li>
<li>call saveFile Api (Uploading)</li>
<li>server respond filepath</li>
<li>frontend set filepath state</li>
<li> img tag get source from filepath state</li>
<li> imgview updated accordingly</li>
<li> use the refreshed filepath state for db record update/create (if needed)</li>
</ol>
<p>Inside the route for /api/Employee in asp.net:</p>
<pre>
        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream= new FileStream(physicalPath,FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }
                return new JsonResult(filename);
            }
            catch (Exception ex)
            {
                return new JsonResult("annoymous.png");
            }
        }
</pre>
<h2>Populate List of departments into Spinner</h2>
<ol>
<li>Set states for departments and the selection</li>
<pre>
const [departments,setDepartments]=useState([]);
const [department,setDepartment]=useState(0);
</pre>
<li>Set up spinner</li>

<pre>
&lt;select className="form-select" value={department} onChange={(event)=>setDepartment(event.target.value)}>
{departments.map(dep=>&lt;option key={dep.DepartmentId}>{dep.DepartmentName}&lt;/option>)}
&lt;/select>
</pre>
</ol>





