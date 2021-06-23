// import logo from './logo.svg';
import React, { useState } from 'react';
import Forks from './forks';
import './App.css';

function App() {
  const [searchedUser, setSearchedUser] = useState('');
  const [gists, setGists] = useState();

  const handleSearch = () => {
    fetch(`https://api.github.com/users/${searchedUser}/gists?page=1&per_page=30`)
      .then((response) => response.json())
      .then((data) => setGists(data));
  }

  const getGistFiles = (gist) => {
    const fileNames = Object.keys(gist.files);
    const listContent = <ul id="myUL">{fileNames.map(fileName => {
      const fileType = gist.files[fileNames]?.language;
      const url = gist.files[fileNames]?.raw_url;
      return (
        <div key={fileName}>
          <li>
            <a href={url}><p>{fileName}
              {'   '}<img src={`https://img.shields.io/badge/${fileType}-made with ${fileType}-green`}
                alt={fileName}
              />
            </p></a>
          </li>
        </div>
      )
    })}</ul>
    console.log(gist)
    return listContent;
  }

  return (
    <div className="App">
      <div>
        <input type="text" id="myInput" placeholder="Search for Gists by username" onChange={(event => { setSearchedUser(event.target.value) })} />
        <button id="searchButton" onClick={handleSearch}>Search</button>
      </div>
      <ul id="myUL">
        {gists ? gists?.map(gist => (
          <div key={gist.id}>
            <li><h5>{gist.id}</h5>
              {gist.files ? getGistFiles(gist) : <></>}
              <Forks gist={gist}/>
            </li>
          </div>
        ))
          : <></>
        }
      </ul>
    </div>
  );
}

export default App;
