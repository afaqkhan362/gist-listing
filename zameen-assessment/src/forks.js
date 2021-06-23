import React, { useEffect, useState } from 'react';

const Forks = ({ gist }) => {

  const [forks, setForks] = useState();

  useEffect(() => {
    fetch(`${gist.forks_url}?per_page=3`)
      .then(response => response.json())
      .then(data =>
        setForks(data));
  }, [forks])

  return (
    <>
    ----------------------------------
    <div>
      Forks : 
      {
        forks ? forks?.map(fork => (
          <div key={fork.owner.login}>
            <p>{fork.owner.login}</p>
            <img src={fork.owner.avatar_url} alt={fork.owner.login} style={{ height: 60, width: 60 }} />
          </div>
        )) : <></>
      }
    </div>
    ---------------------------------
    </>
  )
}

export default Forks;