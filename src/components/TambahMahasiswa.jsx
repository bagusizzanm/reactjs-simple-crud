import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

const TambahMahasiswa = (props) => {

   const [inputForm, setInputForm] = useState({
      nim: "",
      nama: "",
      jurusan: "",
      asalProvinsi: "",
   })

   const [errors, setErrors] = useState({
      nim: "",
      nama: "",
      jurusan: "",
      asalProvinsi: "",
   })

   const handleInputChange = (event) => {
      setInputForm({...inputForm, [event.target.name]: event.target.value})
   }

   const duplicateRecords = () => {
      return (props.mahasiswas.find((mahasiswa) =>
         mahasiswa.nim === inputForm.nim))
   }

   const handleSubmitForm = (e) => {
      e.preventDefault()
      let errorMessages = {}

      if (inputForm.nim.trim() === ""){
         errorMessages.nim = "NIM shouldn't be empty !"
      }else if (!/^[0-9]{8}$/.test(inputForm.nim)){
         errorMessages.nim = "NIM should be in 8 digits number"
      }else if (duplicateRecords()){
         errorMessages.nim = "NIM already taken !"
      }else {
         errorMessages.nim = ""
      }

      if (inputForm.nama.trim() === ""){
         errorMessages.nama = "Name shouldn't be empty !"
      }else {
         errorMessages.nama = ""
      }

      if (inputForm.jurusan.trim() === ""){
         errorMessages.jurusan = "Major shouldn't be empty !"
      }else {
         errorMessages.jurusan = ""
      }

      if (inputForm.asalProvinsi.trim() === ""){
         errorMessages.asalProvinsi = "Province shouldn't be empty !"
      }else {
         errorMessages.asalProvinsi = ""
      }

      // set errors into new updated value
      setErrors(errorMessages)

      // valid ?
      let isValid = true

      for (let inputName in errorMessages){
         if (errorMessages[inputName].length > 0){
            isValid = false
         }
      }

      // if the data isValid
      if (isValid){
         props.onAddMahasiswa(inputForm)

         setInputForm({
            nim: "",
            nama: "",
            jurusan: "",
            asalProvinsi: "",
         })
      }
   }

   return (
      <tr>
         <td colSpan="5">
            {errors.nim && <div className="position-absolute top-0 alert alert-danger">
               {errors.nim && <li>{errors.nim}</li>}
               {errors.nama && <li>{errors.nama}</li>}
               {errors.jurusan && <li>{errors.jurusan}</li>}
               {errors.asalProvinsi && <li>{errors.asalProvinsi}</li>}
            </div>}
            <form onSubmit={handleSubmitForm}>
               <div className="row row-cols-5 g-3">
                  <div className="col">
                     <input type="text" className="form-control" name="nim" placeholder="00000000" value={inputForm.nim} onChange={handleInputChange}/>
                  </div>
                  <div className="col">
                     <input type="text" className="form-control" name="nama" placeholder="John Doe" onChange={handleInputChange} value={inputForm.nama}/>
                  </div>
                  <div className="col">
                     <input type="text" className="form-control" name="jurusan" placeholder="Sistem Informasi" onChange={handleInputChange} value={inputForm.jurusan}/>
                  </div>
                  <div className="col">
                     <input type="text" className="form-control" name="asalProvinsi" placeholder="DKI Jakarta" onChange={handleInputChange} value={inputForm.asalProvinsi}/>
                  </div>
                  <div className="col">
                     <button type="submit" className="btn btn-primary">
                        <FontAwesomeIcon icon={faPlus} /> Add </button>
                  </div>
               </div>
            </form>
         </td>
      </tr>
   );
};

export default TambahMahasiswa;