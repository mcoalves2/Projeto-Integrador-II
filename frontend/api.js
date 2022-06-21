  const getTasks = async () => {
    const response = await fetch('http://example.com/movies.json');
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
  }

  const postTask = async () => {
    const response = await fetch('http://example.com/movies.json', {
      method: 'POST',
      body: myBody, // string or object
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
  }

  const delTask = async (id) => {
    const response = await fetch('http://example.com/movies.json'+id, {
      method: 'DEL',
    }).then(res => res.json()).then(res => console.log(res))
    
  }

