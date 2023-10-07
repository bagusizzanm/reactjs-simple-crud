import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan, faPenToSquare, faCheck, faXmark} from '@fortawesome/free-solid-svg-icons';

const Mahasiswa = (props) => {
   const [inputForm, setInputForm] = useState({
      nim: props.mahasiswa.nim,
      nama: props.mahasiswa.nama,
      jurusan: props.mahasiswa.jurusan,
      asalProvinsi: props.mahasiswa.asalProvinsi,
   })

   const [editMode, setEditMode] = useState(false)
   const [dataReset, setDataReset] = useState({});

   const [errors, setErrors] = useState({
      nim: "",
      nama: "",
      jurusan: "",
      asalProvinsi: "",
   })

   const handleInputChange = (e) => {
      setInputForm({...inputForm, [e.target.name]: e.target.value})
   }

   const handleEditClick = () => {

      setDataReset({...inputForm})

      setEditMode(true)
   }

   const handleResetForm = (e) => {
      e.preventDefault()

      setInputForm({...dataReset})

      setErrors({})

      setEditMode(false)
   }

   const handleFormSubmit = (e) => {
      e.preventDefault()
      let errorMessages = {}

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
         props.onEditMahasiswa(inputForm)
         setEditMode(false)
      }
   }

   return (
      <>
         {
            editMode ?
               <tr>
                  <td colSpan="5">
                     {errors.nama && <div className="position-absolute top-0 alert alert-danger">
                        {errors.nama && <li>{errors.nama}</li>}
                        {errors.jurusan && <li>{errors.jurusan}</li>}
                        {errors.asalProvinsi && <li>{errors.asalProvinsi}</li>}
                     </div>}
                     <form onSubmit={handleFormSubmit} onReset={handleResetForm}>
                        <div className="row row-cols-5 g-3">
                           <div className="col">
                              <input type="text" className="form-control" disabled defaultValue={inputForm.nim} />
                           </div>
                           <div className="col">
                              <input type="text" className="form-control" name="nama" onChange={handleInputChange} value={inputForm.nama} />
                           </div>
                           <div className="col">
                              <input type="text" className="form-control" name="jurusan" onChange={handleInputChange} value={inputForm.jurusan} />
                           </div>
                           <div className="col">
                              <input type="text" className="form-control" name="asalProvinsi" onChange={handleInputChange} value={inputForm.asalProvinsi} />
                           </div>
                           <div className="col">
                              <button className="btn btn-success me-2" type="submit" title="save">
                                 <FontAwesomeIcon icon={faCheck}/>
                              </button>
                              <button className="btn btn-warning me-2 text-white" type="reset" title="cancel">
                                 <FontAwesomeIcon icon={faXmark}/>
                              </button>
                           </div>
                        </div>
                     </form>
                  </td>
               </tr>
            : <tr>
               <td>{inputForm.nim}</td>
               <td>{inputForm.nama}</td>
               <td>{inputForm.jurusan}</td>
               <td>{inputForm.asalProvinsi}</td>
               <td>
                  <button className="btn btn-secondary me-2" onClick={handleEditClick}>
                     <FontAwesomeIcon icon={faPenToSquare} /> Edit
                  </button>
                  <button className="btn btn-danger" onClick={props.onDeleteMahasiswa} id={inputForm.nim}>
                     <FontAwesomeIcon icon={faTrashCan} /> Delete
                  </button>
               </td>
            </tr>
         }
      </>
   );
};

export default Mahasiswa;