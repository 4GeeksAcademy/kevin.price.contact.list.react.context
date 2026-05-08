import { useParams } from "react-router-dom";

function Single() {
  const params = useParams();

  return (
    <div className="container">
      <div className="mt-5">
        <h1>Single Item: {params.theid}</h1>
        <p>This is a detail page for item {params.theid}</p>
      </div>
    </div>
  );
}

export default Single;