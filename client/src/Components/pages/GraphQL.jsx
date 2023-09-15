import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_DATA } from './queries';

function GraphQL() {
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Testing GraphQL</h1>
    </div>
  );
}

export default GraphQL;