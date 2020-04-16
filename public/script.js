var result = (function (){
   data= gettodos()
}());

async function gettodos(){
    const resp = await fetch('/todos', { method: 'GET'})
    let todos = await resp.json()
    todos.sort((a,b)=>
    a.status-b.status
    );
    view(todos);
    return todos
}

function view(todos){
    var cols=[];
    for(var i=0;i<todos.length;i++){
        for(var k in todos[i]){
            if(k=='createdAt'||k=='updatedAt'||k=='id'){
            }
            else if(cols.indexOf(k)=== -1){
                cols.push(k);
            }
        }
    }
    var table = document.createElement("table");
    var tr = table.insertRow(-1);
    for(var i=0;i<cols.length;i++){
        var theader = document.createElement("th");
        theader.innerHTML=cols[i];
        tr.appendChild(theader);
    }
    for(var i=0;i<todos.length;i++){
        trow=table.insertRow(-1);
        for(var j=0;j<cols.length;j++){
            var cell = trow.insertCell(-1);
            if(cols[j]=='id'){
            }
            else if(cols[j]=='status'){
                var chk = document.createElement('input');
                const val=todos[i][cols[j]]
                chk.setAttribute('type', 'checkbox');
                chk.setAttribute('value', todos[i][cols[j]]);
                chk.setAttribute('id', 'status' + todos[i].id);
                if(val==true){
                    chk.setAttribute('checked', '');   
                }
                cell.appendChild(chk);
            }
            else if(cols[j]=='Notes'){
                cell.innerHTML='<textarea class="form-control" rows="5" cols="25" id="Notes'+todos[i].id+'" >'+todos[i][cols[j]]+'</textarea>'
            }
            else if(cols[j]=='Priority'){
               var id='Priority' + todos[i].id;
               cell.innerHTML='<select id="'+id+'"><option value="Low">Low</option><option value="Medium">Medium</option><option value="High">High</option><option value="'+todos[i][cols[j]]+'" selected>'+todos[i][cols[j]]+'</option></select>';
            }
            else if(cols[j]=='date'){
                var da = new Date(todos[i][cols[j]]);
                var d=da.getDate().toString().padStart(2, "0");
                var m=(da.getMonth()+ 1).toString().padStart(2, "0");
                var y=da.getFullYear();
                var up = y+'-'+m+'-'+d;
                var dt='date' + todos[i].id;
                cell.innerHTML='<input type="date" class="form-control" id="'+dt+'" value="'+up+'">';
            }
            else{cell.innerHTML=todos[i][cols[j]];}
        }
        var btNew = document.createElement('input');
        btNew.setAttribute('type', 'button');
        btNew.setAttribute('value', 'Apply Changes');
        btNew.setAttribute('class', 'btn btn-success btn-lg ');
        btNew.setAttribute('id', 'update' + todos[i].id);
        btNew.setAttribute('onclick', 'update('+todos[i].id+')');
        trow.appendChild(btNew);
       
    }
    var e1=document.getElementById("table");
    e1.innerHTML="";
    e1.appendChild(table);
}

function addmethod(){
    let task = document.getElementById('task').value;
    let Description = document.getElementById('Description').value;
    let date = document.getElementById('date').value;
    let Notes = document.getElementById('Notes').value;
    let Priority = document.getElementById('Priority').value;
    let status = false;
    if(date==''){
        const tomorrow = new Date(new Date().getTime());
        tomorrow.setDate(tomorrow.getDate() + 1)
        date=tomorrow;
    }
    addnewtodojson(task,Description,date,Notes,Priority,status)
    alert("New task added successfully");
}

function addnewtodojson(task,Description,date,Notes,Priority,status){
    const resp =  fetch('/todos',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task,Description,date,Notes,Priority,status})
    })
}

function update(ii){
    var id=ii;
    var Priority=document.getElementById("Priority"+ii).value;
    var date=document.getElementById("date"+ii).value;
    var Notes=document.getElementById("Notes"+ii).value;
    var status=document.getElementById("status"+ii).checked;
   console.log(id,Priority,date,Notes,status)
   const resp =  fetch('/todoss',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id,Priority,date,Notes,status})
})
location.reload()
}

function cleantodos(){
    const status=true
    const resp =  fetch('/todosremove',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status})
    }) 
    location.reload()
}
