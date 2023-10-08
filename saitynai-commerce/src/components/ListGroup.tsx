import React from 'react';

function ListGroup({ data } : {data: string}) {
  return (
    <div>
      <h2>Data from API:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default ListGroup;