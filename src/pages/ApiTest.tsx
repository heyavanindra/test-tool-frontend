import { useState } from "react";
import axios, { AxiosError } from "axios";

export interface TestResultsTypes {
  endPoint: string;
  statusCode: number;
  responseTime: number;
  passed: boolean;
}

const ApiTest = () => {
  const [api, setApi] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<TestResultsTypes | null>(null);
  const [error, setError] = useState("");
  async function handleClick() {
    setLoading(true);
    try {
      const response = await axios.post<TestResultsTypes>(`${import.meta.env.VITE_API_URL}/testapi`, {
        api: api,
      });
      setApiResponse(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(axiosError.message);
    }
    setLoading(false);
  }

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-4">
      <input
        className="border-black border-2 px-2 py-1 w-80"
        type="text"
        placeholder="Enter API URL"
        value={api}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setApi(e.target.value);
        }}
      />
      <button
        className="px-4 py-2 bg-amber-200 rounded hover:bg-amber-300 transition"
        onClick={handleClick}
        disabled={loading || !api}
      >
        {loading ? "Testing..." : "Test"}
      </button>
      {error && <div>
        {error}
        </div>}
      {apiResponse && (
        <div className="mt-4 p-4 border rounded bg-gray-100 text-left">
          <p>
            <strong>Endpoint:</strong> {apiResponse.endPoint}
          </p>
          <p>
            <strong>Response Time:</strong> {apiResponse.responseTime} ms
          </p>
          <p>
            <strong>Status Code:</strong> {apiResponse.statusCode}
          </p>
          <p>
            <strong>Result:</strong>{" "}
            <span
              className={apiResponse.passed ? "text-green-600" : "text-red-600"}
            >
              {apiResponse.passed ? "Passed ✅" : "Failed ❌"}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ApiTest;
