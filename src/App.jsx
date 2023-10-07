import React, { useState } from 'react';
import Mahasiswa from './components/Mahasiswa.jsx'
import TambahMahasiswa from './components/TambahMahasiswa.jsx'
import './my-style.css'

const arrMahasiswas = [
   {
      nim: "18010245",
      nama: "Eka Putra",
      jurusan: "Teknik Informatika",
      asalProvinsi: "DKI Jakarta"
   }, {
      nim: "19010214",
      nama: "Lisa Permata",
      jurusan: "Sistem Informasi",
      asalProvinsi: "Sumatera Barat"
   }, {
      nim: "20010710",
      nama: "Rudi Setiawan",
      jurusan: "Ilmu Komputer",
      asalProvinsi: "Jawa Tengah"
   }, {
      nim: "20010790",
      nama: "Friska Ramadhani",
      jurusan: "Ilmu Komputer",
      asalProvinsi: "Kalimantan Barat"
   }
];

const App = () => {

   const [mahasiswas, setMahasiswas] = useState(arrMahasiswas)
   const [messages, setMessages] = useState(null)
   const [color, setColor] = useState(null)


   const handleAddMahasiswa = (data) => {
      const newMahasiswa = [...mahasiswas, data]
      setMahasiswas(newMahasiswa)
      handleShowMessage("Succesfully Added!", "alert alert-info")
   }

   const handleEditMahasiswa = (data) => {
      const result = mahasiswas.findIndex(
         (mahasiswa) => mahasiswa.nim === data.nim
      )

      const newMahasiswas = mahasiswas
      newMahasiswas.splice(result, 1, data)
      setMahasiswas([...newMahasiswas])
      handleShowMessage("Succesfully Changed !", " alert-info")
   }

   const handleShowMessage = (text, color) => {
      setMessages(text)
      setColor(color)
      setTimeout(() => {
         setMessages(null)
      },3000)
   }

   const handleDeleteMahasiswa = (e) => {
      // find the index which data to be deleted
      const result = mahasiswas.findIndex(
         (mahasiswa) => mahasiswa.nim === e.target.id
      );

      // Copy the mahasiswa to be deleted
      const deletedMahasiswa = { ...mahasiswas[result] };

      // Remove the mahasiswa from the array
      const newMahasiswas = [...mahasiswas];
      newMahasiswas.splice(result, 1);

      setMahasiswas(newMahasiswas);
      handleShowMessage(`Data ${deletedMahasiswa.nama} has been deleted`, 'alert-danger');
   };


   return (
      <div className="container mt-5">
         {messages && <small className={`${color} alert position-fixed top-1 d-block`} role="alert">{messages}</small>}
         <div className="row mt-5">
            <div className="col">
               <h1 style={{marginTop: "5.5rem"}}>Table Mahasiswa</h1>
               <table className="table">
                  <thead>
                  <tr>
                     <th>NIM</th>
                     <th>Nama</th>
                     <th>Jurusan</th>
                     <th>Asal Provinsi</th>
                     <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                     <TambahMahasiswa onAddMahasiswa={handleAddMahasiswa} mahasiswas={mahasiswas} />
                     {
                        mahasiswas.map((mahasiswa) =>
                           <Mahasiswa key={mahasiswa.nim} mahasiswa={mahasiswa} onEditMahasiswa={handleEditMahasiswa} onDeleteMahasiswa={handleDeleteMahasiswa}
                           />
                     )}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default App;
