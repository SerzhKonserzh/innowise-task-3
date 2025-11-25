import React, { useState } from "react";
import Button from '@mui/material/Button';

export default function App() {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount(prev => prev + 1);

  return (
    <div>
      <h1>{count}</h1>
      <Button onClick={increment} variant="contained">inc</Button>
    </div>
  );
}