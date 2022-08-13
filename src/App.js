import swal from 'sweetalert2';
import './App.css';
import { useState, useEffect } from 'react'
import { Bstrash, BsBookmarkcheck, BsBookmarkcheckFill } from 'react-icons/bs'
import axios from 'axios'
import { format } from 'date-fns';



// import {confirm} from 'react-confirm'
const API = 'http://localhost:3001';

function App() {

  const [cracha, setCracha] = useState("");
  var today = format(new Date(), 'dd/MM/yyyy');

  const handleSubmit = async (e) => {
    e.preventDefault()
    let flaq = false;

    const opt = {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    }
    fetch(API + '/obreiros', opt)
      .then((r) => r.json())
      .then(resposta => {
        console.log(resposta)
        resposta.map((num) => {
          console.log(typeof num.cracha + " <<>> " + typeof cracha)
          console.log(num.cracha + " > " + parseInt(cracha))
          if (parseInt(cracha) === num.cracha) {
            flaq = true
          }
        }
        )
        if (!flaq) {
          swal.fire("Opa!", "Número do Crachá não existe !!", "warning")
        }
      });
    // axios.request(teste).then((response) => { console.log(response.data) })

















    const respObr = await axios.get(`http://localhost:3001/obreiros`)

    const resp = await axios.get(API + "/cracha")

    // respObr.data.map((obrExiste) => {
    //   breakme: {
    //     if(parseInt(cracha) !== obrExiste.cracha){
    //       console.log('Data do banco de dados => ' + obrExiste)
    //       flaq = false;
    //       // alert("Crachá já cadastrado")
    //       swal.fire("Opa!", "Número do Crachá não existe !!", "warning")
    //       break breakme;
    //     }
    //   }
    // })

    resp.data.map((dados) => {

      // Data do banco pegando para comparar com a data de hoje
      var dataDB = format(new Date(dados.dataCriacao), 'dd/MM/yyyy')


      breakme: {
        if (parseInt(cracha) === dados.cracha && today === dataDB) {
          flaq = false;
          // alert("Crachá já cadastrado")
          swal.fire("Opa!", "Número do Crachá já inserido !!!", "warning")
          break breakme;
        }
      }
    })
    if (flaq) {

      respObr.data.map((obr) => {
        breakme: {
          if (parseInt(cracha) === obr.cracha) {
            // let nm =  swal.fire("teste",{buttons:[true,'false']});

            const nm = swal.fire({
              title: "Número " + obr.cracha + ": " + obr.nome + "?",
              text: "",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Confirma'
            }).then((resultado) => {
              if (resultado.isConfirmed) {
                swal.fire({
                  icon: 'success',
                  title: 'Inserindo com sucesso!',
                  showConfirmButton: false,
                  timer: 1500
                })
              }
            })

            // window.confirm(obr.nome);
            flaq = nm ? true : false
            break breakme;
          }
        }
      })


      if (flaq) {
        await axios.post(API + "/cracha", { "cracha": parseInt(cracha) })
      }
    }

    setCracha("");

  }

  return (
    <div className="App">
      <div className="chamada-header">
        <h1>Reunião dos Obreiros</h1>
      </div>
      <div className="form-chamada">
        <h2>Chamada</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              onKeyPress={e => { if (!/[0-9]/.test(e.key)) e.preventDefault() }}
              name="cracha"
              placeholder="Numero da chamada"
              onChange={(e) => setCracha(e.target.value)}
              value={cracha}
              required
            />
          </div>
          <input type="submit" value="Enviar" />
        </form>
      </div>
    </div>
  );
}

export default App;
