console.log(localStorage.getItem('students'));

//một function để kiểm tra định dạng email
function emailIsValid(email){
    return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email)
}

//Một function dùng để tác động lên các biến và in ra console
function save() {
    let fullname = document.getElementById('fullname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let gender = '';
    if (document.getElementById('male').checked) {
        gender = document.getElementById('male').value;
    } else if (document.getElementById('female').checked) {
        gender = document.getElementById('female').value;
    }
    
    //Điều kiện cho họ và tên
    if (_.isEmpty(fullname)) {
        fullname = '';
        document.getElementById('fullname-error').innerHTML = 'Vui lòng nhập họ và tên!';
    } else if (fullname.trim().length <= 2) {
        fullname = '';
        document.getElementById('fullname-error').innerHTML = 'Không được nhỏ hơn 2 ký tự!';
    } else if (fullname.trim().length > 50) {
        fullname = '';
        document.getElementById('fullname-error').innerHTML = 'Không được lớn hơn 50 ký tự!!';
    } else {
        document.getElementById('fullname-error').innerHTML = '';
    }

    //Điều kiện cho email
    if (_.isEmpty(email)) {
        email = '';
        document.getElementById('email-error').innerHTML = 'Vui lòng nhập email!';
    } else if (!emailIsValid(email)) {
        email = '';
        document.getElementById('email-error').innerHTML = 'Email không đúng định dạng!';
    } else {
        document.getElementById('email-error').innerHTML = '';
    }

    //Điều kiện cho số điện thoại
    if (_.isEmpty(phone)) {
        phone = '';
        document.getElementById('phone-error').innerHTML = 'Vui lòng nhập số điện thoại!';
    } else if (phone.trim().length > 10) {
        phone = '';
        document.getElementById('phone-error').innerHTML = 'SĐT phải có ít nhất 10 số!';
    } else {
        document.getElementById('phone-error').innerHTML = '';
    }

    //Điều kiện cho địa chỉ
    if (_.isEmpty(address)) {
        address = '';
        document.getElementById('address-error').innerHTML = 'Vui lòng nhập địa chỉ!';
    } else {
        document.getElementById('address-error').innerHTML = '';
    }

    //Điều kiện cho giới tính
    if (_.isEmpty(gender)) {
        gender = '';
        document.getElementById('gender-error').innerHTML = 'Vui lòng chọn giới tính!';
    } else {
        document.getElementById('gender-error').innerHTML = '';
    }

    //Lưu vào danh sách sinh viên
    if (fullname && email && phone && address && gender){
        //Show ra console nếu các biến đã có giá trị
        //console.log(fullname, email, phone, address, gender)
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
        students.push ({ 
            fullname: fullname,
            email: email,
            phone: phone,
            address: address,
            gender: gender,
        });

        localStorage.setItem('students', JSON.stringify(students));

        this.renderListStudent();
        //console.log(students); //show student ra console        
    }
}

function renderListStudent(){
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    
    console.log(students.length)
    if (students.length === 0) {
        document.getElementById('list-student').style.display = 'none';
        return false;
    }

    document.getElementById('list-student').style.display = 'block';

    let tableContent = `<tr>
        <td width='20'>#</td>
        <td>Họ và tên</td>
        <td>Email</td>
        <td>Số điện thoại</td>
        <td>Giới tính</td>
        <td>Địa chỉ</td>
        <td>Hành động</td>
    </tr>`;

    students.forEach((student,index) => {
        index++;
        let genderLabel = parseInt(student.gender) === 1 ? 'Nam' : 'Nữ';
        tableContent += `<tr>
            <td>${index}</td>
            <td>${student.fullname}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${genderLabel}</td>
            <td>${student.address}</td>
            <td>
                <a href='#'>Edit</a> | <a href='#'>Delete</a>
            </td>
        </tr>`;
    });
    
    document.getElementById('grid-students').innerHTML = tableContent;

}