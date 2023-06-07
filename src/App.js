import React, { useState } from "react";
import Challenge from "./components/Challenge";
import Conclusion from "./components/Conclusion";

const App = () => {
  const [challengeCompleted, setChallengeCompleted] = useState(false);

  const handleChallengeComplete = () => {
    setChallengeCompleted(true);
  };

  return (
    <div className="app">
      {!challengeCompleted ? (
        <Challenge onComplete={handleChallengeComplete} />
      ) : (
        <Conclusion />
      )}
    </div>
  );
};

export default App;
