import { Employee } from "./employee.js";

const txtId = document.getElementById('txt-id');
const txtName = document.getElementById('txt-name');
const txtAddress = document.getElementById('txt-address');
const btnSave = document.getElementById('btn-save');
const btnClear = document.getElementById('btn-clear');
const tblBody = document.querySelector("#tbl-employees > tbody")

const regExpAddress = /^.{3,}$/;
const regExpName = /^[A-Za-z ]+$/;
const regExpId = /^E\d{3,}$/;

const employeeList = [];

btnSave.addEventListener('click', ()=> {
    if (!validateData()){
        return;
    }

    const newEmployee = new Employee(txtId.value.trim(),
            txtName.value.trim(), 
            txtAddress.value.trim());

    if (!employeeList.find(emp => emp.id === newEmployee.id)){
        
        if (!employeeList.length){
            tblBody.innerHTML = '' ;
        }
        
        employeeList.push(employeeList);

        const trElm = document.createElement('tr');
        trElm.innerHTML = `
            <td>${newEmployee.id}</td>
            <td>${newEmployee.name}</td>
            <td>${newEmployee.address}</td>
        `;

        tblBody.append(trElm);
        btnClear.click();

    }else{
        txtId.classList.add('invalid', 'animate__shakeX');
        txtId.select();
    }
});

[txtId, txtName, txtAddress]
.forEach(txt => txt.addEventListener('input', 
()=> txt.classList.remove('invalid', 'animate__shakeX')));

function validateData(){
    const id = txtId.value.trim();
    const name = txtName.value.trim();
    const address = txtAddress.value.trim();
    let valid = true;
    [txtId, txtName, txtAddress]
    .forEach(txt => txt.classList.remove('invalid', 'animate__shakeX'));

    if (!regExpAddress.test(address)){
        setTimeout(()=> txtAddress.classList.add('invalid', 'animate__shakeX'), 0);
        txtAddress.select();
        valid = false;
    }

    if (!regExpName.test(name)){
        setTimeout(()=> txtName.classList.add('invalid', 'animate__shakeX'), 0);
        txtName.select();
        valid = false;
    }

    if (!regExpId.test(id)){
        setTimeout(()=> txtId.classList.add('invalid', 'animate__shakeX'), 0);
        txtId.select();
        valid = false;
    }  
    
    return valid;
}

btnClear.addEventListener('click', ()=> {
    [txtId, txtName, txtAddress]
    .forEach(txt => txt.classList.remove('invalid', 'animate__shakeX'));
    txtId.focus();
});
