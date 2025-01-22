import React, { useState, useEffect } from "react";

interface ResponseData {
  user?: {
    userID: number;
    name: string;
  };
  document?: {
    id: number;
    userID: number;
    title: string;
    brief: string;
    status: string;
  };
  subdocuments?: [
    {
      id: number;
      userID: number;
      title: string;
      content: string;
      status: string;
    },
  ];
}

// Example hook to retrieve data from an external endpoint
function useFetchData() {
  const [status, setStatus] = useState<string>("idle");
  const [data, setData] = useState<ResponseData>({});
  useEffect(() => {
    setStatus("loading");
    fetch("https://your-restful-endpoint")
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        setStatus("success");
        setData(data);
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  return {
    status,
    data,
  };
}

export function DocumentScreen() {
  const { status, data } = useFetchData();

  const { user, document, subdocuments } = data;

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "error") {
    return <p>There was an error fetching the data!</p>;
  }
  return (
    <>
      <h2>{user?.userID}</h2>
      <h3>{document?.title}</h3>
      <h4>{subdocuments && subdocuments?.length > 0 && subdocuments[0].content}</h4>
    </>
  );
}
