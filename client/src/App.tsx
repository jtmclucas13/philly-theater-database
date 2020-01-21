import React, { useState } from 'react';
import './App.css';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag";

interface Theater {
  id: string;
  artisticDirector: string;
  active: boolean;
}

interface TheaterData {
  theaters: Theater[];
}

const READ_THEATERS = gql`
  query theaters {
    theaters {
      id
      artisticDirector
      active
    }
  } 
`;

const CREATE_THEATER = gql`
  mutation CreateTheater($artisticDirector: String!, $active: Boolean) {
    createTheater(artisticDirector: $artisticDirector, active: $active)
  }
`;

const DELETE_THEATER = gql`
  mutation DeleteTheater($id: String!) {
    deleteTheater(id: $id)
  }
`;

const App: React.FC = () => {
  const { data, loading, error } = useQuery<TheaterData>(READ_THEATERS);
  const [createTheater] = useMutation<{createTheater: Theater}>(CREATE_THEATER);
  const [deleteTheater] = useMutation<{ deleteTheater: Theater}>(DELETE_THEATER);
  const [artisticDirector, setArtisticDirector] = useState<string>('');

  if (loading) return <p>loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not Found</p>;

  return (
    <div className="app">
      <h3>Create New Theater</h3>
      <form onSubmit={e => {
        e.preventDefault();
        createTheater({ variables: { artisticDirector } });
        window.location.reload();
      }}>
        <input className="form-control" type="text" placeholder="Enter artistic director" onChange={e => setArtisticDirector(e.target.value)} />
        <label>Active? <input type="checkbox" /></label>
        <button className="btn btn-primary px-5 my-2" type="submit">Submit</button>
      </form>
      <ul>
        {data.theaters.map((theater: Theater) =>
          <li key={theater.id}>
            <span className={theater.active ? "active" : "inactive"}>{theater.artisticDirector}</span>
            <button className="btn btn-sm btn-danger rounded-circle float-right" onClick={() => { deleteTheater({ variables: { id: theater.id }}); window.location.reload(); }}>X</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default App;
