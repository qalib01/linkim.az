import React from "react";
import { Helmet } from "react-helmet-async";

function MetaUser() {
  return (
    <div>
      <Helmet>
        <title>LinkimAz - Index Page</title>
        <meta name="description" content="User page üçün description" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
        <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
        
      </Helmet>
    </div>
  );
}

export default MetaUser;