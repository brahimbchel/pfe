import { useParams } from 'react-router'


const EmpRendezVous = () => {
  const params = useParams()

  return (
    <div>Emp {params.id} RendezVous</div>
  )
}

export default EmpRendezVous